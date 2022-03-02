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