// Client-safe component map for App Router

import { BYOCClientWrapper, NextjsContentSdkComponent, FEaaSClientWrapper } from '@sitecore-content-sdk/nextjs';
import { Form } from '@sitecore-content-sdk/nextjs';

import * as Navigation from 'src/components/navigation/Navigation';
import * as ContentBlock from 'src/components/content-block/ContentBlock';
import * as SkipNav from 'src/components/SkipNav/SkipNav';
import * as RTE from 'src/components/RTE/RTE';
import * as MainLayout from 'src/components/MainLayout/MainLayout';
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
  ['Alert', { ...Alert }],
]);

export default componentMap;
