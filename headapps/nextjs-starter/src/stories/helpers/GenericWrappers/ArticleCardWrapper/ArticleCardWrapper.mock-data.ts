// Local
import {
  ArticleCardWrapperProps,
  ArticleModel,
} from 'helpers/GenericWrappers/ArticleCardWrapper/ArticleCardWrapper';

/*
 * Mock ArticleCardWrapper Data
 */

const articleData: ArticleModel = {
  id: '18EDC3CBBC2E4C0387C4D5F7CBC02F22',
  article_category: 'Test1',
  article_tags: ['Community', 'USA'],
  article_url: '/Articles/Test1/Category-Test1-Article1',
  article_description: 'This is a description',
  article_image: undefined,
  article_title: 'Category Test1 Article1',
  article_publisheddate: '20250618T072400Z',
};

const defaultData: ArticleCardWrapperProps = {
  article: articleData,
  isHorizontalCardLayout: false,
  isOneColHorizontalLayout: false,
};

export default defaultData;
