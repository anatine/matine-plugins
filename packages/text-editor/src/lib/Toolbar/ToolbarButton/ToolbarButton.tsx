import React from 'react';
import { ActionIcon, ActionIconProps } from '@mantine/core';
import useStyles from './ToolbarButton.styles';
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
  CustomElement,
  elementBaseMap,
  LIST_TYPES,
  MARK_TYPES,
  TEXT_ALIGN_TYPES,
} from '../../RichTextEditor/RichTextEditor';

interface ToolbarButtonProps extends ActionIconProps {
  /** Control icon */
  children: React.ReactNode;

  /** Quill specific control */
  controls: string;

  /** Value for quill control */
  value?: string;

  /** Disable active styles */
  noActive?: boolean;

  title?: string;
}

const markTypesList: MARK_TYPES[] = [
  'bold',
  'italic',
  'underline',
  'code',
  'strikethrough',
  'mark',
];

export function ToolbarButton({
  className,
  children,
  controls,
  value,
  noActive = false,
  ...others
}: ToolbarButtonProps) {
  const editor = useSlate();
  const mark = React.useMemo(
    () => markTypesList.find((mark) => mark === controls),
    [controls]
  );
  const block = React.useMemo(
    () => Object.keys(elementBaseMap).find((block) => block === controls),
    [controls]
  );
  const isActiveMark = React.useCallback(() => {
    if (mark) {
      return isMarkActive(editor, mark);
    }
    return false;
  }, [editor, mark]);
  const isActiveBlock = React.useCallback(() => {
    if (block) {
      return isBlockActive(editor, block as MARK_TYPES);
    }
    return false;
  }, [block, editor]);
  const isActive = isActiveMark() || isActiveBlock();

  const toggle = React.useCallback(() => {
    if (mark) {
      toggleMark(editor, mark);
    } else if (block) {
      toggleBlock(editor, block as never);
    }
  }, [mark, block, editor]);

  const { classes, cx } = useStyles(
    { noActive, isActive },
    { name: 'RichTextEditor' }
  );

  const handleToggle: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    toggle();
  };

  return (
    <ActionIcon
      className={cx(classes.control, classes.active, className)}
      value={value}
      radius={0}
      onPointerDown={handleToggle}
      {...others}
    >
      {children}
    </ActionIcon>
  );
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

// ToolbarButton.displayName = '@mantine/rte/ToolbarButton';
