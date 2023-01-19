<template>
  <div class="wrapp_all" v-if="!loading" key="norrefw">
    <input type="text" class="search_input" :placeholder="$t('Search for manufacturer')" @input="handleInput" />
    <SfManufacturerGridTop v-show="topManufactures && topManufactures.length" :manufacturers="topManufactures"
      ref="top_grid" />
    <SfHeading :level="2" :title="$t('All Manufacturers')" class="manufacturer_heading hideable_heading" />
    <SfManufacturerLetters @selected="scrollToLetter" ref="allLetters" :manufacturers="computedManufacturers"
      :key="refreshKey" />
    <SfManufacturerGrid :manufacturers="computedManufacturers" @clicked="resetSearch" ref="grid" />
  </div>
</template>

<script>

import SfHeading from "../ui/components/atoms/SfHeading/SfHeading.vue";
import SfInput from "../ui/components/atoms/SfInput/SfInput.vue";
import SfManufacturerGrid from "../ui/components/organisms/SfManufacturerGrid/SfManufacturerGrid.vue";
import SfManufacturerGridTop from "../ui/components/organisms/SfManufacturerGridTop/SfManufacturerGridTop.vue";
import SfManufacturerLetters from "../ui/components/molecules/SfManufacturerLetters/SfManufacturerLetters.vue";

import { onSSR } from '@vue-storefront/core';
import cloneDeep from 'lodash/cloneDeep';
import { ref } from '@vue/composition-api';
import uuid from 'uuid';
import inViewport from 'javascript-inviewport';

import {
  useManufacturer,
  manufacturerGetters
} from '@realtainment/sylius';

export default {
  name: 'ManufacturerAll',
  setup(props, context) {

    const LETTER = 'letter';
    const SEARCH = 'search';

    const { search } = context.root.$route.query;
    const letter = context.root.$route.hash.substring(1).toLowerCase();

    const { manufacturers, all, loading } = useManufacturer('manufacturer');

    const computedManufacturers = ref(cloneDeep(manufacturers.value));

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

    const topManufactures = manufacturers?.value?.manufacturers?.filter(m => m.isTop === true);

    const filterByPhrase = (phrase) => {
      if (phrase) {
        window.history.pushState('', '', `?${SEARCH}=${phrase}`);
      } else if (!getUrlParams(LETTER)) {
        clearUrlParams();
      }
      const filtered = manufacturers?.value?.manufacturers?.filter(m => m.name.toLowerCase().includes(phrase.toLowerCase()));
      computedManufacturers.value.manufacturers = filtered;
      computedManufacturers.value.search = phrase;
    }

    const handleInput = (input) => {
      filterByPhrase(input.target.value)
    }

    return {
      loading,
      manufacturerGetters,
      computedManufacturers,
      filterByPhrase,
      clearUrlParams,
      search,
      manufacturers,
      letter,
      getUrlParams,
      LETTER,
      SEARCH,
      topManufactures,
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
        const letterBlocks = document.querySelectorAll('.manufacturer_letter');
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
    SfManufacturerGrid,
    SfInput,
    SfManufacturerLetters,
    SfManufacturerGridTop,
  },
  computed: {
    console: () => console,
    window: () => window,
  },
  watch: {
    computedManufacturers: {
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

.manufacturer_heading {
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
