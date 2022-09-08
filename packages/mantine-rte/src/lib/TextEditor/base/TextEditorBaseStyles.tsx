import { createStyles, MantineNumberSize } from '@mantine/core';

export interface TextEditorStylesParams {
  radius?: MantineNumberSize;
  readOnly?: boolean;
}

export const useEditorStyles = createStyles(
  (theme, { radius, readOnly }: TextEditorStylesParams) => ({
    root: {
      ...theme.fn.fontStyles(),
      fontSize: theme.fontSizes.sm,
      border: `1px solid ${
        theme.colorScheme === 'dark'
          ? theme.colors.dark[5]
          : theme.colors.gray[4]
      }`,
      backgroundColor:
        theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
      borderRadius: theme.fn.radius(radius),
      position: 'relative',
      color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    },
  })
);
