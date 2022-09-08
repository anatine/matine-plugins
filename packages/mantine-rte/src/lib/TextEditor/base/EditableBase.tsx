import { Box, DefaultProps, useComponentDefaultProps } from '@mantine/core';
import { forwardRef, PropsWithChildren, useCallback } from 'react';
import { Editor } from 'slate';
import {
  Editable,
  ReactEditor,
  RenderElementProps,
  RenderLeafProps,
  RenderPlaceholderProps,
  useSlate,
} from 'slate-react';
import { elementRenderer } from '../lib/element-renderer';
import { leafRenderer } from '../lib/leaf-renderer';
import { handleHotkey } from '../lib/toggles';
import DOMRange = globalThis.Range;

export interface EditableBaseProps
  extends DefaultProps,
    Omit<React.ComponentPropsWithoutRef<'div'>, 'onChange' | 'onKeyDown'> {
  //** Editable Props */
  renderElement?: (props: RenderElementProps) => JSX.Element;
  renderLeaf?: (props: RenderLeafProps) => JSX.Element;
  renderPlaceholder?: (props: RenderPlaceholderProps) => JSX.Element;
  scrollSelectionIntoView?: (editor: ReactEditor, domRange: DOMRange) => void;
  onKeyDown?: (
    editor: Editor,
    event: React.KeyboardEvent<HTMLDivElement>
  ) => void;
  //** Editable Text Props */
  editableProps?: React.TextareaHTMLAttributes<HTMLDivElement>;
  placeholder?: string;
}

export const EditableBase = forwardRef<
  Editor,
  PropsWithChildren<EditableBaseProps>
>((props, ref) => {
  const {
    children,
    id,
    className,
    classNames,
    styles,
    unstyled,
    renderElement = elementRenderer({}),
    renderLeaf = leafRenderer({}),
    onKeyDown = handleHotkey,
    renderPlaceholder,
    scrollSelectionIntoView,
    placeholder,
    editableProps,
    ...wrapperProps
  } = useComponentDefaultProps('RichTextEditor', {}, props);

  //* Editor Functions */
  const renderElementCb = useCallback(
    (props: RenderElementProps) => renderElement(props),
    [renderElement]
  );
  const renderLeafCb = useCallback(
    (props: RenderLeafProps) => renderLeaf(props),
    [renderLeaf]
  );

  const editor = useSlate();

  return (
    <Box className={className} {...wrapperProps}>
      <Editable
        renderElement={renderElementCb}
        renderLeaf={renderLeafCb}
        placeholder={placeholder}
        onKeyDown={(event) => {
          editor && onKeyDown(editor, event);
        }}
        {...editableProps}
      />
      {children}
    </Box>
  );
});

EditableBase.displayName = '@mantine/rte/EditableBase';
