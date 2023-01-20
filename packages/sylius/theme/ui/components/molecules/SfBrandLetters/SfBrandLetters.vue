<template>

  <div class="brand_letters_wrapper">
    <div class="brand_letters">
      <div class="one_letter" v-for="(letter, i) in startLetters" :key="i" ref="lettersRef" :id="'l' + letter"
        @click="getLetter">
        {{ letter }}
      </div>
      <div class="scroll_to_top" @click="getLetter" id="scroll_to_top">{{ $t('top of the page') }}</div>
    </div>
  </div>
</template>

<script>

import SfHeading from "../../atoms/SfHeading/SfHeading.vue";

export default {
  name: "SfBrandLetters",
  props: {
    brands: {
      type: Object | Array,
      default: {}
    },
    showhide: {
      type: Boolean,
      default: true
    },
  },
  computed: {
    console: () => console,
    window: () => window,
  },
  data() {
    return {
      startLetters: [],
    };
  },
  mounted: function () {
    this.$nextTick(() => {
      this.startLetters = this.brands.brands
        ? this.brands.brands.map((brand) => brand.name[0].toLowerCase())
        : [];
      this.startLetters = [...new Set(this.startLetters)];
      (async () => {
        while (!this.$refs.lettersRef) {
          await new Promise(resolve => setTimeout(resolve, 1));
        }
      })();
    })
  },
  methods: {
    getLetter(event) {
      if (event) {
        this.$emit('selected', event.target.id);
      }
    },
  },
  components: {
    SfHeading
  }
};
</script>

<style lang="scss">
@import "./SfBrandLetters.scss";
</style>
