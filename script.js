const numpadButtons = document.querySelectorAll(".numpad, .operations");
numpadButtons.forEach((btn) => btn.addEventListener('click', processInput));

let currentDisplay = "0";
let operand = currentDisplay;
let operator;

const displayText = document.querySelector('.display-text');
const operationsText = document.querySelector('.operations-text');


function processInput(btn) {
  const pressed = btn.target.getAttribute('class');
  pressed === 'numpad' ? inputDigit(btn.target) : inputOperator(btn.target);
}

function inputDigit(pressedDigit) {
  const digit = pressedDigit.getAttribute('id').slice(6);
  console.log(digit);
  if (currentDisplay === '0') {
    changeDisplay(digit, true);
  } else if (digit === '.' && currentDisplay.includes('.')) {
    return;
  } else if (isNaN(currentDisplay) && !(currentDisplay.includes('.'))) {
    changeDisplay(digit, true);
  } else {
    changeDisplay(digit, false);
  }
}


function inputOperator(pressedOperator) {
  const pressed = pressedOperator.getAttribute('id');
  console.log(pressed);
  switch (pressed) {
    case 'clear':
      clearDisplay();
      break;
    case 'add':
      if (!operator) {
        operand = Number(currentDisplay);
      }
      operator = pressed;
      changeDisplay('+', true, true);
      break;
    case 'subtract':
      if (!operator) {
        operand = Number(currentDisplay);
      }
      operator = pressed;
      changeDisplay('-', true, true);
      break;
    case 'multiply':
      if (!operator) {
        operand = Number(currentDisplay);
      }
      operator = pressed;
      
      changeDisplay('x', true, true);
      break
    case 'divide':
      if (!operator) {
        operand = Number(currentDisplay);
      }
      operator = pressed;
      
      changeDisplay('/', true, true);
      break
    case 'delete':
      deleteFromDisplay();
      break;
    case 'equals':
      console.log(operand)
      console.log(currentDisplay);
      console.log(operator);
      doOperation();
      /* const operand2 = Number(currentDisplay);
      if (operator && !isNaN(currentDisplay)) {
        let result = operate(operator, operand, operand2);
        result = roundToTwoDecimals(result);
        changeDisplay(String(result), true);
        operand = result;
        operator = undefined;
        operationsText.textContent = '';
      } */
      break;
  }
}

//Changes display, overriding current display if needed(ie replace "+" with inputted numbers)
function changeDisplay(input, allowOverride, isOperator=false){
  
  allowOverride ? currentDisplay = input : currentDisplay += input;
  displayText.textContent = currentDisplay;

  if (isOperator) {
    operationsText.textContent = `${operand} ${currentDisplay}`;
  }    
}

function deleteFromDisplay() {
  if (isNaN(currentDisplay) && !(currentDisplay.includes('.'))){
    currentDisplay = operand;
  } else if (currentDisplay.length >= 2) {
    currentDisplay = currentDisplay.slice(0 ,-1);
  } else {
    currentDisplay = '0';
  }
  displayText.textContent = currentDisplay;
}

function clearDisplay() {
  currentDisplay = '0';
  operand = currentDisplay;
  operator = undefined;
  displayText.textContent = currentDisplay;
  operationsText.textContent = '';
}

function add(a, b) {
  return a+b;
}

function subtract(a, b) {
  return a-b;
}

function multiply(a, b) {
  return a*b;
}

function divide(a, b) {
  return a/b;
}

function operate(operation, a, b) {
  let result;
  switch(operation) {
    case "add":
      result = add(a, b);
      break;
    case "subtract":
      result = subtract(a, b);
      break;
    case "multiply":
      result = multiply(a, b);
      break;
    case "divide":
      result = divide(a, b);
      break;
  }
  return result;
}

function doOperation() {
  const operand2 = Number(currentDisplay);
  if (operator && !isNaN(currentDisplay)) {
    let result = operate(operator, operand, operand2);
    result = roundToTwoDecimals(result);
    changeDisplay(String(result), true);
    operand = result;
    operator = undefined;
    operationsText.textContent = '';
  }
}

function roundToTwoDecimals(num) {
  return Math.round(num*100)/100
}