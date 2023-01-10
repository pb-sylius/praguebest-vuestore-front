<template>
  <div class="sf-one_manufacturer_head">
      <SfImage
        :width="imageWidth"
        :height="imageHeight"
        :src="image"
        :alt="title"
        class="sf-heading_image"
      />
      <slot name="details" v-bind="{ title, description, titleLevel }">
        <div class="sf-manufacturer_texts">
          <SfHeading
            :title-level="titleLevel"
            :title="title"
          />
          <p class="sf-manufacturer_description" v-if="description" v-html="description" />
        </div>
      </slot>
  </div>
</template>

<script>
import SfHeading from "../../atoms/SfHeading/SfHeading.vue";
import SfImage from "../../atoms/SfImage/SfImage.vue";

export default {
  name: "SfOneManufacturerHead",
  components: {
    SfHeading,
    SfImage,
  },
  props: {
    image: {
      type: String,
      default: "",
    },
    imageWidth: {
      type: [String, Number],
      default: "",
    },
    imageHeight: {
      type: [String, Number],
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    titleLevel: {
      type: Number,
      default: 3,
    },
    description: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss">
@import "./SfOneManufacturerHead.scss";
</style>
