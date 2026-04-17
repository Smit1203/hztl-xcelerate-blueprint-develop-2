import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import LinkWrapper from 'helpers/SitecoreWrappers/LinkWrapper/LinkWrapper';
import defaultData, {
  anchorLink,
  emailLink,
  externalLink,
  linkWithChildren,
  noContent,
  ctaLink,
  customTargetLink,
  linkWithTitle,
} from './LinkWrapper.mock-data';

// Snapshot test for default link
it('renders default link correctly', () => {
  const { asFragment } = render(<LinkWrapper ctaComponentClass="default" {...defaultData} />);
  expect(asFragment()).toMatchSnapshot();
  expect(
    screen.getByText('Link with screen reader text that opens in the current tab')
  ).toBeInTheDocument();
  expect(screen.getByRole('link')).toHaveAttribute('href', 'https://www.example.com/');
  // Check that new tab icon is not rendered
  const iconElement = document.querySelector('svg[data-icon="new-tab"]');
  expect(iconElement).not.toBeInTheDocument();
});

// Snapshot test for anchor link
it('renders anchor link correctly', async () => {
  const { asFragment } = render(<LinkWrapper ctaComponentClass="default" {...anchorLink} />);
  await waitFor(() => {
    expect(asFragment()).toMatchSnapshot();
  });
  expect(
    screen.getByText((content) => content.includes('An anchor link that opens a modal.'))
  ).toBeInTheDocument();
  expect(screen.getByRole('link')).toHaveAttribute('href', '#modal-sample');
  // Check that new tab icon is not rendered
  const iconElement = document.querySelector('svg[data-icon="new-tab"]');
  expect(iconElement).not.toBeInTheDocument();
});

// Snapshot test for email link
it('renders email link correctly', async () => {
  const { asFragment } = render(<LinkWrapper ctaComponentClass="default" {...emailLink} />);
  await waitFor(() => {
    expect(asFragment()).toMatchSnapshot();
  });
  expect(screen.getByText('example@example.com')).toBeInTheDocument();
  expect(screen.getByRole('link', { hidden: true })).toHaveAttribute(
    'href',
    'mailto:example@example.com'
  );
  const iconElement = document.querySelector('svg[data-icon="new-tab"]');
  expect(iconElement).not.toBeInTheDocument();
});

// Snapshot test for external link
it('renders external link correctly', async () => {
  const { asFragment } = render(<LinkWrapper ctaComponentClass="default" {...externalLink} />);
  await waitFor(() => {
    expect(asFragment()).toMatchSnapshot();
  });
  expect(
    screen.getByText('Link with screen reader text that opens in a new tab')
  ).toBeInTheDocument();
  expect(screen.getByRole('link')).toHaveAttribute('href', 'https://www.example.com/');
  expect(screen.getByRole('link')).toHaveAttribute('target', '_blank');
  // Check for screen reader text
  expect(
    screen.getByText((content) => content.includes('(Opens in a new tab)'))
  ).toBeInTheDocument();
  const iconElement = document.querySelector('svg[data-icon]');
  expect(iconElement).toHaveAttribute('data-icon', 'new-tab');
});

// Snapshot test for link with children
it('renders link with children correctly', async () => {
  const { asFragment } = render(<LinkWrapper ctaComponentClass="default" {...linkWithChildren} />);
  await waitFor(() => {
    expect(asFragment()).toMatchSnapshot();
  });
  expect(screen.getByText('Image')).toBeInTheDocument();
  const iconElement = document.querySelector('svg[data-icon="new-tab"]');
  expect(iconElement).not.toBeInTheDocument();
});

// Snapshot test for no content
it('renders no content correctly', async () => {
  const { asFragment } = render(<LinkWrapper ctaComponentClass="default" {...noContent} />);
  await waitFor(() => {
    expect(asFragment()).toMatchSnapshot();
  });
  expect(screen.queryByRole('link')).not.toBeInTheDocument();
});

test('renders CTA link correctly', async () => {
  const { asFragment } = render(<LinkWrapper {...ctaLink} />);
  await waitFor(() => {
    expect(asFragment()).toMatchSnapshot();
  });
  expect(screen.getByText((content) => content.includes('CTA Link'))).toBeInTheDocument();

  const iconElement = document.querySelector('svg[data-icon]');
  expect(iconElement).toHaveAttribute('data-icon', ctaLink.ctaStyle?.ctaIcon);
});

// Test for custom target link
test('renders custom target link correctly', async () => {
  const { asFragment } = render(<LinkWrapper ctaComponentClass="default" {...customTargetLink} />);
  await waitFor(() => {
    expect(asFragment()).toMatchSnapshot();
  });
  expect(
    screen.getByText('Link with custom target that should not have target attribute')
  ).toBeInTheDocument();
  expect(screen.getByRole('link')).toHaveAttribute('href', 'https://www.example.com/');
  // Check that target attribute is not present for custom target
  expect(screen.getByRole('link')).not.toHaveAttribute('target');
  // Check that new tab icon is not rendered
  const iconElement = document.querySelector('svg[data-icon="new-tab"]');
  expect(iconElement).not.toBeInTheDocument();
});

// Test for link with title attribute
test('renders link with title correctly', async () => {
  const { asFragment } = render(<LinkWrapper ctaComponentClass="default" {...linkWithTitle} />);
  await waitFor(() => {
    expect(asFragment()).toMatchSnapshot();
  });
  expect(screen.getByRole('link')).toHaveAttribute('title', 'An anchor link that opens a modal.');
});
