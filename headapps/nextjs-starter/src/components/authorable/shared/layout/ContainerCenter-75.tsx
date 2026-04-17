// Global
import { tv } from 'tailwind-variants';
import { JSX } from 'react';
// Local
import { PlaceholderWrapper } from 'helpers/SitecoreWrappers/PlaceholderWrapper/PlaceholderWrapper';
import { ComponentProps } from 'lib/component-props';
import { getTestProps } from 'lib/testing/utils';

export const Default = (props: ComponentProps): JSX.Element => {
  const phKeyMedium = `custom-container-medium-${props?.params?.DynamicPlaceholderId || 'container-center-75'}`;

  const { container, content } = TAILWIND_VARIANTS();

  return (
    <div
      className={container()}
      {...getTestProps(`component-container-center-75-${props?.rendering?.uid}`)}
    >
      {/* Center Column Container */}
      <div className={content()}>
        <PlaceholderWrapper name={phKeyMedium} rendering={props?.rendering} />
      </div>
    </div>
  );
};

const TAILWIND_VARIANTS = tv({
  slots: {
    container: [
      'w-full',
      'flex',
      'flex-col',
      'py-layout-base-margin-y',
      'md:flex-row',
      'md:py-component-section-container-padding-y',
      'justify-center',
    ],
    content: [
      'w-full',
      'grid',
      'grid-cols-1',
      'gap-layout-base-margin-y',
      'md:max-w-layout-container-center70-max-width',
      'md:gap-component-section-container-padding-y',
    ],
  },
});
