// Global
import React, { JSX } from 'react';
import { RichTextField } from '@sitecore-content-sdk/nextjs';

// Local
import RichTextWrapper from 'helpers/SitecoreWrappers/RichTextWrapper/RichTextWrapper';
import { ComponentProps } from 'lib/component-props';

export type RichTextProps = ComponentProps & {
  fields?: {
    Text?: RichTextField;
  };
};

const RichText = (props: RichTextProps): JSX.Element => {
  const { Text } = props?.fields || {};
  const { RenderingIdentifier, styles } = props?.params || {};

  const text = Text ? (
    <RichTextWrapper field={Text} />
  ) : (
    <span className="is-empty-hint">Rich text</span>
  );

  return (
    <div className={`component rich-text ${styles?.trimEnd() || ''}`} id={RenderingIdentifier}>
      <div className="component-content">{text}</div>
    </div>
  );
};

export const Default = RichText;
