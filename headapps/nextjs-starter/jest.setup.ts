import structuredClone from '@ungap/structured-clone'; // can be written as import { structuredClone } from '@ungap/structured-clone';  if esModuleInterop flag is used
import '@testing-library/jest-dom';

function structuredCloneWrapper<T>(value: T): T {
  return structuredClone(value);
}

if (typeof global.structuredClone !== 'function') {
  global.structuredClone = structuredCloneWrapper;
}

// Polyfill Request/Response for Node.js environment (needed for Next.js server code)
if (typeof global.Request === 'undefined') {
  // @ts-expect-error - Adding Request polyfill for Jest
  global.Request = class Request {
    constructor(
      public input: string | Request,
      public init?: RequestInit
    ) {}
  };
}

if (typeof global.Response === 'undefined') {
  // @ts-expect-error - Adding Response polyfill for Jest
  global.Response = class Response {
    constructor(
      public body?: BodyInit | null,
      public init?: ResponseInit
    ) {}
    static json(data: unknown) {
      return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
      });
    }
  };
}

// Add global fetch mock for Jest environment
// Individual tests can override this if needed
// Default implementation returns a successful response with empty SVG
// This prevents "fetch is not defined" errors while allowing tests to override
const createMockResponse = (content: string, contentType = 'image/svg+xml') => {
  const mockHeaders = {
    get: (name: string) => {
      if (name === 'content-type') {
        return contentType;
      }
      return null;
    },
  };

  return {
    ok: true,
    status: 200,
    statusText: 'OK',
    headers: mockHeaders,
    text: () => Promise.resolve(content),
    json: () => Promise.resolve({}),
  } as Response;
};

const defaultFetchMock = jest.fn((_url: string | Request, _init?: RequestInit) => {
  // Default implementation returns a successful response with empty SVG
  // Individual tests should override this with their own mock for specific behavior
  return Promise.resolve(createMockResponse('<svg></svg>'));
}) as typeof fetch;

// Set on both global and window (for jsdom environment)
global.fetch = defaultFetchMock;
if (typeof window !== 'undefined') {
  window.fetch = defaultFetchMock;
}

// Mock useRealPathName to avoid importing Next.js server code
jest.mock('lib/hooks/useRealPathName', () => ({
  useRealPathName: () => '/',
}));

// Mock Sitecore hooks globally for all tests
jest.mock('lib/hooks/sitecore/context', () => {
  const actual = jest.requireActual('lib/hooks/sitecore/__mocks__/context');
  return actual;
});

// Mock useSitecore hook from @sitecore-content-sdk/react (used by withDatasourceCheck)
jest.mock('@sitecore-content-sdk/react', () => {
  const actual = jest.requireActual('@sitecore-content-sdk/react');
  // Get LayoutServicePageState from core to avoid circular dependency
  const { LayoutServicePageState } = jest.requireActual('@sitecore-content-sdk/core/layout');
  return {
    ...actual,
    useSitecore: () => ({
      api: {},
      page: {
        layout: {
          sitecore: {
            context: {
              pageEditing: false,
              siteSettings: {
                socialShareLinks: [],
              },
              languages: [],
              svgCache: {},
            },
            route: null,
          },
        },
        locale: 'en',
        mode: {
          name: LayoutServicePageState.Normal,
          designLibrary: { isVariantGeneration: false },
          isNormal: true,
          isPreview: false,
          isEditing: false,
          isDesignLibrary: false,
        },
      },
    }),
  };
});

// Mock useSitecore hook from @sitecore-content-sdk/nextjs to provide page.mode
jest.mock('@sitecore-content-sdk/nextjs', () => {
  const actual = jest.requireActual('@sitecore-content-sdk/nextjs');
  const { LayoutServicePageState } = actual;
  return {
    ...actual,
    useSitecore: () => ({
      api: {},
      page: {
        layout: {
          sitecore: {
            context: {
              pageEditing: false,
              siteSettings: {
                socialShareLinks: [],
              },
              languages: [],
              svgCache: {},
            },
            route: null,
          },
        },
        locale: 'en',
        mode: {
          name: LayoutServicePageState.Normal,
          designLibrary: { isVariantGeneration: false },
          isNormal: true,
          isPreview: false,
          isEditing: false,
          isDesignLibrary: false,
        },
      },
    }),
  };
});
