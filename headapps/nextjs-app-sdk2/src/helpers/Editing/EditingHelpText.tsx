'use client';

import useIsEditing from 'lib/hooks/useIsEditing';
import React from 'react';

export function EditingHelpText({
  children,
  className,
  inline,
  hideIf,
  priority,
  ...props
}: React.PropsWithChildren &
  React.HTMLAttributes<HTMLElement> & {
    inline?: boolean;
    hideIf?: boolean;
    priority?: 'warning' | 'normal' | undefined;
  }) {
  const isEditing = useIsEditing();
  if (!isEditing) {
    return <></>;
  }
  if (hideIf) {
    return <></>;
  }

  const classesList = `${className} ${priority === 'warning' ? 'ee-warning-text-block' : 'ee-help-text-block'}`;

  if (inline) {
    return (
      <span className={classesList} {...props}>
        {children}
      </span>
    );
  }
  return (
    <div className={classesList} {...props}>
      {children}
    </div>
  );
}
