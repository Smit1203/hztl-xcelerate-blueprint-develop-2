// Client-safe component map for App Router

import { BYOCClientWrapper, NextjsContentSdkComponent, FEaaSClientWrapper } from '@sitecore-content-sdk/nextjs';
import { Form } from '@sitecore-content-sdk/nextjs';

import * as Navigation from 'src/components/navigation/Navigation';
import * as ContentBlock from 'src/components/content-block/ContentBlock';
import * as SkipNav from 'src/components/SkipNav/SkipNav';
import * as RTE from 'src/components/RTE/RTE';
import * as MainLayout from 'src/components/MainLayout/MainLayout';
import * as HeaderMobile from 'src/components/Header/HeaderMobile';
import * as HeaderDesktop from 'src/components/Header/HeaderDesktop';
import * as HeaderContext from 'src/components/Header/HeaderContext';
import * as Header from 'src/components/Header/Header';
import * as Alert from 'src/components/Alert/Alert';

export const componentMap = new Map<string, NextjsContentSdkComponent>([
  ['BYOCWrapper', BYOCClientWrapper],
  ['FEaaSWrapper', FEaaSClientWrapper],
  ['Form', Form],
  ['Navigation', { ...Navigation }],
  ['ContentBlock', { ...ContentBlock }],
  ['SkipNav', { ...SkipNav }],
  ['RTE', { ...RTE }],
  ['MainLayout', { ...MainLayout }],
  ['HeaderMobile', { ...HeaderMobile }],
  ['HeaderDesktop', { ...HeaderDesktop }],
  ['HeaderContext', { ...HeaderContext }],
  ['Header', { ...Header }],
  ['Alert', { ...Alert }],
]);

export default componentMap;
