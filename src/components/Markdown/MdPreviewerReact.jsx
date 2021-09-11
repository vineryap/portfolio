// @ts-nocheck
import { Component } from 'react';
import { initialContent as initial, parseMarkdown } from "./mdhelpers";

export default class MarkdownPreviewer extends Component {
    state = {
        markdown: initial
    };

    handleChange = (e) => {
        const { value } = e.target;
        this.setState({ markdown: value });
    };

    render() {   
        return (
            <div className="w-full h-full p-10 card bg-base-200 rounded-none">
                <Preview markdown={this.state.markdown} />
                <Editor markdown={this.state.markdown} handleChange={this.handleChange} />
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
                onChange={handleChange} placeholder="# Enter your markdown!"></textarea>
        </div>
    );
};