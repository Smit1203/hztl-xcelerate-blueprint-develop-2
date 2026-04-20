import 'assets/app.css';
import 'src/assets/themes/index.css';
import { supportedFonts } from 'lib/fonts';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const fontClasses = supportedFonts.map((font) => font.variable).join(' ');
  const bodyClasses = [fontClasses, 'brand-root'].join(' ');

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={bodyClasses} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
