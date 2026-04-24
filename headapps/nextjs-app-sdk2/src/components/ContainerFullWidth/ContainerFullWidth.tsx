import React, { JSX } from 'react';
import { tv } from 'tailwind-variants';

import { PlaceholderWrapper } from 'helpers/SitecoreWrappers/PlaceholderWrapper/PlaceholderWrapper';
import { ComponentProps } from 'lib/component-props';
import { getTestProps } from 'lib/testing/utils';

export const Default = (props: ComponentProps): JSX.Element => {
  const phKeyLarge = `custom-container-large-${props?.params?.DynamicPlaceholderId || 'container-full-width'}`;

  const { base, container } = TAILWIND_VARIANTS();

  return (
    <div
      className={base()}
      {...getTestProps(`component-container-full-width-${props?.rendering?.uid}`)}
    >
      <div className={container()}>
        <PlaceholderWrapper name={phKeyLarge} rendering={props?.rendering} />
      </div>
    </div>
  );
};

export default Default;

const TAILWIND_VARIANTS = tv({
  slots: {
    base: ['w-full', 'flex', 'flex-col', 'md:flex-row'],
    container: [
      'w-full',
      'grid',
      'grid-cols-1',
      'gap-layout-base-margin-y',
      'py-layout-base-margin-y',
      'md:gap-component-section-container-padding-y',
      'md:py-component-section-container-padding-y',
    ],
  },
});
