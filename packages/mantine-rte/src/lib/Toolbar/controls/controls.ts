import {
  IconBold,
  IconItalic,
  IconUnderline,
  IconStrikethrough,
  IconList,
  IconListNumbers,
  IconLink,
  IconCode,
  IconBlockquote,
  IconBrandYoutube,
  IconAlignRight,
  IconAlignLeft,
  IconAlignCenter,
  IconClearFormatting,
  IconH1,
  IconH2,
  IconH3,
  IconH4,
  IconH5,
  IconH6,
  IconSuperscript,
  IconSubscript,
  IconPhoto,
} from '@tabler/icons';

export const CONTROLS = {
  code: {
    icon: IconCode,
    controls: 'code',
  },

  codeBlock: {
    icon: IconCode,
    controls: 'code-block',
  },

  bold: {
    icon: IconBold,
    controls: 'bold',
  },

  italic: {
    icon: IconItalic,
    controls: 'italic',
  },

  underline: {
    icon: IconUnderline,
    controls: 'underline',
  },

  strike: {
    icon: IconStrikethrough,
    controls: 'strikethrough',
  },

  unorderedList: {
    icon: IconList,
    controls: 'unordered',
  },

  orderedList: {
    icon: IconListNumbers,
    controls: 'ordered',
  },

  link: {
    icon: IconLink,
    controls: 'link',
  },

  image: {
    icon: IconPhoto,
    controls: 'image',
  },

  clean: {
    icon: IconClearFormatting,
    controls: 'clean',
  },

  alignCenter: {
    icon: IconAlignCenter,
    controls: 'align',
    value: 'center',
  },

  alignLeft: {
    icon: IconAlignLeft,
    controls: 'align',
    value: 'left',
  },

  alignRight: {
    icon: IconAlignRight,
    controls: 'align',
    value: 'right',
  },

  video: {
    icon: IconBrandYoutube,
    controls: 'video',
  },

  h1: {
    icon: IconH1,
    controls: 'header',
    value: 1,
    valueKey: 'order',
  },

  h2: {
    icon: IconH2,
    controls: 'header',
    value: 2,
    valueKey: 'order',
  },

  h3: {
    icon: IconH3,
    controls: 'header',
    value: 3,
    valueKey: 'order',
  },

  h4: {
    icon: IconH4,
    controls: 'header',
    value: 4,
    valueKey: 'order',
  },

  h5: {
    icon: IconH5,
    controls: 'header',
    value: 5,
    valueKey: 'order',
  },

  h6: {
    icon: IconH6,
    controls: 'header',
    value: 6,
    valueKey: 'order',
  },

  sup: {
    icon: IconSuperscript,
    controls: 'script',
    value: 'super',
  },

  sub: {
    icon: IconSubscript,
    controls: 'script',
    value: 'sub',
  },

  blockquote: {
    icon: IconBlockquote,
    controls: 'blockquote',
  },
} as const;

export type ToolbarControl = keyof typeof CONTROLS;

export const DEFAULT_CONTROLS: ToolbarControl[][] = [
  ['bold', 'italic', 'underline', 'strike', 'clean'],
  ['h1', 'h2', 'h3', 'h4'],
  ['unorderedList', 'orderedList'],
  ['link', 'image', 'video', 'blockquote', 'code'],
  ['alignLeft', 'alignCenter', 'alignRight'],
  ['sup', 'sub'],
];
