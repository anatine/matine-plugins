import React from 'react';
import { Story, DecoratorFn } from '@storybook/react';
import { useDarkMode } from 'storybook-dark-mode';
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from '@mantine/core';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { withThemeProvider } from './theme-decorator';

export const decorators = [withThemeProvider];

export const parameters = {
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
};

export const globalTypes = {
  theme: {
    name: 'Mobile Theme',
    description: 'Global theme for components',
  },
};
