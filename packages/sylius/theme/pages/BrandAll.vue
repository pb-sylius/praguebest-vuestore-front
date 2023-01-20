<template>
  <div class="wrapp_all" v-if="!loading" key="norrefw">
    <input type="text" class="search_input" :placeholder="$t('Search for brand')" @input="handleInput" />
    <SfBrandGridTop v-show="topBrands && topBrands.length" :brands="topBrands"
      ref="top_grid" />
    <SfHeading :level="2" :title="$t('All Brands')" class="brand_heading hideable_heading" />
    <SfBrandLetters @selected="scrollToLetter" ref="allLetters" :brands="computedBrands"
      :key="refreshKey" />
    <SfBrandGrid :brands="computedBrands" @clicked="resetSearch" ref="grid" :key="'grid' + refreshKey" />
  </div>
</template>

<script>

import SfHeading from "../ui/components/atoms/SfHeading/SfHeading.vue";
import SfInput from "../ui/components/atoms/SfInput/SfInput.vue";
import SfBrandGrid from "../ui/components/organisms/SfBrandGrid/SfBrandGrid.vue";
import SfBrandGridTop from "../ui/components/organisms/SfBrandGridTop/SfBrandGridTop.vue";
import SfBrandLetters from "../ui/components/molecules/SfBrandLetters/SfBrandLetters.vue";

import { onSSR } from '@vue-storefront/core';
import cloneDeep from 'lodash/cloneDeep';
import { ref } from '@vue/composition-api';
import uuid from 'uuid';
import inViewport from 'javascript-inviewport';

import {
  useBrand,
  brandGetters
} from '@realtainment/sylius';

export default {
  name: 'BrandAll',
  setup(props, context) {

    const LETTER = 'letter';
    const SEARCH = 'search';

    const { search } = context.root.$route.query;
    const letter = context.root.$route.hash.substring(1).toLowerCase();

    const { brands, all, loading } = useBrand('brand');

    const computedBrands = ref(cloneDeep(brands.value));

    const refreshKey = uuid.v4();

    onSSR(async () => {
      await all({});
    });

    const clearUrlParams = () => {
      window.history.pushState(null, null, window.location.pathname);
    }

    const getUrlParams = (param) => {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      return urlParams.has(param);
    }

    const topBrands = brands?.value?.brands?.filter(m => m.isTop === true);

    const filterByPhrase = (phrase) => {
      if (phrase) {
        window.history.pushState('', '', `?${SEARCH}=${phrase}`);
      } else if (!getUrlParams(LETTER)) {
        clearUrlParams();
      }
      const filtered = brands?.value?.brands?.filter(m => m.name.toLowerCase().includes(phrase.toLowerCase()));
      computedBrands.value.brands = filtered;
      computedBrands.value.search = phrase;
    }

    const handleInput = (input) => {
      filterByPhrase(input.target.value)
    }

    return {
      loading,
      brandGetters,
      computedBrands,
      filterByPhrase,
      clearUrlParams,
      search,
      brands,
      letter,
      getUrlParams,
      LETTER,
      SEARCH,
      topBrands,
      refreshKey,
      handleInput
    }
  },
  mounted: function () {
    if (this.search) {
      this.filterByPhrase(this.search);
      (async () => {
        while (!document.querySelector('.search_input')) {
          await new Promise(resolve => setTimeout(resolve, 1));
        }
        document.querySelector('.search_input').value = this.search;
      })()
    } else if (!this.getUrlParams(this.LETTER)) {
      (async () => {
        while (!document.querySelector('.search_input')) {
          await new Promise(resolve => setTimeout(resolve, 1));
        }
        document.querySelector('.search_input').value = null;
      })()
      this.clearUrlParams();
    }
    if (this.letter) {
      this.scrollToLetter(this.letter);
    }
    this.$nextTick(() => {
      (async () => {
        while (!document.querySelector('.one_letter')) {
          await new Promise(resolve => setTimeout(resolve, 1));
        }
        const letterBlocks = document.querySelectorAll('.brand_letter');
        const letters = [...document.querySelectorAll('.one_letter')];
        [...letterBlocks].forEach((block, index) => {
          inViewport(block, 1, [
            () => {
              letters[index].classList.add('active');
            },
            () => {
              letters[index].classList.remove('active');
            },
          ]);
        })
      })()

    })

  },
  components: {
    SfHeading,
    SfBrandGrid,
    SfInput,
    SfBrandLetters,
    SfBrandGridTop,
  },
  computed: {
    console: () => console,
    window: () => window,
  },
  watch: {
    computedBrands: {
      immediate: true,
      deep: true,
      handler() {
        this.refreshKey = uuid.v4();
      }
    },
  },
  methods: {
    resetSearch: function () {
      this.filterByPhrase('');
      document.querySelector('.search_input').value = null;
    },
    scrollToLetter: function (letter) {
      if (letter.length > 1) {
        letter = letter.substring(1);
      }
      (async () => {
        while (!this.$refs.allLetters || !this.$refs.grid.$el || this.$refs.grid.$el.nodeType !== 1) {
          await new Promise(resolve => setTimeout(resolve, 1));
        }
        const letters = this.$refs.allLetters.$el;
        const container = this.$refs.grid.$el;
        const yOffset = -letters.offsetHeight;
        const targetElement = container.querySelector('#l' + letter);
        if (targetElement) {
          const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
          window.history.pushState('', '', `#${letter}`);
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          if (!this.getUrlParams(this.SEARCH)) {
            window.history.pushState(null, null, window.location.pathname);
          }
        }
      })();
    },
  }
}
</script>

<style lang="scss" scoped>
@import "../ui/styles/helpers";

.brand_heading {
  margin-bottom: 20px;
}

.is_sticky {
  position: sticky;
  top: 0;
}

.search_input {
  display: block;
  outline: none;
  margin-bottom: 30px;
  width: 100%;
  box-sizing: border-box;
  padding: var(--input-padding, var(--spacer-sm) 0 var(--spacer-xs) 0);
  border: var(--input-border, var(--input-border-style, solid) var(--input-border-color, var(--c-link)));
  border-width: var(--input-border-width, 0 0 1px 0);
  background: var(--input-background);
  color: var(--input-color, var(--c-text));
  font: var(--input-font, var(--input-font-weight, var(--font-weight--normal)) var(--input-font-size, var(--font-size--lg))/var(--input-font-line-height, 1) var(--input-font-family, var(--font-family--secondary)));
  text-align: var(--input-text-align);

  &:focus {
    border-color: var(--_c-green-primary);
  }
}
</style>
