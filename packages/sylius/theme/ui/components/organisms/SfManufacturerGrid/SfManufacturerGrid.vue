<template>
  <client-only>
    <div class="manufacturer_wrapper" v-if="manufacturersGroups.length">
      <div class="manufacturer_search" v-if="manufacturersGroups.length && searchPhrase">
        <div>{{`${$t('search result for the your phrase')} "${searchPhrase}" (${manufacturerCount}): `}}</div>
        <div class="reset_manufacturers" @click="resetSearch">{{ $t('reset search and show all manufacturers') }}</div>
      </div>
      <div v-for="(letter, i) in startLetters" :key="i">
        <div class="manufacturer_letter" :id="'l' + letter">
          <div class="manufacturer_letter_indent"></div>
          <SfHeading :level="3" :title="letter" class="manufacturer_letter_heading" />
          <div class="manufacturer_letter_indent"></div>
        </div>
        <div class="manufacturer_grid">
          <SfManufacturerTile v-for="(manufacturer, i) in findGroupByLetter(letter, manufacturersGroups)" :key="i"
            :slug="manufacturerGetters.getSlug(manufacturer)" :name="manufacturerGetters.getName(manufacturer)"
            :image="manufacturerGetters.getCoverImage(manufacturer)">
          </SfManufacturerTile>
        </div>
      </div>
    </div>
    <div class="no_manufacturer_found" v-else>{{ $t('No manufacturer matching your selection was found') }}</div>
  </client-only>
</template>

<script>
import SfManufacturerTile from "../../molecules/SfManufacturerTile/SfManufacturerTile.vue";
import SfHeading from "../../atoms/SfHeading/SfHeading.vue";

import { manufacturerGetters } from '@realtainment/sylius';

export default {
  name: "SfManufacturerGrid",
  setup() {

    const showHideLetterBlock = (parent, show) => {
      if (parent && parent.nodeType === 1) {
        const blockLetters = parent.querySelector('.manufacturer_letters_wrapper');
        const blockTopManufacturers = parent.querySelector('.top_manufacturer_wrapper');
        const hideable_heading = parent.querySelector('.hideable_heading ');
        if (show) {
          blockLetters.classList.add('display-none');
          blockTopManufacturers.classList.add('display-none');
          hideable_heading.classList.add('display-none');
        } else {
          blockLetters.classList.remove('display-none');
          blockTopManufacturers.classList.remove('display-none');
          hideable_heading.classList.remove('display-none');
        }
      }
    }

    return {
      manufacturerGetters,
      showHideLetterBlock
    }
  },
  props: {
    manufacturers: {
      type: Object | Array,
      default: {}
    }
  },
  components: {
    SfManufacturerTile,
    SfHeading
  },
  computed: {
    console: () => console,
    window: () => window,
  },
  data() {
    return {
      startLetters: [],
      manufacturersGroups: [],
      searchPhrase: '',
      manufacturerCount: 0
    };
  },
  mounted: function () {
    this.$nextTick(() => {
      this.showHideLetterBlock(this.$parent.$el, this.searchPhrase);
    })
  },
  watch: {
    manufacturers: {
      immediate: true,
      deep: true,
      handler(newValue) {
        this.searchPhrase = newValue.search;
        this.showHideLetterBlock(this.$parent.$el, newValue.search);
        const result = this.parseManufacturers(newValue.manufacturers);
        this.startLetters = result.startLetters;
        this.manufacturersGroups = result.manufacturersGroups;
        this.manufacturerCount = result.manufacturerCount
      }
    }
  },
  methods: {
    parseManufacturers: (properties) => {
      let startLetters;
      let manufacturerCount = 0;
      const manufacturersGroups = [];
      startLetters = properties
        ? properties.map((manufacturer) => manufacturer.name[0].toLowerCase())
        : [];
      startLetters = [...new Set(startLetters)]

      startLetters.forEach((letter) => {
        const letterGroup = properties.filter(m => m.name.toLowerCase().startsWith(letter));
        manufacturerCount += letterGroup.length;
        manufacturersGroups.push({ [letter]: letterGroup })
      })

      return { startLetters, manufacturersGroups, manufacturerCount }
    },
    findGroupByLetter: (letter, manufacturersGroups) => {
      const foundGroup = manufacturersGroups.find((group) => group[letter])
      return foundGroup ? Object.values(foundGroup)[0] : [];
    },
    resetSearch: function () {
      this.$emit('clicked')
    }
  },
};
</script>

<style lang="scss">
@import "./SfManufacturerGrid.scss";
</style>
