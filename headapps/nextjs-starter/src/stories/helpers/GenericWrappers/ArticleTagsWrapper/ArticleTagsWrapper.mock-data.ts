// Local

import { ArticleTagWrapperProps } from 'helpers/GenericWrappers/ArticleTagsWrapper/ArticleTagsWrapper';

/*
 * Mock ArticleTagsWrapper Data
 */
const defaultData: ArticleTagWrapperProps = {
  tags: ['community', 'USA', 'Retirement', 'Loan', 'Banking'],
};

export const withShowMoreOption: ArticleTagWrapperProps = {
  tags: ['community', 'USA', 'Retirement', 'Loan', 'Banking', 'News'],
  maxTagsBreakPointNumber: 3,
};

export default defaultData;
