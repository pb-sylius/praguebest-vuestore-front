import SfMyProfile from "./SfMyProfile.vue";
import { accountData } from "../internalData.js";
import { paramsDocs } from "../../../utilities/story";

export default {
  title: "Components/Templates/MyProfile",
  component: SfMyProfile,
  parameters: {
    // do not modify cssprops manually, they are generated automatically by update-components-docs script
    cssprops: {
      "button-width": {
        value: "100%",
        description: "Overridden other component's CSS variable",
        control: "text",
      },
    },
    // end of code generated automatically
    docs: {
      description: {
        component:
          "Component with profile details, allows to change personal data and password. Part of account.",
      },
    },
  },
  argTypes: {
    tabsTitles: {
      control: "object",
      table: {
        category: "Props",
      },
      defaultValue: ["Personal data", "Password change"],
      description: "Labels for tabs titles",
    },
    account: {
      control: "object",
      table: {
        category: "Props",
        defaultValue: {
          summary: "{}",
        },
      },
      defaultValue: "",
      description: "Account data",
    },
    personalInputsLabels: {
      control: "object",
      table: {
        category: "Props",
      },
      defaultValue: ["First Name", "Last Name", "Your e-mail"],
      description: "Labels for inputs in the first tab",
    },
    passwordInputsLabels: {
      control: "object",
      table: {
        category: "Props",
      },
      defaultValue: ["Current Password", "New Password", "Repeat Password"],
      description: "Labels for inputs in the second tab",
    },
    saveButtonText: {
      control: "text",
      table: {
        category: "Props",
      },
      defaultValue: "Save changes",
      description: "Text for save button",
    },
    updateButtonText: {
      control: "text",
      table: {
        category: "Props",
      },
      defaultValue: "Update password",
      description: "Text for update button",
    },
    personalDataDescription: {
      control: "text",
      table: {
        category: "Props",
      },
      defaultValue:
        "Feel free to edit any of your details below so your account is always up to date",
      description: "Description for the forst tab",
    },
    ["update:personal"]: {
      action: "update:personal event emitted",
      table: { category: "Events", type: { summary: null } },
      description:
        "Emits update:personal event with personal data when button is clicked",
    },
    ["update:password"]: {
      action: "update:password event emitted",
      table: { category: "Events", type: { summary: null } },
      description:
        "Emits update:password event with updated password when button is clicked",
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { SfMyProfile },
  template: `
  <SfMyProfile
    :tabs-titles="tabsTitles"
    :account="account"
    :personalInputsLabels="personalInputsLabels"
    :passwordInputsLabels="passwordInputsLabels"
    :saveButtonText="saveButtonText"
    :updateButtonText="updateButtonText"
    :personalDataDescription="personalDataDescription"
    @update:personal="this['update:personal']"
    @update:password="this['update:password']"
  />`,
});

export const Common = Template.bind({});
Common.args = {
  account: accountData,
};

Common.parameters = paramsDocs(SfMyProfile);
Common.parameters = {
  docs: {
    source: {
      type: "dynamic",
    },
  },
};