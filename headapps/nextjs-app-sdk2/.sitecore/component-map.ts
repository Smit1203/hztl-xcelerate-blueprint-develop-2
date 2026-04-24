// Below are built-in components that are available in the app, it's recommended to keep them as is

import { BYOCServerWrapper, NextjsContentSdkComponent, FEaaSServerWrapper } from '@sitecore-content-sdk/nextjs';
import { Form } from '@sitecore-content-sdk/nextjs';

// end of built-in components
import * as Title from 'src/components/title/Title';
import * as StructuredData from 'src/components/structured-data/StructuredData';
import * as RowSplitter from 'src/components/row-splitter/RowSplitter';
import * as RichText from 'src/components/rich-text/RichText';
import * as Promo from 'src/components/promo/Promo';
import * as PartialDesignDynamicPlaceholder from 'src/components/partial-design-dynamic-placeholder/PartialDesignDynamicPlaceholder';
import * as PageContent from 'src/components/page-content/PageContent';
import * as Navigation from 'src/components/navigation/Navigation';
import * as LinkList from 'src/components/link-list/LinkList';
import * as Image from 'src/components/image/Image';
import * as ContentBlock from 'src/components/content-block/ContentBlock';
import * as Container from 'src/components/container/Container';
import * as ColumnSplitter from 'src/components/column-splitter/ColumnSplitter';
import * as SkipNav from 'src/components/SkipNav/SkipNav';
import * as RTE from 'src/components/RTE/RTE';
import * as MainLayout from 'src/components/MainLayout/MainLayout';
import * as HeaderMobile from 'src/components/Header/HeaderMobile';
import * as HeaderDesktop from 'src/components/Header/HeaderDesktop';
import * as HeaderContext from 'src/components/Header/HeaderContext';
import * as Header from 'src/components/Header/Header';
import * as Footer from 'src/components/Footer/Footer';
import * as ContainerFullWidth from 'src/components/ContainerFullWidth/ContainerFullWidth';
import * as Alert from 'src/components/Alert/Alert';

export const componentMap = new Map<string, NextjsContentSdkComponent>([
  ['BYOCWrapper', BYOCServerWrapper],
  ['FEaaSWrapper', FEaaSServerWrapper],
  ['Form', { ...Form, componentType: 'client' }],
  ['Title', { ...Title }],
  ['StructuredData', { ...StructuredData }],
  ['RowSplitter', { ...RowSplitter }],
  ['RichText', { ...RichText }],
  ['Promo', { ...Promo }],
  ['PartialDesignDynamicPlaceholder', { ...PartialDesignDynamicPlaceholder }],
  ['PageContent', { ...PageContent }],
  ['Navigation', { ...Navigation, componentType: 'client' }],
  ['LinkList', { ...LinkList }],
  ['Image', { ...Image }],
  ['ContentBlock', { ...ContentBlock, componentType: 'client' }],
  ['Container', { ...Container }],
  ['ColumnSplitter', { ...ColumnSplitter }],
  ['SkipNav', { ...SkipNav, componentType: 'client' }],
  ['RTE', { ...RTE, componentType: 'client' }],
  ['MainLayout', { ...MainLayout }],
  ['HeaderMobile', { ...HeaderMobile, componentType: 'client' }],
  ['HeaderDesktop', { ...HeaderDesktop, componentType: 'client' }],
  ['HeaderContext', { ...HeaderContext, componentType: 'client' }],
  ['Header', { ...Header, componentType: 'client' }],
  ['Footer', { ...Footer }],
  ['ContainerFullWidth', { ...ContainerFullWidth }],
  ['Alert', { ...Alert, componentType: 'client' }],
]);

export default componentMap;
