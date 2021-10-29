import { Fragment, Component } from "react";
import evaluate from "./calculator";
import CalculatorDisplay from "./CalculatorDisplay";
import ButtonPanel from "./CalculatorButtonPanel";
import { KEYBOARD_CODE } from "./helpers";

export default class Calculator extends Component {
  state = {
    history: "",
    display: "0",
    memory: []
  };

  handleClick = buttonId => {
    this.setState(evaluate(this.state, buttonId));
  };

  handleKeydown = e => {
    if (e.repeat || !KEYBOARD_CODE.hasOwnProperty(e.code)) return;

    let id = KEYBOARD_CODE[e.code];
    if (e.shiftKey) {
      switch (e.code) {
        case "Digit5":
          id = "percent";
          break;
        case "Digit8":
          id = "multiply";
          break;
        case "Equal":
          id = "add";
          break;
      }
    }
    this.setState(evaluate(this.state, id));
  };

  componentDidMount() {
    document.body.addEventListener("keydown", this.handleKeydown);
  }

  componentWillUnmount() {
    document.body.removeEventListener("keydown", this.handleKeydown);
  }

  render() {
    const { history, display } = this.state;
    return (
      <Fragment>
        <CalculatorDisplay history={history} display={display} />
        <ButtonPanel handleButtonClick={this.handleClick} handleKeyup={this.handleKeyup} />
      </Fragment>
    );
  }
}
