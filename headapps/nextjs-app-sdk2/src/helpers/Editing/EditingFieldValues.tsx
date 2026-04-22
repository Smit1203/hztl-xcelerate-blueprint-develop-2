'use client';

import { TextField } from '@sitecore-content-sdk/nextjs';
import PlainTextWrapper from 'helpers/SitecoreWrappers/PlainTextWrapper/PlainTextWrapper';
import useIsEditing from 'lib/hooks/useIsEditing';
import { tv } from 'tailwind-variants';
import { EditingHelpText } from './EditingHelpText';

type EditingContentField = {
  label: string;
  field?: TextField;
};

type EditingContentProps = {
  hasRenderingParams?: boolean;
  fields: EditingContentField[];
};

/**
 * Displays the values of the fields for editing purposes.
 * @param fields - The fields to display.
 * @returns The editing content.
 */
export function EditingFieldValues({ fields, hasRenderingParams }: EditingContentProps) {
  const isEditing = useIsEditing();

  const { editingContent: editingContentClass } = TAILWIND_VARIANTS({});

  if (!isEditing) return null;
  return (
    <div className={editingContentClass()}>
      {hasRenderingParams && (
        <EditingHelpText>{'See "Advanced Styling" for more options.'}</EditingHelpText>
      )}
      {fields.map((field) => (
        <p key={field.label}>
          <EditingHelpText inline>{field.label}:</EditingHelpText>
          <PlainTextWrapper field={field.field} />
        </p>
      ))}
    </div>
  );
}

const TAILWIND_VARIANTS = tv({
  slots: {
    editingContent: ['flex', 'flex-col', 'gap-2', 'p-4'],
  },
});
