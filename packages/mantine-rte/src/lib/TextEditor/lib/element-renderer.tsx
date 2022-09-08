/* eslint-disable @typescript-eslint/no-explicit-any */
import { Text } from '@mantine/core';
import { RenderElementProps } from 'slate-react';
import { ElementMap } from '../../types/text-editor-types';
import { defaultElementMap } from './default-element-map';

export interface ElementRendererProps {
  elementMap?: ElementMap;
}

export function elementRenderer({
  elementMap = defaultElementMap,
}: ElementRendererProps) {
  return function Element({
    attributes,
    children,
    element,
  }: RenderElementProps) {
    const Component = elementMap[element.type].component || Text;
    const order =
      element.type === 'header' || element.type === 'title'
        ? element.order || 1
        : undefined;
    return (
      <Component
        {...attributes}
        type={element.type}
        align={element.align}
        order={order}
        {...element.props}
      >
        {children}
      </Component>
    );
  };
}
