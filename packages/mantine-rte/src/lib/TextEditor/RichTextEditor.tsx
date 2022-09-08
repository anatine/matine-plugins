import {
  forwardRef,
  PropsWithChildren,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { HistoryEditor, withHistory } from 'slate-history';
import {
  Editable,
  withReact,
  useSlate,
  Slate,
  ReactEditor,
  RenderElementProps,
  RenderLeafProps,
  RenderPlaceholderProps,
} from 'slate-react';
import {
  Editor,
  Transforms,
  Text,
  Descendant,
  createEditor,
  Element as SlateElement,
  BaseEditor,
} from 'slate';
import {
  DefaultProps,
  Selectors,
  Box,
  MantineNumberSize,
  useComponentDefaultProps,
  BlockquoteProps,
  ListProps,
  ListItemProps,
  Title,
  TitleProps,
  Text as MantineText,
  TextProps,
  Blockquote,
  List,
  CodeProps,
  HighlightProps,
  Code,
  Highlight,
  Mark,
  createStyles,
} from '@mantine/core';
import { mergeRefs, useId } from '@mantine/hooks';
import isHotkey from '../utils/is-hotkey';
import { elementRenderer } from './lib/element-renderer';
import { leafRenderer } from './lib/leaf-renderer';
import { useEditorStyles } from './base/TextEditorBaseStyles';
import { TextEditorBase, TextEditorBaseProps } from './base/TextEditorBase';
import { useRichTextEditorStyles } from './RichTextEditorStyles';
import DOMRange = globalThis.Range;
import { handleHotkey } from './lib/toggles';
import { EditableBase } from './base/EditableBase';
import { Toolbar } from '../Toolbar/Toolbar';
import { DEFAULT_CONTROLS, ToolbarControl } from '../Toolbar/controls/controls';
import {
  DEFAULT_LABELS,
  RichTextEditorLabels,
} from '../Toolbar/controls/editor-labels';

export type RichTextEditorStylesNames = Selectors<
  typeof useRichTextEditorStyles
>;

export interface RichTextEditorProps
  extends DefaultProps<RichTextEditorStylesNames>,
    Omit<React.ComponentPropsWithoutRef<'div'>, 'onChange' | 'onKeyDown'> {
  //** Slate schema structure object or a string which will just be placed in a default object */
  initialValue?: string | Descendant[];
  //** Radius from theme.radius, or number to set border-radius in px */
  radius?: MantineNumberSize;
  //** Make slate editor read only */
  readOnly?: boolean;
  //** Editable Props */
  renderPlaceholder?: (props: RenderPlaceholderProps) => JSX.Element;
  scrollSelectionIntoView?: (editor: ReactEditor, domRange: DOMRange) => void;
  //** Editable Text Props */
  editableProps: React.TextareaHTMLAttributes<HTMLDivElement>;
  placeholder?: string;
  /** Toolbar controls divided into groups */
  controls: ToolbarControl[][];

  /** Labels used for all toolbar controls */
  labels: RichTextEditorLabels;

  /** Make toolbar sticky */
  sticky?: boolean;

  /** Top toolbar position in any valid css value */
  stickyOffset?: number | string;
}

export const RichTextEditor = forwardRef<
  Editor,
  PropsWithChildren<RichTextEditorProps>
>((props, ref) => {
  const {
    children,
    id,
    className,
    classNames,
    styles,
    unstyled,
    placeholder,
    renderPlaceholder,
    scrollSelectionIntoView,
    editableProps,
    controls = DEFAULT_CONTROLS,
    labels = DEFAULT_LABELS,
    sticky,
    stickyOffset,
    ...editorProps
  } = useComponentDefaultProps('RichTextEditor', {}, props);

  const editorId = useId(id);
  const editor = useRef<Editor>(null);

  //* Styling */
  const { classes, cx } = useRichTextEditorStyles(
    {},
    { classNames, styles: styles as never, unstyled, name: 'RichTextEditor' }
  );

  return (
    <TextEditorBase id={editorId} ref={editor} {...editorProps}>
      <>
        <Toolbar
          controls={controls}
          labels={labels}
          sticky={sticky}
          stickyOffset={stickyOffset}
        />
        <EditableBase
          className={cx(classes.editor, className)}
          placeholder={placeholder}
          editableProps={editableProps}
        />
      </>
    </TextEditorBase>
  );
});
