import React, { act } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Default as Feature } from 'components/authorable/shared/content/Feature';
import defaultData from './Feature.mock-data';

// Mock router
jest.mock('next/router');

// Mock next/dynamic to avoid act() warnings from async loading
jest.mock('next/dynamic', () => ({
  __esModule: true,
  default: <P,>(_loader: () => Promise<{ default: React.ComponentType<P> }>) => {
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

describe('<Feature />', () => {
  it('should match snapshot', async () => {
    let container: HTMLElement | null = null;
    await act(async () => {
      const renderResult = render(<Feature {...defaultData} />);
      container = renderResult.container;
    });
    // Wait for async updates (e.g., dynamic imports)
    await waitFor(() => {
      expect(container).toBeInTheDocument();
    });
    expect(container).toMatchSnapshot();
  });

  it('should render feature with required sections', async () => {
    let container: HTMLElement = null as unknown as HTMLElement;
    await act(async () => {
      const renderResult = render(<Feature {...defaultData} />);
      container = renderResult.container;
    });

    // Wait for async updates (e.g., dynamic imports)
    await waitFor(() => {
      expect(container).toBeInTheDocument();
    });

    const featureComponent = container.querySelector(
      '[data-component="authorable/shared/content/feature"]'
    );
    expect(featureComponent).toBeInTheDocument();

    // Check image section
    const bgImage = screen.getByRole('img', { name: 'Feature' });
    expect(bgImage).toBeInTheDocument();
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
      const renderResult = render(<Feature {...customThemeData} />);
      container = renderResult.container;
    });

    // Wait for async updates (e.g., dynamic imports)
    await waitFor(() => {
      expect(container).toBeInTheDocument();
    });

    const elementWithDarkTheme = container.querySelector('.ThemesDark');
    expect(elementWithDarkTheme).toBeInTheDocument();
  });

  it('should render if there is no image', async () => {
    const customThemeData = {
      ...defaultData,
      fields: {
        ...defaultData.fields,
        background: {},
      },
    };

    let container: HTMLElement = null as unknown as HTMLElement;
    await act(async () => {
      const renderResult = render(<Feature {...customThemeData} />);
      container = renderResult.container;
    });

    // Wait for async updates (e.g., dynamic imports)
    await waitFor(() => {
      expect(container).toBeInTheDocument();
    });

    const bgImage = screen.queryByRole('img', { name: 'Feature' });
    expect(bgImage).toBeNull();
  });

  it('should render with full layout configuration', async () => {
    const customLayoutData = {
      ...defaultData,
      params: {
        ...defaultData.params,
        layout: 'Full', // Full container layout
      },
    };

    let container: HTMLElement = null as unknown as HTMLElement;
    await act(async () => {
      const renderResult = render(<Feature {...customLayoutData} />);
      container = renderResult.container;
    });

    // Wait for async updates (e.g., dynamic imports)
    await waitFor(() => {
      expect(container).toBeInTheDocument();
    });

    // Verify the component renders with the correct data-component attribute
    const featureComponent = container.querySelector(
      '[data-component="authorable/shared/content/feature"]'
    );
    expect(featureComponent).toBeInTheDocument();
  });
});
