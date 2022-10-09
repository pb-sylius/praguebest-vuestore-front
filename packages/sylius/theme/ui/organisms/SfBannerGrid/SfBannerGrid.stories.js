import SfBannerGrid from "./SfBannerGrid.vue";
import SfBanner from "../../molecules/SfBanner/SfBanner.vue";
import bannerF from "../../assets/img/bannerF.jpg";
import bannerE from "../../assets/img/bannerE.jpg";
import bannerC from "../../assets/img/bannerC.jpg";
import bannerG from "../../assets/img/bannerG.jpg";

const banners = [
  {
    slot: "banner-A",
    subtitle: "Dresses",
    title: "Cocktail & Party",
    description:
      "Find stunning women's cocktail dresses and party dresses. Stand out in lace and metallic cocktail dresses from all your favorite brands.",
    buttonText: "Shop now",
    image: bannerF,
    class: "sf-banner--slim",
  },
  {
    slot: "banner-B",
    subtitle: "Dresses",
    title: "Linen Dresses",
    image: bannerE,
    class: "sf-banner--slim",
    style: "padding-right: 20%",
    description:
      "Find stunning women's cocktail dresses and party dresses. Stand out in lace and metallic cocktail dresses from all your favorite brands.",
  },
  {
    slot: "banner-C",
    subtitle: "T-Shirts",
    title: "The Office Life",
    buttonText: "Shop now",
    image: bannerC,
    class: "sf-banner--slim",
  },
  {
    slot: "banner-D",
    subtitle: "Summer Sandals",
    title: "Eco Sandals",
    buttonText: "Shop now",
    image: bannerG,
    class: "sf-banner--slim",
  },
];

export default {
  title: "Components/Organisms/BannerGrid",
  component: SfBannerGrid,
  parameters: {
    // do not modify cssprops manually, they are generated automatically by update-components-docs script
    cssprops: {
      "banner-grid-row-display": { value: "block", control: "text" },
      "banner-grid-row-flex": { value: "", control: "text" },
      "banner-grid-row-margin": { value: "0", control: "text" },
      "banner-grid-col-display": { value: "block", control: "text" },
      "banner-grid-col-flex": { value: "", control: "text" },
      "banner-grid-col-margin": { value: "0", control: "text" },
      "banner-align-items": {
        value: "flex-start",
        description: "Overridden other component's CSS variable",
        control: "text",
      },
      "banner-container-width": {
        value: "100%",
        description: "Overridden other component's CSS variable",
        control: "text",
      },
      "banner-description-margin": {
        value: "var(--spacer-xl) 0",
        description: "Overridden other component's CSS variable",
        control: "text",
      },
      "banner-height": {
        value: "510px",
        description: "Overridden other component's CSS variable",
        control: "text",
      },
    },
    // end of code generated automatically
    docs: {
      description: {
        component: "Full width grid made with banners.",
      },
    },
  },
  argTypes: {
    bannerGrid: {
      control: {
        type: "select",
        options: [1, 2],
      },
      defaultValue: 1,
      table: {
        category: "Props",
        defaultValue: {
          summary: 1,
        },
      },
      description: "Number of grid for banners.",
    },
    "banner-A": {
      table: {
        category: "Slots",
        type: {
          summary: null,
        },
      },
      description: "Slot for banner image",
    },
    "banner-B": {
      table: {
        category: "Slots",
        type: {
          summary: null,
        },
      },
      description: "Slot for banner image",
    },
    "banner-C": {
      table: {
        category: "Slots",
        type: {
          summary: null,
        },
      },
      description: "Slot for banner image",
    },
    "banner-D": {
      table: {
        category: "Slots",
        type: {
          summary: null,
        },
      },
      description: "Slot for banner image",
    },
  },
};

const Template = (args, { argTypes }) => ({
  components: { SfBannerGrid, SfBanner },
  props: Object.keys(argTypes),
  data() {
    return { banners };
  },
  template: `
  <SfBannerGrid
    :banner-grid="bannerGrid"
    :style="{maxWidth: '1240px', margin: 'auto'}"
  >
    <template 
      v-for="item in banners"
      v-slot:[item.slot]
    >
      <SfBanner
        :key="item.slot"
        :title="item.title"
        :subtitle="item.subtitle"
        :description="item.description" 
        :button-text="item.buttonText"
        :image="item.image"
        :class="item.class"
      />
    </template>
  </SfBannerGrid>`,
});

export const Common = Template.bind({});
Common.args = {};
