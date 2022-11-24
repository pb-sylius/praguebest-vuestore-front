<template>
  <section
    class="sf-banner"
    :style="style"
    v-on="$listeners"
  >
    <component :is="wrapper" class="sf-banner__wrapper" :link="link">
      <slot name="subtitle" v-bind="{ subtitle }">
        <span
          :class="{ 'display-none': !subtitle }"
          class="sf-banner__subtitle"
        >
          {{ subtitle }}
        </span>
      </slot>
      <slot name="title" v-bind="{ title }">
        <span :class="{ 'display-none': !title }" class="sf-banner__title">
          {{ title }}
        </span>
      </slot>
      <slot name="description" v-bind="{ description }">
        <span
          :class="{ 'display-none': !description }"
          class="sf-banner__description"
        >
          {{ description }}
        </span>
      </slot>
      <slot name="call-to-action" v-bind="{ buttonText }">
        <SfButton
          v-if="buttonText && !isMobileView"
          :link="link"
          class="sf-banner__call-to-action color-secondary"
          data-testid="banner-cta-button"
          v-on="$listeners"
        >
          {{ buttonText }}
        </SfButton>
      </slot>
    </component>
  </section>
</template>

<script>
import SfButton from "../../atoms/SfButton/SfButton.vue";
import SfLink from "../../atoms/SfLink/SfLink.vue";
import {
  mapMobileObserver,
  unMapMobileObserver,
} from "../../../utilities/mobile-observer";

export default {
  name: "SfBanner",
  components: {
    SfButton,
    SfLink,
  },
  props: {
    title: {
      type: String,
      default: "",
    },
    subtitle: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    buttonText: {
      type: String,
      default: "",
    },
    link: {
      type: String,
      default: null,
    },
    background: {
      type: String,
      default: "",
    },
    image: {
      type: [String, Object],
      default: "",
    },
    /** if false, image will be rendered as image element */
    useImageAsBackground: {
      type: Boolean,
      default: true,
    },
    /** if image rendered as image element, how much space reserve for it in percentages */
    imageWidth: {
      type: Number,
      default: 0,
    },
    /** media breakpoint for banner elements reposition (mobile layout) */
    breakpoint: {
      type: Number,
      default: 600
    }
  },
  data() {
    return {
      isMobileView: false,
    };
  },
  computed: {
    ...mapMobileObserver(),
    style() {
      const image = this.image;
      const background = this.background;

      return {
        "--_banner-background-image": image.mobile && this.useImageAsBackground
          ? `url(${image.mobile})`
          : `url(${image})`,
        "--_banner-background-desktop-image":
          image.desktop && this.useImageAsBackground && `url(${image.desktop})`,
        "--_banner-background-color": background,
      };
    },
    wrapper() {
      return !this.isMobileView ? "div" : this.link ? "SfLink" : "SfButton";
    },
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
@import "./SfBanner.scss";
</style>
