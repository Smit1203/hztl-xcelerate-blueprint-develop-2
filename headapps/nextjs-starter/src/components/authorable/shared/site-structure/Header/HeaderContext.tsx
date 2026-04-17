// Global
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
}

const HeaderContext = createContext<HeaderContextType | undefined>(undefined);

export const HeaderProvider = ({ children }: { children: React.ReactNode }) => {
  // Desktop states
  const [isDesktopDropdownOpen, setDesktopDropdownOpen] = useState<number | null>(null);
  const [isDesktopLanguageSelectorOpen, setDesktopLanguageSelectorOpen] = useState(false);

  // Mobile states
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileDropdownOpen, setMobileDropdownOpen] = useState<number | null>(null);
  const [isMobileLanguageSelectorOpen, setMobileLanguageSelectorOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Shared states
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  // Desktop actions
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

  // Mobile actions
  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
    setMobileDropdownOpen(null);
    setMobileLanguageSelectorOpen(false);
    setShowSearch(false);
    const shouldShowOverlay = false;
    setIsOverlayVisible(shouldShowOverlay);
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

  // Shared actions
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
    if (isMobile) {
      closeMobileMenu();
    } else {
      closeDesktopMenus();
    }
  }, [isMobile, closeMobileMenu, closeDesktopMenus]);

  const value = {
    // Desktop states
    isDesktopDropdownOpen,
    isDesktopLanguageSelectorOpen,
    showSearch,

    // Mobile states
    isMobile,
    isMobileDropdownOpen,
    isMobileLanguageSelectorOpen,
    isMobileMenuOpen,

    // Shared states
    isOverlayVisible,

    // Desktop actions
    setDesktopDropdownOpen: setDesktopDropdownOpenWithOverlay,
    setDesktopLanguageSelectorOpen: setDesktopLanguageSelectorOpenWithOverlay,
    closeDesktopMenus,

    // Mobile actions
    setIsMobile,
    setMobileDropdownOpen: setMobileDropdownOpenWithOverlay,
    setMobileLanguageSelectorOpen: setMobileLanguageSelectorOpenWithOverlay,
    setMobileMenuOpen,
    closeMobileMenu,

    // Shared actions
    setShowSearch,
    handleOverlayChange,
    handleRouteChange,
  };

  return <HeaderContext.Provider value={value}>{children}</HeaderContext.Provider>;
};

// Custom hook to use the context
export const useHeader = () => {
  const context = useContext(HeaderContext);
  if (context === undefined) {
    throw new Error('useHeader must be used within a HeaderProvider');
  }
  return context;
};
