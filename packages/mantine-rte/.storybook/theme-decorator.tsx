import React, { PropsWithChildren } from 'react';
import { Story, DecoratorFn } from '@storybook/react';
import { useDarkMode } from 'storybook-dark-mode';
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from '@mantine/core';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

export const ThemeStory = ({ children }: PropsWithChildren) => {
  const colorScheme = useDarkMode() ? 'dark' : 'light';

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{ colorScheme: colorScheme || 'light' }}
    >
      {children}
    </MantineProvider>
  );
};

export const withThemeProvider: DecoratorFn = (Story, context) => {
  return (
    <ThemeStory>
      <Story {...context} />
    </ThemeStory>
  );
};
