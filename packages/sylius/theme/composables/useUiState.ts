import { reactive, computed } from '@nuxtjs/composition-api';

const state = reactive({
  isCartSidebarOpen: false,
  isWishlistSidebarOpen: false,
  isLoginModalOpen: false,
  isNewsletterModalOpen: false,
  isCategoryGridView: true,
  isFilterSidebarOpen: false,
  isMobileMenuOpen: false,
  windowWidthChanged: false,
  isHamburgerMenuOpen: false,
});

const useUiState = () => {

  const toggleWindowWidthChanged = (status) => {
    state.windowWidthChanged = status;
  };

  const windowWidthChanged = computed(() => state.windowWidthChanged);

  const isMobileMenuOpen = computed(() => state.isMobileMenuOpen);
  const toggleMobileMenu = (status = true) => {
    if (status) {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
    } else {
      state.isMobileMenuOpen = false;
    }
  };

  const isHamburgerMenuOpen = computed(() => state.isHamburgerMenuOpen);
  const toggleHamburgerMenu = (status) => {
    if (status === false) {
      state.isMobileMenuOpen = false;
    } else {
      state.isHamburgerMenuOpen = !state.isHamburgerMenuOpen;
    }
  };

  const isCartSidebarOpen = computed(() => state.isCartSidebarOpen);
  const toggleCartSidebar = () => {
    if (state.isMobileMenuOpen) toggleMobileMenu();
    state.isCartSidebarOpen = !state.isCartSidebarOpen;
  };

  const isWishlistSidebarOpen = computed(() => state.isWishlistSidebarOpen);
  const toggleWishlistSidebar = () => {
    if (state.isMobileMenuOpen) toggleMobileMenu();
    state.isWishlistSidebarOpen = !state.isWishlistSidebarOpen;
  };

  const isLoginModalOpen = computed(() => state.isLoginModalOpen);
  const toggleLoginModal = () => {
    if (state.isMobileMenuOpen) toggleMobileMenu();
    state.isLoginModalOpen = !state.isLoginModalOpen;
  };

  const isNewsletterModalOpen = computed(() => state.isNewsletterModalOpen);
  const toggleNewsletterModal = () => {
    state.isNewsletterModalOpen = !state.isNewsletterModalOpen;
  };

  const isCategoryGridView = computed(() => state.isCategoryGridView);
  const changeToCategoryGridView = () => {
    state.isCategoryGridView = true;
  };
  const changeToCategoryListView = () => {
    state.isCategoryGridView = false;
  };

  const isFilterSidebarOpen = computed(() => state.isFilterSidebarOpen);
  const toggleFilterSidebar = () => {
    state.isFilterSidebarOpen = !state.isFilterSidebarOpen;
  };

  return {
    isCartSidebarOpen,
    isWishlistSidebarOpen,
    isLoginModalOpen,
    isNewsletterModalOpen,
    isCategoryGridView,
    isFilterSidebarOpen,
    isMobileMenuOpen,
    windowWidthChanged,
    isHamburgerMenuOpen,
    toggleWindowWidthChanged,
    toggleCartSidebar,
    toggleWishlistSidebar,
    toggleLoginModal,
    toggleNewsletterModal,
    changeToCategoryGridView,
    changeToCategoryListView,
    toggleFilterSidebar,
    toggleMobileMenu,
    toggleHamburgerMenu
  };
};

export default useUiState;
