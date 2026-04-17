const defaultData = {
  className: '',
  ctaComponentClass: 'default',
  ctaIconAlignment: 'right',
  id: 'buttonId',
  disabled: false,
  onClick: undefined,
  ctaVariant: 'primary',
  text: 'Button Text',
  title: 'Button Title',
  type: 'button',
};

export const disabledData = {
  ...defaultData,
  disabled: true,
};

export const styleLinkData = {
  ...defaultData,
  ctaVariant: 'link',
};

export const styleSecondaryData = {
  ...defaultData,
  ctaVariant: 'secondary',
};

export const styleTertiaryData = {
  ...defaultData,
  ctaVariant: 'tertiary',
};

export default defaultData;
