const numpadButtons = document.querySelectorAll(".numpad, .operations");
numpadButtons.forEach((btn) => btn.addEventListener('click', processInput));

let currentDisplay = "0";
let operand = currentDisplay;
let operator;
const displayText = document.querySelector('.display-text');
const operationsText = document.querySelector('.operations-text');


function processInput(btn) {
  const pressed = btn.target.getAttribute('class');
  console.log(pressed);
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
  operand = Number(currentDisplay);
  console.log(operand);
}


function inputOperator(pressedOperator) {
  operator = pressedOperator.getAttribute('id');
  switch (operator) {
    case 'clear':
      clearDisplay();
      break;
    case 'add':
      changeDisplay('+', true, true);
      break;
    case 'subtract':
      changeDisplay('-', true, true);
      break;
    case 'multiply':
      changeDisplay('x', true, true);
      break
    case 'divide':
      changeDisplay('/', true, true);
      break
    case 'delete':
      deleteFromDisplay();
      break;
    case 'equals':
      
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
  operand = currentDisplay;
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

//Testing operate function with all operations
/* console.log(operate('add', 3, 1));
console.log(operate('subtract', 4, 1));
console.log(operate('multiply', 1, 2));
console.log(operate('divide', 1, 1)); */