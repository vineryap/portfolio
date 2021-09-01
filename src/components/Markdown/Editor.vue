<template>
  <!-- component -->
  <!-- <div id="markdown" class="h-screen relative shadow"> -->
  <!-- Preview -->
  <div
    id="preview"
    class="bg-white mx-4 pt-4 overflow-y-auto"
    v-html="parse(input)"
  ></div>

  <!-- Editor -->
  <div class="flex flex-col">
    <textarea
      id="editor"
      class="textarea h-28 mx-4 textarea-bordered focus:textarea-info"
      placeholder="# Enter your markdown!"
      v-model="input"
    />
  </div>
  <!-- </div> -->
</template>

<script>
import marked from "marked";
import DOMPurify from "dompurify";
import Prism from "prismjs";
import { ref } from "vue";

marked.setOptions({
  breaks: true,
  highlight: function (code) {
    return Prism.highlight(code, Prism.languages.javascript, "javascript");
  },
});

const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
  return `<a target="_blank" href="${href}">${text}</a>`;
};

export default {
  setup() {
    marked.setOptions({
      breaks: true,
      highlight: function (code) {
        return Prism.highlight(code, Prism.languages.javascript, "javascript");
      },
    });

    const input = ref(`# Welcome to my Astro + Vue Markdown Previewer!

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
`);

    const parse = (input) => {
      return DOMPurify.sanitize(marked(input, { renderer: renderer }));
    };

    return {
      input,
      parse,
    };
  },
};
</script>

<style>
</style>