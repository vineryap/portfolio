import { Fragment, Component } from "react";
import evaluate from "./calculator";
import CalculatorDisplay from './CalculatorDisplay'
import ButtonPanel from "./CalculatorButtonPanel";

export default class Calculator extends Component {
    state = {
        history: '',
        display: '0',
        memory: [],
    }

    handleClick = ( buttonId ) => {
        this.setState( evaluate( this.state, buttonId ) )
    }

    render() {
        const { history, display } = this.state
        return (
            <Fragment>
                <CalculatorDisplay history={history} display={display} />
                <ButtonPanel handleButtonClick={this.handleClick} />
            </Fragment >
        )
    }
}