'use client';

import { createContext, useCallback, useContext, useState } from 'react';

interface HeaderContextType {
  isMobile: boolean;
  isOverlayVisible: boolean;
  isMobileMenuOpen: boolean;
  isMobileDropdownOpen: number | null;
  isMobileLanguageSelectorOpen: boolean;
  showSearch: boolean;
  isDesktopDropdownOpen: number | null;
  isDesktopLanguageSelectorOpen: boolean;
  setMobileMenuOpen: (isOpen: boolean) => void;
  setMobileDropdownOpen: (index: number | null) => void;
  setMobileLanguageSelectorOpen: (isOpen: boolean) => void;
  setShowSearch: (show: boolean) => void;
  setDesktopDropdownOpen: (index: number | null) => void;
  setDesktopLanguageSelectorOpen: (isOpen: boolean) => void;
  setIsMobile: (isMobile: boolean) => void;
  closeMobileMenu: () => void;
  closeDesktopMenus: () => void;
  handleOverlayChange: () => void;
  handleRouteChange: () => void;
}

const HeaderContext = createContext<HeaderContextType | undefined>(undefined);

export const HeaderProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDesktopDropdownOpen, setDesktopDropdownOpen] = useState<number | null>(null);
  const [isDesktopLanguageSelectorOpen, setDesktopLanguageSelectorOpen] = useState(false);

  const [isMobile, setIsMobile] = useState(false);
  const [isMobileDropdownOpen, setMobileDropdownOpen] = useState<number | null>(null);
  const [isMobileLanguageSelectorOpen, setMobileLanguageSelectorOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const closeDesktopMenus = useCallback(() => {
    setDesktopDropdownOpen(null);
    setDesktopLanguageSelectorOpen(false);
    setShowSearch(false);
    const shouldShowOverlay = isMobile
      ? isMobileMenuOpen ||
        isMobileDropdownOpen !== null ||
        showSearch ||
        isMobileLanguageSelectorOpen
      : false;
    setIsOverlayVisible(shouldShowOverlay);
  }, [isMobile, isMobileMenuOpen, isMobileDropdownOpen, showSearch, isMobileLanguageSelectorOpen]);

  const setDesktopDropdownOpenWithOverlay = useCallback(
    (index: number | null) => {
      if (index === isDesktopDropdownOpen) {
        setDesktopDropdownOpen(null);
      } else {
        setDesktopDropdownOpen(index);
      }
    },
    [isDesktopDropdownOpen]
  );

  const setDesktopLanguageSelectorOpenWithOverlay = useCallback((isOpen: boolean) => {
    setDesktopLanguageSelectorOpen(isOpen);
    if (isOpen) {
      setDesktopDropdownOpen(null);
      setShowSearch(false);
    }
  }, []);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
    setMobileDropdownOpen(null);
    setMobileLanguageSelectorOpen(false);
    setShowSearch(false);
    setIsOverlayVisible(false);
  }, []);

  const setMobileDropdownOpenWithOverlay = useCallback(
    (index: number | null) => {
      if (index === isMobileDropdownOpen) {
        setMobileDropdownOpen(null);
      } else {
        setMobileDropdownOpen(index);
      }
    },
    [isMobileDropdownOpen]
  );

  const setMobileLanguageSelectorOpenWithOverlay = useCallback((isOpen: boolean) => {
    setMobileLanguageSelectorOpen(isOpen);
    if (isOpen) {
      setMobileDropdownOpen(null);
      setShowSearch(false);
    }
  }, []);

  const handleOverlayChange = useCallback(() => {
    const shouldShowOverlay = isMobile
      ? isMobileMenuOpen ||
        isMobileDropdownOpen !== null ||
        showSearch ||
        isMobileLanguageSelectorOpen
      : isDesktopDropdownOpen !== null || showSearch || isDesktopLanguageSelectorOpen;
    setIsOverlayVisible(shouldShowOverlay);
  }, [
    isMobile,
    isMobileMenuOpen,
    isMobileDropdownOpen,
    showSearch,
    isDesktopDropdownOpen,
    isMobileLanguageSelectorOpen,
    isDesktopLanguageSelectorOpen,
  ]);

  const handleRouteChange = useCallback(() => {
    if (isMobile) closeMobileMenu();
    else closeDesktopMenus();
  }, [isMobile, closeMobileMenu, closeDesktopMenus]);

  const value = {
    isDesktopDropdownOpen,
    isDesktopLanguageSelectorOpen,
    showSearch,
    isMobile,
    isMobileDropdownOpen,
    isMobileLanguageSelectorOpen,
    isMobileMenuOpen,
    isOverlayVisible,
    setDesktopDropdownOpen: setDesktopDropdownOpenWithOverlay,
    setDesktopLanguageSelectorOpen: setDesktopLanguageSelectorOpenWithOverlay,
    closeDesktopMenus,
    setIsMobile,
    setMobileDropdownOpen: setMobileDropdownOpenWithOverlay,
    setMobileLanguageSelectorOpen: setMobileLanguageSelectorOpenWithOverlay,
    setMobileMenuOpen,
    closeMobileMenu,
    setShowSearch,
    handleOverlayChange,
    handleRouteChange,
  };

  return <HeaderContext.Provider value={value}>{children}</HeaderContext.Provider>;
};

export const useHeader = () => {
  const context = useContext(HeaderContext);
  if (context === undefined) {
    throw new Error('useHeader must be used within a HeaderProvider');
  }
  return context;
};
