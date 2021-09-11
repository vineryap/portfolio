import marked from 'marked';
import DOMPurify from 'dompurify';
import { languages, highlight } from 'prismjs';

marked.setOptions({
  breaks: true,
  highlight: (code: string, lang: string) => {
    const language = languages.hasOwnProperty(lang)
      ? languages[lang]
      : languages.text;
    const callback = languages.hasOwnProperty(lang) ? lang : 'text';
    return highlight(code, language, callback);
  },
});

const renderer = {
  link(href: string, title: string, text: string) {
    return `<a href="${href}" target="_blank">${text}</a>`;
  },
};

marked.use({ renderer });

export const initialContent: string = `# Welcome to my Astro + React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`js
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
    if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
        return multiLineCode;
    }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
- Some are bulleted.
    - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`;

export const parseMarkdown = (input: string): string =>
  DOMPurify.sanitize(marked(input));
