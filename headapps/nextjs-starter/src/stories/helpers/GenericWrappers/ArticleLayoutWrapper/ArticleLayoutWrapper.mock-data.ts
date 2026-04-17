// Local
import { ArticleModel } from 'helpers/GenericWrappers/ArticleCardWrapper/ArticleCardWrapper';
import { ArticleLayoutWrapperProps } from 'helpers/GenericWrappers/ArticleLayoutWrapper/ArticleLayoutWrapper';

/*
 * Mock ArticleLayoutWrapper Data
 */

const articlesListData: ArticleModel[] = [
  {
    id: '18EDC3CBBC2E4C0387C4D5F7CBC02F22',
    article_category: 'Test1',
    article_tags: ['Community'],
    article_url: '/Articles/Test1/Category-Test1-Article1',
    article_description: 'This is a description 1',
    article_image: './assets/desktop-image-default.jpeg',
    article_title: 'Category Test1 Article1',
    article_publisheddate: '20250618T072400Z',
  },
  {
    id: '18EDC3CBBC2E4C0387C4D5F7CBC02F21',
    article_category: 'Test2',
    article_tags: ['Community', 'USA'],
    article_url: '/Articles/Test1/Category-Test1-Article1',
    article_description: 'This is a description 2',
    article_image: undefined,
    article_title: 'Category Test1 Article1',
    article_publisheddate: '2025-02-16T00:00:00Z',
  },
  {
    id: '18EDC3CBBC2E4C0387C4D5F7CBC02F23',
    article_category: 'Test3',
    article_tags: ['Community', 'Retirement'],
    article_url: '/Articles/Test1/Category-Test1-Article1',
    article_description: 'This is a description 3',
    article_image: './assets/promo-component-image.jpg',
    article_title: 'Category Test1 Article1',
    article_publisheddate: '2025-02-17T00:00:00Z',
  },
];

const defaultData: ArticleLayoutWrapperProps = {
  articles: articlesListData,
};

export default defaultData;
