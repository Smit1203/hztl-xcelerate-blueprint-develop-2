// Global
import { RichText, RichTextField } from '@sitecore-content-sdk/nextjs';
import { RichTextProps } from '@sitecore-content-sdk/nextjs/types/components/RichText';
import React, { useEffect, useState, JSX } from 'react';

// Local
import useIsEditing from 'lib/hooks/useIsEditing';
import { useFieldWithFallbacks } from 'lib/hooks/useFieldWithFallbacks';
import { ReplacementToken, tokenReplace } from 'lib/utils/string-utils';

interface RichTextWrapperProps extends RichTextProps, React.HTMLAttributes<HTMLDivElement> {
  fallbacks?: (RichTextField | undefined)[];
  tokens?: ReplacementToken[];
}

const RichTextWrapper = ({
  field,
  fallbacks,
  tokens,
  editable = true,
  className,
  ...props
}: RichTextWrapperProps): JSX.Element => {
  const isEditing = useIsEditing() && editable;

  const { renderField } = useFieldWithFallbacks(field, fallbacks);

  const updatedField = useUpdatedRichTextField({
    field: renderField,
    tokens,
    editable,
  });

  const hasValue = !!updatedField?.value;

  // We should only render if it has a value, or if we are editing
  const shouldRender = hasValue || isEditing;
  if (!shouldRender) return <></>;

  // In editing mode, move `className` to wrapping div,
  // because Sitecore doesn't render the props if field is empty,
  // and so the "rte" and other css classes are missing initially.
  if (isEditing) {
    return (
      <div className={`rte ${className ?? ''}`}>
        <RichText
          {...props}
          data-component="helpers/fieldwrappers/richtextwrapper"
          editable={editable}
          field={updatedField}
        />
      </div>
    );
  }
  return (
    <RichText
      {...props}
      className={`rte ${className ?? ''}`}
      data-component="helpers/fieldwrappers/richtextwrapper"
      editable={editable}
      field={updatedField}
    />
  );
};

const NEW_TAB_ICON_STRING = `<span class="svg-icon inline-flex align-middle -ml-3 h-6 w-6">
    <svg
      aria-hidden="true"
      class="inline ml-2 -mt-1 h-em w-em"
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.25 3.75H19.5a.75.75 0 01.75.75v11.25a.75.75 0 01-1.5 0V6.31L5.03 20.03a.75.75 0 01-1.06-1.06L17.69 5.25H8.25a.75.75 0 010-1.5z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  </span>`;

function useUpdatedRichTextField({ field, tokens, editable = true }: RichTextWrapperProps) {
  const isEditing = useIsEditing() && editable;

  // Replace tokens if present
  const richTextContent = tokens ? tokenReplace(field?.value, tokens) : field?.value;
  const [content, setContent] = useState(richTextContent);

  const updatedField: RichTextField = {
    value: content || '',
  };

  // Run this client-side because we don't have access to the document server-side
  useEffect(() => {
    const template = document.createElement('template');
    template.innerHTML = richTextContent || '';

    // Find all links either either have target="_blank" or appear to be external due to starting with "http"
    const externalLinks = [...template.content.querySelectorAll('a')].filter(
      (a) =>
        a.attributes.getNamedItem('href')?.value.startsWith('http') ||
        a.attributes.getNamedItem('target')?.value === '_blank'
    );
    // Update each external link
    externalLinks.forEach((a) => {
      // Set to open in new tab
      a.setAttribute('target', '_blank');
      // Add Screen Reader text and new tab icon
      a.innerHTML = `${a.innerHTML}<span class="sr-only"> (Opens in a new tab)</span> ${NEW_TAB_ICON_STRING}`;
    });

    // Add data-column attributes to table cells
    const tables = template.content.querySelectorAll('table');
    tables.forEach((table) => {
      const headerElements = table.querySelectorAll('thead th');

      // Only proceed if there are th elements
      if (headerElements.length > 0) {
        const headers = Array.from(headerElements).map((th) => th.textContent?.trim() || '');

        const cells = table.querySelectorAll('tbody td, tbody th');
        cells.forEach((cell, index) => {
          const columnIndex = index % headers.length;
          cell.setAttribute('data-column', headers[columnIndex]);
        });
      }
    });

    // Update the content
    setContent(template.innerHTML);
  }, [richTextContent]);

  return isEditing ? field : updatedField;
}

export default RichTextWrapper;
