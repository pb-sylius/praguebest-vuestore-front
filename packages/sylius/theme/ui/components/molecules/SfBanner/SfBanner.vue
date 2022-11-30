<template>
  <section
    class="sf-banner"
    :class="sectionClass"
    :style="style"
    v-on="$listeners"
  >
    <component :is="wrapper" class="sf-banner__wrapper" :link="link" :class="bannerTextWrapperClass">
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
          v-if="buttonText"
          :link="link"
          class="sf-banner__call-to-action color-secondary"
          data-testid="banner-cta-button"
          v-on="$listeners"
        >
          {{ buttonText }}
        </SfButton>
      </slot>
    </component>
    <SfImage
      v-if="!useImageAsBackground"
      :src="image.desktop"
      alt="Banner Image"
      class="banner_img_element"
      :class="imageElementPosition"
      :style="imageElementStyle"
      />
  </section>
</template>

<script>
import SfButton from "../../atoms/SfButton/SfButton.vue";
import SfLink from "../../atoms/SfLink/SfLink.vue";
import SfImage from "../../atoms/SfImage/SfImage.vue";
import {
  mapMobileObserver,
  unMapMobileObserver,
} from "../../../utilities/mobile-observer";
import {
  mapMenuObserver,
  unMapMenuObserver,
} from "../../../utilities/menu-observer";

export default {
  name: "SfBanner",
  components: {
    SfButton,
    SfLink,
    SfImage,
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
    /** min height for max viewport */
    minHeightMax: {
      type: Number,
      default: 400,
    },
    /** min height for min viewport */
    minHeightMin: {
      type: Number,
      default: 340,
    },
    /** if false, image will be rendered as image element */
    useImageAsBackground: {
      type: Boolean,
      default: true,
    },
    /** if image rendered as image element, how much space reserve for it in percentages */
    imageWidth: {
      type: Number,
      default: 50,
    },
    /** media breakpoint for banner elements reposition (mobile layout) */
    breakpoint: {
      type: Number,
      default: 600
    },
    imgHeightAfterBreakpoint: {
      type: Number,
      default: 230
    },
    /** Max width of the text block */
    textMaxWidth: {
      type: Number,
      default: 0
    },
    /** if image rendered as image element, place it on left or right side */
    imageElementPosition: {
      type: 'left' | 'right',
      default: 'right'
    },
    /** top and bottom margin for max viewport */
    maxMargin: {
      type: Number,
      default: 0
    },
    /** top and bottom margin for min viewport */
    minMargin: {
      type: Number,
      default: 0
    },
    /** title font size for max viewport */
    titleMaxSize: {
      type: Number,
      default: 35
    },
    /** title font size for min viewport */
    titleMinSize: {
      type: Number,
      default: 24
    },
    /** subtitle font size for max viewport */
    subTitleMaxSize: {
      type: Number,
      default: 19
    },
    /** subtitle font size for min viewport */
    subTitleMinSize: {
      type: Number,
      default: 15
    },
    /** text font size for max viewport */
    textMaxSize: {
      type: Number,
      default: 17
    },
    /** text font size for min viewport */
    textMinSize: {
      type: Number,
      default: 14
    },
  },
  data() {
    return {
      isMobileView: false,
    };
  },
  computed: {
    ...mapMobileObserver(),
    ...mapMenuObserver(),
    style() {
      const image = this.image;

      return {
        "--_banner-background-image": image.mobile && this.useImageAsBackground
          ? `url(${image.mobile})`
          : `url(${image})`,
        "--_banner-background-desktop-image": image.desktop && this.useImageAsBackground
          ? `url(${image.desktop})`
          : `url(${image})`,
        "background-color": this.background,
        "--banner-wrapper-width": `${this.textMaxWidth > 0 ? this.textMaxWidth + 'px' : '100%'}`,
        "--banner-justify-content": this.imageElementPosition === 'left' ? 'flex-start' : 'space-between',
        "--banner-min-height-max": this.minHeightMax,
        "--banner-min-height-min": this.minHeightMin,
        "--banner-max-margin": this.maxMargin,
        "--banner-min-margin": this.minMargin,
        "--banner-max-title": this.titleMaxSize,
        "--banner-min-title": this.titleMinSize,
        "--banner-max-subtitle": this.subTitleMaxSize,
        "--banner-min-subtitle": this.subTitleMinSize,
        "--banner-max-text": this.textMaxSize,
        "--banner-min-text": this.textMinSize,
        "--banner-img-height-after-breakpoint": this.imgHeightAfterBreakpoint + 'px',
      };
    },
    imageElementStyle() {
      return {
        "--_image_width": this.imageWidth + '%'
      }
    },
    bannerTextWrapperClass() {
      return this.imageElementPosition === 'left' ? 'right' : 'left';
    },
    wrapper() {
      return !this.isMobileView ? "div" : this.link ? "SfLink" : "SfButton";
    },
    sectionClass() {
      const toCol = this.observedWidth < this.breakpoint;
      return {
        with_img_element: !this.useImageAsBackground,
        to_column: toCol
      }
    },
  },
  mounted() {
    this.isMobileView = this.isMobile;
  },
  beforeDestroy() {
    unMapMobileObserver();
    unMapMenuObserver();
  },
};
</script>

<style lang="scss">
@import "./SfBanner.scss";
</style>
