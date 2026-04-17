import React from 'react';
import { render } from '@testing-library/react';
import InlineIFrame from 'components/authorable/shared/media/InlineIFrame';
import defaultData, { noEmbedUrl, customDimensions } from './InlineIFrame.mock-data';

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

describe('InlineIFrame Component', () => {
  it('matches snapshot for default data', () => {
    const { asFragment } = render(<InlineIFrame {...defaultData} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('matches snapshot for no embed URL', () => {
    const { asFragment } = render(<InlineIFrame {...noEmbedUrl} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('matches snapshot for custom dimensions', () => {
    const { asFragment } = render(<InlineIFrame {...customDimensions} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('ignores height when aspect ratio is specified', () => {
    const { container } = render(<InlineIFrame {...customDimensions} />);
    const iframeElement = container.querySelector('iframe');

    expect(iframeElement).not.toHaveAttribute('height', '600px');

    // Using the style attribute to check the aspect ratio instead of .toHaveStyle
    // because aspectRatio is not supported in Jest's version of jsdom.
    expect(iframeElement?.style.aspectRatio).toBe('4/3');
  });
});
