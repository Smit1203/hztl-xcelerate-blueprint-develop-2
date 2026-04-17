import React, { act } from 'react';
import { render, waitFor } from '@testing-library/react';
import { SvgImageWrapper } from 'helpers/SitecoreWrappers/SvgImageWrapper/SvgImageWrapper';
import defaultData from './SvgImageWrapper.mock-data';
import { mockSitecoreContext } from 'lib/testing/mocks';

jest.mock('@sitecore-content-sdk/nextjs', () => ({
  ...jest.requireActual('@sitecore-content-sdk/nextjs'),
}));

jest.mock('lib/hooks/sitecore/context', () => ({
  useSitecoreContext: () => mockSitecoreContext,
  useSvgCache: () => mockSitecoreContext.svgCache || {},
  useSiteSettings: () => mockSitecoreContext.siteSettings,
  useLanguages: () => mockSitecoreContext.languages || [],
  useCurrentPage: () => mockSitecoreContext.route,
  usePageMode: () => ({
    isNormal: true,
    isEditing: false,
    isPreview: false,
    isDesignLibrary: false,
    isVariantGeneration: false,
  }),
}));

// Mock SVG content
const mockSvgContent = '<svg class="test-class"><path d="M0 0h24v24H0z"/></svg>';

// Create a proper mock Response object
const createMockResponse = (svgContent: string) => {
  const mockHeaders = {
    get: (name: string) => {
      if (name === 'content-type') {
        return 'image/svg+xml';
      }
      return null;
    },
  };

  return {
    ok: true,
    status: 200,
    statusText: 'OK',
    headers: mockHeaders,
    text: () => Promise.resolve(svgContent),
    json: () => Promise.resolve({}),
  } as Response;
};

// Setup fetch mock at module level - this ensures it's available before any tests run
const mockFetch = jest.fn((_url: string) => {
  return Promise.resolve(createMockResponse(mockSvgContent));
});

// Set up fetch mock immediately at module load time
global.fetch = mockFetch as unknown as typeof fetch;

beforeEach(() => {
  // Reset mock call history but keep implementation
  mockFetch.mockClear();
  // Reset implementation to default success response
  mockFetch.mockImplementation((_url: string) => {
    return Promise.resolve(createMockResponse(mockSvgContent));
  });
  // Ensure fetch is always the mock (in case something reset it)
  global.fetch = mockFetch as unknown as typeof fetch;
});

afterEach(() => {
  // Clean up after each test - clear call history but keep mock
  mockFetch.mockClear();
});

// Snapshot test for default svg renders correctly and matches snapshots
it('renders default svg renders correctly and matches snapshots', async () => {
  let component: ReturnType<typeof render>;

  await act(async () => {
    component = render(<SvgImageWrapper {...defaultData} />);
  });

  // Wait for async SVG loading to complete
  await waitFor(
    () => {
      expect(component!.container.querySelector('svg')).toBeInTheDocument();
    },
    { timeout: 3000 }
  );

  expect(component!.asFragment()).toMatchSnapshot();
});

// Test for successful SVG loading
it('renders SVG correctly when src is valid', async () => {
  let component: ReturnType<typeof render>;

  await act(async () => {
    component = render(<SvgImageWrapper {...defaultData} />);
  });

  // Wait for async SVG loading to complete
  await waitFor(
    () => {
      expect(component!.container.querySelector('svg')).toBeInTheDocument();
      expect(component!.container.querySelector('path')).toHaveClass(defaultData.className);
    },
    { timeout: 3000 }
  );
});

// Test for fallback icon when there is an error loading SVG
it('renders fallback icon when there is an error loading SVG', async () => {
  // Suppress console.error for this test
  const originalConsoleError = console.error;
  console.error = jest.fn();

  // Mock fetch to simulate an error for this test
  mockFetch.mockRejectedValueOnce(new Error('Failed to load SVG'));

  const errorData = {
    ...defaultData,
    src: 'invalid-svg-path.svg',
  };

  let component: ReturnType<typeof render>;

  await act(async () => {
    component = render(<SvgImageWrapper {...errorData} />);
  });

  // Wait for the error state to be set and fallback to be rendered
  await waitFor(
    () => {
      expect(component!.container.querySelector('svg')).not.toBeInTheDocument();
      expect(component!.getByText('fallback node')).toBeInTheDocument();
    },
    { timeout: 3000 }
  );

  // Restore console.error
  console.error = originalConsoleError;
});
