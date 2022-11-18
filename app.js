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
    // want to set the current operation to undefined when clear is called
    this.operation = undefined;
  }
  //   delete operator function
  delete() {}
  // appends the number the user puts in to the display
  appendNumber(number) {
    /*   error handling for . if the user puts one . or if there is already
    a . in the currentOperand then end the function*/
    if (number === '.' && this.currentOperand.includes('.')) return;
    /*   we change the current operrand to the number 
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
    // we want to set previous operand to the current operand so display updates with correct display
    this.previousOperand = this.currentOperand;
    // clear current operand
    this.currentOperand = '';
  }
  //   computes a single value of what needs to be displayed
  compute() {}
  //   updates the display to the output
  updateDisplay() {
    //   we displat the current operand to text so display shows the output
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
    // we call updateDisplay to display our input
    calculator.updateDisplay();
  });
});
operatorButtons.forEach(button => {
  // everytime a number is pressed will append the operator to the output display
  button.addEventListener('click', () => {
    //   were going to pass the operation and update it within the innerText
    calculator.chooseOperator(button.innerText);
    // we call updateDisplay to display our input
    calculator.updateDisplay();
  });
});
