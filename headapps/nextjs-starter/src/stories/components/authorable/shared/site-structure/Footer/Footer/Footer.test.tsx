import React, { act } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Default as Footer } from 'components/authorable/shared/site-structure/Footer/Footer';
import { defaultData } from './Footer.mock-data';
import { mockSitecoreContext } from 'lib/testing/mocks';
// Mock router
jest.mock('next/router');

// Mock dynamic import for SvgIcon
jest.mock('next/dynamic', () => ({
  __esModule: true,
  default: () => {
    return function MockSvgIcon() {
      return <svg data-testid="mock-svg-icon" />;
    };
  },
}));

jest.mock('@sitecore-content-sdk/nextjs', () => ({
  ...jest.requireActual('@sitecore-content-sdk/nextjs'),
}));

jest.mock('lib/hooks/sitecore/context', () => ({
  useSitecoreContext: () => mockSitecoreContext,
  usePageMode: () => ({
    isNormal: true,
    isEditing: false,
    isPreview: false,
    isDesignLibrary: false,
    isVariantGeneration: false,
  }),
  useSvgCache: () => mockSitecoreContext.svgCache || {},
  useSiteSettings: () => mockSitecoreContext.siteSettings,
  useLanguages: () => mockSitecoreContext.languages || [],
  useCurrentPage: () => mockSitecoreContext.route,
}));

describe('<Footer />', () => {
  it('should match snapshot', async () => {
    let container: HTMLElement | null = null;
    await act(async () => {
      const renderResult = render(<Footer {...defaultData} />);
      container = renderResult.container;
    });
    // Wait for async updates (e.g., SvgImageWrapper)
    await waitFor(() => {
      expect(container).toBeInTheDocument();
    });
    expect(container).toMatchSnapshot();
  });

  it('should render footer with all required sections', async () => {
    let container: HTMLElement = null as unknown as HTMLElement;
    await act(async () => {
      const renderResult = render(<Footer {...defaultData} />);
      container = renderResult.container;
    });

    // Wait for async updates (e.g., SvgImageWrapper)
    await waitFor(() => {
      expect(container).toBeInTheDocument();
    });

    // Check main footer component
    const footerComponent = container.querySelector(
      '[data-component="authorable/shared/site-structure/footer/footer"]'
    );
    expect(footerComponent).toBeInTheDocument();

    // Check logo section
    const logo = screen.getByRole('img', { name: 'Horizontal Digital' });
    expect(logo).toBeInTheDocument();
    expect(logo.closest('a')).toHaveAttribute('href', '/');

    // Check navigation columns
    const columnTitles = ['Resources', 'Company', 'Legal', 'Social'];
    columnTitles.forEach((title) => {
      const heading = screen.getByRole('heading', { name: title, level: 3 });
      expect(heading).toBeInTheDocument();
    });
  });

  it('should render all footer links correctly', async () => {
    await act(async () => {
      render(<Footer {...defaultData} />);
    });

    // Wait for async updates (e.g., SvgImageWrapper)
    await waitFor(() => {
      expect(screen.getByRole('link', { name: 'Financial Calculators' })).toBeInTheDocument();
    });

    // Check specific links from mock data
    const expectedLinks = [
      'Financial Calculators',
      'Insights & Articles',
      'Our Story',
      'Join Our Team',
      'Privacy Policy',
      'Terms of Service',
      'LinkedIn',
      'Twitter',
    ];

    expectedLinks.forEach((linkText) => {
      const link = screen.getByRole('link', { name: linkText });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('data-component', 'helpers/sitecorewrappers/linkwrapper');
    });
  });

  it('should render nothing when fields are not provided', async () => {
    const propsWithoutFields = {
      ...defaultData,
      fields: undefined,
    };
    let container: HTMLElement | null = null;
    await act(async () => {
      const renderResult = render(<Footer {...propsWithoutFields} />);
      container = renderResult.container;
    });
    // Wait for any async updates
    await waitFor(() => {
      expect(container).toBeInTheDocument();
    });
    expect(container).toBeEmptyDOMElement();
  });
});
