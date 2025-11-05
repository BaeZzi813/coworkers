import type { StorybookConfig } from "@storybook/nextjs";
import type { RuleSetRule } from "webpack";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  staticDirs: ["../public"],
  webpackFinal: async (config) => {
    // SVGR
    if (config.module?.rules) {
      const imageRule = config.module.rules.find(
        (rule): rule is RuleSetRule =>
          typeof rule === "object" &&
          rule?.test instanceof RegExp &&
          rule.test.test(".svg")
      );
      if (imageRule) {
        if (!imageRule.exclude) {
          imageRule.exclude = /\.svg$/i;
        } else if (Array.isArray(imageRule.exclude)) {
          imageRule.exclude.push(/\.svg$/i);
        } else {
          imageRule.exclude = [imageRule.exclude, /\.svg$/i];
        }
      }
      config.module.rules.push({
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      });
    }

    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        "@": path.resolve(__dirname, "../src"),
      };
    }
    return config;
  },
};
export default config;
