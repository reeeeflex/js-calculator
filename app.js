// class for calculator to display previous text and current text
class Calculator {
  constructor(previousOperandText, currentOperandText) {
    this.previousOperandText = previousOperandText;
    this.currentOperandText = currentOperandText;
    // clear is called when new calculator is made
    this.clear();
  }

  //   clear function to remove all numbers
  clear() {
    //   sets the previous text and current text to empty string when clear is called
    this.previousOperand = '';
    this.currentOperand = '';
    // set the current operation to undefined when clear is called
    this.operation = undefined;
  }
  //   delete operator function
  delete() {}
  // appends the number the user puts in to the display
  appendNumber(number) {
    /*   error handling for . if the user puts one . or if there is already
    a . in the currentOperand then end the function*/
    if (number === '.' && this.currentOperand.includes('.')) return;
    /*  change the current operand to the number 
    call toString so that js doesn't try to add the numbers*/
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }
  // chooses the operator the user clicks on
  chooseOperator(operation) {
    //   if the current operand is empty will return to not execute the function
    if (this.currentOperand === '') return;
    // if the previous operand is not empty will call computer() and display the computation plus the new operand
    if (this.previousOperand !== '') {
      // if not empty call compute()
      this.compute();
    }
    this.operation = operation;
    // set previous operand to the current operand, display updates with correct display
    this.previousOperand = this.currentOperand;
    // clear current operand
    this.currentOperand = '';
  }
  //   computes a single value of what needs to be displayed
  compute() {
    let computation;
    // this will convert the string of previous operand into a number
    const previous = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    // if user just hits = with no numbers will cancel function call
    if (isNaN(previous) && isNaN(current)) return;
    // switch statement that will be executed with each case include break to break and not call any other case
    switch (this.operation) {
      case '+':
        computation = previous + current;
        break;
      case '-':
        computation = previous - current;
        break;
      case '&times;':
        computation = previous * current;
        break;
      case '&divide;':
        computation = previous / current;
        break;
      // if none of the symbols are pressed return nothing because something is wrong
      default:
        return;
    }
    //  set the current operand to compute and will do calculations
    this.currentOperand = computation;
    // set operation to undefined
    this.operation = undefined;
    this.previousOperand = '';
  }
  //   updates the display to the output
  updateDisplay() {
    // display the current operand to text so display shows the output
    this.currentOperandText.innerText = this.currentOperand;
    this.previousOperandText.innerText = this.previousOperand;
  }
}

// creating variables for data attributes have to put []
const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const allClearButton = document.querySelector('[data-all-clear]');
const deleteButton = document.querySelector('[data-delete]');
const equalsButton = document.querySelector('[data-equals]');
const previousOperandText = document.querySelector('[data-previous-operand]');
const currentOperandText = document.querySelector('[data-current-operand]');

// create new calculator
const calculator = new Calculator(previousOperandText, currentOperandText);

// add an event listener for each number press
numberButtons.forEach(button => {
  // everytime a number is pressed will append the number to the output display
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    // call updateDisplay to display the input
    calculator.updateDisplay();
  });
});
operatorButtons.forEach(button => {
  // everytime a number is pressed will append the operator to the output display
  button.addEventListener('click', () => {
    //  going to pass the operation and update it within the innerText
    calculator.chooseOperator(button.innerText);
    // call updateDisplay to display input
    calculator.updateDisplay();
  });
});

// when equalsButton is clicked will call compute and update the display
equalsButton.addEventListener('click', () => {
  calculator.compute();
  calculator.updateDisplay();
});

// when AC is clicked will call clear and clear the display
allClearButton.addEventListener('click', () => {
  calculator.clear();
  calculator.updateDisplay();
});
