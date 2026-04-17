import React, { act } from 'react';
import { render } from '@testing-library/react';
import { Default as Section } from 'components/authorable/shared/layout/Section';
import defaultData from './Section.mock-data';
import { MockProviders } from 'helpers/Mocks/MockProviders';

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

describe('<section />', () => {
  it('should match snapshot', () => {
    const { container } = render(
      <MockProviders>
        <Section {...defaultData} />
      </MockProviders>
    );
    expect(container).toMatchSnapshot();
  });

  it('should render section with required sections', async () => {
    let container: HTMLElement = null as unknown as HTMLElement;
    await act(async () => {
      const renderResult = render(
        <MockProviders>
          <Section {...defaultData} />
        </MockProviders>
      );
      container = renderResult.container;
    });

    const sectionComponent = container.querySelector(
      '[data-component="authorable/shared/layout/section"]'
    );
    expect(sectionComponent).toBeInTheDocument();
  });

  it('should apply theme correctly', async () => {
    const customThemeData = {
      ...defaultData,
      params: {
        ...defaultData.params,
        selectTheme: 'ThemesDark', // Using Dark theme as an example
      },
    };

    let container: HTMLElement = null as unknown as HTMLElement;
    await act(async () => {
      const renderResult = render(
        <MockProviders>
          <Section {...customThemeData} />
        </MockProviders>
      );
      container = renderResult.container;
    });

    const elementWithDarkTheme = container.querySelector('.ThemesDark');
    expect(elementWithDarkTheme).toBeInTheDocument();
  });
});
