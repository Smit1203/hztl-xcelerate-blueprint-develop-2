import { Fraunces, Roboto } from 'next/font/google';

const roboto = Roboto({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
  weight: ['400', '500', '700'],
});

const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cooper-std',
  weight: ['400', '500', '700'],
});

export const supportedFonts = [roboto, fraunces];
