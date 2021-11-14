import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { languages, highlight } from 'prismjs';

marked.setOptions({
  breaks: true,
  headerIds: false,
  highlight: (code, lang) => {
    return languages[lang] ? highlight(code, languages[lang], lang) : code;
  },
  langPrefix: ''
});

const renderer = {
  link(href, title, text) {
    return `<a href="${href}" target="_blank">${text}</a>`;
  }
};

marked.use({ renderer });

const parseMarkdown = (input) => {
  return DOMPurify.sanitize(marked(input));
};

const getInitialContent = (string = '') => {
  return `# Welcome to my Astro${string} Markdown Previewer!

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
};

export { parseMarkdown, getInitialContent };
