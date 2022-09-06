# `@anatine/mantine-text-editor`

## Rich Text Editor

### Overview

Text editor using [Slate](https://docs.slatejs.org/) for a rich text editor.

### Installation

Install Slate for peer deps

```
npm i slate slate-history slate-react
```

You'll need to have Matine installed

```
npm i @matine/core @matine/hooks @tabler/icons @emotion/react
```

Install the editor

```
npm i  @anatine/mantine-text-editor
```

### Usage

```tsx
  import { RichTextEditor } from '@anatine/mantine-text-editor'

  export function MyExample() {

    return (
      <RichTextEditor initialValue={startingText} />
    )

  }

  const startingText = [
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
  ]

```

----
