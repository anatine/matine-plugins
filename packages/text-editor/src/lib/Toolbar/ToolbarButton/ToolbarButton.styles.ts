import { createStyles } from '@mantine/core';

interface ToolbarButtonStyles {
  noActive: boolean;
  isActive?: boolean;
}

export default createStyles(
  (theme, { noActive, isActive }: ToolbarButtonStyles) => {
    const colors = theme.fn.variant({
      color: theme.primaryColor,
      variant: 'light',
    });

    return {
      control: {
        backgroundColor:
          theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
        border: `1px solid ${
          theme.colorScheme === 'dark'
            ? theme.colors.dark[4]
            : theme.colors.gray[3]
        }`,
        color:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[0]
            : theme.colors.gray[7],
      },
      active:
        noActive || !isActive
          ? {}
          : {
              backgroundColor: colors.background,
              color: colors.color,
              ...theme.fn.hover({ backgroundColor: colors.hover }),
            },
    };
  }
);
