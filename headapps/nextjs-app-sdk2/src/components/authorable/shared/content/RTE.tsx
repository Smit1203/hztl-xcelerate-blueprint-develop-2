'use client';

import React, { JSX } from 'react';
import { Field, withDatasourceCheck } from '@sitecore-content-sdk/nextjs';
import { tv } from 'tailwind-variants';

import { ComponentProps } from 'lib/component-props';
import RichTextWrapper from 'helpers/SitecoreWrappers/RichTextWrapper/RichTextWrapper';
import useDictionary from 'lib/hooks/useDictionary';
import { getTestProps } from 'lib/testing/utils';

interface RteFields {
  text?: Field<string>;
}

export type RTEProps = ComponentProps & {
  fields?: RteFields;
};

const RTE = (props: RTEProps): JSX.Element => {
  const { text } = props?.fields || {};
  const { RenderingIdentifier, styles } = props?.params || {};

  const { getDictionaryValue } = useDictionary();

  const extendedTailwindVariants = tv({
    extend: TAILWIND_VARIANTS,
    slots: {
      base: [styles?.trimEnd()],
    },
  });

  const { base, contentContainer } = extendedTailwindVariants();

  let richTextField = text;

  if (!text || text.value === '') {
    richTextField = { ...text, value: getDictionaryValue('RTEText') };
  }

  return (
    <div
      className={base()}
      data-component="authorable/shared/content/rte"
      id={RenderingIdentifier}
      {...getTestProps(`component-rte-${props?.rendering?.uid}`)}
    >
      <div className={contentContainer()}>
        <RichTextWrapper field={richTextField} {...getTestProps('rich-text')} />
      </div>
    </div>
  );
};

export const Default = withDatasourceCheck()<RTEProps>(RTE);

const TAILWIND_VARIANTS = tv({
  slots: {
    base: [],
    contentContainer: [],
    placeholder: ['is-empty-hint'],
  },
});
