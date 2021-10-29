let isNegative = false,
  isDecimal = false,
  isCalculated = false;

const Operators = {
  add: '+',
  subtract: '-',
  multiply: 'x',
  divide: '/',
  percent: '%',
  negation: '-'
};
const DecimalButton = 'decimal';
const EqualsButton = 'equals';
const ClearButton = 'clear';
const ButtonNumbers = {
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9',
  zero: '0'
};

const KEYBOARD_CODE = {
  Enter: 'equals',
  Escape: 'clear',
  Digit0: 'zero',
  Digit1: 'one',
  Digit2: 'two',
  Digit3: 'three',
  Digit4: 'four',
  Digit5: 'five',
  Digit6: 'six',
  Digit7: 'seven',
  Digit8: 'eight',
  Digit9: 'nine',
  Period: 'decimal',
  Minus: 'subtract',
  Slash: 'divide',
  Equal: 'equals',
  Numpad0: 'zero',
  Numpad1: 'one',
  Numpad2: 'two',
  Numpad3: 'three',
  Numpad4: 'four',
  Numpad5: 'five',
  Numpad6: 'six',
  Numpad7: 'seven',
  Numpad8: 'eight',
  Numpad9: 'nine',
  NumpadDecimal: 'decimal',
  NumpadAdd: 'add',
  NumpadDivide: 'divide',
  NumpadEnter: 'equals',
  NumpadEqual: 'equals',
  NumpadMultiply: 'multiply',
  NumpadSubtract: 'subtract'
};

const clear = () => {
  isNegative = false;
  isDecimal = false;

  isCalculated = false;
};

const isNumeric = (val) => {
  if (typeof val === 'number') return true;
  return !isNaN(parseInt(val)) && !isNaN(parseFloat(val));
};

const calculate = (memory) => {
  let result = '';

  if (memory.length) {
    if (!isNumeric(memory[memory.length - 1])) memory.pop();

    let operatorIndex = memory.findIndex((operator) => operator === 'x' || operator === '/');

    while (operatorIndex !== -1) {
      const operand1 = memory[operatorIndex - 1];
      const operator = memory[operatorIndex];
      const operand2 = memory[operatorIndex + 1];
      let result;

      if (operator === 'x') {
        result = operand1 * operand2;
      }
      if (operator === '/') {
        result = operand1 / operand2;
      }
      if (result) {
        memory.splice(operatorIndex - 1, 3, result);
      }
      operatorIndex = memory.findIndex((operator) => operator === 'x' || operator === '/');
    }
    if (memory.length === 1) {
      result = memory[0];
    } else {
      const filtered = memory.filter((value) => isNumeric(value));
      result = filtered.reduce((total, currentValue) => total + currentValue);

      memory = [result];
    }
  } else {
    memory = ['0'];
  }

  return memory;
};

const handleOperator = (operator, memory) => {
  if (!operator || operator === '%') return memory;

  let lastMemory = memory[memory.length - 1];

  if (operator !== '--') operator = operator[0];

  if (isNumeric(lastMemory)) {
    memory.push(operator);
  } else {
    memory[memory.length - 1] = operator;
  }

  return memory;
};

const handleNumeric = (display, memory) => {
  if (memory.length) {
    const lastIndex = memory.length - 1;

    if (isNumeric(memory[lastIndex])) {
      memory[lastIndex] = isNegative ? -parseFloat(display) : parseFloat(display);
    } else {
      if (isNegative) memory.push(-parseFloat(display));
      else memory.push(parseFloat(display));
    }
  } else {
    isNegative ? memory.push(-parseFloat(display)) : memory.push(parseFloat(display));
  }
  return memory;
};

const handleDecimal = (display, memory) => {
  if (!memory.length) {
    display = display === '.' || display === '0.' ? '0.0' : display;

    isNegative ? memory.push(-parseFloat(display)) : memory.push(parseFloat(display));
  }
  return memory;
};

const handleHistoryOperator = (id, history, display) => {
  if (isCalculated) {
    isCalculated = false;
    history = display;
  }

  const doubleOperatorsRegex = /(--)$|(\+-)$|(x-)$|(\/-)$/g;

  const operator = Operators[id];
  const lastChar = history.substring(history.length - 1);
  let logicOperator = null;

  if (history.length > 1) {
    logicOperator = operator;

    if (isNumeric(lastChar)) {
      history += operator;
      if (id === 'negation') {
        if (display.includes('-')) {
          const lastInputIndex = history.lastIndexOf(parseFloat(display) * -1);
          history = history.substring(0, lastInputIndex) + display;
        } else {
          const negationIndex = history.lastIndexOf('-');
          history =
            negationIndex === 0
              ? history.substring(1)
              : history.substring(0, negationIndex) + display;
        }
      }

      isNegative = id === 'subtract';
    } else {
      if (id === 'subtract') {
        logicOperator = lastChar + operator;
        isNegative = true;

        if (!doubleOperatorsRegex.test(history)) history += operator;
      } else {
        if (doubleOperatorsRegex.test(history)) {
          history = history.replace(doubleOperatorsRegex, operator);
          isNegative = false;
        } else {
          const percentageRegex = /(\d+%)$/g;
          const target = history.match(percentageRegex);
          if (target) {
            history = history.replace(percentageRegex, parseFloat(target[0]) / 100);
          } else history = history.replace(/(\W)$/g, operator);
        }
      }
    }
    return { history, logicOperator };
  } else {
    if (history.length) {
      if (isNumeric(lastChar)) {
        history += operator;
      } else {
        history = display;
      }

      logicOperator = operator;
    } else history = display;

    isNegative = id === 'subtract';
    return { history, logicOperator };
  }
};

const handleHistoryNumber = (history, display) => {
  if (history === '0') return;

  const percentageRegex = /(\d+%)$/g;
  if (history.match(percentageRegex)) {
    return (history = history.replace(percentageRegex, display));
  }

  history += display;
  return history;
};

const handleHistoryDecimal = (history, display) => {
  isDecimal = true;
  if (isNumeric(display)) {
    history = history ? history + '.' : '0.';
  } else {
    history += '0.';
  }
  return history;
};

export {
  Operators,
  DecimalButton,
  EqualsButton,
  ClearButton,
  ButtonNumbers,
  KEYBOARD_CODE,
  clear,
  isNumeric,
  calculate,
  handleOperator,
  handleNumeric,
  handleDecimal,
  handleHistoryOperator,
  handleHistoryNumber,
  handleHistoryDecimal
};
