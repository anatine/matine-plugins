import { ComponentStory, ComponentMeta } from '@storybook/react';
import { RichTextEditor } from './RichTextEditor';

export default {
  component: RichTextEditor,
  title: 'Rich Text Editor',
} as ComponentMeta<typeof RichTextEditor>;

const Template: ComponentStory<typeof RichTextEditor> = (args) => (
  <RichTextEditor {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  initialValue: [
    {
      type: 'paragraph',
      children: [
        { text: 'This is editable ' },
        { text: 'rich', mark: true },
        { text: ' text, ' },
        { text: 'much', italic: true },
        { text: ' better than a ' },
        { text: '<textarea>', code: true },
        { text: '!' },
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
        { text: 'bold', bold: true },
        {
          text: ', or add a semantically rendered block quote in the middle of the page, like this:',
        },
      ],
    },
    {
      type: 'blockquote',
      children: [{ text: 'A wise quote.' }],
    },
    {
      type: 'paragraph',
      align: 'center',
      children: [{ text: 'Try it out for yourself!' }],
    },
  ],
};
