<template>
  <div class="sf-color-picker" :class="{ 'sf-color-picker--active': isOpen }">
    <transition name="sf-color-picker" mode="out-in">
      <div
        v-if="!isOpen"
        key="color-picker-button"
        class="sf-color-picker__button"
      >
        <slot name="open" v-bind="{ toggle }">
          <SfButton
            class="color-secondary sf-color-picker__button-open"
            @click="toggle"
            >+ Colors</SfButton
          >
        </slot>
      </div>
      <div v-else key="color-picker-colors" class="sf-color-picker__colors">
        <slot name="label" v-bind="{ label }">
          <div
            :class="{ 'display-none': !label }"
            class="sf-color-picker__label "
          >
            {{ label }}
          </div>
        </slot>
        <slot />
        <slot name="close" v-bind="{ hasClose, toggle, isOpen }">
          <SfButton
            :class="{ 'display-none': !hasClose }"
            class="sf-button--text sf-color-picker__close"
            aria-label="Close button"
            :aria-pressed="!isOpen"
            @click="toggle"
          >
            <SfIcon icon="cross" />
          </SfButton>
        </slot>
      </div>
    </transition>
  </div>
</template>

<script>
import SfIcon from "../../atoms/SfIcon/SfIcon.vue";
import SfButton from "../../atoms/SfButton/SfButton.vue";
import SfOverlay from "../../atoms/SfOverlay/SfOverlay.vue";
import {
  mapMobileObserver,
  unMapMobileObserver,
} from "../../../utilities/mobile-observer";

export default {
  name: "SfColorPicker",
  components: { SfIcon, SfButton, SfOverlay },
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: "",
    },
    hasClose: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    toggle() {
      this.$emit("click:toggle");
    },
  },
  computed: {
    ...mapMobileObserver(),
  },
  mounted() {
    this.isMobileView = this.isMobile;
  },
  beforeDestroy() {
    unMapMobileObserver();
  },
};
</script>

<style lang="scss">
@import "./SfColorPicker.scss";
</style>
