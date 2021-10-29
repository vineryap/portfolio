import { Component } from "react";

export default class CalculatorDisplay extends Component {
  render() {
    const { history, display } = this.props;
    return (
      <div className="w-full bg-gradient-to-b from-gray-800 to-gray-700 flex flex-col justify-end">
        <div
          id="history"
          className="w-full min-h-[64px] py-5 px-6 text-yellow-500 text-right break-all"
        >
          {history}
        </div>
        <div
          id="display"
          className="w-full py-5 px-6 text-5xl text-white font-thin text-right break-all"
        >
          {display}
        </div>
      </div>
    );
  }
}
