import { WebhookRequestBody } from 'lib/webhook/revalidate/type';
import { fetchItemUrl } from '../utils';
import { NextApiRequest, NextApiResponse } from 'next';
import { RevalidationService } from 'lib/webhook/revalidate/revalidate-service';
import { waitUntil } from '@vercel/functions';

// /**
//  * Handles the webhook request.
//  * @param req - The NextApiRequest object.
//  * @param res - The NextApiResponse object.
//  */
export interface revalidateRequestHeaders {
  secret?: string;
}

interface WebhookResponse {
  revalidated: boolean;
  error?: string;
}

const BATCH_SIZE = Number(process.env.PROCESS_BATCH_SIZE || '25');

async function processRevalidationBatches(
  updates: WebhookRequestBody['updates'],
  revalidationService: RevalidationService,
  res: NextApiResponse
) {
  try {
    // Process updates
    const layoutUpdates = await revalidationService.processLayoutUpdates(updates);

    // Fetch URLs for all updates
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

    // Filter out null values
    const validUrls = urls.filter((url): url is NonNullable<typeof url> => url !== null);

    // Process in batches
    for (let i = 0; i < validUrls.length; i += BATCH_SIZE) {
      const batch = validUrls.slice(i, i + BATCH_SIZE);
      try {
        await revalidationService.revalidateUrls(batch, res);
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

export default async function handler(req: NextApiRequest, res: NextApiResponse<WebhookResponse>) {
  // Only allow POST method
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({
      revalidated: false,
      error: `Method ${req.method} Not Allowed`,
    });
  }

  const revalidationService = new RevalidationService(process.env.ISR_REVALIDATE_SECRET || '');

  try {
    if (!revalidationService.isWebhookEnabled()) {
      console.log('Webhook processing is disabled');
      return res.status(200).json({
        revalidated: false,
        error: 'Webhook processing is disabled',
      });
    }

    // Validate secret
    const isValidSecret = await revalidationService.validateSecret(
      (req.headers as revalidateRequestHeaders).secret
    );

    if (!isValidSecret) {
      console.log('Invalid revalidation secret provided');
      return res.status(401).json({
        revalidated: false,
        error: 'Unauthorized',
      });
    }

    const { updates } = req.body as WebhookRequestBody;

    waitUntil(processRevalidationBatches(updates, revalidationService, res));

    return res.status(200).json({
      revalidated: true,
    });
  } catch (error) {
    console.log('Webhook processing failed:', error);
    // Still return 200 to avoid retries, but include error information
    return res.status(200).json({
      revalidated: false,
      error: 'Webhook processed unsuccessfully',
    });
  }
}
