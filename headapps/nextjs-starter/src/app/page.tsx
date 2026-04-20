import { redirect } from 'next/navigation';
import scConfig from 'sitecore.config';

export default function RootPage(): never {
  redirect(`/${scConfig.defaultSite}/${scConfig.defaultLanguage}`);
}
