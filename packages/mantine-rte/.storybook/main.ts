import { rootMain } from '../../../.storybook/main';
import type { StorybookConfig, Options } from '@storybook/core-common';
import { join } from 'path';
import merge from 'ts-deepmerge';

const toPath = (_path: string) => join(process.cwd(), _path);

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

    return merge(config, {
      resolve: {
        alias: {
          /**
           * Map Emotion 10 libraries to Emotion 11 libraries.
           *
           * Otherwise Storybook fails to compile with "Module not found: Error: Can't resolve '@emotion/styled/base'", etc.
           * It wasn't necessary to do this until we imported React component using "@emotion/styled".
           * This issue is probably caused because Storybook uses Emotion 10 while we have Emotion 11 used by the Next.js app.
           *
           * @see https://github.com/storybookjs/storybook/issues/13277#issuecomment-751747964
           */
          '@emotion/core': toPath('node_modules/@emotion/react'),
          '@emotion/styled': toPath('node_modules/@emotion/styled'),
          'emotion-theming': toPath('node_modules/@emotion/react'),
        },
      },
    });
  },
};

module.exports = config;
