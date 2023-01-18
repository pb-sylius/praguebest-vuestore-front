<template>

  <div class="manufacturer_letters_wrapper">
    <div class="manufacturer_letters">
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
  name: "SfManufacturerLetters",
  props: {
    manufacturers: {
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
      this.startLetters = this.manufacturers.manufacturers
        ? this.manufacturers.manufacturers.map((manufacturer) => manufacturer.name[0].toLowerCase())
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
@import "./SfManufacturerLetters.scss";
</style>
