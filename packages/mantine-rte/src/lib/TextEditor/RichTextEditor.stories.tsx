import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Editor, Element, Text } from 'slate';
import { RichTextEditor } from './RichTextEditor';
import { TextEditorBase } from './base/TextEditorBase';

export default {
  component: RichTextEditor,
  title: 'Matine Rich Text Editor',
} as ComponentMeta<typeof RichTextEditor>;

const Template: ComponentStory<typeof RichTextEditor> = (args) => (
  <RichTextEditor {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  radius: 'md',
  initialValue: [
    {
      type: 'header',
      children: [
        {
          text: 'Welcome to the Text Editor',
        },
      ],
      order: 1,
      align: 'center',
    },
    {
      type: 'header',
      order: 4,
      children: [
        {
          text: 'Based on Slate using Mantine Components',
        },
      ],
      align: 'center',
    },
    {
      type: 'paragraph',
      children: [
        {
          text: '',
        },
      ],
    },
    {
      type: 'paragraph',
      children: [
        {
          text: 'This is editable ',
        },
        {
          text: 'rich',
          mark: true,
        },
        {
          text: ' text, ',
        },
        {
          text: 'much',
          bold: true,
        },
        {
          text: ' better than a ',
        },
        {
          text: '<textarea>',
          code: true,
        },
        {
          text: '!',
        },
      ],
    },
    {
      type: 'paragraph',
      children: [
        {
          text: "Since it's ",
        },
        {
          text: 'rich text',
          underline: true,
        },
        {
          text: ', you can do things like turn a selection of text ',
        },
        {
          text: 'bold',
          bold: true,
        },
        {
          text: ', or add a semantically rendered block quote in the middle of the page, like this:',
        },
      ],
    },
    {
      type: 'blockquote',
      children: [
        {
          text: 'A wise quote.',
        },
      ],
    },
    {
      type: 'header',
      children: [
        {
          text: 'Next Steps:',
        },
      ],
      order: 4,
    },
    {
      type: 'ordered',
      children: [
        {
          type: 'list-item',
          children: [
            {
              text: 'Clone repo',
            },
          ],
        },
        {
          type: 'list-item',
          children: [
            {
              text: 'Install NPM modules',
            },
          ],
        },
        {
          type: 'list-item',
          children: [
            {
              text: 'Run Storybook',
            },
          ],
        },
        {
          type: 'list-item',
          children: [
            {
              text: 'Create pull requests to improve the library.',
            },
          ],
        },
      ],
    },
    {
      type: 'paragraph',
      children: [
        {
          text: '',
        },
      ],
    },
    {
      type: 'paragraph',
      align: 'center',
      children: [
        {
          text: '🚀 Try it out for yourself!  ',
        },
        {
          text: "or don't",
          strikethrough: true,
          color: 'red',
        },
      ],
    },
  ],
};

const example = [
  {
    type: 'header',
    children: [
      {
        text: 'Welcome to the Text Editor',
      },
    ],
    order: 1,
    align: 'center',
  },
  {
    type: 'header',
    order: 4,
    children: [
      {
        text: 'Based on Slate using Mantine Components',
      },
    ],
    align: 'center',
  },
  {
    type: 'paragraph',
    children: [
      {
        text: '',
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text: 'This is editable ',
      },
      {
        text: 'rich',
        mark: true,
      },
      {
        text: ' text, ',
      },
      {
        text: 'much',
        bold: true,
      },
      {
        text: ' better than a ',
      },
      {
        text: '<textarea>',
        code: true,
      },
      {
        text: '!',
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text: "Since it's ",
      },
      {
        text: 'rich text',
        underline: true,
      },
      {
        text: ', you can do things like turn a selection of text ',
      },
      {
        text: 'bold',
        bold: true,
      },
      {
        text: ', or add a semantically rendered block quote in the middle of the page, like this:',
      },
    ],
  },
  {
    type: 'blockquote',
    children: [
      {
        text: 'A wise quote.',
      },
    ],
  },
  {
    type: 'header',
    children: [
      {
        text: 'Next Steps:',
      },
    ],
    order: 4,
  },
  {
    type: 'ordered',
    children: [
      {
        type: 'list-item',
        children: [
          {
            text: 'Clone repo',
          },
        ],
      },
    ],
  },
  {
    type: 'unordered',
    children: [
      {
        type: 'list-item',
        children: [
          {
            text: 'Install NPM modules',
          },
        ],
      },
      {
        type: 'list-item',
        children: [
          {
            text: 'Run Storybook',
          },
        ],
      },
      {
        type: 'list-item',
        children: [
          {
            text: 'Create pull requests to improve the library.',
          },
        ],
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text: '',
      },
    ],
  },
  {
    type: 'paragraph',
    align: 'center',
    children: [
      {
        text: '🚀 Try it out for yourself!  ',
      },
      {
        text: "or don't",
        strikethrough: true,
        color: 'red',
      },
    ],
  },
];
