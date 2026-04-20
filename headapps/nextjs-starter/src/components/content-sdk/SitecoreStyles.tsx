import client from 'lib/sitecore-client';
import { LayoutServiceData, HTMLLink } from '@sitecore-content-sdk/nextjs';

/**
 * Component to render `<link>` elements for Sitecore styles.
 * In App Router / React 19, `<link>` tags rendered inside components are
 * automatically hoisted into `<head>` — no wrapper needed.
 */
const SitecoreStyles = ({
  layoutData,
  enableStyles,
  enableThemes,
}: {
  layoutData: LayoutServiceData;
  enableStyles?: boolean;
  enableThemes?: boolean;
}) => {
  const headLinks = client.getHeadLinks(layoutData, { enableStyles, enableThemes });

  if (headLinks.length === 0) {
    return null;
  }

  return (
    <>
      {headLinks.map(({ rel, href }: HTMLLink) => (
        <link rel={rel} key={href} href={href} />
      ))}
    </>
  );
};

export default SitecoreStyles;
