import React, { act } from 'react';
import { render } from '@testing-library/react';
import { Default as Quote } from 'components/authorable/shared/content/Quote';
import defaultData from './Quote.mock-data';

// Mock router
jest.mock('next/router');

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

describe('<Quote />', () => {
  it('should match snapshot', () => {
    const { container } = render(<Quote {...defaultData} />);
    expect(container).toMatchSnapshot();
  });

  it('should render quote with required sections', async () => {
    let container: HTMLElement = null as unknown as HTMLElement;
    await act(async () => {
      const renderResult = render(<Quote {...defaultData} />);
      container = renderResult.container;
    });

    const quoteComponent = container.querySelector(
      '[data-component="authorable/shared/content/Quote"]'
    );
    expect(quoteComponent).toBeInTheDocument();
  });

  it('should apply theme correctly', async () => {
    const customThemeData = {
      ...defaultData,
      params: {
        ...defaultData.params,
        selectTheme: 'ThemesBrandPrimary', // Using ThemesBrandPrimary theme as an example
      },
    };

    let container: HTMLElement = null as unknown as HTMLElement;
    await act(async () => {
      const renderResult = render(<Quote {...customThemeData} />);
      container = renderResult.container;
    });

    const elementWithDarkTheme = container.querySelector('.ThemesBrandPrimary');
    expect(elementWithDarkTheme).toBeInTheDocument();
  });
});
