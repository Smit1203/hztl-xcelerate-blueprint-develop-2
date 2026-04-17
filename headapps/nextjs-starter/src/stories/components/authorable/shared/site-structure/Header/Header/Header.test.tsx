import React, { act } from 'react';
import { render, screen } from '@testing-library/react';
import { Default as Header } from 'components/authorable/shared/site-structure/Header/Header';
import { defaultData } from './Header.mock-data';

jest.mock('lib/hooks/useDictionary');

jest.mock('next/router');

jest.mock('@sitecore-content-sdk/nextjs', () => ({
  ...jest.requireActual('@sitecore-content-sdk/nextjs'),
}));

jest.mock('lib/hooks/sitecore/context', () => ({
  useSitecoreContext: () => ({
    languages: [
      { isoCode: 'en', countryCode: 'US', nativeName: 'English' },
      { isoCode: 'es-MX', countryCode: 'MX', nativeName: 'Spanish (Mexico)' },
    ],
    siteSettings: { socialShareLinks: [] },
    svgCache: {},
    route: null,
  }),
  usePageMode: () => ({
    isNormal: true,
    isEditing: false,
    isPreview: false,
    isDesignLibrary: false,
    isVariantGeneration: false,
  }),
  useSvgCache: () => ({}),
  useSiteSettings: () => ({ socialShareLinks: [] }),
  useLanguages: () => [
    { isoCode: 'en', countryCode: 'US', nativeName: 'English' },
    { isoCode: 'es-MX', countryCode: 'MX', nativeName: 'Spanish (Mexico)' },
  ],
  useCurrentPage: () => null,
}));

jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

function MockSearchPreviewMock() {
  return <div>Preview Search</div>;
}
jest.mock('widgets/SearchPreview', () => MockSearchPreviewMock);

// Mock window.matchMedia for testing responsive behavior
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe('<Header />', () => {
  it('should match snapshot', async () => {
    let container: HTMLElement = null as unknown as HTMLElement;
    await act(async () => {
      const renderResult = render(<Header {...defaultData} />);
      container = renderResult.container;
    });
    expect(container).toMatchSnapshot();
  });

  it('should render header with all required sections', async () => {
    let container: HTMLElement = null as unknown as HTMLElement;
    await act(async () => {
      const renderResult = render(<Header {...defaultData} />);
      container = renderResult.container;
    });

    // Check main header component
    const headerComponent = container.querySelector(
      '[data-component="authorable/shared/site-structure/header/header"]'
    );
    expect(headerComponent).toBeInTheDocument();

    // Check logo section
    const logo = screen.getAllByRole('img', { name: 'Horizontal Digital' });
    logo.every((logo) => expect(logo.closest('a')).toBeInTheDocument());
    logo.every((logo) => expect(logo.closest('a')).toHaveAttribute('href', '/'));

    // Check navigation items
    const expectedNavItems = ['Services', 'Work', 'About Us'];
    expectedNavItems.forEach((item) => {
      const navLink = screen.getByRole('menuitem', { name: item });
      expect(navLink).toBeInTheDocument();
    });
  });

  it('should render desktop and mobile views correctly', async () => {
    let container: HTMLElement = null as unknown as HTMLElement;
    await act(async () => {
      const renderResult = render(<Header {...defaultData} />);
      container = renderResult.container;
    });

    // Check desktop view exists
    const desktopView = container.querySelector('.hidden.md\\:block');
    expect(desktopView).toBeInTheDocument();

    // Check mobile view exists
    const mobileView = container.querySelector('.block.md\\:hidden');
    expect(mobileView).toBeInTheDocument();
  });

  it('should render navigation links with correct attributes', async () => {
    await act(async () => {
      render(<Header {...defaultData} />);
    });

    // Check specific links from mock data
    const navLinks = [
      { text: 'Services', href: '/services' },
      // Because this is a menu item, it doesn't have a direct link
      //   { text: 'Work', href: '/Work' },
      { text: 'About Us', href: '/about-us' },
    ];

    navLinks.forEach(({ text, href }) => {
      const link = screen.getByRole('menuitem', { name: text });
      expect(link).toBeInTheDocument();

      expect(link).toHaveAttribute('href', href);
      expect(link).toHaveAttribute('data-component', 'helpers/sitecorewrappers/linkwrapper');
    });
  });

  it('should render mega menu items when available', async () => {
    await act(async () => {
      render(<Header {...defaultData} />);
    });

    // Initially, mega menu items should not be visible
    const workMegaMenuLinks = ['Link1', 'Link2', 'Link3'];
    workMegaMenuLinks.forEach((linkText) => {
      expect(screen.queryByRole('link', { name: linkText })).not.toBeInTheDocument();
    });

    // Click the Work section to open mega menu
    const workLink = screen.getByRole('menuitem', { name: 'Work' });
    await act(async () => {
      workLink.click();
      await new Promise((resolve) => setTimeout(resolve, 1));
    });

    // After clicking, mega menu items should be visible
    workMegaMenuLinks.forEach((linkText) => {
      const link = screen.getByRole('link', { name: linkText });
      expect(link).toBeInTheDocument();
    });

    // Check mega menu categories
    const categories = ['Work', 'Category 2'];
    categories.forEach((category) => {
      const categoryElement = screen.getByRole('group', { name: category });
      expect(categoryElement).toBeInTheDocument();
    });
  });

  it('should render nothing when fields are not provided', async () => {
    const propsWithoutFields = {
      ...defaultData,
      fields: undefined,
    };
    let container: HTMLElement = null as unknown as HTMLElement;
    await act(async () => {
      const renderResult = render(<Header {...propsWithoutFields} />);
      container = renderResult.container;
    });
    expect(container).toBeEmptyDOMElement();
  });
});
