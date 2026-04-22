'use client';

import useIsEditing from './useIsEditing';

export type FieldLikeObject = { value?: unknown; href?: string };
export interface FieldWithFallback<T extends FieldLikeObject> {
  /**
   * The field to render.  When editing, this will always be the main field.
   */
  renderField?: T;
  /** For use in editing mode when we want to render the main field, but have help text
   * showing the fallback field */
  fallbackFieldForEditing?: T;
}
export function useFieldWithFallbacks<TField extends FieldLikeObject>(
  mainField: TField | undefined,
  fallbackFields?: (TField | undefined)[],
  hasValue: (field: TField | undefined) => boolean = (x) => !!x?.value || !!x?.href
): FieldWithFallback<TField> {
  const isEditing = useIsEditing();

  // We want to know the fallback field regardless if there is a valid one
  let fallbackFieldForEditing;

  // Loop through fallback fields to find one that has a value
  for (let i = 0; i < (fallbackFields?.length ?? 0); i++) {
    const field = fallbackFields?.[i];
    if (hasValue(field)) {
      fallbackFieldForEditing = field;
      break;
    }
  }

  let renderField;

  if (isEditing || hasValue(mainField)) {
    renderField = mainField;
  } else {
    renderField = fallbackFieldForEditing ?? mainField;
  }

  return {
    renderField,
    fallbackFieldForEditing,
  };
}
