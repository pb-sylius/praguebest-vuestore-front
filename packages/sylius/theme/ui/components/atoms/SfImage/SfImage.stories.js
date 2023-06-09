import SfImage from "./SfImage.vue";
import placeholderSvg from "../../../assets/product_placeholder.svg";
import productJpg from "../../../assets/img/product-216x326.jpg";
import productWebp from "../../../assets/img/product-109x164.webp";

export default {
  title: "Components/Atoms/Image",
  component: SfImage,
  parameters: {
    // do not modify cssprops manually, they are generated automatically by update-components-docs script
    cssprops: {
      "image-width": { value: "", control: "text" },
      "image-height": { value: "auto", control: "text" },
      "image-overlay-padding": { value: "", control: "text" },
      "image-overlay-background": {
        value: "rgba(var(--c-dark-base), 0.6)",
        control: "text",
      },
      "image-overlay-color": { value: "var(--c-white)", control: "text" },
      "image-overlay-opacity": { value: "0", control: "text" },
    },
    // end of code generated automatically
    docs: {
      description: {
        component:
          "Image accepting string source and an array of srcsets (with breakpoints( and widths) or resolutions)",
      },
    },
  },
  argTypes: {
    srcsets: {
      control: "object",
      table: {
        category: "Props",
      },
      description:
        "Array of images' source, dimension and breakpoints to generate srcset attribute",
    },
    src: {
      control: "text",
      table: {
        category: "Props",
      },
      description: "Main source url for the image",
    },
    width: {
      control: "number",
      table: {
        category: "Props",
      },
      description: "Width of the image",
    },
    height: {
      control: "number",
      table: {
        category: "Props",
      },
      description: "Height of the image",
    },
    placeholder: {
      control: "text",
      table: {
        category: "Props",
      },
      defaultValue: "",
      description: "Url source of the image's placeholder while it is loading.",
    },
    alt: {
      control: "text",
      table: {
        category: "Props",
        defaultValue: {
          summary: "",
        },
      },
      description:
        "Alternative text in case image is not loaded. Use empty string '' for decorative-only image and full text otherwise",
    },
    loading: {
      control: {
        type: "select",
        options: ["", "lazy", "eager"],
      },
      table: {
        category: "Props",
      },
      description:
        "Native loading attribute supported, either 'eager', 'lazy' or none.",
    },
    default: {
      table: {
        category: "Slots",
        type: {
          summary: null,
        },
      },
      description: "Use this slot to have custom element on image overlay",
    },
  },
};

const Template = (args, { argTypes }) => ({
  components: { SfImage },
  props: Object.keys(argTypes),
  template: `
  <SfImage
    :src="src"
    :srcsets="srcsets"
    :width="width"
    :height="height"
    :alt="alt"
  />`,
});

export const Common = Template.bind({});
Common.args = {
  src: productJpg,
  alt: "Vila stripe maxi shirt dress",
  srcsets: [
    {
      src: productWebp,
      width: 109,
      breakpoint: 480,
    },
    {
      src: productJpg,
      width: 1200,
      breakpoint: 1200,
    },
    {
      src: productWebp,
      width: "400px",
      breakpoint: 768,
    },
  ],
  width: 216,
  height: 326,
};
Common.parameters = {
  docs: {
    source: {
      type: "dynamic",
    },
  },
};

export const WithSrcOnly = Template.bind({});
WithSrcOnly.args = {
  ...Common.args,
  width: 216,
  height: 326,
  srcsets: [],
};
WithSrcOnly.parameters = {
  docs: {
    source: {
      type: "dynamic",
    },
  },
};

export const WithBreakpoints = Template.bind({});
WithBreakpoints.args = {
  ...Common.args,
  width: 216,
  height: 326,
};
WithBreakpoints.parameters = {
  docs: {
    source: {
      type: "dynamic",
    },
  },
};

export const WithResolutions = Template.bind({});
WithResolutions.args = {
  ...WithSrcOnly.args,
  srcsets: [
    {
      src: productWebp,
      resolution: 1,
    },
    {
      src: productJpg,
      resolution: 1.5,
    },
    {
      src: productWebp,
      resolution: 2,
    },
  ],
};
WithResolutions.parameters = {
  docs: {
    source: {
      type: "dynamic",
    },
  },
};


export const WithPlaceholder = Template.bind({});
WithPlaceholder.args = {
  ...WithSrcOnly.args,
  placeholder:
  placeholderSvg,
};
WithPlaceholder.parameters = {
  docs: {
    source: {
      type: "dynamic",
    },
  },
};

export const WithAccessibility = Template.bind({});
WithAccessibility.args = {
  ...WithSrcOnly.args,
};
WithAccessibility.decorators = [
  () => ({
    template: `<div>
    <p>
      <span style="color:#b40e01">Red</span> highlight when no Alt text found.
    </p>
    <story />
  </div>`,
  }),
];
WithAccessibility.parameters = {
  docs: {
    source: {
      type: "dynamic",
    },
  },
};

export const UseOverlaySlot = (args, { argTypes }) => ({
  components: { SfImage },
  props: Object.keys(argTypes),
  template: `
  <SfImage
    :src="src"
    :srcsets="srcsets"
    :width="width"
    :height="height"
    :alt="alt"
  >{{textOverlay}}</SfImage>`,
});
UseOverlaySlot.args = {
  ...WithSrcOnly.args,
  textOverlay: "Custom overlay",
};
