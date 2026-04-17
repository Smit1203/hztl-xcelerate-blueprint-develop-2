// Global
import React, { useCallback, useRef } from 'react';
import { tv } from 'tailwind-variants';

// Local
import { Logo } from 'components/authorable/shared/site-structure/Header/HeaderDesktop';
import LanguageSelector from './LanguageSelector';
import LinkWrapper from 'helpers/SitecoreWrappers/LinkWrapper/LinkWrapper';
import PlainTextWrapper from 'helpers/SitecoreWrappers/PlainTextWrapper/PlainTextWrapper';
import ImageWrapper from 'helpers/SitecoreWrappers/ImageWrapper/ImageWrapper';
import { SvgIcon } from 'helpers/SvgIcon';
import useClickOutside from 'lib/hooks/useClickOutside';
import PreviewSearchBasicWidget from 'widgets/SearchPreview';
import { useOnRouteChange } from 'lib/hooks/useOnRouteChange';
import { SiteStructure } from '.generated/SiteStructure/Header.model';
import { Data } from '.generated/Foundation.HztlFoundation.model';
import useDictionary from 'lib/hooks/useDictionary';
import { useHeader } from './HeaderContext';
import { Field, LinkField } from '@sitecore-content-sdk/nextjs';
import { useIsMobile } from 'lib/hooks/useIsMobile';
import { getTestProps } from 'lib/testing/utils';
import { useSiteSettings } from 'lib/hooks/sitecore/context';
import { toValidId } from 'lib/utils/validate-id-utils';
type HeaderMobileProps = SiteStructure.Header.Header_Component;

const HeaderMobile = (props: HeaderMobileProps) => {
  const { fields } = props;
  const { logo, logoLink, regionList } = fields || {};

  const navigationList = fields?.navigationList as SiteStructure.Header.NavigationGroup_Item[];

  const isMobileDevice = useIsMobile();

  const headerRef = useRef<HTMLDivElement>(null);
  const menuContainerRef = useRef<HTMLDivElement>(null);
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
    isMobileMenuOpen,
    isMobileDropdownOpen,
    isMobileLanguageSelectorOpen,
    showSearch,
    setMobileDropdownOpen,
    setMobileMenuOpen,
    setShowSearch,
    setMobileLanguageSelectorOpen,
    closeMobileMenu,
    handleOverlayChange,
  } = useHeader();

  /*
   * STATE
   */

  const isDropdownOpen =
    isMobileDropdownOpen !== null || showSearch || isMobileMenuOpen || isMobileLanguageSelectorOpen;

  /*
   * EVENT HANDLERS
   */

  const handleDropdownToggle = useCallback(
    (index: number | null) => {
      // If language selector is open, close it first
      if (isMobileLanguageSelectorOpen) {
        setMobileLanguageSelectorOpen(false);
        // Then handle the dropdown toggle
        setMobileDropdownOpen(index);
        return;
      }

      // Normal dropdown toggle behavior when language selector is closed
      setMobileDropdownOpen(index);
    },
    [isMobileLanguageSelectorOpen, setMobileLanguageSelectorOpen, setMobileDropdownOpen]
  );

  const toggleHamburger = useCallback(() => {
    const newMenuState = !isMobileMenuOpen;
    setMobileMenuOpen(newMenuState);
    if (!newMenuState) {
      setShowSearch(false);
      setMobileDropdownOpen(null);
      setMobileLanguageSelectorOpen(false);
    }
    handleOverlayChange();
  }, [
    isMobileMenuOpen,
    setMobileMenuOpen,
    setShowSearch,
    setMobileDropdownOpen,
    setMobileLanguageSelectorOpen,
    handleOverlayChange,
  ]);

  const toggleSearch = useCallback(() => {
    const newMenuState = !isMobileMenuOpen;
    setMobileMenuOpen(newMenuState);
    setShowSearch(true);
    setMobileDropdownOpen(null);
    handleOverlayChange();
  }, [
    isMobileMenuOpen,
    setMobileMenuOpen,
    setShowSearch,
    setMobileDropdownOpen,
    handleOverlayChange,
  ]);

  /*
   * LIFECYCLE
   */

  useClickOutside(headerRef, isDropdownOpen || showSearch, closeMobileMenu);

  useOnRouteChange(closeMobileMenu);

  /*
   * Rendering
   */

  if (!fields) return <></>;

  const {
    hamburgerWrapper,
    headerSection,
    languageSelection,
    languageWrapper,
    menuItems,
    searchWrapper,
    wrapper,
  } = TAILWIND_VARIANTS({ isOpen: isMobileMenuOpen });

  return (
    <>
      {isMobileDevice && (
        <div
          className={wrapper()}
          id="header-mobile"
          ref={headerRef}
          {...getTestProps(`header-mobile-wrapper`)}
        >
          <div className={headerSection()}>
            <Logo logo={logo} logoLink={logoLink} isMobile={true} />
            <div className={hamburgerWrapper()}>
              <Hamburger
                openMenu={isMobileMenuOpen}
                toggleHamburger={toggleHamburger}
                toggleSearch={toggleSearch}
                showSearch={false}
              />
            </div>
          </div>
          {isMobileMenuOpen && (
            <div className={languageWrapper()} ref={menuContainerRef} id="header-mobile-menu">
              {showSearch ? (
                <div className={searchWrapper()}>
                  <PreviewSearchBasicWidget
                    defaultItemsPerPage={6}
                    hasSearchFromSearchPage={false}
                    searchSources={sources}
                    rfkId={rfkid || ''}
                  />
                </div>
              ) : (
                <>
                  <ul className={menuItems()}>
                    {navigationList &&
                      navigationList.map((item, index) => (
                        <NavItem
                          {...item}
                          dropdownOpen={isMobileDropdownOpen}
                          index={index}
                          key={item.id}
                          onClick={() => handleDropdownToggle(index)}
                          isLanguageSelectorOpen={isMobileLanguageSelectorOpen}
                          setIsLanguageSelectorOpen={setMobileLanguageSelectorOpen}
                        />
                      ))}
                  </ul>
                  <div
                    className={languageSelection()}
                    {...getTestProps(`header-mobile-language-wrapper`)}
                  >
                    <LanguageSelector regionList={regionList} />
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};

const Hamburger = ({
  openMenu,
  toggleHamburger,
  toggleSearch,
  showSearch,
}: {
  openMenu: boolean;
  toggleHamburger: () => void;
  toggleSearch: () => void;
  showSearch: boolean;
}) => {
  const { hamburgerBase, hamburgerItem, hamburgerButton, searchIcon } = TAILWIND_VARIANTS();

  return (
    <ul className={hamburgerBase()}>
      <li className={hamburgerItem()}>
        <button
          aria-expanded={openMenu}
          aria-label="Toggle Search"
          className={searchIcon()}
          onClick={() => toggleSearch()}
          {...getTestProps(`header-hamburger`)}
        >
          <SvgIcon icon="magnifier" fill="none" size="s" />
        </button>
      </li>
      <li className={hamburgerItem()}>
        <button
          aria-expanded={openMenu}
          aria-label="Toggle Menu"
          aria-controls="header-mobile-menu"
          className={hamburgerButton()}
          onClick={() => toggleHamburger()}
          {...getTestProps(`header-hamburger-item`)}
        >
          {!openMenu || showSearch ? (
            <SvgIcon fill="currentColor" icon="hamburger-menu" size="sm" viewBox="0 0 32 32" />
          ) : (
            <SvgIcon fill="currentColor" icon="menu-close" size="sm" viewBox="0 0 32 32" />
          )}
        </button>
      </li>
    </ul>
  );
};

export interface NavItemProps extends SiteStructure.Header.NavigationGroup_Item {
  dropdownOpen: number | null;
  index: number;
  onClick: () => void;
  isLanguageSelectorOpen: boolean;
  setIsLanguageSelectorOpen: (open: boolean) => void;
}

const NavItem = (props: NavItemProps) => {
  const megaMenuList = props.fields?.megaMenuList as SiteStructure.Header.MegaMenuGroup_Item[];
  const isList = (megaMenuList?.length ?? 0) > 0;
  const navigationLink = props.fields?.navigationLink;

  // Don't render if no link and not a dropdown
  if (!navigationLink?.value?.href && !isList) return null;

  const { menuNavItem, linkWrapper, dropDownButton, buttonItemIcon, dropDownButtonText } =
    TAILWIND_VARIANTS({
      isRotated: isList && props.index === props.dropdownOpen,
    });

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    props.onClick();
  };

  return (
    <li className={menuNavItem()}>
      {!isList ? (
        <LinkWrapper
          ctaComponentClass="default"
          aria-haspopup="false"
          className={linkWrapper()}
          field={navigationLink}
          {...getTestProps(`header-navigation-link`)}
        >
          <NavLink link={navigationLink} text={props.fields?.navigationTitle} />
        </LinkWrapper>
      ) : (
        <button
          aria-haspopup="true"
          aria-expanded={props.dropdownOpen === props.index}
          className={dropDownButton()}
          onClick={handleClick}
          type="button"
          aria-controls={`meganav-${toValidId(props.fields?.navigationTitle?.value || '')}`}
          {...getTestProps(`header-nav-button`)}
        >
          <span className={dropDownButtonText()}>
            <PlainTextWrapper field={props.fields?.navigationTitle} />
          </span>
          <span className="flex">
            <SvgIcon
              className={buttonItemIcon()}
              fill="currentColor"
              icon="chevron-up"
              size="xs"
              viewBox="0 0 24 24"
            />
          </span>
        </button>
      )}
      {isList && props.dropdownOpen === props.index && <DropdownMenu {...props} />}
    </li>
  );
};

const DropdownMenu = (props: SiteStructure.Header.NavigationGroup_Item) => {
  const { getDictionaryValue } = useDictionary();

  const {
    featureTitle,
    featureImage,
    featureDescription,
    navigationLink,
    navigationTitle,
    megaMenuList,
  } = props.fields || {};

  const {
    dropDownMenuWrapper,
    dropDownMenuGroup,
    dropDownMenuLinkWrapper,
    dropDownMenuList,
    dropDownItemName,
    dropDownItem,
    dropDownFeaturedWrapper,
    dropDownFeaturedImg,
    dropDownFeaturedContent,
    dropDownFeaturedTitle,
    dropDownFeaturedDescription,
    featuredLink,
    featuredLinkText,
  } = TAILWIND_VARIANTS();

  // Use navigationTitle as fallback if featureTitle is empty
  const displayTitle = featureTitle?.value ? featureTitle : navigationTitle;

  return (
    <div
      className={dropDownMenuWrapper()}
      id={`meganav-${toValidId(props.fields?.navigationTitle?.value || '')}`}
    >
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
            className={dropDownMenuGroup()}
            key={category.id}
            role="group"
            {...getTestProps(`header-secondary-menu-category-${index + 1}`)}
          >
            <PlainTextWrapper
              field={megaMenuTitle as Field<string>}
              tag="h2"
              className={dropDownItemName()}
              id={`secondary-menu-${index + 1}`}
            />
            <ul className={dropDownMenuList()}>
              {menuLinks
                ?.filter((item) => item.fields?.link?.value?.href)
                .map((item, i) => (
                  <li className={dropDownItem()} key={i}>
                    <LinkWrapper
                      ctaComponentClass="default"
                      className={dropDownMenuLinkWrapper()}
                      field={item.fields?.link}
                      {...getTestProps(`header-secondary-menu-${index + 1}-nav-link`)}
                    >
                      <NavLink link={item.fields?.link} name={item.name} />
                    </LinkWrapper>
                  </li>
                ))}
              {categoryMenuCTA?.value?.href && (
                <li className={dropDownItem()}>
                  <LinkWrapper
                    ctaComponentClass="default"
                    className={dropDownMenuLinkWrapper()}
                    field={categoryMenuCTA}
                    tabIndex={0}
                    {...getTestProps(`header-secondary-menu-category-${index + 1}-nav-link`)}
                  >
                    <NavLink link={categoryMenuCTA} name={categoryMenuCTA.value?.text} />
                  </LinkWrapper>
                </li>
              )}
            </ul>
          </div>
        );
      })}
      {navigationLink?.value?.href && (
        <div className={dropDownFeaturedWrapper()}>
          <ImageWrapper field={featureImage} className={dropDownFeaturedImg()} />
          <div className={dropDownFeaturedContent()}>
            <PlainTextWrapper tag="h3" field={displayTitle} className={dropDownFeaturedTitle()} />
            <PlainTextWrapper
              tag="p"
              field={featureDescription}
              className={dropDownFeaturedDescription()}
            />
            <LinkWrapper
              ctaComponentClass="default"
              className={dropDownMenuLinkWrapper()}
              field={navigationLink}
              tabIndex={0}
            >
              <span className={featuredLink()}>
                <span className={featuredLinkText()}>
                  {navigationLink?.value?.text || displayTitle?.value}
                </span>
              </span>
            </LinkWrapper>
          </div>
        </div>
      )}
    </div>
  );
};

const NavLink = ({
  link,
  text,
  name,
}: {
  link?: LinkField;
  text?: Field<string>;
  name?: string;
}) => {
  const { linkContent, navLinkText } = TAILWIND_VARIANTS({ isMainNav: !!text });

  return (
    <span className={linkContent()}>
      <span className={navLinkText()}>{text?.value || link?.value?.text || name}</span>
    </span>
  );
};

const TAILWIND_VARIANTS = tv({
  slots: {
    buttonItemIcon: [
      'duration-200',
      'h-auto',
      'transition-all',
      '!w-xs',
      'text-component-header-nav-link-icon',
      'group-hover:text-component-header-mega-menu-link-text',
      'group-focus:text-component-header-mega-menu-link-text',
      'fill-current',
    ],
    dropDownButton: [
      'cursor-pointer',
      'flex',
      'font-semibold',
      'gap-2',
      'items-start',
      'justify-between',
      '!place-items-center',
      'text-component-header-mega-menu-link-text',
      'text-typography-body-medium-font-size',
      'w-full',
      'group-hover:text-component-header-mega-menu-link-text-hover',
      'group-focus:text-component-header-mega-menu-link-text-hover',
    ],
    dropDownButtonText: [
      'flex',
      'text-component-header-mega-menu-link-text',
      'text-typography-body-medium-font-size',
    ],
    dropDownItem: [],
    dropDownItemName: [
      'font-semibold',
      'text-typography-body-small-font-size',
      'text-color-text-text-secondary',
      'text-sm',
    ],
    dropDownMenuGroup: ['flex', 'flex-col', 'gap-2', 'py-4'],
    dropDownMenuLinkWrapper: [
      'py-2',
      'flex',
      'items-center',
      'gap-2',
      'hover:underline',
      'focus:underline',
      'text-component-header-mega-menu-link-text',
      'hover:text-component-header-mega-menu-link-text-hover',
      'focus:text-component-header-mega-menu-link-text-hover',
      'group',
    ],
    dropDownMenuList: ['flex', 'flex-col', 'gap-2'],
    dropDownMenuWrapper: [],
    hamburgerBase: ['flex', 'gap-5', 'h-full', 'items-center', 'justify-center', 'w-full'],
    hamburgerItem: ['flex', 'items-center', 'justify-center', 'mt-0', 'w-4'],
    hamburgerButton: [
      'hamburger-button',
      'h-8',
      'w-8',
      'mr-4',
      'flex',
      'items-center',
      'justify-center',
      'cursor-pointer',
      'focus:outline-color-core-color-1-800',
      'transition-opacity',
      'duration-300',
      'text-component-header-nav-link-icon',
      'hover:text-color-text-text',
      'focus:text-color-text-text',
    ],
    hamburgerWrapper: ['flex', 'items-center'],
    headerSection: [
      'flex',
      'justify-between',
      'py-4',
      'pl-4',
      'pr-3',
      'md:px-8',
      'border-color-border-border',
      'border-b',
    ],
    languageSelection: [
      'p-4',
      'rounded',
      'my-1',
      'transition-all',
      'duration-300',
      'ease-in-out',
      'transform',
      'overflow-hidden',
    ],
    languageWrapper: [
      'absolute',
      'bg-white',
      'border-b',
      'border-black',
      'w-full',
      'pb-4',
      'max-h-[calc(100vh-4rem)]',
      'overflow-y-auto',
      'overscroll-contain',
      'touch-pan-y',
      'transition-all',
      'duration-300',
      'ease-in-out',
    ],
    linkWrapper: [
      'font-semibold',
      'gap-2',
      '!place-items-center',
      'text-component-header-mega-menu-link-text',
      'text-xl',
      'flex',
      'justify-between',
      'items-center',
      'w-full',
    ],
    menuItems: ['flex', 'flex-col', 'gap-1', 'm-0'],
    menuNavItem: ['list-none', 'm-0', 'relative', 'px-spacing-spacing-16', 'py-spacing-spacing-12'],
    searchWrapper: ['bg-white', 'p-2'],
    wrapper: ['bg-white', 'z-30', 'sticky', 'top-0'],
    dropDownFeaturedWrapper: [
      'bg-color-surface-surface-secondary',
      'py-spacing-spacing-32',
      'gap-spacing-spacing-24',
      'overflow-hidden',
      'flex',
      'flex-col',
      'gap-1',
      'mt-4',
      '-mx-4',
      'px-4',
    ],
    dropDownFeaturedContent: ['flex', 'flex-col'],
    dropDownFeaturedTitle: [
      'font-typography-font-weight-medium',
      'text-typography-header-xxsmall-font-size',
    ],
    dropDownFeaturedDescription: [
      'text-typography-body-small-font-size',
      'text-color-text-text-secondary',
      'font-typography-body-small-font-weight',
      'text-sm',
    ],
    dropDownFeaturedImg: ['h-auto', 'w-full', 'rounded-lg'],
    linkContent: [
      'flex',
      'items-center',
      'gap-2',
      'w-full',
      'justify-between',
      'text-component-header-mega-menu-link-text',
    ],
    svgIconClass: ['!h-5', '!w-5', 'transition-colors', 'scale-x-0'],
    featuredLink: [
      'flex',
      'items-center',
      'gap-2',
      'w-full',
      'justify-between',
      'text-component-header-mega-menu-link-text',
      'text-typography-body-medium-font-size',
      'hover:text-component-header-mega-menu-link-text-hover',
      'focus:text-component-header-mega-menu-link-text-hover',
    ],
    featuredLinkText: [
      'text-component-header-mega-menu-link-text',
      'text-typography-body-medium-font-size',
    ],
    navLinkText: ['text-typography-body-medium-font-size'],
    mainNavSvgIconClass: ['!h-5', '!w-5', 'transition-colors', 'scale-x-100'],
    searchIcon: ['cursor-pointer', 'mt-2'],
  },
  variants: {
    isOpen: {
      false: {
        wrapper: [],
        languageWrapper: ['max-h-0', 'opacity-0'],
        languageSelection: ['max-h-0', 'opacity-0', 'py-0'],
      },
      true: {
        wrapper: [],
        languageWrapper: ['max-h-[calc(100vh-4rem)]', 'opacity-100'],
        languageSelection: ['opacity-100', 'py-4', 'px-1'],
      },
    },
    isRotated: {
      false: {
        buttonItemIcon: ['rotate-180'],
      },
      true: {
        buttonItemIcon: ['rotate-0', 'text-component-header-nav-link-icon-selected'],
      },
    },
    isMainNav: {
      true: {
        linkContent: ['w-full', 'justify-between'],
        svgIconClass: ['scale-x-100'],
      },
      false: {
        linkContent: [],
        svgIconClass: [],
      },
    },
  },
});

export default HeaderMobile;
