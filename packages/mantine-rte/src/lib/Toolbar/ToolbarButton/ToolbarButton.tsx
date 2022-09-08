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
  ELEMENT_MAP,
  MARK_MAP,
  TEXT_ALIGN_MAP,
} from '../../types/text-editor-types';
import {
  isBlockActive,
  isMarkActive,
  toggleBlock,
  toggleMark,
} from '../../TextEditor/lib/toggles';

interface ToolbarButtonProps extends ActionIconProps {
  /** Control icon */
  children: React.ReactNode;

  /** Quill specific control */
  controls: string;

  /** Value  */
  value?: string | number;

  /** Key instead of 'type' for value */
  valueKey?: string;

  /** Disable active styles */
  noActive?: boolean;

  title?: string;
}

export function ToolbarButton({
  className,
  children,
  controls,
  value,
  valueKey,
  noActive = false,
  ...others
}: ToolbarButtonProps) {
  const editor = useSlate();

  const controlType = React.useMemo(() => {
    if (ELEMENT_MAP.find((block) => block === controls)) return 'block';
    if (MARK_MAP.find((mark) => mark === controls)) return 'mark';
    if ('align' === controls) return 'align';
    return 'value';
  }, [controls]);

  const isActiveMark = React.useCallback(() => {
    if (controlType === 'mark') {
      return isMarkActive(editor, controls as never, value);
    }
    return false;
  }, [controlType, editor, controls, value]);

  const isActiveBlock = React.useCallback(() => {
    if (controlType === 'block') {
      return isBlockActive(
        editor,
        controls as never,
        'type',
        value,
        valueKey as never
      );
    }
    return false;
  }, [controlType, controls, editor, value, valueKey]);

  const isActiveAlign = React.useCallback(() => {
    if (controlType === 'align') {
      return isBlockActive(editor, value as never, 'align');
    }
    return false;
  }, [controlType, editor, value]);

  const isActive = isActiveMark() || isActiveBlock() || isActiveAlign();

  const toggle = React.useCallback(() => {
    if (controlType === 'mark') {
      toggleMark(editor, controls as never, value);
    } else if (controlType === 'block') {
      toggleBlock(editor, controls as never, 'type', value, valueKey as never);
    } else if (controlType === 'align') {
      toggleBlock(editor, value as never, 'align');
    }
  }, [controlType, controls, editor, value, valueKey]);

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
