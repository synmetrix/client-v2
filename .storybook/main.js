// .storybook/main.js
const {
  getCodeEditorStaticDirs,
} = require("storybook-addon-code-editor/getStaticDirs");

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-mdx-gfm",
    "storybook-addon-code-editor",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  features: {
    storyStoreV7: true,
  },
  docs: {
    autodocs: true,
  },
  staticDirs: [...getCodeEditorStaticDirs()],
  core: { builder: "@storybook/builder-vite" },
};
