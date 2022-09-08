/* eslint-disable @typescript-eslint/no-explicit-any */
import { Blockquote, List, Text, Title } from '@mantine/core';
import { ElementMap } from '../../types/text-editor-types';

export const defaultElementMap: ElementMap = {
  header: {
    component: Title,
  },
  title: {
    component: Title,
  },
  blockquote: {
    component: Blockquote,
  },
  unordered: {
    component: List,
  },
  ordered: {
    component: List,
  },
  'list-item': {
    component: List.Item,
  },
  paragraph: {
    component: Text,
    props: { component: 'p' },
  },
  span: {
    component: Text,
    props: { component: 'span' },
  },
  input: {
    component: Text,
    props: { component: 'span', lineClamp: 1 },
  },
  textField: {
    component: Text,
  },
};
