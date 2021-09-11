let isNegative = false,
  isDecimal = false,
  isDoubleOperators = false,
  isCalculated = false;

const Operators = {
  add: '+',
  subtract: '-',
  multiply: 'x',
  divide: '/',
  percent: '%',
  negation: '-',
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
  zero: '0',
};

const clear = () => {
  isNegative = false;
  isDecimal = false;
  isDoubleOperators = false;
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

    let operatorIndex = memory.findIndex(
      (operator) => operator === 'x' || operator === '/'
    );

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
      operatorIndex = memory.findIndex(
        (operator) => operator === 'x' || operator === '/'
      );
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

/**
 * Logic Handlers
 */

const handleOperator = (operator, memory) => {
  if (!operator) return memory;

  let lastMemory = memory[memory.length - 1];

  if (operator.length > 1) {
    if (operator === '--') {
    } else operator = operator[0];
  }

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
      memory[lastIndex] = isNegative
        ? -parseFloat(display)
        : parseFloat(display);
    } else {
      if (isNegative) memory.push(-parseFloat(display));
      else memory.push(parseFloat(display));
    }
  } else {
    isNegative
      ? memory.push(-parseFloat(display))
      : memory.push(parseFloat(display));
  }
  return memory;
};

const handleDecimal = (display, memory) => {
  if (!memory.length) {
    display = display === '.' || display === '0.' ? '0.0' : display;

    isNegative
      ? memory.push(-parseFloat(display))
      : memory.push(parseFloat(display));
  }
  return memory;
};

/**
 * History helpers
 */

const handleHistoryOperator = (id, history, display) => {
  if (history.length > 1) {
    if (isCalculated) {
      isCalculated = false;
      history = display;
    }

    const operator = Operators[id];
    let logicOperator = operator;
    const lastChar = history.substring(history.length - 1);

    if (isNumeric(lastChar)) {
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
        logicOperator = null;
      } else if (id === 'percent') {
        const lastInputIndex = history.lastIndexOf(parseFloat(display) * 100);
        history =
          lastInputIndex !== -1
            ? history.substring(0, lastInputIndex) + display
            : display;

        logicOperator = null;
      } else {
        history += operator;
      }
      isNegative = id === 'subtract';
      isDoubleOperators = false;
    } else {
      if (lastChar === '-') {
        if (id === 'subtract') {
          !isDoubleOperators && (history += operator);
          logicOperator = lastChar + operator;
          isNegative = true;
          isDoubleOperators = true;
        } else {
          if (isDoubleOperators) {
            history = history.substring(0, history.length - 2);
            isNegative = false;
            isDoubleOperators = false;
          } else {
            history = history.substring(0, history.length - 1);
          }
          history += operator;
        }
      } else {
        if (id === 'subtract') {
          lastChar !== '-' && (history += operator);
          logicOperator = lastChar + operator;
          isNegative = true;
          isDoubleOperators = true;
        } else {
          if (isDoubleOperators) {
            history = history.substring(0, history.length - 2);
            isNegative = false;
            isDoubleOperators = false;
          } else {
            history = history.substring(0, history.length - 1);
          }
          history += operator;
        }
      }
    }
    return { history, logicOperator };
  } else {
    if (isCalculated) {
      isCalculated = false;
      history = display;
    }
    const operator = Operators[id];
    const lastChar = history.substring(history.length - 1);
    let logicOperator = null;

    if (history.length) {
      logicOperator = operator;
      
      if (isNumeric(lastChar)) {
        if (id === 'percent') {
          history = display;
          logicOperator = null;
        } else if (id === 'negation') {
          if (display.includes('-')) {
            history = display;
          }
          logicOperator = null;
        } else {
          history += operator;
        }

        isNegative = false;
      } else {
        if (!id === 'percent' || !id === 'negation') history += operator;
      }
    } else {
      logicOperator = null;
    }
    isNegative = id === 'subtract';
    return { history, logicOperator };
  }
};

const handleHistoryNumber = (history, display) => {
  if (history === '0') return;
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
  clear,
  isNumeric,
  calculate,
  handleOperator,
  handleNumeric,
  handleDecimal,
  handleHistoryOperator,
  handleHistoryNumber,
  handleHistoryDecimal,
};
