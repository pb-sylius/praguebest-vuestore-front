<template>
  <section class="sf-call-to-action" :style="style">
    <div class="sf-call-to-action__text-container">
      <slot name="title" v-bind="{ title }">
        <h2
          :class="{ 'display-none': !title }"
          class="sf-call-to-action__title"
        >
          {{ title }}
        </h2>
      </slot>
      <slot name="description" v-bind="{ description }">
        <p
          :class="{ 'display-none': !description }"
          class="sf-call-to-action__description"
        >
          {{ description }}
        </p>
      </slot>
    </div>
    <slot name="button" v-bind="{ buttonText }">
      <SfButton
        :class="{ 'display-none': !buttonText }"
        :link="link"
        class="sf-call-to-action__button"
        data-testid="cta-button"
        @click="$emit('click')"
      >
        {{ buttonText }}
      </SfButton>
    </slot>
  </section>
</template>

<script>
import SfButton from "../../atoms/SfButton/SfButton.vue";

export default {
  name: "SfCallToAction",
  components: {
    SfButton,
  },
  props: {
    title: {
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
    description: {
      type: String,
      default: "",
    },
    background: {
      type: String,
      default: "",
    },
    image: {
      type: [String, Object],
      default: "",
    },
  },
  computed: {
    style() {
      const image = this.image;
      const background = this.background;
      return {
        "--_call-to-action-background-image": image.mobile
          ? `url(${image.mobile})`
          : `url(${image})`,
        "--_call-to-action-background-desktop-image":
          image.desktop && `url(${image.desktop})`,
        "--_call-to-action-background-color": background,
      };
    },
  },
};
</script>

<style lang="scss">
@import "./SfCallToAction.scss";
</style>
