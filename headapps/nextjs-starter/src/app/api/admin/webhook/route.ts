import { NextRequest, NextResponse } from 'next/server';
import { waitUntil } from '@vercel/functions';
import { WebhookRequestBody } from 'lib/webhook/revalidate/type';
import { fetchItemUrl } from 'src/lib/webhook/revalidate/utils';
import { RevalidationService } from 'lib/webhook/revalidate/revalidate-service';

interface WebhookResponse {
  revalidated: boolean;
  error?: string;
}

export const dynamic = 'force-dynamic';

const BATCH_SIZE = Number(process.env.PROCESS_BATCH_SIZE || '25');

async function processRevalidationBatches(
  updates: WebhookRequestBody['updates'],
  revalidationService: RevalidationService
): Promise<void> {
  try {
    const layoutUpdates = revalidationService.processLayoutUpdates(updates);

    const urls = await Promise.all(
      layoutUpdates.map(async ({ identifier, entity_culture }) => {
        try {
          return await fetchItemUrl(identifier.replace('-layout', ''), entity_culture);
        } catch (error) {
          console.log(`Failed to fetch item URL: ${error}`);
          return null;
        }
      })
    );

    const validUrls = urls.filter((url): url is NonNullable<typeof url> => url !== null);

    for (let i = 0; i < validUrls.length; i += BATCH_SIZE) {
      const batch = validUrls.slice(i, i + BATCH_SIZE);
      try {
        await revalidationService.revalidateUrls(batch);
        console.log(
          `Processed batch ${Math.floor(i / BATCH_SIZE) + 1} of ${Math.ceil(
            validUrls.length / BATCH_SIZE
          )}`
        );
      } catch (error) {
        console.error(`Error processing batch ${Math.floor(i / BATCH_SIZE) + 1}:`, error);
      }
    }

    console.log('Revalidation completed successfully');
  } catch (error) {
    console.error('Revalidation process failed:', error);
  }
}

export async function POST(req: NextRequest): Promise<NextResponse<WebhookResponse>> {
  const revalidationService = new RevalidationService(process.env.ISR_REVALIDATE_SECRET || '');

  try {
    if (!revalidationService.isWebhookEnabled()) {
      console.log('Webhook processing is disabled');
      return NextResponse.json(
        { revalidated: false, error: 'Webhook processing is disabled' },
        { status: 200 }
      );
    }

    const isValidSecret = revalidationService.validateSecret(
      req.headers.get('secret') ?? undefined
    );

    if (!isValidSecret) {
      console.log('Invalid revalidation secret provided');
      return NextResponse.json({ revalidated: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { updates } = (await req.json()) as WebhookRequestBody;

    waitUntil(processRevalidationBatches(updates, revalidationService));

    return NextResponse.json({ revalidated: true }, { status: 200 });
  } catch (error) {
    console.log('Webhook processing failed:', error);
    // Still return 200 to avoid retries, but include error information
    return NextResponse.json(
      { revalidated: false, error: 'Webhook processed unsuccessfully' },
      { status: 200 }
    );
  }
}
