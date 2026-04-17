import React, { JSX } from 'react';
import Script from 'next/script';

import { ComponentProps } from 'lib/component-props';
import useIsEditing from 'lib/hooks/useIsEditing';
import { getScriptUrl } from 'lib/utils/link-utils';
import { EditingFieldValues } from 'helpers/Editing/EditingFieldValues';
import { EditingHelpText } from 'helpers/Editing/EditingHelpText';
import useIsNormalMode from 'lib/hooks/useIsNormalMode';
import { getTestProps } from 'lib/testing/utils';
import { Content } from '.generated/Content/CodeEmbed.model';
import { ItemEx } from '.generated/_.Sitecore.Override';

export type CodeEmbedProps = ComponentProps & Content.CodeEmbed.CodeEmbed & ItemEx;

export const CodeEmbed = (props: CodeEmbedProps): JSX.Element => {
  /**
   ** Refs & Hooks
   **/
  const isEditing = useIsEditing();
  const isNormalMode = useIsNormalMode();

  /**
   ** Life Cycle
   **/
  if (!props.fields) {
    return <></>;
  }

  let scriptAttributes: object = {};
  if (props.fields.additionalTagAttributes?.value) {
    scriptAttributes = Object.fromEntries(
      new URLSearchParams(props.fields.additionalTagAttributes.value)
    );
  }

  /**
   ** Rendering
   **/
  const htmlCodeContainsScript =
    /<script\b(?![^>]*\/>)[^>]*>(?:(?!<\/script>)[\s\S])*<\/script\s*>/.test(
      props.fields.htmlCode?.value ?? ''
    );

  const hasScriptSourceUrl = !!props.fields.scriptSourceUrl?.value;
  const hasScriptId = !!props.fields.scriptId?.value;

  if (isEditing) {
    return (
      <div data-component="authorable/shared/content/codeembed">
        {htmlCodeContainsScript && (
          <EditingHelpText priority="warning">
            The HTML Code below contains an inline script which must be removed or it will cause an
            error when rendering the page. Move the script to the Script field below to allow it to
            execute properly.
          </EditingHelpText>
        )}
        {hasScriptSourceUrl && !hasScriptId && (
          <EditingHelpText priority="warning">
            A Script ID is required when a Script Source URL is provided. Please enter a unique ID
            for the script.
          </EditingHelpText>
        )}
        <EditingFieldValues
          hasRenderingParams
          fields={[
            { label: 'HTML Code', field: props.fields.htmlCode },
            { label: 'Script Source URL', field: props.fields.scriptSourceUrl },
            { label: 'Script Source URL ID', field: props.fields.scriptId },
            { label: 'Script', field: props.fields.script },
          ]}
        />
      </div>
    );
  }

  if (props.fields.enabled?.value) {
    return (
      <div
        data-component="authorable/shared/content/codeEmbed"
        {...getTestProps(`component-code-embed-${props?.rendering?.uid}`)}
      >
        {props.fields.htmlCode?.value && (
          <div
            dangerouslySetInnerHTML={{ __html: props.fields.htmlCode.value }}
            {...getTestProps(`html-code`)}
          />
        )}
        {props.fields.scriptSourceUrl?.value && (
          <Script
            id={props.fields.scriptId?.value}
            src={props.fields.scriptSourceUrl.value}
            {...scriptAttributes}
          />
        )}
        {props.fields.script?.value && (
          <Script id={props.id} src={getScriptUrl(isNormalMode, props)} />
        )}
      </div>
    );
  }

  return <></>;
};

export default CodeEmbed;
