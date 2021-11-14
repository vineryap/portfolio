/** @jsxImportSource preact */

import { Component } from "preact";
import { useEffect } from "preact/hooks";
import { parseMarkdown, getInitialContent } from "./helpers";

function Preview({ markdown }) {
  useEffect(() => {
    document.getElementById("preview").innerHTML = parseMarkdown(markdown);
  }, []);

  return (
    <div className="h-[26rem] md:h-[700px] border mockup-window bg-base-300 border-base-200">
      <div className="w-full h-full p-4 pt-0 md:p-8 border-t border-base-200 bg-white overflow-x-hidden overflow-y-auto">
        <div
          // dangerouslySetInnerHTML={{ __html: parseMarkdown(markdown) }}
          id="preview"
        ></div>
      </div>
    </div>
  );
}

function Editor({ markdown, handleChange }) {
  return (
    <div className="form-control mt-6">
      <label className="font-bold uppercase tracking-wider leading-loose" htmlFor="editor">
        Editor
      </label>
      <textarea
        id="editor"
        className="textarea textarea-bordered bg-white w-full h-56 text-base overflow-x-hidden overflow-y-scroll shadow-md"
        onInput={handleChange}
        placeholder="# Enter your markdown!"
        value={markdown}
      ></textarea>
    </div>
  );
}

export default class MarkdownEditor extends Component {
  state = {
    markdown: getInitialContent(" + Preact")
  };

  componentWillMount() {
    this.setState({ markdown: getInitialContent(" + Preact") });
  }

  handleChange = e => {
    const input = e.target.value;
    this.setState({ markdown: input });
    document.getElementById("preview").innerHTML = parseMarkdown(input);
  };

  render(_, { markdown }) {
    return (
      <div className="w-full h-full flex flex-col justify-center mx-auto mt-10 mb-20">
        <Preview markdown={markdown} />
        <Editor markdown={markdown} handleChange={this.handleChange} />
      </div>
    );
  }
}
