import SfShipping from "./SfShipping.vue";
import { countries, shippingMethodsData } from "../internalData.js";

export default {
  title: "Components/Templates/Shipping",
  component: SfShipping,
  parameters: {
    // do not modify cssprops manually, they are generated automatically by update-components-docs script
    cssprops: {
      "heading-padding": {
        value: "var(--spacer-xl) 0 var(--spacer-lg)",
        description: "Overridden other component's CSS variable",
        control: "text",
      },
      "heading-title-font": {
        value: "",
        description: "Overridden other component's CSS variable",
        control: "text",
      },
      "select-option-font": {
        value: "",
        description: "Overridden other component's CSS variable",
        control: "text",
      },
      "select-dropdown-color": {
        value: "blue",
        description: "Overridden other component's CSS variable",
        control: "text",
      },
      "radio-container-padding": {
        value: "var(--spacer-xs)",
        description: "Overridden other component's CSS variable",
        control: "text",
      },
      "radio-description-margin": {
        value: "0",
        description: "Overridden other component's CSS variable",
        control: "text",
      },
      "button-color": {
        value: "var(--c-primary)",
        description: "Overridden other component's CSS variable",
        control: "text",
      },
      "button-transition": {
        value: "color 150ms linear",
        description: "Overridden other component's CSS variable",
        control: "text",
      },
    },
    // end of code generated automatically
    docs: {
      description: {
        component:
          "Component with the data form for order shipment. Part of the checkout process.",
      },
    },
  },
  argTypes: {
    shippingMethods: {
      control: "object",
      table: {
        category: "Props",
      },
      defaultValue: shippingMethodsData,
      description: "Available shipping methods",
    },
    headingTitle: {
      control: "text",
      table: {
        category: "Props",
      },
      defaultValue: "Shipping",
      description: "Heading text for the first header",
    },
    headingTitleLevel: {
      control: "number",
      table: {
        category: "Props",
      },
      defaultValue: 2,
      description: "Heading number for the first header",
    },
    inputsLabels: {
      control: "object",
      table: {
        category: "Props",
      },
      defaultValue: [
        "First name",
        "Last name",
        "Street name",
        "City",
        "State/Province",
        "Zip-code",
        "Phone number",
      ],
      description: "Labels for inputs",
    },
    selectLabel: {
      control: "text",
      table: {
        category: "Props",
      },
      defaultValue: "Country",
      description: "Label for select",
    },
    countries: {
      control: "object",
      table: {
        category: "Props",
      },
      defaultValue: [],
      description:
        "List of counties needed for select to creeate shipping address",
    },
    methodsHeadingTitle: {
      control: "text",
      table: {
        category: "Props",
      },
      defaultValue: "Shipping method",
      description: "Heading text for the second header",
    },
    methodsHeadingTitleLevel: {
      control: "number",
      table: {
        category: "Props",
      },
      defaultValue: 2,
      description: "Heading number for the second header",
    },
    input: {
      action: "input event emitted",
      table: { category: "Events", type: { summary: null } },
      description: "Emits input event when one of input fields is changed",
    },
    toggleInfo: {
      name: "toggle-info",
      action: "toggle-info event emitted",
      table: { category: "Events", type: { summary: null } },
      description: "Emits toggle-info event when info button is clicked",
    },
    ["toggle-info"]: {
      table: {
        disable: true,
      },
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { SfShipping },
  template: `
  <SfShipping 
    :shipping-methods="shippingMethods"
    :headingTitle="headingTitle"
    :headingTitleLevel="headingTitleLevel"
    :inputsLabels="inputsLabels"
    :selectLabel="selectLabel"
    :countries="countries"
    :methodsHeadingTitle="methodsHeadingTitle"
    :methodsHeadingTitleLevel="methodsHeadingTitleLevel"
    @input="input"
    @toggle-info="this['toggleInfo']"
  />`,
});

export const Common = Template.bind({});
Common.args = {
  countries: countries,
  shippingMethods: shippingMethodsData,
};
Common.parameters = {
  docs: {
    source: {
      type: "dynamic",
    },
  },
};