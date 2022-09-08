import {
  forwardRef,
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
import { Toolbar, ToolbarStylesNames } from '../Toolbar/Toolbar';
import isHotkey from '../utils/is-hotkey';

export const TextEditor = forwardRef<Editor, unknown>((props, ref) => {
  return null;
});

TextEditor.displayName = '@anatine/mantine-text-editor';
