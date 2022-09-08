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

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, value ?? true);
  }
}

export function isBlockActive(
  editor: Editor,
  format: BLOCK_TYPES,
  blockType: keyof CustomElement = 'type',
  value?: string | number | boolean,
  valueKey?: keyof CustomElement
) {
  const { selection } = editor;
  if (!selection) return false;

  console.debug('args', format, blockType, value, valueKey);

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (node) => {
        if (Editor.isEditor(node)) return false;

        const nodeMatch = Element.isElement(node) && node[blockType] === format;

        if (nodeMatch) {
          const valueMatch = !value || node[valueKey || blockType] === value;
          if (valueMatch) {
            return true;
          }
        }

        return false;
      },
    })
  );

  return !!match;
}

export function toggleBlock(
  editor: Editor,
  format: MARK_TYPES & TEXT_ALIGN_TYPES,
  blockType: keyof CustomElement = 'type',
  value?: string | number | boolean,
  valueKey?: keyof CustomElement
) {
  const isTextAlign = TEXT_ALIGN_MAP.includes(format as TEXT_ALIGN_TYPES);
  const isList = LIST_ELEMENT_MAP.includes(format);

  const isNonDefaultType = blockType !== 'type';

  const isActive = isBlockActive(editor, format, blockType, value, valueKey);

  const newProperties: Partial<Element> = {};
  if (isTextAlign || isNonDefaultType) {
    newProperties[blockType] = isActive ? undefined : format;
    // newProperties = {
    //   align: isActive ? undefined : format,
    // };
  } else {
    Transforms.unwrapNodes(editor, {
      match: (n) =>
        !Editor.isEditor(n) &&
        Element.isElement(n) &&
        LIST_ELEMENT_MAP.includes(n.type),
      split: true,
    });
    newProperties.type = isActive ? 'paragraph' : format;
    if (!isActive && value && valueKey) {
      newProperties[valueKey] = value as never;
    } else if (valueKey) {
      newProperties[valueKey] = undefined;
    }
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
  for (const hotkey in HOTKEYS) {
    if (isHotkey(hotkey, event)) {
      event.preventDefault();
      const mark = HOTKEYS[hotkey as keyof typeof HOTKEYS];
      toggleMark(editor, mark);
    }
  }
}
