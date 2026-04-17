import React, { act } from 'react';
import { render } from '@testing-library/react';
import { Default as PageTitle } from 'components/authorable/shared/content/PageTitle';
import defaultData from './PageTitle.mock-data';

// Mock router
jest.mock('next/router');

// Mock next/dynamic to avoid act() warnings from async loading
// This makes dynamic imports synchronous for testing
jest.mock('next/dynamic', () => ({
  __esModule: true,
  default: <P,>(_loader: () => Promise<{ default: React.ComponentType<P> }>) => {
    // For tests, we'll resolve the loader synchronously if it's a function
    // Otherwise return a simple component wrapper
    const MockComponent = React.forwardRef<P, P>((props, ref) => {
      return React.createElement('div', { ...props, ref, 'data-testid': 'dynamic-component' });
    });
    MockComponent.displayName = 'LoadableComponent';
    return MockComponent;
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

describe('<PageTitle />', () => {
  it('should match snapshot', () => {
    const { container } = render(<PageTitle {...defaultData} />);
    expect(container).toMatchSnapshot();
  });

  it('should render page title with required sections', async () => {
    let container: HTMLElement = null as unknown as HTMLElement;
    await act(async () => {
      const renderResult = render(<PageTitle {...defaultData} />);
      container = renderResult.container;
    });

    const pageTitleComponent = container.querySelector(
      '[data-component="authorable/shared/content/pageTitle"]'
    );
    expect(pageTitleComponent).toBeInTheDocument();
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
      const renderResult = render(<PageTitle {...customThemeData} />);
      container = renderResult.container;
    });

    const elementWithDarkTheme = container.querySelector('.ThemesDark');
    expect(elementWithDarkTheme).toBeInTheDocument();
  });
});
