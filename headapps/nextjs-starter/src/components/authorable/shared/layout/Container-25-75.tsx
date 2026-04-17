// Global
import { tv } from 'tailwind-variants';
import { JSX } from 'react';
// Local
import { PlaceholderWrapper } from 'helpers/SitecoreWrappers/PlaceholderWrapper/PlaceholderWrapper';
import { ComponentProps } from 'lib/component-props';
import { getTestProps } from 'lib/testing/utils';

export const Default = (props: ComponentProps): JSX.Element => {
  const phKeySmall = `custom-container-small-${props?.params?.DynamicPlaceholderId || 'container-25-75'}`;
  const phKeyMedium = `custom-container-medium-${props?.params?.DynamicPlaceholderId || 'container-25-75'}`;

  const { container, baseColumn, leftColumn, rightColumn } = TAILWIND_VARIANTS();

  return (
    <div
      className={container()}
      {...getTestProps(`component-container-25-75-${props?.rendering?.uid}`)}
    >
      {/* Left Column Container */}
      <div className={`${baseColumn()} ${leftColumn()}`}>
        <PlaceholderWrapper
          name={phKeySmall}
          rendering={props?.rendering}
          {...getTestProps(`ph-left`)}
        />
      </div>

      {/* Right Column Container */}
      <div className={`${baseColumn()} ${rightColumn()}`}>
        <PlaceholderWrapper
          name={phKeyMedium}
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
      'gap-spacing-spacing-40',
      'md:gap-spacing-spacing-24',
      'py-layout-base-margin-y',
    ],
    baseColumn: [
      'w-full',
      'grid',
      'grid-cols-1',
      'gap-layout-base-margin-y',
      'md:gap-component-section-container-padding-y',
    ],
    leftColumn: ['md:w-1/4'],
    rightColumn: ['md:w-3/4'],
  },
});
