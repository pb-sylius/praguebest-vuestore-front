<template>
  <client-only>
    <div class="brand_wrapper" v-if="brandsGroups.length">
      <div class="brand_search" v-if="brandsGroups.length && searchPhrase">
        <div>{{`${$t('search result for the your phrase')} "${searchPhrase}" (${brandCount}): `}}</div>
        <div class="reset_brands" @click="resetSearch">{{ $t('reset search and show all brands') }}</div>
      </div>
      <div v-for="(letter, i) in startLetters" :key="i" :id="`block${letter}`" class="brands_by_letter">
        <div class="brand_letter" :id="'l' + letter">
          <div class="brand_letter_indent"></div>
          <SfHeading :level="3" :title="letter" class="brand_letter_heading" />
          <div class="brand_letter_indent"></div>
        </div>
        <div class="brand_grid">
          <SfBrandTile v-for="(brand, i) in findGroupByLetter(letter, brandsGroups)" :key="brandGetters.getId(brand) + i"
            :slug="brandGetters.getSlug(brand)" :name="brandGetters.getName(brand)"
            :image="brandGetters.getCoverImage(brand)">
          </SfBrandTile>
        </div>
      </div>
    </div>
    <div class="no_brand_found" v-else>{{ $t('No brand matching your selection was found') }}</div>
  </client-only>
</template>

<script>
import SfBrandTile from "../../molecules/SfBrandTile/SfBrandTile.vue";
import SfHeading from "../../atoms/SfHeading/SfHeading.vue";

import { brandGetters } from '@realtainment/sylius';

export default {
  name: "SfBrandGrid",
  setup() {

    const showHideLetterBlock = (parent, show) => {
      if (parent && parent.nodeType === 1) {
        const blockLetters = parent.querySelector('.brand_letters_wrapper');
        const blockTopBrands = parent.querySelector('.top_brand_wrapper');
        const hideable_heading = parent.querySelector('.hideable_heading ');
        if (show) {
          blockLetters.classList.add('display-none');
          blockTopBrands.classList.add('display-none');
          hideable_heading.classList.add('display-none');
        } else {
          blockLetters.classList.remove('display-none');
          blockTopBrands.classList.remove('display-none');
          hideable_heading.classList.remove('display-none');
        }
      }
    }

    return {
      brandGetters,
      showHideLetterBlock
    }
  },
  props: {
    brands: {
      type: Object | Array,
      default: {}
    }
  },
  components: {
    SfBrandTile,
    SfHeading
  },
  computed: {
    console: () => console,
    window: () => window,
  },
  data() {
    return {
      startLetters: [],
      brandsGroups: [],
      searchPhrase: '',
      brandCount: 0
    };
  },
  mounted: function () {
    this.$nextTick(() => {
      this.showHideLetterBlock(this.$parent.$el, this.searchPhrase);
    })
  },
  watch: {
    brands: {
      immediate: true,
      deep: true,
      handler(newValue) {
        this.searchPhrase = newValue.search;
        this.showHideLetterBlock(this.$parent.$el, newValue.search);
        const result = this.parseBrands(newValue.brands);
        this.startLetters = result.startLetters;
        this.brandsGroups = result.brandsGroups;
        this.brandCount = result.brandCount
      }
    }
  },
  methods: {
    parseBrands: (properties) => {
      let startLetters;
      let brandCount = 0;
      const brandsGroups = [];
      startLetters = properties
        ? properties.map((brand) => brand.name[0].toLowerCase())
        : [];
      startLetters = [...new Set(startLetters)]

      startLetters.forEach((letter) => {
        const letterGroup = properties.filter(m => m.name.toLowerCase().startsWith(letter));
        brandCount += letterGroup.length;
        brandsGroups.push({ [letter]: letterGroup })
      })

      return { startLetters, brandsGroups, brandCount }
    },
    findGroupByLetter: (letter, brandsGroups) => {
      const foundGroup = brandsGroups.find((group) => group[letter])
      return foundGroup ? Object.values(foundGroup)[0] : [];
    },
    resetSearch: function () {
      this.$emit('clicked')
    }
  },
};
</script>

<style lang="scss">
@import "./SfBrandGrid.scss";
</style>
