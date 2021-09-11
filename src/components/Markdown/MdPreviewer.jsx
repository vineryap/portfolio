import { Component } from 'preact';
import { initialContent as initial, parseMarkdown } from "./mdhelpers";

export default class MarkdownEditor extends Component {
  state = {
    markdown: initial
  };

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ markdown: value });
  };

  render({ }, { markdown }) {
    return (
      <div className="w-full h-full p-10 card bg-base-200 rounded-none">
        <div className="alert alert-warning mb-6">
          <div className="flex-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="w-6 h-6 mx-2 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <label
            >freeCodeCamp test script supported technologies: HTML, JavaScript, CSS, Bootstrap, SASS, React, Redux, and jQuery.</label
            >
          </div>
        </div>

        <Preview markdown={markdown} />
        <Editor markdown={markdown} handleChange={this.handleChange} />
      </div>
    );
  }
}

const Preview = ({ markdown }) => {
  return (
    <div className="border mockup-window border-base-300">
      <div className="h-full p-8 border-t border-base-300 bg-white overflow-y-auto">
        <div
          dangerouslySetInnerHTML={{
            __html: parseMarkdown(markdown)
          }}
          id="preview"
          className=""
        ></div>
      </div>
    </div>
  );
};

const Editor = ({ markdown, handleChange }) => {
  return (
    <div className="form-control mt-6">
      <label className="font-bold text-gray-500 uppercase tracking-wider" htmlFor="editor">Editor</label>
      <textarea id="editor" className="textarea h-56 focus:textarea-info shadow" value={markdown}
        onInput={handleChange} placeholder="# Enter your markdown!"></textarea>
    </div>
  );
};