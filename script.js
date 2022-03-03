
const numpadButtons = document.querySelectorAll(".numpad, .operations");
numpadButtons.forEach((btn) => btn.addEventListener('click', processInput));

//initialize display and stored values upon first loading the page
let currentDisplay = "0";
let operand = currentDisplay;
let operator;
const displayText = document.querySelector('.display-text');
const operationsText = document.querySelector('.operations-text');

//depending on class of button pressed, run 1 of 2 functions to either input a digit or operator
function processInput(btn) {
  const pressed = btn.target.getAttribute('class');
  pressed === 'numpad' ? inputDigit(btn.target) : inputOperator(btn.target);
}

//contains logic to handle arguments to be passed to changeDisplay function
//if only 0 is displayed, replaces it with inputted digit
//prevents subsequent decimals being inputted if display already has a decimal
//allows for the 2nd operand to be inputted when the the previous button press was an operator
function inputDigit(pressedDigit) {
  const digit = pressedDigit.getAttribute('id').slice(6);
  if (currentDisplay === '0') {
    changeDisplay(digit, true);
  }
  else if (digit === '.' && currentDisplay.includes('.')) {
    return;
  }
  else if (isNaN(currentDisplay) && !(currentDisplay.includes('.'))) {
    changeDisplay(digit, true);
  } else {
    changeDisplay(digit, false);
  }
}

//if one of the main operations is pressed, display it and save inputted as the operator
//also saves previously inputted digits as the first operand
//if there's already 2 operands + an operator,
//outputs previous expression first before saving new operator
//the other operations(clear, delete, and equals) have separate functions to handle them
function inputOperator(pressedOperator) {
  const pressed = pressedOperator.getAttribute('id');
  if(currentDisplay === "NICE TRY") {
    currentDisplay = '0';
  }

  switch (pressed) {
    case 'clear':
      clearDisplay();
      break;
    case 'add':
      if (!operator) {
        operand = Number(currentDisplay);
      }
      if (!isNaN(currentDisplay) && operator){
        doOperation();
      }
      operator = pressed;
      changeDisplay('+', true, true);
      break;
    case 'subtract':
      if (!operator) {
        operand = Number(currentDisplay);
      }
      if (!isNaN(currentDisplay) && operator){
        doOperation();
      }
      operator = pressed;
      changeDisplay('-', true, true);
      break;
    case 'multiply':
      if (!operator) {
        operand = Number(currentDisplay);
      }
      if (!isNaN(currentDisplay) && operator){
        doOperation();
      }
      operator = pressed;
      changeDisplay('x', true, true);
      break
    case 'divide':
      if (!operator) {
        operand = Number(currentDisplay);
      }
      if (!isNaN(currentDisplay) && operator){
        doOperation();
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
      break;
  }
}

//Changes display, overriding current display if needed(ie replace "123" with pressed operator "+")
//Also handles operations display(showing "5 +" when "+" is pressed)
function changeDisplay(input, allowOverride, isOperator=false){
  
  allowOverride ? currentDisplay = input : currentDisplay += input;
  displayText.textContent = currentDisplay;

  if (isOperator) {
    operationsText.textContent = `${operand} ${currentDisplay}`;
  }    
}

//deletes a digit, or deletes the operator to edit the operand again
function deleteFromDisplay() {
  if (isNaN(currentDisplay) && !(currentDisplay.includes('.'))){
    currentDisplay = operand;
    operator = undefined;
  } else if (currentDisplay.length >= 2) {
    currentDisplay = currentDisplay.slice(0 ,-1);
  } else {
    currentDisplay = '0';
  }
  displayText.textContent = currentDisplay;
}

//reinitialize display and all global variables
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
  if(a === 0 && b !== 0){
    return "NICE TRY";
  }
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

//when "=" is pressed, output result and sets it as the new first operand
function doOperation() {
  const operand2 = Number(currentDisplay);
  if (operator && !isNaN(currentDisplay)) {
    let result = operate(operator, operand, operand2);
    if (result === "NICE TRY") {
      changeDisplay(result, true);
      operand = 0;
    } else {
      result = roundToTwoDecimals(result);
      changeDisplay(String(result), true);
      operand = result;
    }
    operator = undefined;
    operationsText.textContent = '';
  }
}

function roundToTwoDecimals(num) {
  return Math.round(num*100)/100
}