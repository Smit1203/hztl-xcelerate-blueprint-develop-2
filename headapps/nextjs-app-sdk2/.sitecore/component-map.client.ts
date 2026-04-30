// Client-safe component map for App Router

import { BYOCClientWrapper, NextjsContentSdkComponent, FEaaSClientWrapper } from '@sitecore-content-sdk/nextjs';
import { Form } from '@sitecore-content-sdk/nextjs';

import * as Navigation from 'src/components/navigation/Navigation';
import * as ContentBlock from 'src/components/content-block/ContentBlock';
import * as SkipNav from 'src/components/authorable/shared/site-structure/SkipNav/SkipNav';
import * as MainLayoutFrame from 'src/components/authorable/shared/site-structure/MainLayout/MainLayoutFrame';
import * as HeaderMobile from 'src/components/authorable/shared/site-structure/Header/HeaderMobile';
import * as HeaderDesktop from 'src/components/authorable/shared/site-structure/Header/HeaderDesktop';
import * as HeaderContext from 'src/components/authorable/shared/site-structure/Header/HeaderContext';
import * as Header from 'src/components/authorable/shared/site-structure/Header/Header';
import * as RTE from 'src/components/authorable/shared/content/RTE';
import * as Alert from 'src/components/authorable/shared/content/Alert';

export const componentMap = new Map<string, NextjsContentSdkComponent>([
  ['BYOCWrapper', BYOCClientWrapper],
  ['FEaaSWrapper', FEaaSClientWrapper],
  ['Form', Form],
  ['Navigation', { ...Navigation }],
  ['ContentBlock', { ...ContentBlock }],
  ['SkipNav', { ...SkipNav }],
  ['MainLayoutFrame', { ...MainLayoutFrame }],
  ['HeaderMobile', { ...HeaderMobile }],
  ['HeaderDesktop', { ...HeaderDesktop }],
  ['HeaderContext', { ...HeaderContext }],
  ['Header', { ...Header }],
  ['RTE', { ...RTE }],
  ['Alert', { ...Alert }],
]);

export default componentMap;
