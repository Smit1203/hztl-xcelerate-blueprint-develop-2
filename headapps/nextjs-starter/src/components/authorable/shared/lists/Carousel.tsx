'use client';

// Global
import { Splide as SplideCore } from '@splidejs/splide';
import { Intersection } from '@splidejs/splide-extension-intersection';
import { Splide, SplideProps, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import '@splidejs/splide/css';
import { useEffect, useRef, useState, JSX } from 'react';
import { tv } from 'tailwind-variants';

// Local
import { Lists } from '.generated/Lists/Carousel.model';
import { withStandardComponentWrapper } from 'helpers/HOC';
import { SvgIcon } from 'helpers/SvgIcon';
import useDictionary from 'lib/hooks/useDictionary';
import { PlaceholderWrapper } from 'helpers/SitecoreWrappers/PlaceholderWrapper/PlaceholderWrapper';
import useIsEditing from 'lib/hooks/useIsEditing';
import { EditingHelpText } from 'helpers/Editing/EditingHelpText';
import { getTestProps } from 'lib/testing/utils';

export type CarouselProps = Lists.Carousel.CarouselItem_Component & {
  params: {
    autoLoop: '0' | '1' | undefined;
    autoPlay: '0' | '1' | undefined;
  };
};

const SPLIDE_INTERVAL = 3000;

const SPLIDE_SPEED = 300;

const Carousel = (props: CarouselProps): JSX.Element => {
  const { DynamicPlaceholderId, RenderingIdentifier, autoLoop, autoPlay } = props?.params || {};

  const boolAutoLoop = autoLoop === '1' ? true : false;
  const boolAutoPlay = autoPlay === '1' ? true : false;
  const phKey = `carousel-${DynamicPlaceholderId}`;
  const splideRef = useRef<SplideCore | null>(null);
  const [isPlaying, setIsPlaying] = useState(boolAutoPlay);
  const [totalSlides, setTotalSlides] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { getDictionaryValue } = useDictionary();

  const isEditing = useIsEditing();

  useEffect(() => {
    if (!splideRef.current) return;
    if (boolAutoPlay) {
      splideRef.current.Components.Autoplay.play();
    } else {
      splideRef.current.Components.Autoplay.pause();
    }
    setIsPlaying(boolAutoPlay);
  }, [boolAutoPlay, splideRef, boolAutoLoop]);

  const splideOptions: SplideProps['options'] = {
    autoplay: isPlaying,
    gap: '.02rem',
    arrows: false,
    intersection: {
      inView: {
        autoplay: isPlaying,
      },
      outView: {
        autoplay: false,
      },
    },
    interval: SPLIDE_INTERVAL,
    pagination: false,
    perMove: 1,
    perPage: 1,
    rewind: boolAutoLoop || isPlaying,
    speed: SPLIDE_SPEED,
    type: 'slide',
    width: '100%',
    drag: true,
    rewindByDrag: boolAutoLoop || isPlaying,
  };

  /*
   * Event Handers
   */
  const onMove = (_instance: SplideCore, newIndex: number) => {
    setCurrentIndex(newIndex);
  };
  const onMoved = (instance: SplideCore) => {
    setTotalSlides(instance?.length);
  };

  /*
   * Rendering
   */
  const {
    base,
    screenReader,
    slideArrows,
    customPagination,
    actionButtonControl,
    customControlWrapper,
    customPaginationDotsWrapper,
    paginationDots,
    dotStyle,
    carouselPlayPauseStyle,
  } = TAILWIND_VARIANTS();

  if (isEditing) {
    return (
      <section data-component="authorable/shared/lists/carousel" id={RenderingIdentifier}>
        <EditingHelpText>
          Carousel rendered as flat list for ease of editing. Use preview to see carousel in action.
        </EditingHelpText>
        <PlaceholderWrapper
          name={phKey}
          rendering={props.rendering}
          // Wrap the component in a <Splide>.
          // If there are no components it won't render an empty carousel
          // It also ensures that when editing in Page Builder, it will show the help text outside of the <ul>
          render={(components) => (
            <div className={base()}>
              {components.map((comp, index) => (
                <div key={index} className="relative">
                  {comp}
                </div>
              ))}
            </div>
          )}
        />
      </section>
    );
  }
  return (
    <section
      data-component="authorable/shared/lists/carousel"
      id={RenderingIdentifier}
      {...getTestProps(`component-carousel-${props?.rendering?.uid}`)}
    >
      <PlaceholderWrapper
        name={phKey}
        rendering={props.rendering}
        render={(components) => (
          <div className={base()}>
            <Splide
              ref={(ref) => {
                if (ref?.splide) {
                  splideRef.current = ref.splide;
                }
              }}
              extensions={{ Intersection }}
              hasTrack={false}
              onMounted={onMoved}
              onMove={onMove}
              onMoved={onMoved}
              options={splideOptions}
            >
              <SplideTrack>
                {components.map((comp, index) => (
                  <SplideSlide
                    tabIndex={index !== currentIndex ? -1 : 0}
                    aria-hidden={index !== currentIndex}
                    key={index}
                    {...getTestProps(`slide-${index}`)}
                  >
                    {currentIndex === index ? comp : null}
                  </SplideSlide>
                ))}
              </SplideTrack>
            </Splide>
            <div className={customPagination()}>
              <div className={customControlWrapper()}>
                <button
                  onClick={() => {
                    if (!splideRef.current) return;
                    if (isPlaying) {
                      splideRef.current.Components.Autoplay.pause();
                    } else {
                      splideRef.current.Components.Autoplay.play();
                    }
                    setIsPlaying((prev) => !prev);
                  }}
                  className={actionButtonControl()}
                  aria-label={`${isPlaying ? 'carousel-pause' : 'carousel-play'}`}
                  {...getTestProps(`play-pause-button`)}
                >
                  <span className={screenReader()}>
                    {getDictionaryValue(`${isPlaying ? 'PlaySlideshow' : 'PauseSlideshow'}`)}
                  </span>
                  <SvgIcon
                    className={carouselPlayPauseStyle()}
                    icon={isPlaying ? 'carousel-pause' : 'carousel-play'}
                    viewBox={isPlaying ? '8 10 24 24' : '11 12 24 24'}
                    fill="none"
                    size="s"
                  />
                </button>
                <nav
                  role="navigation"
                  aria-label="Carousel Pagination"
                  {...getTestProps(`pagination`)}
                >
                  <ul className={customPaginationDotsWrapper()}>
                    {Array.from({ length: totalSlides }).map((_, i) => (
                      <li key={i}>
                        <button
                          onClick={() => splideRef.current?.go(i)}
                          className={paginationDots({ isActiveSlide: i === currentIndex })}
                          aria-label={`Go to slide ${i + 1}`}
                          {...getTestProps(`pagination-dot-${i}`)}
                        >
                          <SvgIcon
                            icon={
                              i === currentIndex ? 'carousel-active-pagedot' : 'carousel-pagedot'
                            }
                            size={i === currentIndex ? 'm' : 'xxs'}
                            viewBox={i === currentIndex ? '0 0 40 12' : '0 0 12 12'}
                            className={dotStyle({ isActiveSlide: i === currentIndex })}
                          />
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
              <div className={slideArrows()}>
                <button
                  onClick={() => splideRef.current?.go('<')}
                  className={actionButtonControl({
                    isArrowDisabled: currentIndex === 0 && !boolAutoLoop,
                  })}
                  aria-label="carousel-prev"
                  disabled={currentIndex === 0 && !boolAutoLoop}
                  {...getTestProps(`carousel-prev`)}
                >
                  <SvgIcon icon="carousel-arrow-left" size="s" viewBox="0 0 20 20" />
                </button>
                <button
                  onClick={() => splideRef.current?.go('>')}
                  className={actionButtonControl({
                    isArrowDisabled: currentIndex === totalSlides - 1 && !boolAutoLoop,
                  })}
                  aria-label="carousel-next"
                  disabled={currentIndex === totalSlides - 1 && !boolAutoLoop}
                  {...getTestProps(`carousel-next`)}
                >
                  <SvgIcon icon="carousel-arrow-right" size="s" viewBox="0 0 20 20" />
                </button>
              </div>
            </div>
          </div>
        )}
      />
    </section>
  );
};

export const Default = withStandardComponentWrapper(Carousel, false);

const TAILWIND_VARIANTS = tv({
  slots: {
    base: ['overflow-hidden', 'relative', 'flex', 'flex-col', 'md:gap-0', 'gap-spacing-spacing-16'],
    screenReader: ['sr-only'],
    slideArrows: ['flex', 'gap-2'],
    customPagination: [
      'py-component-carousel-utility-bar-padding-y',
      'px-component-carousel-utility-bar-padding-x',
      'flex',
      'justify-between',
    ],
    actionButtonControl: [
      'p-2',
      'border-border-width-width-025',
      'border-color-border-mid',
      'rounded-full',
      'w-11',
      'h-11',
    ],
    customControlWrapper: ['flex', 'gap-spacing-spacing-16', 'items-center'],
    customPaginationDotsWrapper: ['flex', 'gap-spacing-spacing-8', 'items-center'],
    paginationDots: [],
    carouselPlayPauseStyle: ['text-color-fill-brand-1'],
    dotStyle: [],
  },
  variants: {
    isActiveSlide: {
      true: {
        paginationDots: ['w-10', 'h-6', 'flex', 'justify-center', 'items-center'],
        dotStyle: ['!w-10', 'text-color-fill-brand-1'],
      },
      false: {
        paginationDots: ['w-6', 'h-6', 'flex', 'justify-center', 'items-center'],
        dotStyle: ['text-color-grayscale-500'],
      },
    },
    isArrowDisabled: {
      true: {
        actionButtonControl: ['opacity-50'],
      },
    },
  },
});
