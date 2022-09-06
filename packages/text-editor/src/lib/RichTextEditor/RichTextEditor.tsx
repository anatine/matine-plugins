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
} from '@mantine/core';
import { mergeRefs, useId } from '@mantine/hooks';
import { Toolbar, ToolbarStylesNames } from '../Toolbar/Toolbar';
import useStyles from './RichTextEditor.styles';
import { DEFAULT_LABELS, RichTextEditorLabels } from './default-labels';
import { DEFAULT_CONTROLS } from './default-control';
import { ToolbarControl } from '../Toolbar/controls';
import isHotkey from '../is-hotkey';

//* Types
type CustomText = {
  text: string;
  bold?: true;
  code?: true;
  italic?: true;
  underline?: true;
  mark?: true;
  strikethrough?: true;
};
export type TitleElement = Omit<TitleProps, 'children'> & {
  type: 'title';
  children: CustomText[];
};
export type BlockQuoteElement = Omit<BlockquoteProps, 'children'> & {
  type: 'blockquote';
  children: CustomText[];
};
export type ListElement = Omit<ListProps, 'children'> & {
  type: 'unordered' | 'ordered';
  children: CustomText[];
};
export type ListItemElement = Omit<ListItemProps, 'children'> & {
  type: 'list-item';
  children: CustomText[];
};
export type TextElement = Omit<TextProps, 'children'> & {
  type: 'paragraph' | 'input';
  children: CustomText[];
};
export type CodeElement = Omit<CodeProps, 'children'> & {
  type: 'code';
  children: CustomText[];
};

export type CustomElement =
  | TextElement
  | TitleElement
  | BlockQuoteElement
  | ListElement
  | ListItemElement
  | CodeElement;

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

export type RichTextEditorStylesNames =
  | ToolbarStylesNames
  | Selectors<typeof useStyles>;

//* End Types

export interface RichTextEditorProps
  extends DefaultProps<RichTextEditorStylesNames>,
    Omit<React.ComponentPropsWithoutRef<'div'>, 'onChange'> {
  // /** Labels used in toolbar button titles and assets insertion popovers */
  labels?: RichTextEditorLabels;
  // /** Toolbar controls divided into groups */
  controls?: ToolbarControl[][];
  // /** Make slate editor read only */
  readOnly?: boolean;
  // /** Radius from theme.radius, or number to set border-radius in px */
  radius?: MantineNumberSize;
  /** Top toolbar position in any valid css value */
  stickyOffset?: number | string;
  /** Make toolbar sticky */
  sticky?: boolean;

  /** HTML content, value not forced as quill works in uncontrolled mode */
  initialValue: string | Descendant[];
  // /** Called each time value changes */
  // onChange(value: string, delta: Delta, sources: Sources, editor: Editor.UnprivilegedEditor): void;
  // /** Called when image image is inserted in editor */
  // onImageUpload?(image: File): Promise<string>;

  // /** Quill mentions plugin setting */
  // mentions?: Record<string, any>;

  // /** Extra modules for react-quill */
  // modules?: Record<string, any>;
  // /** List of formats that should be supported by the editor */
  // formats?: string[];
}

export type MARK_TYPES =
  | 'bold'
  | 'italic'
  | 'underline'
  | 'code'
  | 'strikethrough'
  | 'mark';
export const HOTKEYS: Record<string, MARK_TYPES> = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
};
export const TEXT_ALIGN_TYPES: React.CSSProperties['textAlign'][] = [
  'left',
  'center',
  'right',
  'justify',
];
export const LIST_TYPES = ['ordered', 'bullet'];

const defaultProps: Partial<RichTextEditorProps> = {
  // onImageUpload: defaultImageUpload,
  sticky: true,
  stickyOffset: 0,
  labels: DEFAULT_LABELS,
  controls: DEFAULT_CONTROLS,
  readOnly: false,
};

export const RichTextEditor = forwardRef<Editor, RichTextEditorProps>(
  (props: RichTextEditorProps, ref) => {
    const {
      // value,
      // onChange,
      // onImageUpload,
      initialValue,
      sticky,
      stickyOffset,
      radius,
      labels,
      controls,
      id,
      className,
      classNames,
      styles,
      placeholder,
      readOnly,
      // mentions,
      // modules: externalModules,
      unstyled,
      // formats,
      ...others
    } = useComponentDefaultProps('RichTextEditor', defaultProps, props);

    const uuid = useId(id);

    const { classes, cx } = useStyles(
      {
        saveLabel: labels?.save || DEFAULT_LABELS.save,
        editLabel: labels?.edit || DEFAULT_LABELS.edit,
        removeLabel: labels?.remove || DEFAULT_LABELS.remove,
        radius: radius || 0,
        readOnly: readOnly || false,
      },
      { classNames, styles: styles as never, unstyled, name: 'RichTextEditor' }
    );

    const renderElement = useCallback(
      (props: RenderElementProps) => elementRenderer({})(props),
      []
    );
    const renderLeaf = useCallback(
      (props: RenderLeafProps) => leafRenderer({})(props),
      []
    );
    const editor = useMemo(() => withHistory(withReact(createEditor())), []);
    const editorRef = useRef<Editor>(editor);
    mergeRefs(editorRef, ref);

    const value: Descendant[] =
      typeof initialValue === 'string'
        ? [
            {
              type: 'paragraph',
              children: [{ text: initialValue }],
            },
          ]
        : initialValue;

    return (
      <Slate editor={editor} value={value}>
        <Box className={cx(classes.root, className)} {...others}>
          <Toolbar
            controls={controls as never}
            labels={labels as never}
            sticky={sticky}
            stickyOffset={stickyOffset}
            classNames={classNames}
            styles={styles}
            id={uuid}
            className={classes.toolbar}
            unstyled={unstyled}
          />

          <Box className={classes.editor}>
            <Editable
              renderElement={renderElement}
              renderLeaf={renderLeaf}
              placeholder="Enter some rich text…"
              spellCheck
              autoFocus
              onKeyDown={(event) => {
                for (const hotkey in HOTKEYS) {
                  if (isHotkey(hotkey, event as never)) {
                    event.preventDefault();
                    const mark = HOTKEYS[hotkey as keyof typeof HOTKEYS];
                    toggleMark(editor, mark);
                  }
                }
              }}
            />
          </Box>

          {/* <Editor
          theme="snow"
          modules={modules}
          value={value}
          onChange={onChange}
          ref={mergeRefs(editorRef, ref)}
          placeholder={placeholder}
          readOnly={readOnly}
          scrollingContainer="html"
          formats={formats}
        /> */}
        </Box>
      </Slate>
    );
  }
);

// RichTextEditor.displayName = '@anatine/mantine-text-editor';

//* Editor Functions

export const elementBaseMap: Record<CustomElement['type'], any> = {
  title: Title,
  blockquote: Blockquote,
  ordered: List,
  unordered: List,
  'list-item': List.Item,
  code: Code,
  input: MantineText,
  paragraph: MantineText,
};

export interface ElementRendererProps {
  elementMap?: typeof elementBaseMap;
}

export function elementRenderer({
  elementMap = elementBaseMap,
}: ElementRendererProps) {
  return function Element({
    attributes,
    children,
    element,
  }: RenderElementProps) {
    const Component = elementMap[element.type] || Text;
    return <Component {...attributes}>{children}</Component>;
  };
}

export function leafRenderer({
  elementMap = elementBaseMap,
}: ElementRendererProps) {
  return function Leaf({ attributes, children, leaf }: RenderLeafProps) {
    if (leaf.bold) {
      children = <strong>{children}</strong>;
    }

    if (leaf.code) {
      children = <code>{children}</code>;
    }

    if (leaf.italic) {
      children = <em>{children}</em>;
    }

    if (leaf.underline) {
      children = <u>{children}</u>;
    }

    if (leaf.mark) {
      children = <Mark>{children}</Mark>;
    }

    return <span {...attributes}>{children}</span>;
  };
}

function isMarkActive(editor: Editor, format: MARK_TYPES) {
  const marks = Editor.marks(editor) || {};
  return marks ? marks[format] === true : false;
}

function toggleMark(editor: Editor, format: MARK_TYPES) {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
}

function isBlockActive(editor: Editor, format: MARK_TYPES, blockType = 'type') {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (node) =>
        !Editor.isEditor(node) &&
        SlateElement.isElement(node) &&
        node[blockType as never] === format,
    })
  );

  return !!match;
}

function toggleBlock(
  editor: Editor,
  format: MARK_TYPES & React.CSSProperties['textAlign']
) {
  const isActive = isBlockActive(
    editor,
    format,
    TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type'
  );
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes(n.type) &&
      !TEXT_ALIGN_TYPES.includes(format),
    split: true,
  });
  let newProperties: Partial<SlateElement>;
  if (TEXT_ALIGN_TYPES.includes(format)) {
    newProperties = {
      align: isActive ? undefined : format,
    };
  } else {
    newProperties = {
      type: isActive ? 'paragraph' : isList ? 'list-item' : format,
    };
  }
  Transforms.setNodes<SlateElement>(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
}
