import 'src/lib/preload';

import { draftMode } from 'next/headers';
import { ReactNode } from 'react';
import Bootstrap from 'src/Bootstrap';

type Props = {
  children: ReactNode;
  params: Promise<{
    site: string;
  }>;
};

export default async function SiteLayout({ children, params }: Props) {
  const { site } = await params;
  const { isEnabled } = await draftMode();

  return (
    <>
      <Bootstrap siteName={site} isPreviewMode={isEnabled} />
      {children}
    </>
  );
}
