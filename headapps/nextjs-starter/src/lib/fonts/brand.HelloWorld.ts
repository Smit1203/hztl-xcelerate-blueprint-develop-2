import { DM_Serif_Text, Noto_Sans } from 'next/font/google';

const dmSerifText = DM_Serif_Text({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dm-serif-text',
  weight: ['400'],
});

const notoSans = Noto_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-noto-sans',
  weight: ['400', '500', '700'],
});

export const supportedFonts = [dmSerifText, notoSans];
