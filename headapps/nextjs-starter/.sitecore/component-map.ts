// Below are built-in components that are available in the app, it's recommended to keep them as is

import { BYOCServerWrapper, NextjsContentSdkComponent, FEaaSServerWrapper } from '@sitecore-content-sdk/nextjs';
import { Form } from '@sitecore-content-sdk/nextjs';

// end of built-in components
import * as RichText from 'src/components/RichText';
import * as PartialDesignDynamicPlaceholder from 'src/components/PartialDesignDynamicPlaceholder';
import * as SkipNav from 'src/components/authorable/shared/site-structure/SkipNav/SkipNav';
import * as MainLayout from 'src/components/authorable/shared/site-structure/MainLayout/MainLayout';
import * as LanguageSelector from 'src/components/authorable/shared/site-structure/Header/LanguageSelector';
import * as HeaderMobile from 'src/components/authorable/shared/site-structure/Header/HeaderMobile';
import * as HeaderDesktop from 'src/components/authorable/shared/site-structure/Header/HeaderDesktop';
import * as HeaderContext from 'src/components/authorable/shared/site-structure/Header/HeaderContext';
import * as Header from 'src/components/authorable/shared/site-structure/Header/Header';
import * as Footer from 'src/components/authorable/shared/site-structure/Footer/Footer';
import * as Breadcrumb from 'src/components/authorable/shared/site-structure/Breadcrumb/Breadcrumb';
import * as BackToTop from 'src/components/authorable/shared/site-structure/BackToTop/BackToTop';
import * as RelatedArticles from 'src/components/authorable/shared/page-specific/RelatedArticles';
import * as PopularArticles from 'src/components/authorable/shared/page-specific/PopularArticles';
import * as ArticleListing from 'src/components/authorable/shared/page-specific/ArticleListing';
import * as ArticleContent from 'src/components/authorable/shared/page-specific/ArticleContent';
import * as ArticleCategoryTabs from 'src/components/authorable/shared/page-specific/ArticleCategoryTabs';
import * as SearchSort from 'src/components/authorable/shared/page-specific/SearchResult/SearchSort';
import * as SearchSelectedFilterTags from 'src/components/authorable/shared/page-specific/SearchResult/SearchSelectedFilterTags';
import * as SearchResult from 'src/components/authorable/shared/page-specific/SearchResult/SearchResult';
import * as SearchPagination from 'src/components/authorable/shared/page-specific/SearchResult/SearchPagination';
import * as SearchFilterFacetsWrapper from 'src/components/authorable/shared/page-specific/SearchResult/SearchFilterFacetsWrapper';
import * as SearchFilterFacets from 'src/components/authorable/shared/page-specific/SearchResult/SearchFilterFacets';
import * as CustomForm from 'src/components/authorable/shared/other/CustomForm';
import * as Share from 'src/components/authorable/shared/media/Share';
import * as InlineVideo from 'src/components/authorable/shared/media/InlineVideo';
import * as InlineImage from 'src/components/authorable/shared/media/InlineImage';
import * as InlineIFrame from 'src/components/authorable/shared/media/InlineIFrame';
import * as VideoCardItem from 'src/components/authorable/shared/lists/VideoCardItem';
import * as TabItem from 'src/components/authorable/shared/lists/TabItem';
import * as Tab from 'src/components/authorable/shared/lists/Tab';
import * as StatsItem from 'src/components/authorable/shared/lists/StatsItem';
import * as Stats from 'src/components/authorable/shared/lists/Stats';
import * as FileList from 'src/components/authorable/shared/lists/FileList';
import * as ContextualNavItem from 'src/components/authorable/shared/lists/ContextualNavItem';
import * as ContextualNav from 'src/components/authorable/shared/lists/ContextualNav';
import * as CarouselItem from 'src/components/authorable/shared/lists/CarouselItem';
import * as Carousel from 'src/components/authorable/shared/lists/Carousel';
import * as CardList from 'src/components/authorable/shared/lists/CardList';
import * as CardItem from 'src/components/authorable/shared/lists/CardItem';
import * as AccordionItem from 'src/components/authorable/shared/lists/AccordionItem';
import * as Accordion from 'src/components/authorable/shared/lists/Accordion';
import * as SidebarLayout from 'src/components/authorable/shared/layout/SidebarLayout';
import * as Section from 'src/components/authorable/shared/layout/Section';
import * as SearchMain from 'src/components/authorable/shared/layout/SearchMain';
import * as JumpNavSection from 'src/components/authorable/shared/layout/JumpNavSection';
import * as JumpNavContainer from 'src/components/authorable/shared/layout/JumpNavContainer';
import * as Divider from 'src/components/authorable/shared/layout/Divider';
import * as ContainerFullWidth from 'src/components/authorable/shared/layout/ContainerFullWidth';
import * as ContainerFullBleed from 'src/components/authorable/shared/layout/ContainerFullBleed';
import * as ContainerCenter75 from 'src/components/authorable/shared/layout/ContainerCenter-75';
import * as Container7525 from 'src/components/authorable/shared/layout/Container-75-25';
import * as Container5050 from 'src/components/authorable/shared/layout/Container-50-50';
import * as Container2575 from 'src/components/authorable/shared/layout/Container-25-75';
import * as ArticleMain from 'src/components/authorable/shared/layout/ArticleMain';
import * as RTE from 'src/components/authorable/shared/content/RTE';
import * as Quote from 'src/components/authorable/shared/content/Quote';
import * as PageTitle from 'src/components/authorable/shared/content/PageTitle';
import * as Modal from 'src/components/authorable/shared/content/Modal';
import * as Metadata from 'src/components/authorable/shared/content/Metadata';
import * as Hero from 'src/components/authorable/shared/content/Hero';
import * as FeatureSidebySide from 'src/components/authorable/shared/content/FeatureSidebySide';
import * as Feature from 'src/components/authorable/shared/content/Feature';
import * as CodeEmbed from 'src/components/authorable/shared/content/CodeEmbed';
import * as Alert from 'src/components/authorable/shared/content/Alert';

export const componentMap = new Map<string, NextjsContentSdkComponent>([
  ['BYOCWrapper', BYOCServerWrapper],
  ['FEaaSWrapper', FEaaSServerWrapper],
  ['Form', { ...Form, componentType: 'client' }],
  ['RichText', { ...RichText }],
  ['PartialDesignDynamicPlaceholder', { ...PartialDesignDynamicPlaceholder }],
  ['SkipNav', { ...SkipNav }],
  ['MainLayout', { ...MainLayout, componentType: 'client' }],
  ['LanguageSelector', { ...LanguageSelector, componentType: 'client' }],
  ['HeaderMobile', { ...HeaderMobile, componentType: 'client' }],
  ['HeaderDesktop', { ...HeaderDesktop, componentType: 'client' }],
  ['HeaderContext', { ...HeaderContext, componentType: 'client' }],
  ['Header', { ...Header, componentType: 'client' }],
  ['Footer', { ...Footer }],
  ['Breadcrumb', { ...Breadcrumb }],
  ['BackToTop', { ...BackToTop }],
  ['RelatedArticles', { ...RelatedArticles, componentType: 'client' }],
  ['PopularArticles', { ...PopularArticles, componentType: 'client' }],
  ['ArticleListing', { ...ArticleListing, componentType: 'client' }],
  ['ArticleContent', { ...ArticleContent }],
  ['ArticleCategoryTabs', { ...ArticleCategoryTabs, componentType: 'client' }],
  ['SearchSort', { ...SearchSort, componentType: 'client' }],
  ['SearchSelectedFilterTags', { ...SearchSelectedFilterTags, componentType: 'client' }],
  ['SearchResult', { ...SearchResult, componentType: 'client' }],
  ['SearchPagination', { ...SearchPagination, componentType: 'client' }],
  ['SearchFilterFacetsWrapper', { ...SearchFilterFacetsWrapper, componentType: 'client' }],
  ['SearchFilterFacets', { ...SearchFilterFacets, componentType: 'client' }],
  ['CustomForm', { ...CustomForm, componentType: 'client' }],
  ['Share', { ...Share, componentType: 'client' }],
  ['InlineVideo', { ...InlineVideo, componentType: 'client' }],
  ['InlineImage', { ...InlineImage, componentType: 'client' }],
  ['InlineIFrame', { ...InlineIFrame, componentType: 'client' }],
  ['VideoCardItem', { ...VideoCardItem, componentType: 'client' }],
  ['TabItem', { ...TabItem, componentType: 'client' }],
  ['Tab', { ...Tab, componentType: 'client' }],
  ['StatsItem', { ...StatsItem, componentType: 'client' }],
  ['Stats', { ...Stats, componentType: 'client' }],
  ['FileList', { ...FileList, componentType: 'client' }],
  ['ContextualNavItem', { ...ContextualNavItem }],
  ['ContextualNav', { ...ContextualNav, componentType: 'client' }],
  ['CarouselItem', { ...CarouselItem, componentType: 'client' }],
  ['Carousel', { ...Carousel, componentType: 'client' }],
  ['CardList', { ...CardList, componentType: 'client' }],
  ['CardItem', { ...CardItem, componentType: 'client' }],
  ['AccordionItem', { ...AccordionItem, componentType: 'client' }],
  ['Accordion', { ...Accordion, componentType: 'client' }],
  ['SidebarLayout', { ...SidebarLayout }],
  ['Section', { ...Section, componentType: 'client' }],
  ['SearchMain', { ...SearchMain }],
  ['JumpNavSection', { ...JumpNavSection, componentType: 'client' }],
  ['JumpNavContainer', { ...JumpNavContainer, componentType: 'client' }],
  ['Divider', { ...Divider, componentType: 'client' }],
  ['ContainerFullWidth', { ...ContainerFullWidth }],
  ['ContainerFullBleed', { ...ContainerFullBleed }],
  ['ContainerCenter-75', { ...ContainerCenter75 }],
  ['Container-75-25', { ...Container7525 }],
  ['Container-50-50', { ...Container5050 }],
  ['Container-25-75', { ...Container2575 }],
  ['ArticleMain', { ...ArticleMain, componentType: 'client' }],
  ['RTE', { ...RTE, componentType: 'client' }],
  ['Quote', { ...Quote, componentType: 'client' }],
  ['PageTitle', { ...PageTitle, componentType: 'client' }],
  ['Modal', { ...Modal, componentType: 'client' }],
  ['Metadata', { ...Metadata }],
  ['Hero', { ...Hero, componentType: 'client' }],
  ['FeatureSidebySide', { ...FeatureSidebySide, componentType: 'client' }],
  ['Feature', { ...Feature, componentType: 'client' }],
  ['CodeEmbed', { ...CodeEmbed }],
  ['Alert', { ...Alert, componentType: 'client' }],
]);

export default componentMap;
