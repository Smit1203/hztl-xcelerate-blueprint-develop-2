// Disable tailwind-variants' twMerge BEFORE any module calls tv().
// This file mutates tailwind-variants' default config and must run first.
import "lib/preload";
import "./globals.css"
import { Inter, Roboto } from "next/font/google";
import { DefaultBrand, DefaultTheme } from "lib/context/brand-theme-constants";

// next/font emits a className per font (.variable) that defines the
// CSS custom property (e.g. --font-inter) on its host element. The Figma
// token files reference these vars (e.g. --typography-body-font-family:
// var(--font-inter)), so every font referenced by ANY brand must be loaded
// here and its .variable applied to <body>; otherwise the chain resolves
// to nothing and text falls back to the UA default font.
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
  variable: "--font-roboto",
});

const supportedFonts = [inter, roboto];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const fontClasses = supportedFonts.map((f) => f.variable).join(" ");
  return (
    <html lang="en">
      <head>
        <link
          rel="preconnect"
          href="https://edge-platform.sitecorecloud.io"
          crossOrigin="anonymous"
        />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${fontClasses} brand-root ${DefaultBrand} ${DefaultTheme}`}>
        {children}
      </body>
      </html>
  );
}
