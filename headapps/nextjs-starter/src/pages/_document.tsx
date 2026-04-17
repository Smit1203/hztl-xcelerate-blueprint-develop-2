import { SitecorePageProps } from '@sitecore-content-sdk/nextjs';
import { Brands, SiteName } from 'helpers/Constants/Constant';
import { DefaultTheme, getBrandForSiteName } from 'lib/context/BrandAndThemeContext';
import { supportedFonts } from 'lib/fonts';
import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: any;
  render() {
    // Apply body classes here so they're available server-side before JS is loaded
    const pageProps = this.props?.__NEXT_DATA__?.props?.pageProps as SitecorePageProps;

    const { layout, siteName } = pageProps.page ?? {};

    const siteSettings = layout?.sitecore?.context?.siteSettings ?? {};

    const brand =
      (siteSettings?.brandStyle?.value?.trim() as Brands) ||
      getBrandForSiteName(siteName as SiteName);

    const fontClasses = supportedFonts.map((font) => font.variable).join(' ');
    const bodyClasses = [fontClasses, brand, DefaultTheme, 'brand-root'].join(' ');
    return (
      <Html>
        <Head />
        <body className={bodyClasses}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
