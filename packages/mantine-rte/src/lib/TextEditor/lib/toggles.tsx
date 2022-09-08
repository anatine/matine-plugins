import { Editor, Element, Transforms } from 'slate';
import {
  BLOCK_TYPES,
  CustomElement,
  HOTKEYS,
  LIST_ELEMENT_MAP,
  MARK_TYPES,
  TEXT_ALIGN_MAP,
  TEXT_ALIGN_TYPES,
} from '../../types/text-editor-types';
import isHotkey from '../../utils/is-hotkey';

export function isMarkActive(
  editor: Editor,
  format: MARK_TYPES,
  value?: string | number | boolean
) {
  const marks = Editor.marks(editor);
  return marks
    ? marks[format] === true || (value && value === marks[format])
    : false;
}

export function toggleMark(
  editor: Editor,
  format: MARK_TYPES,
  value?: string | number | boolean
) {
  const isActive = isMarkActive(editor, format);
  console.log('🚀 ~ file: toggles.tsx ~ line 30 ~ isActive', isActive);
  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, value ?? true);
  }
}

export function isBlockActive(
  editor: Editor,
  format: BLOCK_TYPES,
  blockType: keyof CustomElement = 'type'
) {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (node) =>
        !Editor.isEditor(node) &&
        Element.isElement(node) &&
        node[blockType] === format,
    })
  );

  return !!match;
}

export function toggleBlock(
  editor: Editor,
  format: MARK_TYPES & TEXT_ALIGN_TYPES
) {
  const isTextAlign = TEXT_ALIGN_MAP.includes(format as TEXT_ALIGN_TYPES);
  const isActive = isBlockActive(
    editor,
    format,
    isTextAlign ? 'align' : 'type'
  );
  const isList = LIST_ELEMENT_MAP.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      Element.isElement(n) &&
      LIST_ELEMENT_MAP.includes(n.type) &&
      !isTextAlign,
    split: true,
  });
  let newProperties: Partial<Element>;
  if (isTextAlign) {
    newProperties = {
      align: isActive ? undefined : format,
    };
  } else {
    newProperties = {
      type: isActive ? 'paragraph' : isList ? 'listItem' : format,
    };
  }
  Transforms.setNodes<Element>(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
}

export function handleHotkey(
  editor: Editor,
  event: React.KeyboardEvent<HTMLDivElement>
) {
  console.log(`handleHotkey`, event);
  for (const hotkey in HOTKEYS) {
    if (isHotkey(hotkey, event)) {
      event.preventDefault();
      const mark = HOTKEYS[hotkey as keyof typeof HOTKEYS];
      console.log('🚀 ~ file: toggles.tsx ~ line 106 ~ mark', mark);
      toggleMark(editor, mark);
    }
  }
}
