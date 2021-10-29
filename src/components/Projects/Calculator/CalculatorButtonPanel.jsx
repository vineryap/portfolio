import { Component } from "react";
import Button from "./CalculatorButton";

export default class ButtonPanel extends Component {
  handleClick = buttonId => {
    this.props.handleButtonClick(buttonId);
  };

  render() {
    return (
      <div className="w-full bg-gradient-to-b from-yellow-400 to-yellow-500 text-gray-700 text-xl">
        <div className="flex w-full">
          <Button handleButtonClick={this.handleClick} id="clear" text="AC" />
          <Button handleButtonClick={this.handleClick} id="negation" text="+/-" />
          <Button handleButtonClick={this.handleClick} id="percent" text="%" />
          <Button handleButtonClick={this.handleClick} id="divide" text="÷" />
        </div>
        <div className="flex w-full">
          <Button handleButtonClick={this.handleClick} id="seven" text="7" />
          <Button handleButtonClick={this.handleClick} id="eight" text="8" />
          <Button handleButtonClick={this.handleClick} id="nine" text="9" />
          <Button handleButtonClick={this.handleClick} id="multiply" text="⨉" />
        </div>
        <div className="flex w-full">
          <Button handleButtonClick={this.handleClick} id="four" text="4" />
          <Button handleButtonClick={this.handleClick} id="five" text="5" />
          <Button handleButtonClick={this.handleClick} id="six" text="6" />
          <Button handleButtonClick={this.handleClick} id="subtract" text="-" />
        </div>
        <div className="flex w-full">
          <Button handleButtonClick={this.handleClick} id="one" text="1" />
          <Button handleButtonClick={this.handleClick} id="two" text="2" />
          <Button handleButtonClick={this.handleClick} id="three" text="3" />
          <Button handleButtonClick={this.handleClick} id="add" text="+" />
        </div>
        <div className="flex w-full">
          <Button handleButtonClick={this.handleClick} id="zero" text="0" />
          <Button handleButtonClick={this.handleClick} id="decimal" text="." />
          <Button handleButtonClick={this.handleClick} id="equals" text="=" />
        </div>
      </div>
    );
  }
}
