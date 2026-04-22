'use client';

// Global
import { Text, TextField } from '@sitecore-content-sdk/nextjs';
import React, { JSX } from 'react';

//Local
import useIsEditing from 'lib/hooks/useIsEditing';
import { useFieldWithFallbacks } from 'lib/hooks/useFieldWithFallbacks';
import { EditingHelpText } from 'helpers/Editing/EditingHelpText';
import { ReplacementToken, tokenReplace } from 'lib/utils/string-utils';

type TextProps = React.ComponentProps<typeof Text>;

interface PlainTextWrapperProps extends TextProps, React.HTMLAttributes<HTMLHeadingElement> {
  fallbacks?: (TextField | undefined)[];
  tokens?: ReplacementToken[];
}

const PlainTextWrapper = ({
  field,
  fallbacks,
  tokens,
  className,
  tag = 'span',
  editable = true,
  ...props
}: PlainTextWrapperProps): JSX.Element => {
  const isEditing = useIsEditing() && editable;

  const { renderField, fallbackFieldForEditing } = useFieldWithFallbacks(field, fallbacks);

  const updatedField = useUpdatedPlainTextField({
    field: renderField,
    tokens,
    editable,
  });
  const hasValue = !!updatedField?.value;

  // We should only render if it has a value, or if we are editing
  const shouldRender = hasValue || isEditing;

  if (!shouldRender) return <></>;

  if (isEditing) {
    const Tag = tag as keyof JSX.IntrinsicElements;

    // Check if there is a fallback field
    const hasFallback = fallbackFieldForEditing && fallbackFieldForEditing !== renderField;

    // Render the component with the appropriate tag
    return React.createElement(
      Tag,
      { className },
      <Text
        {...props}
        data-component="helpers/fieldwrappers/plaintextwrapper"
        editable={editable}
        field={updatedField}
      />,
      hasFallback && (
        <EditingHelpText>
          Fallback:{' '}
          <Text
            {...props}
            data-component="helpers/fieldwrappers/plaintextwrapper"
            editable={false}
            field={fallbackFieldForEditing}
          />
        </EditingHelpText>
      )
    );
  }
  return (
    <Text
      {...props}
      data-component="helpers/fieldwrappers/plaintextwrapper"
      editable={editable}
      field={updatedField}
      className={className}
      tag={tag}
    />
  );
};

function useUpdatedPlainTextField({ field, tokens, editable = true }: PlainTextWrapperProps) {
  const isEditing = useIsEditing() && editable;

  const plainTextContent = tokens ? tokenReplace(field?.value?.toString(), tokens) : field?.value;

  const updatedField: TextField = {
    value: plainTextContent || '',
  };

  return isEditing ? field : updatedField;
}

export default PlainTextWrapper;
