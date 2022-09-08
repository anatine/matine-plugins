import { createStyles, MantineNumberSize } from '@mantine/core';

export interface RichTextEditorStylesParams {
  readOnly?: boolean;
}

export const useRichTextEditorStyles = createStyles(
  (theme, { readOnly }: RichTextEditorStylesParams) => ({
    toolbar: {
      display: readOnly ? 'none' : undefined,
    },

    editor: {
      whiteSpace: 'pre-wrap',
      outline: 'none',
      padding: `${theme.spacing.sm}px ${theme.spacing.md}px`,
    },
  })
);
