// Global
import { tv } from 'tailwind-variants';
import { JSX } from 'react';
// Local
import { PlaceholderWrapper } from 'helpers/SitecoreWrappers/PlaceholderWrapper/PlaceholderWrapper';
import { ComponentProps } from 'lib/component-props';
import { getTestProps } from 'lib/testing/utils';

export const Default = (props: ComponentProps): JSX.Element => {
  const phKeyExtraLarge = `custom-container-extra-large-${props?.params?.DynamicPlaceholderId || 'container-full-bleed'}`;

  const { container, content } = TAILWIND_VARIANTS();

  return (
    <div
      className={container()}
      {...getTestProps(`component-container-full-bleed-${props?.rendering?.uid}`)}
    >
      {/* Full Bleed Container */}
      <div className={content()}>
        <PlaceholderWrapper name={phKeyExtraLarge} rendering={props?.rendering} />
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
      'justify-center',
      'relative',
      'left-[calc(-50vw+50%)]',
      'right-[calc(-50vw+50%)]',
      'w-screen',
    ],
    content: ['mx-auto'],
  },
});
