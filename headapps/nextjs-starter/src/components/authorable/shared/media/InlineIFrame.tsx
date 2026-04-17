// Global
import React, { JSX } from 'react';
// Local
import { Media } from '.generated/Media/InlineIFrame.model';
import { withStandardComponentWrapper } from 'helpers/HOC';
import { tv } from 'tailwind-variants';
import { EditingFieldValues } from 'helpers/Editing/EditingFieldValues';
import { EditingHelpText } from 'helpers/Editing/EditingHelpText';
import useDictionary from 'lib/hooks/useDictionary';
import useIsEditing from 'lib/hooks/useIsEditing';
import { getTestProps } from 'lib/testing/utils';

export type InlineIFrameProps = Media.InlineIFrame.InlineIFrame_Component;

const InlineIFrame = (props: InlineIFrameProps): JSX.Element => {
  const { embedUrl, title } = props?.fields || {};
  const { width, height, aspectRatio } = props?.params || {};
  const { iframe: iframeClass, iframeWrapper } = TAILWIND_VARIANTS({});
  const { getDictionaryValue } = useDictionary();
  const isEditing = useIsEditing();

  if (!embedUrl?.value && isEditing) {
    return (
      <EditingHelpText priority="warning">
        {getDictionaryValue('EmbedURLUnavailable') || 'No url available'}
      </EditingHelpText>
    );
  }

  const iframeHeight = aspectRatio || !width || width === '100%' ? '100%' : height || '500px';

  return (
    <section
      className={iframeWrapper()}
      data-component="authorable/shared/media/inlineiframe"
      {...getTestProps(`iframe-wrapper`)}
    >
      <EditingFieldValues
        hasRenderingParams
        fields={[
          { label: 'Embed URL', field: embedUrl },
          { label: 'Title (For Screen Readers)', field: title },
        ]}
      />
      {embedUrl?.value && (
        <iframe
          className={iframeClass()}
          title={title?.value}
          src={embedUrl?.value}
          width={width || '100%'}
          height={iframeHeight}
          style={{
            aspectRatio: aspectRatio || 16 / 9,
          }}
          sandbox="allow-same-origin allow-scripts allow-presentation"
          {...getTestProps(`iframe`)}
        ></iframe>
      )}
    </section>
  );
};

export const Default = withStandardComponentWrapper(InlineIFrame);

export default Default;

const TAILWIND_VARIANTS = tv({
  slots: {
    iframeWrapper: ['px-2', 'lg:px-0', 'flex'],
    iframe: ['mx-auto'],
  },
});
