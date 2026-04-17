// Global
import type { NextApiRequest, NextApiResponse } from 'next';

// Local
import scConfig from 'sitecore.config';
import client from 'lib/sitecore-client';

/** Gets the Sitecore path of the server error page.  Used from `Render500Fallback` component. */
const serverErrorPathApi = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const locale = (req.query['language'] as string) || scConfig.defaultLanguage;
  const error = req.query['error'] as string | undefined;

  if (error) {
    // We can also write to some external error log if desired
    console.error('Client side error:');
    try {
      console.error(JSON.parse(error));
    } catch {
      console.error(error);
    }
  }

  const errorPages = await client.getErrorPages({
    site: scConfig.defaultSite,
    locale: locale,
  });

  // Return the error page path.
  // We just return the path not the data because we need to separately fetch that
  // to ensure we get proper component props.
  res.setHeader('Content-Type', 'text/plain');
  return res.status(200).send(errorPages?.serverErrorPagePath);
};

export default serverErrorPathApi;
