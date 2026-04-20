import { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

type Props = {
  children: ReactNode;
  params: Promise<{
    site: string;
    locale: string;
  }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { site, locale } = await params;

  setRequestLocale(`${site}_${locale}`);

  return <NextIntlClientProvider>{children}</NextIntlClientProvider>;
}
