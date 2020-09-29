

//declare class
class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    this.clear()
  }
  //clear everything
  clear() {
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined
  }
  // delete button
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }
  //append numbers, not adding numbers
  appendNumber(number) {
    //stop repeating any decimals
    if (number === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + number.toString()
  }
  //select the +, -, etc...
  chooseOperation(operation) {
    if (this.currentOperand === '') return
    if (this.previousOperand !== '') {
      this.operate()
    }
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
  }
  //do the math
  operate() {
    let computation
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case '*':
        computation = prev * current
        break
      case '÷':
        computation = prev / current
        break
      default:
        return
    }
    this.currentOperand = computation
    this.operation = undefined
    this.previousOperand = ''
  }
  //get the numbers
  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }
  //update the screen to show details
  updateDisplay() {
    this.currentOperandTextElement.innerText =
      this.getDisplayNumber(this.currentOperand)
    if (this.operation != null) {
      this.previousOperandTextElement.innerText =
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
    } else {
      this.previousOperandTextElement.innerText = ''
    }
  }
}

// declare items
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')
const keyBoard = document.querySelectorAll('[data-number]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

//if numbers are clicked
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.appendNumber(button.innerText)
      calculator.updateDisplay()
    })
  })


//if operator buttons are clicked  
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText)
      calculator.updateDisplay()
    })
  })
//if = is clicked  
equalsButton.addEventListener('click', button => {
    calculator.operate()
    calculator.updateDisplay()
  })
// if clear all button is clicked
allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
  })
// if delete is clicked  
deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
  })  

//if keyboard is used
/* experimenting code below
keyBoard.forEach(button => {
window.addEventListener('keyup', function(key){
    // without more calculations, if the key pressed is enter, then calculate the result
    if (key.key == "Enter"){
      calculator.operate()
      calculator.updateDisplay()
    }
    if (key.key == "Backspace") {
        calculator.delete()
        calculator.updateDisplay()
    }

    // a list of valid entries
    const validKeys = "1234567890".split("")
    var validEntry = false
    // be sure the key pressed is a valid entry
    validKeys.forEach(function(k){
      if (key == k){
        // this will be true when the pressed key being a number or an operation symbol from the validKeys array
        validEntry = true;
        return;
      }
    });
    if (validEntry){
        calculator.appendNumber(key.key);
        calculator.updateDisplay();
    }
});
})*/