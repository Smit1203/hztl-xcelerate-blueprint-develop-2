import React from 'react';
import { render } from '@testing-library/react';
import { Default as JumpNavSection } from 'components/authorable/shared/layout/JumpNavSection';
import defaultData from './JumpNavSection.mock-data';
import { MockProviders } from 'helpers/Mocks/MockProviders';

// Mock IntersectionObserver
const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
});
window.IntersectionObserver = mockIntersectionObserver;
window.DOMRect = class MockDOMRect {
  top = 0;
  left = 0;
  bottom = 0;
  right = 0;
  width = 0;
  height = 0;
  x = 0;
  y = 0;
  toJSON = () => '{}';

  constructor(x = 0, y = 0, width = 0, height = 0) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.top = y;
    this.left = x;
    this.bottom = y + height;
    this.right = x + width;
  }

  static fromRect() {
    return new MockDOMRect();
  }
};
// Mock the useDictionary hook
jest.mock('lib/hooks/useDictionary', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue({
    getDictionaryValue: (key: string) => key,
  }),
}));

// Mock router
jest.mock('next/router');

// Mock widgets/components that have ESM dependencies or static asset imports
// These are imported via MockProviders' component map but aren't needed for these tests
jest.mock('widgets/SearchPreview', () => ({
  __esModule: true,
  default: function MockSearchPreview() {
    return <div data-testid="mock-search-preview" />;
  },
}));

jest.mock('widgets/RelatedArticles', () => ({
  __esModule: true,
  RelatedArticlesComponent: function MockRelatedArticles() {
    return <div data-testid="mock-related-articles" />;
  },
}));

jest.mock('components/authorable/shared/page-specific/PopularArticles', () => ({
  __esModule: true,
  Default: function MockPopularArticles() {
    return <div data-testid="mock-popular-articles" />;
  },
}));

// Mock Carousel to avoid Splide CSS import issues
jest.mock('components/authorable/shared/lists/Carousel', () => ({
  __esModule: true,
  Default: function MockCarousel() {
    return <div data-testid="mock-carousel" />;
  },
}));

// Mock Modal to avoid react-modal initialization error
jest.mock('components/authorable/shared/content/Modal', () => ({
  __esModule: true,
  Default: function MockModal() {
    return <div data-testid="mock-modal" />;
  },
}));

// Mock withDatasourceCheck to bypass the HOC and return the component directly
// This avoids the need to mock the entire Sitecore context
jest.mock('@sitecore-content-sdk/nextjs', () => {
  const actual = jest.requireActual('@sitecore-content-sdk/nextjs');
  return {
    ...actual,
    withDatasourceCheck:
      () =>
      <P,>(Component: React.ComponentType<P>) =>
        Component,
  };
});

jest.mock('@sitecore-content-sdk/react', () => {
  const actual = jest.requireActual('@sitecore-content-sdk/react');
  return {
    ...actual,
    withDatasourceCheck:
      () =>
      <P,>(Component: React.ComponentType<P>) =>
        Component,
  };
});

describe('<jumpnavsection />', () => {
  it('should match snapshot', () => {
    const { container } = render(
      <MockProviders>
        <JumpNavSection {...defaultData} />
      </MockProviders>
    );
    expect(container).toMatchSnapshot();
  });
});
