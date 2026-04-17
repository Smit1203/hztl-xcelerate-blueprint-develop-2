// Global
import React, { JSX } from 'react';
// Local
import { withStandardComponentWrapper } from 'helpers/HOC';
import { ComponentProps } from 'lib/component-props';
import { tv } from 'tailwind-variants';
import { getTestProps } from 'lib/testing/utils';

export type DividerProps = ComponentProps;

const Divider = (props: DividerProps): JSX.Element => {
  const { RenderingIdentifier } = props?.params || {};

  const { base } = TAILWIND_VARIANTS();

  /*
   * RENDERING
   */

  return (
    <div
      data-component="authorable/shared/layout/divider"
      id={RenderingIdentifier}
      {...getTestProps(`component-divider-${props?.rendering?.uid}`)}
    >
      <div className={base()}></div>
    </div>
  );
};

export const Default = withStandardComponentWrapper(Divider, false);

const TAILWIND_VARIANTS = tv({
  slots: {
    base: ['w-full', 'h-px', 'bg-color-border-border'],
  },
});
