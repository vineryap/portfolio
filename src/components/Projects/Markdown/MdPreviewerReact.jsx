/** @jsxImportSource react */

import { Component } from "react";
import { parseMarkdown, getInitialContent } from "./helpers";

function Preview({ html }) {
  return (
    <div className="h-[26rem] md:h-[700px] border mockup-window bg-base-300 border-base-200">
      <div className="w-full h-full p-4 pt-0 md:p-8 border-t border-base-200 bg-white overflow-x-hidden overflow-y-auto">
        <div
          id="preview"
          dangerouslySetInnerHTML={{
            __html: html
          }}
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
        className="textarea textarea-bordered w-full h-56 text-base overflow-x-hidden overflow-y-scroll shadow-md"
        value={markdown}
        onChange={handleChange}
        placeholder="# Enter your markdown!"
      ></textarea>
    </div>
  );
}

export default class MarkdownPreviewer extends Component {
  state = {
    markdown: getInitialContent(" + React"),
    isMounted: false
  };

  componentDidMount() {
    this.setState({ markdown: getInitialContent(" + React"), isMounted: true });
  }

  handleChange = e => {
    const value = e.target.value;
    this.setState({ markdown: value });
  };

  render() {
    return (
      this.state.isMounted && (
        <div className="w-full h-full flex flex-col justify-center mx-auto p-5 md:p-0 md:my-20 md:max-w-screen-sm lg:max-w-screen-2xl">
          <Preview html={parseMarkdown(this.state.markdown)} />
          <Editor markdown={this.state.markdown} handleChange={this.handleChange} />
        </div>
      )
    );
  }
}
