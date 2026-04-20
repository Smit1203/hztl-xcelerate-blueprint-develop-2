'use client';

// Global
import { sendGTMEvent } from '@next/third-parties/google';
import React, { ReactNode, useCallback, useState, useContext, useEffect, useRef, JSX } from 'react';
import Modal from 'react-modal';
import { tv } from 'tailwind-variants';

// Local
import { SvgIcon } from 'helpers/SvgIcon';
import { GtmEvent } from 'lib/utils/gtm-utils';
import { useOnHashChange } from 'lib/hooks/useOnRouteChange';
import { BrandAndThemeContext } from 'lib/context/BrandAndThemeContext';
import { supportedFonts } from 'lib/fonts';
import { lockBodyScroll, unlockBodyScroll } from 'lib/utils/scroll-lock';
import { getTestProps } from 'lib/testing/utils';

export type ModalSize = 'xLarge' | 'Fluid' | 'Large' | 'Medium' | 'Small' | undefined;

export type ModalWrapperProps = {
  content: ReactNode;
  gtmEvent?: GtmEvent;
  id?: string;
  label?: string;
  openOnLoad?: boolean;
  size?: ModalSize;
  title?: ReactNode;
  trigger?: ReactNode;
};

// React Modal Defaults
Modal.defaultStyles = {
  overlay: {
    backgroundColor: 'rgba(47, 45, 46, 0.75)',
    bottom: 0,
    left: 0,
    position: 'fixed',
    right: 0,
    top: 0,
    zIndex: 100,
  },
};

Modal.setAppElement(process.env.IS_STORYBOOK ? '#storybook-root' : '#__next');

const ModalWrapper = (props: ModalWrapperProps): JSX.Element => {
  const {
    content,
    gtmEvent,
    id,
    label,
    openOnLoad = false,
    size = 'Large',
    title,
    trigger,
  } = props || {};

  const {
    body,
    closeButton,
    // closeButtonIcon,
    modal,
    modalWrapper,
    titleBar,
    titleBarText,
    triggerContainer,
  } = TAILWIND_VARIANTS({
    size: size,
  });

  // Get brand and theme context to apply to modal content
  const { brand, theme } = useContext(BrandAndThemeContext);

  /*
   * State
   */

  const [isOpen, setIsOpen] = useState(openOnLoad);
  const hasInitialLock = useRef(false);

  // Lock body scroll immediately if modal should open on load
  useEffect(() => {
    if (openOnLoad && !hasInitialLock.current) {
      // Use setTimeout to ensure DOM is ready
      const timer = setTimeout(() => {
        lockBodyScroll();
        hasInitialLock.current = true;
      }, 0);

      return () => clearTimeout(timer);
    }
    return undefined;
  }, [openOnLoad]);

  /*
   * Event Handlers
   */

  const handleOnAfterClose = () => {
    return;
  };

  const handleOnAfterOpen = () => {
    const gtmEventInner = {
      ...gtmEvent,
      'gtm.element.dataset.gtmComponentName': 'helpers-sitecorewrappers-modalwrappertwo',
      'gtm.element.dataset.gtmDatasourceId': id,
    };

    sendGTMEvent(gtmEventInner);
  };

  const handleOnCloseModal = () => {
    history.pushState('', document.title, window.location.pathname + window.location.search);

    setIsOpen(false);

    const gtmEventInner = {
      ...gtmEvent,
      'gtm.element.dataset.gtmComponentName': 'helpers-sitecorewrappers-modalwrappertwo',
      'gtm.element.dataset.gtmDatasourceId': id,
    };

    sendGTMEvent(gtmEventInner);
  };

  const handleOnOpenModal = () => {
    setIsOpen(true);
  };

  const handleOnRemoteTriggerEvent = useCallback(() => {
    const { hash } = window?.location;

    if (hash !== `#modal-${id}`) return;

    handleOnOpenModal();
  }, [id]);

  /*
   * Lifecycle
   */

  useOnHashChange(handleOnRemoteTriggerEvent);

  // Lock/unlock body scroll when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      lockBodyScroll();
    } else {
      unlockBodyScroll();
    }

    // Cleanup on unmount
    return () => {
      if (isOpen) {
        unlockBodyScroll();
      }
    };
  }, [isOpen]);

  /*
   * Rendering
   */

  return (
    <>
      {trigger && (
        <span
          aria-controls={`modal-${id}`}
          className={triggerContainer()}
          id={`modal-${id}-button`}
          onClick={handleOnOpenModal}
          role="button"
        >
          {trigger}
        </span>
      )}
      <Modal
        ariaHideApp={true}
        className={modal()}
        closeTimeoutMS={300}
        contentLabel={label}
        data-component="helpers/generic-wrappers/modal-wrapper"
        id={`modal-${id}`}
        isOpen={isOpen}
        onAfterClose={handleOnAfterClose}
        onAfterOpen={handleOnAfterOpen}
        onRequestClose={handleOnCloseModal}
        role="dialog"
        shouldCloseOnEsc={true}
        shouldCloseOnOverlayClick={true}
        shouldReturnFocusAfterClose={true}
        {...getTestProps(`component-modal-${id}`)}
      >
        <div
          className={`${brand} ${theme} ${supportedFonts.map((font) => font.className).join(' ')} brand-root`}
        >
          <div className={modalWrapper()}>
            <button
              aria-label="Close Modal Button"
              className={closeButton()}
              onClick={handleOnCloseModal}
              role="button"
              {...getTestProps(`close-btn`)}
            >
              <SvgIcon
                aria-hidden="true"
                aria-label="Close Modal Button Icon"
                icon="close"
                size="xs"
              />
            </button>
            <div className={titleBar()} {...getTestProps(`title`)}>
              {title && <h2 className={titleBarText()}>{title}</h2>}
            </div>
            <div className={body()} {...getTestProps(`content`)}>
              {content}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalWrapper;

const TAILWIND_VARIANTS = tv({
  slots: {
    body: [
      'overflow-y-auto',
      'text-modal-body',
      'font-typography-body-font-family',
      'text-typography-body-medium-font-size',
      'font-normal',
      'leading-[24px]',
    ],
    closeButton: [
      'h-6',
      'w-6',
      'self-end',
      'absolute',
      'top-0',
      'right-0',
      'mr-spacing-spacing-24',
      'md:mr-spacing-spacing-16',
      'mt-spacing-spacing-16',
      'flex',
      'items-center',
      'justify-center',
      'text-modal-close-icon',
    ],
    modal: [
      'absolute',
      'flex',
      'flex-col',
      'gap-5',
      'left-2/4',
      'outline-none',
      'top-2/4',
      'w-full',
      'md:w-auto',
      '-translate-x-2/4',
      '-translate-y-2/4',
    ],
    modalWrapper: [
      'flex',
      'flex-col',
      'bg-component-modal-surface',
      'gap-1',
      'sm:gap-3',
      'mx-spacing-spacing-8',
      'md:mx-0',
      'px-spacing-spacing-16',
      'sm:px-spacing-spacing-40',
      'py-spacing-spacing-40',
      'rounded-general-border-radius-container',
      'overflow-hidden',
    ],
    titleBar: ['flex', 'flex-row'],
    titleBarText: [
      'grow',
      'text-modal-title',
      'font-typography-body-font-family',
      'text-typography-body-large-font-size',
      'font-bold',
      'leading-[27px]',
    ],
    triggerContainer: ['inline-block'],
  },
  variants: {
    size: {
      xLarge: {
        body: ['h-auto', 'max-h-[540px]', 'w-full', 'md:max-h-[680px]', 'md:w-[75vw]'],
      },
      Fluid: {
        modal: ['h-auto', 'max-h-[90vh]', 'my-auto'],
        body: ['w-auto', 'md:w-auto', 'max-h-[70vh]'],
      },
      Large: {
        body: ['h-auto', 'max-h-[540px]', 'w-full', 'md:max-h-[680px]', 'md:w-[50vw]'],
      },
      Medium: {
        body: ['h-auto', 'max-h-[540px]', 'w-full', 'md:max-h-[540px]', 'md:w-[33vw]'],
      },
      Small: {
        body: ['h-auto', 'max-h-[540px]', 'w-full', 'md:max-h-[432px]', 'md:w-[25vw]'],
      },
    },
  },
});
