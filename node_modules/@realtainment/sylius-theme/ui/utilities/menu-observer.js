import Vue from "vue";
import { includeLogo, includeSearchBar, includeHeaderIcons } from "./observers-config";
import elementwidth from "./element-width";

let observer;

const checkSpaceForMenu = () => {

  let searchBarWidth = 0;
  let headerIconsWidth = 0;
  let logoWidth = 0;

  const headerWidth = elementwidth('.sf-header__header');

  if (includeLogo) {
    logoWidth = elementwidth('.sf-header__logo-image');
  }

  if (includeSearchBar) {
    searchBarWidth = elementwidth('.sf-header__search');
  }

  if (includeHeaderIcons) {
    headerIconsWidth = elementwidth('.sf-header__icons');
  }

  if (headerWidth - logoWidth - searchBarWidth - headerIconsWidth < 1000) {
    observer.mainMenuToHamburger = true;
  } else {
    observer.mainMenuToHamburger = false;
  }

};

const setupListener = () => {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return;
  }
  observer.mainMenuToHamburger = false;
  window.addEventListener('resize', checkSpaceForMenu);
  observer.isInitialized = true;
};

const tearDownListener = () => {
  if (typeof window !== "undefined" && typeof document !== "undefined") {
    window.removeListener(checkSpaceForMenu);
  }
};

export const mapMenuObserver = () => {
  if (!observer) {
    observer = Vue.observable({
      mainMenuToHamburger: false,
      isInitialized: false,
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
  };
};

export const unMapMenuObserver = () => {
  tearDownListener();
};
