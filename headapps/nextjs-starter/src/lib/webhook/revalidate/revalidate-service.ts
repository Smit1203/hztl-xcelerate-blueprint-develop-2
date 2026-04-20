import {
  SitecoreItemUrl,
  WebhookRequestBody,
  TSitecoreItemQueryResult,
} from 'lib/webhook/revalidate/type';
import { revalidate } from 'src/lib/webhook/revalidate/utils';
import { NextApiResponse } from 'next';

export class RevalidationService {
  private readonly secret: string;
  private readonly webhookEnabled: boolean;

  constructor(secret: string) {
    this.secret = secret;
    this.webhookEnabled = process.env.Enable_OnUpdate_Webhook === 'true';
  }

  /**
   * Checks if webhook processing is enabled
   * @returns boolean indicating if webhook processing is enabled
   */
  isWebhookEnabled(): boolean {
    return this.webhookEnabled;
  }

  validateSecret(requestSecret?: string): boolean {
    return requestSecret === this.secret;
  }

  processLayoutUpdates(updates: WebhookRequestBody['updates']): SitecoreItemUrl[] {
    return updates
      ?.filter((update) => update.entity_definition === 'LayoutData')
      ?.map(({ identifier, entity_culture }) => ({
        identifier,
        entity_culture,
      }));
  }

  async revalidateSimplePath(path: string, res: NextApiResponse): Promise<void> {
    try {
      await revalidate(res, path);
      console.log(`Successfully revalidated path: ${path}`);
    } catch (error) {
      console.log(`Failed to revalidate path: ${path}`, error);
      throw error;
    }
  }

  async revalidateUrls(urls: Array<TSitecoreItemQueryResult>, res: NextApiResponse): Promise<void> {
    for (const url of urls) {
      if (!url?.url?.path) {
        console.log('Skipping revalidation for undefined URL path');
        continue;
      }

      try {
        const pathToClear = this.buildPathToClear(url);
        await revalidate(res, pathToClear);
        console.log(`Successfully revalidated: ${pathToClear}`);
      } catch (error) {
        console.log(`Failed to revalidate path: ${error}`);
      }
    }
  }

  private buildPathToClear(url: TSitecoreItemQueryResult): string {
    const domain = process.env.REVALIDATE_BASE_URL;
    if (url.slug) {
      return `/${url.language}/${url.slugAncestor}/${url.slug.charAt(0)}/${url.slug}`;
    }

    // Handle regular paths, stripping domain if present
    const cleanPath = url.url.path
      .replace(/^\/+/, '') // Remove leading slashes
      .replace(new RegExp(`^${domain}\/`), ''); // Remove the domain if present

    return `/${url.language}/${cleanPath}`.replace(/\/+/g, '/');
  }
}
