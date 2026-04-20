'use client';

// Global
import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { tv } from 'tailwind-variants';

// Local
import LanguageSelector from './LanguageSelector';
import ImageWrapper from 'helpers/SitecoreWrappers/ImageWrapper/ImageWrapper';
import LinkWrapper from 'helpers/SitecoreWrappers/LinkWrapper/LinkWrapper';
import PlainTextWrapper from 'helpers/SitecoreWrappers/PlainTextWrapper/PlainTextWrapper';
import { SvgIcon } from 'helpers/SvgIcon';
import useClickOutside from 'lib/hooks/useClickOutside';
import { useIsScrolled } from 'lib/hooks/useIsScrolled';
import { useOnRouteChange } from 'lib/hooks/useOnRouteChange';
import { Data } from '.generated/Foundation.HztlFoundation.model';
import { SiteStructure } from '.generated/SiteStructure/Header.model';
import { useHeader } from './HeaderContext';
import useDictionary from 'lib/hooks/useDictionary';
import { Field, ImageField, LinkField } from '@sitecore-content-sdk/nextjs';
import { getTestProps } from 'lib/testing/utils';
import PreviewSearchListComponent from 'widgets/SearchPreview';
import { useIsMobile } from 'lib/hooks/useIsMobile';
import { useSiteSettings } from 'lib/hooks/sitecore/context';
import { toValidId } from 'lib/utils/validate-id-utils';

const DropdownMenu = (props: SiteStructure.Header.NavigationGroup_Item) => {
  const { getDictionaryValue } = useDictionary();

  const isScrolled = useIsScrolled();

  const {
    featureTitle,
    featureImage,
    featureDescription,
    navigationLink,
    navigationTitle,
    megaMenuList,
  } = props.fields || {};

  const {
    dropDownMenuCol,
    dropDownMenuColHeading,
    dropDownMenuColItems,
    dropDownMenuColItemsLink,
    dropDownMenuGrid,
    dropDownMenuInner,
    dropDownMenuSection,
    dropDownMenuWrapper,
    dropDownFeaturedWrapper,
    dropDownFeaturedImg,
    dropDownFeaturedContent,
    dropDownFeaturedTitle,
    dropDownFeaturedDescription,
    featuredLink,
    linkContent,
  } = TAILWIND_VARIANTS({
    isScrolled: isScrolled,
  });

  // Use navigationTitle as fallback if featureTitle is empty
  const displayTitle = featureTitle?.value ? featureTitle : navigationTitle;

  return (
    <div className={dropDownMenuWrapper()} aria-orientation="vertical">
      <div className={dropDownMenuInner()}>
        <div className={dropDownMenuSection()}>
          <div className={dropDownMenuGrid()}>
            {megaMenuList?.map((category, index) => {
              const { megaMenuTitle, megaMenuLinks, megaMenuCTA } = category.fields || {};
              const menuLinks = megaMenuLinks as Data.Links.GenericLink_Item[];
              const categoryMenuCTA = megaMenuCTA && (megaMenuCTA as LinkField);
              if (categoryMenuCTA?.value?.href) {
                categoryMenuCTA.value.text = getDictionaryValue('CategoryCTAName');
              }

              return (
                <div
                  aria-labelledby={`secondary-menu-${index + 1}`}
                  className={dropDownMenuCol()}
                  key={category.id}
                  role="group"
                  {...getTestProps(`header-secondary-menu-category-${index + 1}`)}
                >
                  <PlainTextWrapper
                    field={megaMenuTitle as Field<string>}
                    tag="h2"
                    className={dropDownMenuColHeading()}
                    id={`secondary-menu-${index + 1}`}
                  />
                  <ul className={dropDownMenuColItems()}>
                    {menuLinks
                      ?.filter((item) => item.fields?.link?.value?.href)
                      .map((item) => (
                        <li key={item.id}>
                          <LinkWrapper
                            ctaComponentClass="default"
                            className={dropDownMenuColItemsLink()}
                            field={item.fields?.link}
                            tabIndex={0}
                            {...getTestProps(`header-secondary-menu-${index + 1}-nav-link`)}
                          >
                            <NavLink link={item.fields?.link} name={item.name} />
                          </LinkWrapper>
                        </li>
                      ))}
                    {categoryMenuCTA?.value?.href && (
                      <li>
                        <LinkWrapper
                          ctaComponentClass="default"
                          className={dropDownMenuColItemsLink()}
                          field={categoryMenuCTA}
                          tabIndex={0}
                          {...getTestProps(`header-secondary-menu-category-${index + 1}-nav-link`)}
                        >
                          <NavLink link={categoryMenuCTA} name={categoryMenuCTA?.value?.text} />
                        </LinkWrapper>
                      </li>
                    )}
                  </ul>
                </div>
              );
            })}
          </div>
          {navigationLink?.value?.href && (
            <div className={dropDownFeaturedWrapper()} role="complementary">
              <ImageWrapper
                field={featureImage}
                className={dropDownFeaturedImg()}
                layout="intrinsic"
              />
              <div className={dropDownFeaturedContent()}>
                <PlainTextWrapper
                  tag="h3"
                  field={displayTitle}
                  className={dropDownFeaturedTitle()}
                />
                <PlainTextWrapper
                  tag="p"
                  field={featureDescription}
                  className={dropDownFeaturedDescription()}
                />
                <LinkWrapper
                  ctaComponentClass="default"
                  className={featuredLink()}
                  field={navigationLink}
                  tabIndex={0}
                >
                  <span className={linkContent()}>
                    {navigationLink?.value?.text || displayTitle?.value}
                  </span>
                </LinkWrapper>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const NavLink = ({ link, name }: { link: LinkField | undefined; name?: string }) => {
  const { linkContent } = TAILWIND_VARIANTS();

  return <span className={linkContent()}>{link?.value?.text || name}</span>;
};

export const Logo = ({
  logo,
  logoLink,
  isMobile,
}: {
  logo?: ImageField;
  logoLink?: LinkField;
  isMobile: boolean;
}) => {
  const { logoContainer } = TAILWIND_VARIANTS();

  return (
    <div className={logoContainer()}>
      <LinkWrapper
        ctaComponentClass="default"
        field={logoLink?.value}
        role={isMobile ? '' : 'menuitem'}
        {...getTestProps(`header-logo`)}
      >
        <ImageWrapper field={logo} priority />
      </LinkWrapper>
    </div>
  );
};

interface NavItemInterface extends SiteStructure.Header.NavigationGroup_Item {
  dropdownOpen: number | null;
  index: number;
  open: () => void;
  close: () => void;
  headerRef: React.RefObject<HTMLDivElement | null>;
}

const NavItem = (props: NavItemInterface) => {
  const { dropdownOpen, index, headerRef } = props || {};

  const megaMenuList = props?.fields?.megaMenuList as SiteStructure.Header.MegaMenuGroup_Item[];
  const navigationLink = props?.fields?.navigationLink;
  const navigationTitle = props?.fields?.navigationTitle;

  const isList = megaMenuList.length > 0;
  const navigationLinks = navigationLink?.value?.href;

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryString = searchParams?.toString() ?? '';
  const asPath = `${pathname ?? ''}${queryString ? `?${queryString}` : ''}`;

  /*
   * State
   */

  const [isActive, setIsActive] = useState(false);
  const megaNavRef = useRef<HTMLDivElement>(null);
  const lastIndexRef = useRef<number | null>(null);
  const menuItemRef = useRef<HTMLLIElement>(null);

  /*
   * EVENT HANDLERS
   */

  const handleOnBlur = (event: React.FocusEvent<HTMLLIElement>) => {
    if (!isList) return;

    // Only close if we have a relatedTarget and it's outside the current menu item
    if (event.relatedTarget !== null && !event.currentTarget.contains(event.relatedTarget)) {
      props?.close();
    }
  };

  const handleMouseEnter = (_event: React.MouseEvent) => {
    if (isList) {
      // Only trigger overlay change if we're opening a new menu
      if (dropdownOpen !== index) {
        props?.open();
      }
      lastIndexRef.current = index;
    } else if (lastIndexRef.current !== index) {
      props?.close();
    }
  };

  const handleMouseLeave = (event: React.MouseEvent) => {
    if (!isList) return;

    const relatedTarget = event.relatedTarget as HTMLElement | null;
    const isInMegaNav =
      relatedTarget instanceof HTMLElement && megaNavRef.current?.contains(relatedTarget);
    const isInHeader =
      relatedTarget instanceof HTMLElement && headerRef.current?.contains(relatedTarget);

    if (!isInHeader && !isInMegaNav) {
      props?.close();
    }
  };

  const handleMegaNavMouseEnter = () => {
    // Keep the menu open when entering the mega nav
    if (isList && dropdownOpen === index) {
      return;
    }
    props?.open();
  };

  // Use click outside for the menu item and mega nav
  useClickOutside(menuItemRef, dropdownOpen === index, () => {
    if (dropdownOpen === index) {
      props?.close();
    }
  });

  /*
   * Lifecycle
   */

  useEffect(() => {
    if (isList) {
      const hrefValues = megaMenuList
        .flatMap((category) => category.fields?.megaMenuLinks as Data.Links.GenericLink_Item[])
        .map((linkItem) => linkItem.fields?.link?.value.href)
        .filter((href) => href);
      setIsActive(hrefValues.includes(asPath));
    } else {
      setIsActive(asPath === navigationLinks);
    }
  }, [isList, megaMenuList, navigationLinks, asPath]);

  // Skip rendering if no link and not a dropdown
  if (!navigationLinks && !isList) return null;

  /*
   * Rendering
   */

  const {
    buttonItem,
    buttonItemIcon,
    buttonItemSublink,
    navTitleLinkWrapper,
    navAnimation,
    navActiveStrokes,
  } = TAILWIND_VARIANTS({
    isActive: isActive,
    isRotated: isList && index === dropdownOpen,
  });

  return (
    <li
      onBlur={handleOnBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="presentation"
      ref={menuItemRef}
    >
      {isList ? (
        <>
          <button
            aria-haspopup="true"
            aria-expanded={dropdownOpen === index}
            className={buttonItem()}
            onClick={() => isList && props.open()}
            {...getTestProps(`header-nav-button`)}
            role="menuitem"
            aria-controls={`meganav-${toValidId(navigationTitle?.value || '')}`}
          >
            <span className={navAnimation()} />
            <span className={buttonItemSublink()}>
              <PlainTextWrapper field={navigationTitle} />
              <SvgIcon
                className={buttonItemIcon()}
                fill="currentColor"
                icon="chevron-up"
                size="xs"
                viewBox="0 0 24 24"
              />
            </span>
          </button>
          {index === dropdownOpen && (
            <div
              ref={megaNavRef}
              onMouseEnter={handleMegaNavMouseEnter}
              id={`meganav-${toValidId(navigationTitle?.value || '')}`}
            >
              <DropdownMenu {...props} />
            </div>
          )}
        </>
      ) : (
        <LinkWrapper
          ctaComponentClass="default"
          aria-haspopup="false"
          className={navTitleLinkWrapper()}
          ctaVariant="link"
          field={navigationLink}
          {...getTestProps(`header-nav-link`)}
          role="menuitem"
        >
          <span className={isActive ? navActiveStrokes() : navAnimation()} />
          <PlainTextWrapper field={navigationTitle} />
        </LinkWrapper>
      )}
    </li>
  );
};

type HeaderDesktopProps = SiteStructure.Header.Header_Component;

const HeaderDesktop = (props: HeaderDesktopProps) => {
  const { fields } = props || {};
  const { logo, logoLink, regionList } = fields || {};

  const navigationList = fields?.navigationList as SiteStructure.Header.NavigationGroup_Item[];

  const headerRef = useRef<HTMLDivElement>(null);
  const menuContainerRef = useRef<HTMLDivElement>(null);
  const searchBoxContainerRef = useRef<HTMLDivElement>(null);
  const languageButtonRef = useRef<HTMLButtonElement>(null);

  const siteSettings = useSiteSettings();
  // Get search sources from site settings
  const globalSources = siteSettings?.globalSearchSourceId?.value;

  // Parse pipe-separated sources into array
  const sources = [
    ...(globalSources
      ? globalSources
          .split('|')
          .map((s) => s.trim())
          .filter((s) => s)
      : []),
  ];

  const rfkid = siteSettings?.globalSearchPreviewWidgetId?.value;

  const {
    isDesktopDropdownOpen,
    isDesktopLanguageSelectorOpen,
    showSearch,
    setDesktopDropdownOpen,
    setDesktopLanguageSelectorOpen,
    setShowSearch,
    closeDesktopMenus,
    handleOverlayChange,
  } = useHeader();

  const isMobileDevice = useIsMobile();
  const { getDictionaryValue } = useDictionary();

  /*
   * STATE
   */
  const isScrolled = useIsScrolled();
  const isDropdownOpen =
    isDesktopDropdownOpen !== null || showSearch || isDesktopLanguageSelectorOpen;

  // Reset overlay state when component mounts (handles mobile to desktop transition)
  // useEffect(() => {
  //   closeDesktopMenus();
  // }, [closeDesktopMenus]); // Commenting due to having issue while opening searchbox

  useEffect(() => {
    const currentHeaderRef = headerRef.current;
    if (!currentHeaderRef) return;

    const handleHeaderClick = (e: MouseEvent) => {
      // Don't close if clicking inside the header and any menu is open
      if (
        currentHeaderRef.contains(e.target as Node) &&
        (isDesktopDropdownOpen !== null || isDesktopLanguageSelectorOpen)
      ) {
        return;
      }
    };

    currentHeaderRef.addEventListener('click', handleHeaderClick);
    return () => {
      currentHeaderRef.removeEventListener('click', handleHeaderClick);
    };
  }, [isDesktopDropdownOpen, isDesktopLanguageSelectorOpen]);

  useEffect(() => {
    if (showSearch && searchBoxContainerRef.current) {
      // Focus the first input inside the search box
      const input = searchBoxContainerRef.current.querySelector('input');
      if (input) {
        (input as HTMLElement).focus();
        // Add keydown listener for Tab - improved accessibility
        const handleTab = (e: KeyboardEvent) => {
          if (e.key === 'Tab' && !e.shiftKey) {
            // Get all focusable elements in the search form
            const searchForm = searchBoxContainerRef.current?.querySelector('form');
            if (searchForm) {
              const focusableElements = searchForm.querySelectorAll(
                'input, button:not([disabled])'
              );
              const focusableArray = Array.from(focusableElements) as HTMLElement[];
              const currentIndex = focusableArray.indexOf(e.target as HTMLElement);

              // If we're on the last focusable element, exit search and go to language button
              if (currentIndex === focusableArray.length - 1 && languageButtonRef.current) {
                e.preventDefault();
                languageButtonRef.current.focus();
                setShowSearch(false);
              }
              // Otherwise, let natural tab order proceed within the search form
            }
          }
        };

        // Store ref in variable to avoid stale closure
        const currentRef = searchBoxContainerRef.current;

        // Add the event listener to the search container to catch all tab events
        currentRef.addEventListener('keydown', handleTab);

        // Cleanup
        return () => {
          currentRef?.removeEventListener('keydown', handleTab);
        };
      }
      // Explicitly return undefined if input is not found
      return undefined;
    }
    // Explicitly return undefined if showSearch is false or ref is not set
    return undefined;
  }, [showSearch, setShowSearch]);

  /*
   * EVENT HANDLERS
   */

  const handleDropdownToggle = useCallback(
    (index: number | null) => {
      // If language selector is being opened, close any other open menus
      if (index === null) {
        setDesktopDropdownOpen(null);
        setShowSearch(false);
        return;
      }

      // If clicking on a menu item while language selector is open, close language selector
      if (isDesktopLanguageSelectorOpen) {
        setDesktopLanguageSelectorOpen(false);
      }

      setDesktopDropdownOpen(index);
      setShowSearch(false);
      handleOverlayChange();
    },
    [
      setDesktopDropdownOpen,
      setShowSearch,
      isDesktopLanguageSelectorOpen,
      setDesktopLanguageSelectorOpen,
      handleOverlayChange,
    ]
  );

  /*
   * LIFECYCLE
   */

  useClickOutside(headerRef, isDropdownOpen || showSearch, closeDesktopMenus);

  useOnRouteChange(closeDesktopMenus);

  /*
   * Rendering
   */

  if (!fields) {
    return <></>;
  }

  const {
    base,
    wrapper,
    inner,
    container,
    menuContainer,
    menuWrapper,
    menuItems,
    languageWrapper,
    searchBoxWrapper,
    searchBox,
  } = TAILWIND_VARIANTS({
    isDropdownOpen: isDropdownOpen,
    isScrolled: isScrolled,
  });

  return (
    <>
      {!isMobileDevice && (
        <div
          className={base()}
          id="header-desktop"
          ref={headerRef}
          {...getTestProps(`header-desktop`)}
        >
          <div className={wrapper()}>
            <div className={inner()}>
              <div className={container()}>
                <div className={menuWrapper()} role="menubar">
                  <div className={menuContainer()} ref={menuContainerRef}>
                    <Logo logo={logo} logoLink={logoLink} isMobile={false} />
                    <ul className={menuItems()} role="presentation">
                      {navigationList?.map((item, index) => (
                        <NavItem
                          dropdownOpen={isDesktopDropdownOpen}
                          index={index}
                          key={item?.id}
                          headerRef={headerRef}
                          open={() => {
                            handleDropdownToggle(index);
                            setShowSearch(false);
                          }}
                          close={() => {
                            handleDropdownToggle(null);
                            setShowSearch(false);
                          }}
                          {...item}
                        />
                      ))}
                    </ul>
                  </div>
                  <div className={languageWrapper()}>
                    <button
                      aria-expanded={!!showSearch}
                      aria-label="Toggle Search"
                      onClick={() => setShowSearch(true)}
                      ref={languageButtonRef}
                      role="menuitem"
                      {...getTestProps(`header-language-wrapper`)}
                    >
                      <SvgIcon icon="magnifier" fill="none" size="sm" />
                    </button>
                    <LanguageSelector regionList={regionList} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {showSearch && (
            <div
              className={searchBoxWrapper()}
              ref={searchBoxContainerRef}
              {...getTestProps(`header-search-box`)}
            >
              <div className={searchBox()}>
                <PreviewSearchListComponent
                  hasSearchFromSearchPage={false}
                  searchSources={sources}
                  searchPlaceHolder={getDictionaryValue('SearchKeywords') || 'Search Keywords'}
                  defaultItemsPerPage={6}
                  rfkId={rfkid || ''}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default HeaderDesktop;

const TAILWIND_VARIANTS = tv({
  slots: {
    base: '',
    buttonItem: [
      'font-semibold',
      'relative',
      'group',
      'px-2',
      'py-1',
      'text-component-header-nav-link-text',
      'hover:text-component-header-nav-link-text-hover',
      'lg:text-typography-body-medium-font-size',
      'focus:outline-color-core-color-1-800',
    ],
    buttonItemIcon: ['duration-200', 'h-auto', 'trasition', '!w-xs'],
    buttonItemSublink: ['flex', 'gap-2', 'items-center'],
    container: [
      'max-w-screen-dimensions-max-width',
      'min-w-screen-dimensions-min-width',
      'px-general-spacing-margin-x',
      'w-full',
    ],
    dropDownMenuCol: ['flex', 'flex-col', 'gap-4', 'p-4'],
    dropDownMenuColHeading: [
      'font-semibold',
      'text-typography-body-small-font-size',
      'text-color-text-text-secondary',
      'text-sm',
    ],
    dropDownMenuColItems: ['flex', 'flex-col', 'gap-4', 'list-none'],
    dropDownMenuColItemsLink: [
      'text-component-header-mega-menu-link-text',
      'hover:text-component-header-mega-menu-link-text-hover',
      'hover:underline',
      'group',
      'flex',
      'items-center',
      'justify-between',
    ],
    dropDownMenuGrid: [
      'grid',
      'w-full',
      'grid-cols-1',
      'md:grid-cols-2',
      'lg:grid-cols-3',
      'xl:grid-cols-4',
      'gap-8',
      'p-8',
    ],
    dropDownMenuInner: [
      'bg-color-surface-surface',
      'border-b',
      'border-color-component-header-nav-bottom-border',
      'overflow-hidden',
    ],
    dropDownMenuSection: [
      'max-w-screen-dimensions-max-width',
      'min-w-screen-dimensions-min-width',
      'lg:px-general-spacing-margin-x',
      'flex',
      'xl:mx-auto',
    ],
    dropDownMenuWrapper: [
      'absolute',
      'left-0',
      'right-0',
      'bg-white',
      'z-10',
      'top-full',
      'max-h-[calc(100vh-100px)]',
      'overflow-y-auto',
    ],
    dropDownFeaturedWrapper: [
      'w-full',
      'max-w-sm',
      'bg-color-surface-surface-secondary',
      'py-spacing-spacing-24',
      'pl-spacing-spacing-24',
      'pr-spacing-spacing-80',
      'gap-spacing-spacing-24',
      'flex',
      'flex-col',
      'gap-1',
      'p-4',
      'relative',
      'before:absolute',
      'before:top-0',
      'before:left-full',
      'before:content-[""]',
      'before:bg-color-surface-surface-secondary',
      'before:h-full',
      'before:w-screen',
    ],
    dropDownFeaturedContent: ['flex', 'flex-col'],
    dropDownFeaturedTitle: [
      'font-typography-font-weight-medium',
      'text-typography-header-xxsmall-font-size',
    ],
    dropDownFeaturedDescription: [
      'font-typography-body-small-font-weight',
      'text-typography-body-small-font-size',
      'text-color-text-text-secondary',
      'text-sm',
    ],
    dropDownFeaturedImg: ['h-auto', 'rounded-lg'],
    svgIconClass: ['scale-x-0', '!h-5', '!w-5'],
    inner: ['flex', 'justify-center', 'transition-all', 'duration-200'],
    languageWrapper: [
      'flex',
      'w-[38%]',
      'lg:w-auto',
      'items-center',
      'justify-end',
      'lg:gap-space-between-base',
    ],
    logoContainer: ['flex', 'items-center'],
    menuContainer: ['flex'],
    menuItems: ['flex', 'items-center', 'px-2', 'xl:gap-4'],
    menuWrapper: ['flex', 'justify-between'],
    navAnimation: [
      'absolute',
      'inset-x-0',
      'bottom-0',
      'h-0.5',
      'bg-component-header-nav-link-icon',
      'transform',
      'origin-left',
      'scale-x-0',
      'transition-transform',
      'duration-300',
      'ease-out',
      'group-hover:scale-x-100',
    ],
    navActiveStrokes: [
      'absolute',
      'inset-x-0',
      'bottom-0',
      'h-0.5',
      'bg-component-header-nav-link-icon',
    ],
    navTitleLinkWrapper: [
      'font-semibold',
      'relative',
      'group',
      'px-2',
      'py-1',
      'text-component-header-mega-menu-link-text',
      'hover:text-component-header-mega-menu-link-text-hover',
      'lg:text-typography-body-medium-font-size-semibold',
    ],
    searchBoxWrapper: ['bg-color-surface-light', 'px-0', 'py-4'],
    searchBox: ['m-auto', 'max-w-screen-sm'],
    wrapper: ['border-color-border-border', 'border-b'],
    featuredLink: [
      'py-2',
      'text-component-header-mega-menu-link-text',
      'hover:text-component-header-mega-menu-link-text-hover',
      'hover:underline',
      'flex',
      'items-center',
      'justify-between',
      'group',
    ],
    linkContent: ['flex', 'items-center', 'gap-2'],
  },
  variants: {
    isActive: {
      false: {
        buttonItemIcon: ['text-component-header-nav-link-icon'],
        navActiveStrokes: ['scale-x-0'],
      },
      true: {
        buttonItemIcon: [],
        navActiveStrokes: ['scale-x-100'],
      },
    },
    isDropdownOpen: {
      false: {
        wrapper: ['border-b'],
      },
    },
    isRotated: {
      false: {
        buttonItemIcon: ['rotate-180', 'text-component-header-nav-link-icon'],
      },
      true: {
        buttonItemIcon: ['rotate-0', 'text-component-header-nav-link-icon'],
      },
    },
    isScrolled: {
      false: {
        inner: ['py-6'],
        divider: ['h-3'],
        dropDownMenuInner: ['border-t-0'],
      },
      true: {
        inner: ['py-3'],
        divider: ['h-2'],
        dropDownMenuInner: ['border-t', 'border-color-component-header-nav-bottom-border'],
      },
    },
  },
});
