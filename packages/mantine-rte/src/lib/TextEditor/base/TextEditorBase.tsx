import {
  Box,
  DefaultProps,
  MantineNumberSize,
  Selectors,
  useComponentDefaultProps,
} from '@mantine/core';
import { mergeRefs, useId } from '@mantine/hooks';
import { forwardRef, PropsWithChildren, useMemo, useRef } from 'react';
import { createEditor, Descendant, Editor } from 'slate';
import { withHistory } from 'slate-history';
import { Slate, withReact } from 'slate-react';
import { useEditorStyles } from './TextEditorBaseStyles';

export type TextEditorStylesNames = Selectors<typeof useEditorStyles>;

export interface TextEditorBaseProps
  extends DefaultProps<TextEditorStylesNames>,
    Omit<React.ComponentPropsWithoutRef<'div'>, 'onChange'> {
  //** Slate schema structure object or a string which will just be placed in a default object */
  initialValue?: string | Descendant[];
  //** Radius from theme.radius, or number to set border-radius in px */
  radius?: MantineNumberSize;
}

export const TextEditorBase = forwardRef<
  Editor,
  PropsWithChildren<TextEditorBaseProps>
>((props, ref) => {
  const {
    children,
    initialValue,
    radius,
    id,
    className,
    classNames,
    styles,
    unstyled,
    ...others
  } = useComponentDefaultProps('TextEditorBase', {}, props);

  const editorId = useId(id);

  //* Styling */
  const { classes, cx } = useEditorStyles(
    {
      radius: radius || 0,
    },
    { classNames, styles: styles as never, unstyled, name: 'TextEditorBase' }
  );

  //* Editor Setup */
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const editorRef = useRef<Editor>(editor);
  // mergeRefs(editorRef, ref);
  ref = editorRef;
  console.log('🚀 ~ file: TextEditorBase.tsx ~ line 56 ~ ref', ref);

  //* Initial Value */
  const initValue = useMemo<Descendant[]>(() => {
    console.log('initialValue', initialValue);
    return !initialValue || typeof initialValue === 'string'
      ? [
          {
            type: 'paragraph',
            children: [{ text: initialValue || '' }],
          },
        ]
      : initialValue;
  }, [initialValue]);
  // FORCE CHANGE WHEN VALUES CHANGE

  return (
    <Slate editor={editor} value={initValue}>
      <Box id={editorId} className={cx(classes.root, className)} {...others}>
        {children}
      </Box>
    </Slate>
  );
});

TextEditorBase.displayName = '@anatine/mantine-rte/TextEditorBase';
