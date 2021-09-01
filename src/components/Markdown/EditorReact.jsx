import { Component, Fragment, useEffect } from 'react';
import marked from 'marked';
import DOMPurify from 'dompurify';
import Prism from 'prismjs';

marked.setOptions({
    breaks: true,
    highlight: function (code) {
        return Prism.highlight(code, Prism.languages.javascript, 'javascript');
    }
});

const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
    return `<a target="_blank" href="${href}">${text}</a>`;
};

export default class MarkdownEditor extends Component {
    state = {
        markdown: initial
    };

    handleChange = (e) => {
        const { value } = e.target;
        this.setState({ markdown: value });
    };

    render() {
        return (
            <Fragment>
                <Preview markdown={this.state.markdown} />
                <Editor markdown={this.state.markdown} handleChange={this.handleChange} />
            </Fragment>
        );
    }
}

const Editor = ({ markdown, handleChange }) => {
    return (
        <div className="flex flex-col">
            <textarea
                id="editor"
                className="textarea h-28 mx-4 textarea-bordered focus:textarea-info"
                placeholder="# Enter your markdown!"
                value={markdown}
                onChange={handleChange}
            />
        </div>
    );
};

const Preview = ({ markdown }) => {
    return (
        <div
            dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(marked(markdown, { renderer: renderer }))
            }}
            id="preview"
            className="bg-white mx-4 pt-4 overflow-y-auto"
        ></div>
    );
};

const initial = `# Welcome to my Astro + React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
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