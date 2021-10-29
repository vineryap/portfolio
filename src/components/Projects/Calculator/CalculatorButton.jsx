import { Component } from "react";
import { ButtonNumbers, Operators } from "./helpers";

export default class Button extends Component {
  handleClick = () => {
    this.props.handleButtonClick(this.props.id);
  };

  render() {
    const { id, text } = this.props;

    let buttonCSS = "";
    const divCSS = id === "equals" ? "w-2/4" : "w-1/4";

    if (id === "equals") {
      buttonCSS = "bg-yellow-700 bg-opacity-30 hover:bg-opacity-40";
    } else if (id in Operators || id === "clear") {
      buttonCSS = "bg-yellow-700 bg-opacity-10 hover:bg-opacity-20";
    } else if (id in ButtonNumbers) {
      buttonCSS = "hover:bg-opacity-20";
    } else {
      buttonCSS = "hover:bg-opacity-20 text-opacity-50";
    }

    const title = id.toLowerCase().replace(/\w/, firstLetter => firstLetter.toUpperCase());

    return (
      <div className={`${divCSS} border-r border-yellow-400`}>
        <button
          title={title}
          onClick={this.handleClick}
          id={id}
          className={`calc-btn w-full h-16 outline-none focus:outline-none ${buttonCSS} hover:bg-yellow-700 font-light`}
        >
          {text}
        </button>
      </div>
    );
  }
}
