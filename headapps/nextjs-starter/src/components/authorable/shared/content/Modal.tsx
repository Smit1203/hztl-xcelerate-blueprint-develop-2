'use client';

// Global
import React, { JSX } from 'react';
import { tv } from 'tailwind-variants';

// Local
import { Content } from '.generated/Content/Modal.model';
import ModalWrapper, { ModalSize } from 'helpers/GenericWrappers/ModalWrapper/ModalWrapper';
import { withStandardComponentWrapper } from 'helpers/HOC';
import PlainTextWrapper from 'helpers/SitecoreWrappers/PlainTextWrapper/PlainTextWrapper';
import useDictionary from 'lib/hooks/useDictionary';
import useIsEditing from 'lib/hooks/useIsEditing';
import { PlaceholderWrapper } from 'helpers/SitecoreWrappers/PlaceholderWrapper/PlaceholderWrapper';
import { getTestProps } from 'lib/testing/utils';

export type ModalProps = Content.Modal.Modal_Component;

/*
 * RENDERING
 */

const Modal = (props: ModalProps): JSX.Element => {
  const { label, modalId, openOnLoad, size, title } = props?.fields || {};
  const { DynamicPlaceholderId } = props?.params || {};

  const { getDictionaryValue } = useDictionary();

  const isEditing = useIsEditing();

  const placeholderKey = `custom-modal-${DynamicPlaceholderId}`;

  if (isEditing) {
    const { base, urlHash } = TAILWIND_VARIANTS();

    return (
      <>
        <div className={base()} data-component="authorable/shared/content/modal">
          <PlainTextWrapper editable field={title} tag="h2" />
          <div>
            <PlaceholderWrapper name={placeholderKey} rendering={props.rendering} />
          </div>
        </div>
        <div>
          <p className={urlHash()}>
            <em className="ee-help-text-highlight">{getDictionaryValue('ModalURLHash')}</em>
            &nbsp; #modal-
            <PlainTextWrapper editable field={modalId} tag="span" />
          </p>
          <p className="ee-help-text-block">{getDictionaryValue('ModalURLHint')}</p>
        </div>
      </>
    );
  }

  return (
    <ModalWrapper
      content={<PlaceholderWrapper name={placeholderKey} rendering={props.rendering} />}
      data-component="authorable/shared/content/modal"
      id={modalId?.value}
      label={label?.value}
      openOnLoad={openOnLoad?.value}
      size={size?.value as ModalSize}
      title={title?.value}
      {...getTestProps(`component-modal-${props?.rendering?.uid}`)}
    />
  );
};

export const Default = withStandardComponentWrapper(Modal);

const TAILWIND_VARIANTS = tv({
  slots: {
    base: ['border', 'flex', 'flex-col', 'gap-5', 'p-5', 'rounded'],
    urlHash: ['my-2'],
  },
});
