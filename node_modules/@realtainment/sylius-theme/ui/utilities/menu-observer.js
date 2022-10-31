import Vue from "vue";
import { includeLogo, logoBaseWidth, includeSearchBar, includeHeaderIcons, reduceLogo } from "../config";
import elementwidth from "./element-width";
import useUiState from '../../composables/useUiState';

let observer;
let observedWidth = 0;

const { toggleWindowWidthChanged, toggleMobileMenu } = useUiState();

const checkSpaceForMenu = () => {

  const headerIcons = document.querySelector('.sf-header__icons');
  headerIcons.classList.remove('visible_icons');

  const navigationMenu = document.querySelector('nav.sf-header__navigation');
  navigationMenu.style.visibility = 'hidden';
  navigationMenu.classList.add('is-visible');

  const navigationItems = document.querySelector('div.sf-header__navigation');
  navigationItems.style.visibility = 'hidden';

  const menuTopParent = document.querySelector('.sf-use-mobile-observer');
  menuTopParent.classList.remove('.use-hamburger-menu');

  const searchBar = document.querySelector('.sf-header__search');
  if (searchBar) {
    searchBar.classList.add('measure_bar');
    searchBar.style.visibility = 'hidden';
  }

  let searchBarWidth = 0;
  let headerIconsWidth = 0;
  let logoWidth = 0;
  let menuWidth = 0;

  const headerWidth = elementwidth('.sf-header__header');

  if (includeLogo) {
    logoWidth = logoBaseWidth;
  }

  if (includeSearchBar) {
    searchBarWidth = elementwidth(searchBar);
  }

  let menuWidthInner = 0;
  const menuElements = [...document.querySelector('div.sf-header__navigation').children];
  menuElements.forEach((element) => {
    menuWidthInner += elementwidth(element, true, false);
  })
  menuWidth = menuWidthInner;

  if (includeHeaderIcons) {
    let headerIconsWidthInner = 0;
    const iconsElements = [...document.querySelector('.sf-header__icons').children];
    iconsElements.forEach((element) => {
      headerIconsWidthInner += elementwidth(element, true, false);
    })
    headerIconsWidth = headerIconsWidthInner;
  }

  const actualWidth = window.innerWidth;

  if (actualWidth !== observedWidth) {
    toggleWindowWidthChanged(true);
    toggleMobileMenu(false);
    observedWidth = actualWidth;
  } else {
    toggleWindowWidthChanged(false);
  }

  if (headerWidth - logoWidth - searchBarWidth - headerIconsWidth - menuWidth < 10) {
    observer.mainMenuToHamburger = true;
    menuTopParent.classList.add('use-hamburger-menu');
    headerIcons.classList.remove('visible_icons');
  } else {
    observer.mainMenuToHamburger = false;
    menuTopParent.classList.remove('use-hamburger-menu');
    headerIcons.classList.add('visible_icons');
  }

  if (reduceLogo) {
    let menuWithoutLogoWidth = 0;
    const menuElements = [...document.querySelector('.sf-header__aside:not(:empty)').children];
    menuElements.forEach((element) => {
      menuWithoutLogoWidth += elementwidth(element, true, false);
    })
    if (menuWithoutLogoWidth + logoBaseWidth >= headerWidth && includeLogo) {
      observer.implementLogoSymbol = true;
    } else {
      observer.implementLogoSymbol = false;
    }
  }

  navigationMenu.style.visibility = "visible";
  navigationItems.style.visibility = 'visible';
  navigationItems.style.height = "auto";
  navigationMenu.classList.remove('is-visible');
  if (searchBar) {
    searchBar.classList.remove('measure_bar');
    searchBar.style.visibility = 'visible';
  }
};

const setupListener = () => {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return;
  }
  observer.mainMenuToHamburger = false;
  window.addEventListener('resize', checkSpaceForMenu);
  if ("fonts" in document) {
    document.fonts.ready.then(function () {
      checkSpaceForMenu();
    });
  } else {
    window.addEventListener('load', checkSpaceForMenu);
  }
  observer.isInitialized = true;
  window.dispatchEvent(new Event("resize"));
};

const tearDownListener = () => {
  if (typeof window !== "undefined" && typeof document !== "undefined") {
    window.removeEventListener('resize', checkSpaceForMenu);
    window.removeEventListener('load', checkSpaceForMenu);
  }
};

export const mapMenuObserver = () => {
  if (!observer) {
    observer = Vue.observable({
      mainMenuToHamburger: false,
      isInitialized: false,
      implementLogoSymbol: false,
    });
  }
  return {
    mainMenuToHamburger: {
      get() {
        if (observer && !observer.isInitialized) {
          setupListener();
        }
        return observer ? observer.mainMenuToHamburger : false;
      },
    },
    menuObserverIsInitialized: {
      get() {
        return observer ? observer.isInitialized : false;
      },
    },
    implementLogoSymbol: {
      get() {
        return observer ? observer.implementLogoSymbol : false;
      }
    }
  };
};

export const unMapMenuObserver = () => {
  tearDownListener();
};
