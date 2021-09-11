import { Component } from "react";

export default class Button extends Component {

    handleClick = () => {
        this.props.handleButtonClick( this.props.id )
    }

    render() {
        const { id, text } = this.props;

        const operators = {
            add: '+',
            subtract: '-',
            multiply: 'x',
            divide: '/',
            percent: '%',
            negation: '-'
        };

        const numbers = {
            one: '1',
            two: '2',
            three: '3',
            four: '4',
            five: '5',
            six: '6',
            seven: '7',
            eight: '8',
            nine: '9',
            zero: '0',
        };

        let buttonCSS = '';
        const divCSS = id === 'equals' ? 'w-2/4' : 'w-1/4'

        if ( id === 'equals' ) {
            buttonCSS = 'bg-yellow-700 bg-opacity-30 hover:bg-opacity-40'
        } else if ( id in operators || id === 'clear' ) {
            buttonCSS = 'bg-yellow-700 bg-opacity-10 hover:bg-opacity-20'
        } else if ( id in numbers ) {
            buttonCSS = 'hover:bg-opacity-20'
        } else {
            buttonCSS = 'hover:bg-opacity-20 text-opacity-50'
        }

        return (
            <div className={`${divCSS} border-r border-yellow-400`}>
                <button
                    onClick={this.handleClick}
                    id={id} className={`calc-btn w-full h-16 outline-none focus:outline-none ${buttonCSS} hover:bg-yellow-700 font-light`}
                >{text}</button>
            </div>
        )
    }
}

