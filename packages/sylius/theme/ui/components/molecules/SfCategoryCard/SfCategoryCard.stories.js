import SfCategoryCard from "./SfCategoryCard.vue";
import cardM from "../../../assets/img/category-cardM.jpg";
import cardD from "../../../assets/img/category-cardD.jpg";

export default {
  title: "Components/Molecules/CategoryCard",
  component: SfCategoryCard,
  parameters: {
    // do not modify cssprops manually, they are generated automatically by update-components-docs script
    cssprops: {},
    // end of code generated automatically
    docs: {
      description: {
        component: "The component for displaying information about categories.",
      },
    },
  },
  argTypes: {
    label: {
      control: "text",
      table: {
        category: "Props",
      },
      description: "Label for card",
    },
    count: {
      control: "text",
      table: {
        category: "Props",
      },
      description: "Count for card",
    },
    link: {
      control: "text",
      table: {
        category: "Props",
      },
      description: "Link for category",
    },
    background: {
      control: "object",
      table: {
        category: "Props",
      },
      description:
        "Defines background of card. Can be a string or object with strings to display images for desktop and mobile",
    },
    default: {
      table: {
        category: "Slots",
        type: {
          summary: null,
        },
      },
      description: "Here you can pass content of your category card",
    },
  },
};

const Template = (args, { argTypes }) => ({
  components: { SfCategoryCard },
  props: Object.keys(argTypes),
  template: `
  <SfCategoryCard
    :link="link"
    :label="label"
    :count="count"
    :background="background"
  />`,
});

export const Common = Template.bind({});
Common.args = {
  label: "Personal Care",
  count: "32",
  link: "#",
  background: {
    mobile: cardM,
    desktop: cardD,
  },
};
Common.parameters = {
  docs: {
    source: {
      type: "dynamic",
    },
  },
};