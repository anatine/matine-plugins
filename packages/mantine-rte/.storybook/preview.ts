import '@storybook/addon-console'; // Automatically forwards all logs in the "Actions" panel - See https://github.com/storybookjs/storybook-addon-console
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { addDecorator } from '@storybook/react';
import { withPerformance } from 'storybook-addon-performance';
import { withThemeProvider } from './theme-decorator';

addDecorator(withThemeProvider);

/**
 * Enables storybook-addon-performance for all stories by default.
 *
 * @see https://github.com/atlassian-labs/storybook-addon-performance#installation
 */
addDecorator(withPerformance);

export const parameters = {
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
  actions: {
    argTypesRegex: '^on[A-Z].*',

    /**
     * Since Controls is built on the same engine as Storybook Docs, it can also show property documentation alongside your controls using the expanded parameter (defaults to false).
     * We enable this for all stories by default.
     *
     * @see https://storybook.js.org/docs/react/essentials/controls#show-full-documentation-for-each-property
     */
    expanded: true,
  },
};

export const globalTypes = {
  theme: {
    name: 'Mobile Theme',
    description: 'Global theme for components',
  },
};
