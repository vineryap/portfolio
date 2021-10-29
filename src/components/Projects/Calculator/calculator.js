import {
  Operators,
  DecimalButton,
  EqualsButton,
  ClearButton,
  ButtonNumbers,
  isNumeric,
  clear,
  calculate,
  handleOperator,
  handleNumeric,
  handleDecimal,
  handleHistoryOperator,
  handleHistoryNumber,
  handleHistoryDecimal
} from './helpers';

let isCalculated = false;

export default function evaluate(state, buttonId) {
  // handle clear button
  if (buttonId === ClearButton) {
    clear();
    isCalculated = false;
    return {
      history: '',
      display: '0',
      memory: []
    };
  }

  // handle equals button
  if (buttonId === EqualsButton) {
    const memory = calculate(state.memory);
    const display = memory[0].toString();
    isCalculated = true;

    return {
      display,
      memory
    };
  }

  // Handle operators
  if (buttonId in Operators) {
    let display = Operators[buttonId];
    let memory = state.memory;

    if (isCalculated) {
      clear();
      state.history = state.display;
      isCalculated = false;
    }

    if (buttonId === 'negation') {
      if (state.display === '0' || !isNumeric(state.display)) {
        display = state.display;
      } else {
        display = (parseFloat(state.display) * -1).toString();
        memory[memory.length - 1] = parseFloat(display);
      }
    }

    if (buttonId === 'percent') {
      if (isNumeric(state.display)) {
        display = (parseFloat(memory[memory.length - 1]) / 100).toString();
        memory.length
          ? (memory[memory.length - 1] = parseFloat(display))
          : (memory[0] = parseFloat(display));
      } else {
        display = state.display;
      }
    }

    const { history, logicOperator } = handleHistoryOperator(buttonId, state.history, display);
    memory = logicOperator ? handleOperator(logicOperator, memory) : state.memory;

    return {
      display,
      history,
      memory
    };
  }

  //  Handle numbers
  if (buttonId in ButtonNumbers) {
    if (isCalculated) {
      clear();
      state.display = '0';
      state.history = '';
      state.memory = [];
      isCalculated = false;
    }
    if (buttonId === 'zero' && state.display === '0') {
      return { display: '0', history: '0', memory: [0] };
    }

    if (state.operator) {
      if (state.display) {
        const display = state.display + ButtonNumbers[buttonId];
        return {
          display,
          history: handleHistoryNumber(state.history, ButtonNumbers[buttonId]),
          memory: handleNumeric(display, state.memory)
        };
      }
      return {
        display: ButtonNumbers[buttonId],
        history: handleHistoryNumber(state.history, ButtonNumbers[buttonId]),
        memory: handleNumeric(ButtonNumbers[buttonId], state.memory)
      };
    }

    if (state.display) {
      if (state.history.lastIndexOf('%') !== -1) {
        const display = ButtonNumbers[buttonId];
        return {
          display,
          history: handleHistoryNumber(state.history, ButtonNumbers[buttonId]),
          memory: handleNumeric(display, state.memory)
        };
      }

      const display =
        state.display === '0' || !isNumeric(state.display)
          ? ButtonNumbers[buttonId]
          : state.display + ButtonNumbers[buttonId];

      return {
        display,
        history: handleHistoryNumber(state.history, ButtonNumbers[buttonId]),
        memory: handleNumeric(display, state.memory)
      };
    }
    return {
      display: ButtonNumbers[buttonId],
      history: handleHistoryNumber(state.history, ButtonNumbers[buttonId]),
      memory: handleNumeric(ButtonNumbers[buttonId], state.memory)
    };
  }

  // handle decimal
  if (buttonId === DecimalButton) {
    if (state.display.includes('.')) {
      return {};
    }

    if (isNumeric(state.display)) {
      return {
        display: state.display + '.',
        history: handleHistoryDecimal(state.history, state.display),
        memory: handleDecimal(state.display, state.memory)
      };
    }

    return {
      display: '0.',
      history: handleHistoryDecimal(state.history, state.display),
      memory: handleDecimal(state.display, state.memory)
    };
  }

  return {
    history: state.history,
    display: state.display,
    operator: state.operator,
    memory: state.memory
  };
}
