import { Code, Mark, Text, TextProps } from '@mantine/core';
import { RenderLeafProps } from 'slate-react';
import { ElementMap } from '../../types/text-editor-types';
import { defaultElementMap } from './default-element-map';

export interface LeafRendererProps {
  elementMap?: ElementMap;
}

export function leafRenderer({
  elementMap = defaultElementMap,
}: LeafRendererProps) {
  return function Leaf({ attributes, children, leaf }: RenderLeafProps) {
    const textStyling: Partial<TextProps> = {};

    if (leaf.mark) {
      const { color, ...textProps } = leaf.props || {};
      return (
        <Text inherit span {...attributes} {...textProps} {...textStyling}>
          <Mark color={color}>{children}</Mark>
        </Text>
      );
    }

    if (leaf.code) {
      const { color, ...textProps } = leaf.props || {};
      return (
        <Text inherit span {...attributes} {...textProps} {...textStyling}>
          <Code color={color}>{children}</Code>
        </Text>
      );
    }

    if (leaf.bold) {
      textStyling.weight = 700;
    }

    if (leaf.italic) {
      textStyling.italic = true;
    }

    if (leaf.underline) {
      textStyling.underline = true;
    }

    if (leaf.strikethrough) {
      textStyling.strikethrough = true;
    }

    if (leaf.color) {
      textStyling.color = leaf.color;
    }

    if (leaf.size) {
      textStyling.size = leaf.size;
    }

    return (
      <Text span {...attributes} {...leaf.props} {...textStyling}>
        {children}
      </Text>
    );
  };
}
