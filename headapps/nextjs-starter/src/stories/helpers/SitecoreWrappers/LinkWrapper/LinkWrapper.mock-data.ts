import { LinkWrapperProps } from 'helpers/SitecoreWrappers/LinkWrapper/LinkWrapper';

const defaultData = {
  className: '',
  editable: false,
  field: {
    value: {
      anchor: undefined,
      href: 'https://www.example.com',
      linktype: undefined,
      querystring: undefined,
      target: '_self',
      text: 'Link with screen reader text that opens in the current tab',
      title: undefined,
    },
  },
  showLinkTextWithChildrenPresent: true,
  srOnlyText: 'Only screen readers can access this text',
  suppressNewTabIcon: true,
};

export const anchorLink = {
  ...defaultData,
  field: {
    value: {
      ...defaultData.field.value,
      anchor: '#modal-sample',
      href: undefined,
      text: 'An anchor link that opens a modal.',
    },
  },
};

export const emailLink = {
  ...defaultData,
  field: {
    value: {
      href: 'mailto:example@example.com',
      text: 'example@example.com',
    },
  },
  suppressNewTabIcon: true,
};

export const externalLink = {
  ...defaultData,
  field: {
    value: {
      ...defaultData.field.value,
      linktype: 'external',
      target: '_blank',
      text: 'Link with screen reader text that opens in a new tab',
    },
  },
  suppressNewTabIcon: false,
};

export const linkWithChildren = {
  ...defaultData,
  children: 'Image',
  showLinkTextWithChildrenPresent: false,
};

export const noContent = {
  field: {
    value: {},
  },
  suppressLinkText: false,
};

export const ctaLink: LinkWrapperProps = {
  ...defaultData,
  ctaComponentClass: 'default',
  ctaStyle: {
    ctaIcon: 'arrow-right',
    ctaVariant: 'primary',
    ctaIconAlignment: 'left',
  },
  field: {
    value: {
      ...defaultData.field.value,
      href: 'https://www.example.com/cta',
      text: 'CTA Link',
    },
  },
};

export const customTargetLink = {
  ...defaultData,
  field: {
    value: {
      ...defaultData.field.value,
      target: '|Custom',
      text: 'Link with custom target that should not have target attribute',
    },
  },
  suppressNewTabIcon: true,
};

export const linkWithTitle = {
  ...anchorLink,
  shouldRenderTitleAttribute: true,
};

export default defaultData;
