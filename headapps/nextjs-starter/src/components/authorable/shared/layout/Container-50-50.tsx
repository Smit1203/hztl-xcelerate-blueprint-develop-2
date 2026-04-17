// Global
import { tv } from 'tailwind-variants';
import { JSX } from 'react';
// Local
import { PlaceholderWrapper } from 'helpers/SitecoreWrappers/PlaceholderWrapper/PlaceholderWrapper';
import { ComponentProps } from 'lib/component-props';
import { getTestProps } from 'lib/testing/utils';

export const Default = (props: ComponentProps): JSX.Element => {
  const phKeyHalfLeft = `custom-container-half-left-${props?.params?.DynamicPlaceholderId || 'container-50-50'}`;
  const phKeyHalfRight = `custom-container-half-right-${props?.params?.DynamicPlaceholderId || 'container-50-50'}`;

  const { container, halfColumn } = TAILWIND_VARIANTS();

  return (
    <div
      className={container()}
      {...getTestProps(`component-container-50-50-${props?.rendering?.uid}`)}
    >
      {/* Left Column Container */}
      <div className={halfColumn()}>
        <PlaceholderWrapper
          name={phKeyHalfLeft}
          rendering={props?.rendering}
          {...getTestProps(`ph-left`)}
        />
      </div>

      {/* Right Column Container */}
      <div className={halfColumn()}>
        <PlaceholderWrapper
          name={phKeyHalfRight}
          rendering={props?.rendering}
          {...getTestProps(`ph-right`)}
        />
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
      'md:flex-row',
      'py-layout-base-margin-y',
      'gap-spacing-spacing-40',
      'md:gap-spacing-spacing-24',
    ],
    halfColumn: [
      'w-full',
      'md:w-1/2',
      'grid',
      'grid-cols-1',
      'gap-layout-base-margin-y',
      'md:gap-component-section-container-padding-y',
    ],
  },
});
