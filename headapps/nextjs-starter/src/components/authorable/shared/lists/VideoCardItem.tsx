// Global
import React, { useState, useRef, useEffect, JSX } from 'react';
import { tv } from 'tailwind-variants';

// Local
import { Lists } from '.generated/Lists/VideoCardItem.model';
import { withStandardComponentWrapper } from 'helpers/HOC';
import ImageWrapper from 'helpers/SitecoreWrappers/ImageWrapper/ImageWrapper';
import PlainTextWrapper from 'helpers/SitecoreWrappers/PlainTextWrapper/PlainTextWrapper';
import SvgIcon from 'helpers/SvgIcon/SvgIcon';
import { useCardListContext } from './CardList';
import useDictionary from 'lib/hooks/useDictionary';
import { getVideoPlatform, getProcessedVideoUrl } from 'lib/utils/videoUtils';
import { lockBodyScroll, unlockBodyScroll } from 'lib/utils/scroll-lock';
import { getTestProps } from 'lib/testing/utils';
import ButtonWrapper, {
  ctaTailwindVariant,
} from 'helpers/SitecoreWrappers/ButtonWrapper/ButtonWrapper';
import { getCtaStyle } from 'lib/utils/cta-utils';
import { parseStyleParams } from 'lib/utils/style-param-utils';
import { useCtaComponentClass } from 'lib/hooks/theming/useCtaComponentClass';

export type VideoCardItemProps = Lists.VideoCardItem.VideoCardItem_Component;

const VideoCardItem = (props: VideoCardItemProps): JSX.Element => {
  const { videoUrl, cardImage, description, eyebrow, heading, subHeading } = props?.fields || {};
  const { RenderingIdentifier } = props?.params || {};

  const styles = parseStyleParams(props.params, ['cta2']);
  const ctaStyle = getCtaStyle(styles.cta2, 'link');

  // Get column count from CardList context
  const cardListColCount = useCardListContext();

  // Get icon classes using component-card-item-button-2-color token
  const buttonStyle = useCtaComponentClass('component-video-card-item-button-1-color');
  const iconClasses = ctaTailwindVariant({
    variant: ctaStyle.ctaVariant || 'link',
    style: buttonStyle,
  }).icon();

  const { getDictionaryValue } = useDictionary();

  // State for video modal
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [triggerElement, setTriggerElement] = useState<HTMLButtonElement | null>(null);

  // Refs for focus management
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const playButtonOverlayRef = useRef<HTMLButtonElement>(null);
  const videoLinkRef = useRef<HTMLButtonElement>(null);

  /*
   * Video Modal Functions
   */

  const handleVideoClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setTriggerElement(e.currentTarget);
    if (videoUrl?.value) {
      setIsVideoModalOpen(true);
    }
  };

  const handleCloseVideoModal = () => {
    setIsVideoModalOpen(false);
  };

  // Effect to handle Escape key press for closing the modal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isVideoModalOpen) {
        handleCloseVideoModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isVideoModalOpen]);

  // Effect for focus management
  useEffect(() => {
    if (isVideoModalOpen) {
      // Focus the modal's close button when it opens
      closeButtonRef.current?.focus();
    } else {
      // Return focus to the trigger element when the modal closes
      triggerElement?.focus();
    }
  }, [isVideoModalOpen, triggerElement]);

  // Effect for scroll locking when video modal opens/closes
  useEffect(() => {
    if (isVideoModalOpen) {
      lockBodyScroll();
    } else {
      unlockBodyScroll();
    }

    // Cleanup on unmount
    return () => {
      if (isVideoModalOpen) {
        unlockBodyScroll();
      }
    };
  }, [isVideoModalOpen]);

  // Check if video URL is valid
  const isValidVideoUrl = videoUrl?.value && getVideoPlatform(videoUrl.value);

  /*
   * Rendering
   */

  const {
    body,
    contentWrapper,
    content,
    descriptionText,
    eyebrowText,
    videoImageContainer,
    headingText,
    subheading,
    container,
    videoLink,
    modalOverlay,
    modalContent,
    modalCloseButton,
    playButtonOverlay,
    modalTitle,
    modalSubheading,
    modalDescription,
    videoPlayIcon,
    videoOverlay,
    playButtonIcon,
    modalVideoContainer,
    modalVideoIframe,
    noImageContainer,
    noImageIcon,
    imageWrapper,
  } = TAILWIND_VARIANTS({ colCount: cardListColCount });

  return (
    <div
      className={'h-full'}
      {...getTestProps(`component-video-card-item-${props?.rendering?.uid}`)}
    >
      <article
        className={container()}
        data-component="authorable/shared/lists/videocarditem"
        id={RenderingIdentifier}
      >
        <button
          ref={playButtonOverlayRef}
          onClick={handleVideoClick}
          className={videoImageContainer()}
          type="button"
          aria-label={`Play video: ${heading?.value || 'Video'}`}
          aria-expanded={isVideoModalOpen}
          aria-controls={`video-modal-${RenderingIdentifier}`}
        >
          {cardImage?.value?.src ? (
            <ImageWrapper
              field={cardImage}
              className={imageWrapper()}
              {...getTestProps(`thumbnail-image`)}
            />
          ) : (
            <div className={noImageContainer()} {...getTestProps(`no-image-container`)}>
              <SvgIcon icon="no-image" size="lg" viewBox="0 0 240 240" className={noImageIcon()} />
            </div>
          )}
          {isValidVideoUrl && (
            <>
              <span className={videoOverlay()} {...getTestProps(`video-overlay`)} />
              <span className={playButtonOverlay()} {...getTestProps(`play-button-overlay`)}>
                <SvgIcon
                  icon="play-control"
                  viewBox="0 0 44 44"
                  size="m"
                  className={playButtonIcon()}
                />
              </span>
            </>
          )}
        </button>
        <div className={body()}>
          <div className={contentWrapper()}>
            <div className={content()}>
              <PlainTextWrapper
                className={eyebrowText()}
                editable
                field={eyebrow}
                tag="div"
                {...getTestProps(`eyebrow`)}
              />
              <PlainTextWrapper
                className={headingText()}
                field={heading}
                tag="h3"
                {...getTestProps(`video-title`)}
              />
              <PlainTextWrapper
                className={subheading()}
                field={subHeading}
                tag="h4"
                {...getTestProps(`sub-heading`)}
              />
              <PlainTextWrapper
                className={descriptionText()}
                field={description}
                {...getTestProps(`description`)}
              />
            </div>
            {isValidVideoUrl && (
              <ButtonWrapper
                ctaComponentClass="component-video-card-item-button-1-color"
                ctaStyle={getCtaStyle(styles.cta2, 'link')}
                onClick={handleVideoClick}
                ref={videoLinkRef}
                aria-label={getDictionaryValue('WatchVideo', 'Watch Video')}
                aria-expanded={isVideoModalOpen}
                aria-controls={`video-modal-${RenderingIdentifier}`}
                {...getTestProps(`play-cta`)}
              >
                <span className={videoLink()}>
                  {getDictionaryValue('WatchVideo') || 'Watch Video'}
                  <SvgIcon
                    icon="video-play"
                    size="xs"
                    viewBox="0 0 18 18"
                    className={`${videoPlayIcon()} ${iconClasses}`}
                  />
                </span>
              </ButtonWrapper>
            )}
          </div>
        </div>
      </article>

      {/* Custom Video Modal */}
      {isVideoModalOpen && (
        <div
          id={`video-modal-${RenderingIdentifier}`}
          className={modalOverlay()}
          onClick={handleCloseVideoModal}
          {...getTestProps(`video-modal-${RenderingIdentifier}`)}
        >
          <div className={modalContent()} onClick={(e) => e.stopPropagation()}>
            <button
              ref={closeButtonRef}
              onClick={handleCloseVideoModal}
              className={modalCloseButton()}
              type="button"
              aria-label="Close video modal"
              {...getTestProps(`close-video-modal`)}
            >
              <SvgIcon icon="close" size="xxs" />
            </button>
            <div className={modalVideoContainer()}>
              <iframe
                src={getProcessedVideoUrl(videoUrl?.value || '')}
                title={heading?.value || 'Video'}
                className={modalVideoIframe()}
                allowFullScreen
                allow="autoplay; fullscreen; picture-in-picture"
                sandbox="allow-same-origin allow-scripts allow-presentation"
                {...getTestProps(`video-iframe`)}
              />
            </div>
            <div>
              <PlainTextWrapper
                className={modalTitle()}
                field={heading}
                tag="h3"
                {...getTestProps(`modal-title`)}
              />
              <PlainTextWrapper
                className={modalSubheading()}
                field={subHeading}
                tag="h4"
                {...getTestProps(`modal-sub-heading`)}
              />
              <PlainTextWrapper
                className={modalDescription()}
                field={description}
                {...getTestProps(`modal-description`)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const Default = withStandardComponentWrapper(VideoCardItem);

const TAILWIND_VARIANTS = tv({
  defaultVariants: {
    style: 'primary',
    colCount: '1',
  },
  slots: {
    container: [
      'flex',
      'h-full',
      'w-full',
      'overflow-hidden',
      'border-component-article-card-border-width',
      'border-component-video-card-item-border',
      'rounded-general-border-radius-card',
      'bg-component-video-card-item-surface',
    ],
    body: ['flex', 'flex-col', 'h-full', 'w-full', 'justify-center', 'items-center'],
    contentWrapper: [
      'flex',
      'flex-col',
      'w-full',
      'gap-spacing-spacing-4',
      'pt-component-video-card-portrait-content-padding-top',
      'pb-component-video-card-portrait-content-padding-bottom',
      'px-component-video-card-portrait-content-padding-x',
    ],
    content: ['flex', 'flex-col', 'h-full', 'w-full'],
    eyebrowText: [
      'font-semibold',
      'text-component-video-card-item-eyebrow',
      'text-typography-body-small-font-size',
      'mb-spacing-spacing-4',
      'font-regular',
      'line-clamp-1',
    ],
    videoImageContainer: [
      'relative',
      'min-h-max',
      'w-full',
      'rounded-component-article-card-image-radius',
      'overflow-hidden',
      'aspect-video',
      'text-color-fill-brand-1',
      'transition',
      'duration-300',
      'ease-in-out',
      'group',
      'pt-component-video-card-portrait-image-padding-top',
      'px-component-video-card-portrait-image-padding-x',
      'pb-component-video-card-portrait-image-padding-bottom',
    ],
    headingText: [
      'font-typography-font-weight-bold',
      'text-typography-body-large-font-size',
      'text-component-video-card-item-title',
      'leading-typography-line-height-body-large',
      'line-clamp-1',
    ],
    subheading: [
      'font-semibold',
      'text-typography-body-medium-font-size',
      'leading-typography-line-height-body-medium',
      'text-component-video-card-item-subtitle',
      'line-clamp-1',
    ],
    descriptionText: [
      'text-typography-body-medium-font-size',
      'text-component-video-card-item-body',
      'leading-typography-line-height-body-medium',
      'font-typography-body-small-font-weight',
    ],
    videoLink: [
      'flex',
      'font-typography-font-weight-bold',
      'text-typography-body-large-font-size',
      'mt-component-video-card-landscape-content-button-margin-top',
      'items-center',
      'w-fit',
      'gap-2',
      'group-hover:opacity-75',
      'transition-opacity',
      'duration-200',
    ],
    modalOverlay: [
      'fixed',
      'inset-0',
      'bg-black',
      'bg-opacity-75',
      'flex',
      'items-center',
      'justify-center',
      'z-50',
      'p-4',
    ],
    modalContent: [
      'flex',
      'flex-col',
      'relative',
      'bg-color-surface-white',
      'w-full',
      'rounded-general-border-radius-container',
      'md:p-spacing-spacing-40',
      'px-spacing-spacing-16',
      'py-spacing-spacing-24',
      'max-w-4xl',
      'max-h-[90vh]',
      'gap-4',
      'overflow-y-auto',
    ],
    modalCloseButton: [
      'absolute',
      'right-2',
      'top-2',
      'md:top-4',
      'md:right-8',
      'text-typography-body-large-font-size',
      'font-typography-font-weight-bold',
      'text-color-text-text-secondary',
      'hover:text-color-text-text',
      'cursor-pointer',
      'z-10',
      'w-8',
      'h-8',
      'flex',
      'items-center',
      'justify-center',
    ],
    playButtonOverlay: ['absolute', 'z-10'],
    modalTitle: [
      'font-typography-font-weight-bold',
      'text-typography-body-large-font-size',
      'text-modal-title',
      'line-clamp-2',
    ],
    modalSubheading: [
      'font-typography-font-weight-bold',
      'text-typography-body-large-font-size',
      'text-component-modal-subtitle',
      'line-clamp-2',
    ],
    modalDescription: [
      'text-typography-body-medium-font-size',
      'text-component-modal-body',
      'leading-typography-line-height-body-medium',
      'mb-spacing-spacing-8',
      'font-typography-body-small-font-weight',
    ],
    videoPlayIcon: ['!h-5', '!w-5', 'transition-all', 'duration-300'],
    videoOverlay: [
      'absolute',
      'inset-0',
      'bg-black',
      'bg-opacity-0',
      'group-hover:bg-black/30',
      'group-focus:bg-black/30',
      'transition-all',
      'duration-300',
      'ease-in-out',
      'mt-component-video-card-portrait-image-padding-top',
      'mx-component-video-card-portrait-image-padding-x',
      'mb-component-video-card-portrait-image-padding-bottom',
      'rounded-component-article-card-image-radius',
    ],
    playButtonIcon: ['transition-all', 'duration-300'],
    modalVideoContainer: [
      'relative',
      'w-full',
      'aspect-video',
      'mt-spacing-spacing-16',
      'rounded-general-border-radius-label',
      'overflow-hidden',
    ],
    modalVideoIframe: [
      'absolute',
      'top-0',
      'left-0',
      'w-full',
      'h-full',
      'rounded-general-border-radius-label',
    ],
    noImageContainer: [
      'flex',
      'items-center',
      'justify-center',
      'h-full',
      'bg-color-grayscale-400',
      'rounded-component-article-card-image-radius',
    ],
    noImageIcon: ['text-color-text-text-secondary', 'opacity-50'],
    imageWrapper: [
      'w-full',
      'h-full',
      'object-cover',
      'rounded-component-article-card-image-radius',
    ],
  },
  variants: {
    colCount: {
      '1': {
        container: ['flex-col', 'md:flex-row', 'md:gap-0'],
        videoImageContainer: [
          'sm:py-component-video-card-landscape-image-padding-y',
          'sm:px-component-video-card-landscape-image-padding-x',
          'sm:pr-0',
        ],
        videoOverlay: [
          'sm:my-component-video-card-landscape-image-padding-y',
          'sm:mx-component-video-card-landscape-image-padding-x',
          'sm:mr-0',
        ],
        body: ['flex-row', 'items-start', 'text-left', 'lg:pl-0'],
        description: ['md:line-clamp-3', 'lg:line-clamp-6'],
        contentWrapper: [
          'text-left',
          'justify-center',
          'sm:py-component-video-card-landscape-content-padding-y',
          'sm:px-component-video-card-landscape-content-padding-x',
          'lg:py-component-video-card-landscape-content-1-col-padding-y',
          'lg:px-component-video-card-landscape-content-1-col-padding-x',
        ],
        playButtonOverlay: [
          'bottom-3',
          'right-3',
          'lg:bottom-5',
          'lg:right-5',
          'scale-75',
          'lg:scale-100',
        ],
      },
      '2': {
        container: ['flex-col', 'md:flex-row'],
        videoImageContainer: [
          'aspect-video',
          'lg:aspect-[5/4]',
          'sm:py-component-video-card-landscape-image-padding-y',
          'sm:px-component-video-card-landscape-image-padding-x',
          'sm:pr-0',
        ],
        videoOverlay: [
          'sm:my-component-video-card-landscape-image-padding-y',
          'sm:mx-component-video-card-landscape-image-padding-x',
          'sm:mr-0',
        ],
        body: ['flex-row', 'items-start', 'text-left'],
        description: ['md:line-clamp-3', 'lg:line-clamp-2'],
        contentWrapper: [
          'text-left',
          'justify-center',
          'sm:py-component-video-card-landscape-content-padding-y',
          'sm:px-component-video-card-landscape-content-padding-x',
        ],
        playButtonOverlay: ['bottom-3', 'right-3', 'scale-75'],
      },
      '3': {
        container: ['flex-col'],
        body: ['flex-col', 'items-start', 'text-left'],
        contentWrapper: ['h-full', 'text-left'],
        playButtonOverlay: ['bottom-3', 'right-3', 'scale-75'],
        videoLink: ['h-auto', 'items-end'],
      },
      '4': {
        container: ['flex-col'],
        body: ['flex-col', 'items-center', 'text-left'],
        contentWrapper: ['h-full', 'text-left'],
        playButtonOverlay: ['bottom-3', 'right-3', 'scale-75'],
        videoLink: ['h-auto', 'items-end'],
      },
    },
  },
});
