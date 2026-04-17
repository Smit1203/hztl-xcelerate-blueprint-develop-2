// Global
import React, { useEffect, useRef, useState, JSX } from 'react';
import { tv } from 'tailwind-variants';
import { Text } from '@sitecore-content-sdk/nextjs';

// Local
import { withStandardComponentWrapper } from 'helpers/HOC';
import useDictionary from 'lib/hooks/useDictionary';
import { useRealPathName } from 'lib/hooks/useRealPathName';
import useClickOutside from 'lib/hooks/useClickOutside';
import { SvgIcon } from 'helpers/SvgIcon';
import { GlobalData } from '.generated/Feature.HztlFoundation.model';
import ImageWrapper from 'helpers/SitecoreWrappers/ImageWrapper/ImageWrapper';
import { getTestProps } from 'lib/testing/utils';
import { useCurrentPage, useSiteSettings } from 'lib/hooks/sitecore/context';

type ShareElement = GlobalData.Share;

const Share = (): JSX.Element => {
  const { getDictionaryValue } = useDictionary();

  const siteSettings = useSiteSettings();
  const { socialShareLinks } = siteSettings ?? {};

  const [currentUrl, setCurrentUrl] = useState('');
  const [toggleShareMenu, setToggleShareMenu] = useState(false);
  const [isClickedOnCopyLink, setIsClickedOnCopyLink] = useState(false);

  const componentRef = useRef<HTMLDivElement>(null);
  const page = useCurrentPage();
  const Title = page?.fields?.OpenGraphTitle;
  const Description = page?.fields?.OpenGraphDescription;
  const ogImage = page?.fields?.OpenGraphImageUrl;
  const canonicalUrl = page?.fields?.canonicalUrl?.value;

  const pathName = useRealPathName();

  useEffect(() => {
    const isBrowser = typeof window !== 'undefined';
    if (isBrowser) {
      setCurrentUrl(window.location.href);
    }
  }, [pathName]);

  const handleOnClick = async () => {
    if (navigator.share) {
      const payload = {
        url: canonicalUrl || currentUrl,
        title: Title?.value,
        text: Description?.value,
      };
      const canShare = navigator.canShare(payload);
      if (!canShare) return;

      navigator.share(payload).catch(console.error);
    } else {
      setToggleShareMenu(!toggleShareMenu);
    }
  };

  // Close share dropdown when click on outside
  const handleOutsideClick = () => {
    setToggleShareMenu(false);
  };

  // Click outside hook.
  useClickOutside(componentRef, toggleShareMenu, handleOutsideClick);

  const handleShareClick = (shareItem: string = '') => {
    switch (shareItem?.toLowerCase()) {
      case 'print':
        window.print();
        break;

      case 'copy':
        setIsClickedOnCopyLink(!isClickedOnCopyLink);
        navigator.clipboard
          .writeText(currentUrl as string)
          .then(() => {
            setTimeout(() => {
              setIsClickedOnCopyLink(false);
              setToggleShareMenu(false);
            }, 3000);
          })
          .catch((err) => {
            console.error('Error copying text to clipboard', err);
          });
        break;

      default:
        break;
    }
  };

  const getRedirectionLink = (urlLink: string = '') => {
    const redirectionLink = urlLink
      .replace('$url', canonicalUrl || currentUrl)
      .replaceAll('$title', encodeURIComponent(Title?.value ?? ''))
      .replace('$description', encodeURIComponent(Description?.value ?? ''))
      .replace('$image', ogImage?.value?.src ?? '');
    return redirectionLink;
  };

  const {
    base,
    cta,
    content,
    shareListPanel,
    header,
    headerText,
    closeIcon,
    shareLinkItem,
    shareLinkText,
  } = TAILWIND_VARIANTS();
  return (
    <section data-component="authorable/shared/media/share" {...getTestProps(`component-share}`)}>
      <div className={base()} ref={componentRef}>
        <button
          aria-label={getDictionaryValue('ShareDialogHeading')}
          className={cta()}
          onClick={() => handleOnClick()}
          onKeyDown={(e) => {
            if (e.key === 'Escape' && toggleShareMenu) {
              setToggleShareMenu(false);
            }
          }}
          {...getTestProps(`share-button`)}
        >
          <SvgIcon icon="share" size="sm" />
        </button>
        {toggleShareMenu && (
          <div
            className={shareListPanel()}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                setToggleShareMenu(false);
              }
            }}
            {...getTestProps(`share-panel`)}
          >
            <div className={header()}>
              <div>
                <Text
                  className={headerText()}
                  encode={false}
                  field={{ value: getDictionaryValue('ShareDialogHeading') }}
                  tag="p"
                  {...getTestProps(`dialog-heading`)}
                />
              </div>
              <button
                aria-label="Close"
                onClick={() => setToggleShareMenu(!toggleShareMenu)}
                {...getTestProps(`close-button`)}
              >
                <SvgIcon className={closeIcon()} icon="share-close" size="sm" />
              </button>
            </div>
            <div className={content()}>
              {socialShareLinks?.map((shareListItem: ShareElement, index: number) => {
                const urlValue = shareListItem?.fields?.url?.value;
                const isLinkToOpen =
                  urlValue?.includes('http') || urlValue?.toLowerCase()?.includes('mailto');

                const showCopiedText =
                  isClickedOnCopyLink &&
                  shareListItem?.fields?.url?.value?.toLowerCase() === 'copy';

                return (
                  <React.Fragment key={index}>
                    <a
                      {...getTestProps(`link-${index}`)}
                      className={shareLinkItem()}
                      href={`${isLinkToOpen ? `${getRedirectionLink(urlValue)}` : 'javascript:void(0)'} `}
                      target={`${isLinkToOpen ? '_blank' : ''}`}
                      onClick={(e) => {
                        if (!isLinkToOpen) {
                          e.preventDefault();
                          handleShareClick(shareListItem?.fields?.url?.value);
                        }
                      }}
                    >
                      <ImageWrapper
                        field={shareListItem?.fields?.icon}
                        {...getTestProps(`image-${index}`)}
                      />
                      <Text
                        className={shareLinkText()}
                        encode={false}
                        field={{
                          value: showCopiedText
                            ? getDictionaryValue('ClickedLinkText')
                            : shareListItem?.fields?.title?.value,
                        }}
                        tag="span"
                        {...getTestProps(`text-${index}`)}
                      />
                    </a>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export const Default = withStandardComponentWrapper(Share, false);

const TAILWIND_VARIANTS = tv({
  defaultVariants: {
    style: 'primary',
  },
  slots: {
    base: ['print:hidden', 'relative', 'z-10'],
    cta: ['hover:bg-color-fill-fill-transparent-hover', 'rounded-sm', 'p-1'],
    shareListPanel: [
      'absolute',
      'bg-color-surface-surface-hover',
      'flex',
      'flex-col',
      'gap-2',
      'shadow-[0px_8px_16px_-4px]',
      'shadow-color-black-alpha-20',
      'p-4',
      'top-9',
      'min-w-[200px]',
      'rounded-lg',
      'border',
      'border-color-border-border-secondary',
    ],
    content: ['flex', 'flex-col'],
    header: ['flex', 'items-center', 'justify-between'],
    headerText: ['text-color-text-text', 'text-base', 'font-bold'],
    closeIcon: ['cursor-pointer', '!h-6', '!w-6'],
    shareLinkItem: [
      'cursor-pointer',
      'flex',
      'flex-row',
      'gap-2',
      'p-2',
      'rounded-sm',
      'hover:bg-color-fill-fill-transparent-hover',
    ],
    shareLinkText: ['text-base', 'font-semibold'],
  },
});
