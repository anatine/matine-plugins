import { rootMain } from '../../../.storybook/main';
import type { StorybookConfig, Options } from '@storybook/core-common';

const config: StorybookConfig = {
  ...rootMain,

  framework: {
    name: '@storybook/react-webpack5',
    options: { fastRefresh: true },
  },

  features: {
    storyStoreV7: false,
    modernInlineRender: true,
  },

  core: { ...rootMain.core, builder: 'webpack5' },

  typescript: { ...(rootMain.typescript || {}), reactDocgen: 'react-docgen' },

  stories: [
    ...rootMain.stories,
    '../src/lib/**/*.stories.mdx',
    '../src/lib/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    ...(rootMain.addons || []),
    '@nrwl/react/plugins/storybook',
    'storybook-addon-swc',
    '@storybook/addon-a11y',
    'storybook-addon-performance/register',
    'storybook-mobile',
  ],
  webpackFinal: async (config, { configType }: Options) => {
    // apply any global webpack configs that might have been specified in .storybook/main.ts
    if (rootMain.webpackFinal) {
      config = await rootMain.webpackFinal(config, { configType } as Options);
    }

    // add your own webpack tweaks if needed
    return config;
  },
};

module.exports = config;
