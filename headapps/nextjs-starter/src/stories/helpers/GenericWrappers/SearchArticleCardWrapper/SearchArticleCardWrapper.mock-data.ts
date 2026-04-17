// Local
import {
  SearchArticleCardItemCardProps,
  ArticleModel,
} from 'helpers/GenericWrappers/SearchArticleCardWrapper/SearchArticleCardWrapper';

/*
 * Mock SearchArticleCardWrapper Data
 */

const articleData: ArticleModel = {
  id: '18EDC3CBBC2E4C0387C4D5F7CBC02F22',
  article_category: 'Test1',
  url: '/Articles/Test1/Category-Test1-Article1',
  description: 'This is a description',
  image: './assets/feature-promo-image.png',
  name: 'Category Test1 Article1',
  article_publisheddate: '20250618T072400Z',
};

const noImageData: ArticleModel = {
  id: '18EDC3CBBC2E4C0387C4D5F7CBC02F22',
  article_category: 'Test1',
  url: '/Articles/Test1/Category-Test1-Article1',
  description: 'This is a description',
  image: undefined,
  name: 'Category Test1 Article1',
  article_publisheddate: '20250618T072400Z',
};

const defaultData: SearchArticleCardItemCardProps = {
  article: articleData,
};

export const noImageSearchResultCard: SearchArticleCardItemCardProps = {
  article: noImageData,
};

export default defaultData;
