/** @jsxImportSource solid-js */

import { createSignal } from "solid-js";
import { parseMarkdown, getInitialContent } from "./helpers";

function Preview({ markdown }) {
  return (
    <div className="h-[26rem] md:h-[700px] border mockup-window bg-base-300 border-base-200">
      <div className="w-full h-full p-4 pt-0 md:p-8 border-t border-base-200 bg-white overflow-x-hidden overflow-y-auto">
        <div id="preview" innerHTML={parseMarkdown(markdown())}></div>
      </div>
    </div>
  );
}

function Editor({ markdown, handleChange }) {
  return (
    <div class="form-control mt-6">
      <label class="font-bold uppercase tracking-wider leading-loose" htmlFor="editor">
        Editor
      </label>
      <textarea
        id="editor"
        class="textarea textarea-bordered w-full h-56 text-base overflow-x-hidden overflow-y-scroll shadow-md"
        onkeyup={handleChange}
        placeholder="# Enter your markdown!"
        value={markdown}
      ></textarea>
    </div>
  );
}

export default function MdPreviewer() {
  const [markdown, setMarkdown] = createSignal(getInitialContent(" + Soid JS"));

  const handleChange = e => {
    const value = e.target.value;
    setMarkdown(value);
  };

  return (
    <div class="w-full h-full flex flex-col justify-center mx-auto p-5 md:p-0 md:my-20 md:max-w-screen-sm lg:max-w-screen-2xl">
      <Preview markdown={markdown} />
      <Editor markdown={markdown()} handleChange={handleChange} />
    </div>
  );
}
