'use client';

import useIsEditing from 'lib/hooks/useIsEditing';
import React from 'react';

/**
 * Renders the children if either the editing mode is enabled or the showIf prop is true.
 * @param children - The children to render.
 * @param showIf - Whether to show the children.
 * @returns The children if the showIf prop is true, otherwise an empty fragment.
 */
export function EditingConditionalRender({
  children,
  showIf,
}: React.PropsWithChildren & {
  showIf?: boolean;
}) {
  const isEditing = useIsEditing();
  if (!isEditing && !showIf) {
    return <></>;
  }

  return <>{children}</>;
}
