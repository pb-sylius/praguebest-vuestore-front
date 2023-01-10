// --------------------------OBSERVERS--------------------------

/**
 * Turns mobile observer on/off.
 * It's highly recommended to keep it off
 * because of it sets only one css breakpoint.
 * Used by mobile-observer.js
 */
export const useMobileObserver = true;

/**
  * Necessary for the correct calculation of whether
  * the product menu should be collapsed into a hamburger.
  * Set to true if logo is on one line with product menu,
  * or false otherwise.
  * Used by menu-observer.js
  */
export const includeLogo = true;

/**
 * Logo dimensions
 */
export const logoBaseWidth = 164;
export const logoBaseHeight = 34;

/**
  * Necessary for the correct calculation of whether
  * the product menu should be collapsed into a hamburger.
  * Set to true if search bar is on one line with product menu,
  * or false otherwise.
  * Used by menu-observer.js
  */
export const includeSearchBar = true;

/**
  * Necessary for the correct calculation of whether
  * the product menu should be collapsed into a hamburger.
  * Set to true if header icons is on one line with product menu,
  * or false otherwise.
  * Used by menu-observer.js
  */
export const includeHeaderIcons = true;

export const reduceLogo = true;

/**
 * Logo symbol dimensions
 */
export const reducedLogoWidth = 30;
export const reducedLogoHeight = 34;

// --------------------------HAMBURGER MENU--------------------------

/**
 * If true, hamburger menu will have text "Menu"
 */
export const useMenuText = true;

// --------------------------CART--------------------------

/**
 * If true, cart widget overlaying page will be used.
 * If false, cart widget below main menu will be used.
 */
export const useCartOverlayWidget = true;

/**
  * If true, no cart widget will be used and click/link
  * on the basket icon leads to cart page
  */
export const useCartPage = false;

// --------------------------CART ICON--------------------------

/**
 * If true, cart icon will contain badge showing
 * num of product in cart
 */
export const showNumProducts = false;

/**
 * If true, cart icon will contain block
 * with overal value of inserted products
 */
export const showPrice = false;

// --------------------------SEARCH BAR--------------------------

/**
 * If true, full width serach bar will be shown on mobile.
 * If false, search button and widget will be shown on mobile.
 * Don't forget set includeSearchBar to false if this is false
 */
export const useMobileSearch = true;

// --------------------------BOTTOM NAVIGATION--------------------------

/**
 * If true, bottom navigation will be used on mobile and vice versa
 */
export const useBottomNavigation = false;

// --------------------------PRODUCTS PAGINATION--------------------------

/**
 Sets items per page for product lists.
 Works with manufacturers and branches.
 */
export const productsPerPage = 3;

