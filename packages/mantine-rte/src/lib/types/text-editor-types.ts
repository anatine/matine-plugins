/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  Blockquote,
  BlockquoteProps,
  CodeProps,
  List,
  ListItemProps,
  ListProps,
  Text,
  TextProps,
  Title,
  TitleProps,
} from '@mantine/core';
import {
  Component,
  ForwardRefExoticComponent,
  ReactElement,
  ReactNode,
} from 'react';
import type { BaseEditor } from 'slate';
import type { HistoryEditor } from 'slate-history';
import type { ReactEditor } from 'slate-react';

//** Possible values for text styling (inline) */
export const MARK_MAP: MARK_TYPES[] = [
  'bold',
  'italic',
  'underline',
  'strikethrough',
  'code',
  'mark',
];
export type MARK_TYPES = keyof Omit<CustomizedText, 'text' | 'props'>;

export type CustomizedText = {
  text?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
  mark?: boolean;
  size?: number | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: string | 'dimmed';
  props?: Omit<TextProps, 'children'>;
};

//** Element types (blocks of text) */
export type BLOCK_TYPES = CustomElement['type'];
export const ELEMENT_MAP: BLOCK_TYPES[] = [
  'heading',
  'title',
  'paragraph',
  'span',
  'input',
  'textfield',
  'blockquote',
  'code',
  'ordered',
  'unordered',
  'listItem',
];
export const LIST_ELEMENT_MAP: BLOCK_TYPES[] = ['ordered', 'unordered'];
export const TEXT_ALIGN_MAP: React.CSSProperties['textAlign'][] = [
  'left',
  'center',
  'right',
];
export type TEXT_ALIGN_TYPES = 'left' | 'center' | 'right';
// export type TEXT_ALIGN_TYPES = typeof TEXT_ALIGN_MAP[number];

export interface BaseCustomElement {
  children: CustomizedText[];
  type: string;
  align?: TEXT_ALIGN_TYPES;
  props?: Record<string, any>;
}
//** Defined elements for Mantine */
export type HeadingElement = BaseCustomElement & {
  type: 'title' | 'heading';
  props?: Omit<TitleProps, 'children'>;
  order?: 1 | 2 | 3 | 4 | 5 | 6;
};
export type BlockQuoteElement = BaseCustomElement & {
  type: 'blockquote';
  props?: Omit<BlockquoteProps, 'children'>;
};
export type ListElement = BaseCustomElement & {
  type: 'ordered' | 'unordered';
  props?: Omit<ListProps, 'children'>;
};
export type ListItemElement = BaseCustomElement & {
  type: 'listItem';
  props?: Omit<ListItemProps, 'children'>;
};
export type TextElement = BaseCustomElement & {
  type: 'paragraph' | 'span' | 'input' | 'textfield';
  props?: Omit<TextProps, 'children'>;
};
export type CodeElement = BaseCustomElement & {
  type: 'code';
  props?: Omit<CodeProps, 'children'>;
};

//** Combines into a union CustomElement for use in declaration */
export type CustomElement =
  | HeadingElement
  | BlockQuoteElement
  | ListElement
  | ListItemElement
  | TextElement
  | CodeElement;

//** Overriding Slate types : https://docs.slatejs.org/concepts/12-typescript */
declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor;
    Element: CustomElement;
    Text: CustomizedText;
  }
}

export interface ElementMap {
  [key: CustomElement['type'] | string]: {
    component:
      | React.ElementType
      | ForwardRefExoticComponent<any>
      | typeof Title
      | typeof Blockquote
      | typeof List
      | typeof List.Item
      | typeof Text;
    props?: Record<string, any>;
  };
}

export const HOTKEYS: Record<string, MARK_TYPES> = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
};
