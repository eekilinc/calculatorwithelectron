
// renderer.js
let display = document.getElementById('display');
let currentInput = '';
let operator = null;
let firstOperand = null;
let shouldResetDisplay = false;

function clearDisplay() {
    display.textContent = '0';
    currentInput = '';
    operator = null;
    firstOperand = null;
    shouldResetDisplay = false;
}

function deleteLast() {
    if (display.textContent.length === 1) {
        display.textContent = '0';
    } else {
        display.textContent = display.textContent.slice(0, -1);
    }
    currentInput = display.textContent;
}

function appendNumber(number) {
    if (display.textContent === '0' || shouldResetDisplay) {
        display.textContent = number;
        shouldResetDisplay = false;
    } else {
        display.textContent += number;
    }
    currentInput = display.textContent;
}

function appendOperator(op) {
    if (currentInput === '' && operator === null) return;
    if (operator !== null) calculate();
    firstOperand = parseFloat(currentInput);
    operator = op;
    shouldResetDisplay = true;
}

function calculate() {
    if (operator === null || shouldResetDisplay) return;
    let secondOperand = parseFloat(currentInput);
    let result;
    switch (operator) {
        case '+':
            result = firstOperand + secondOperand;
            break;
        case '-':
            result = firstOperand - secondOperand;
            break;
        case '*':
            result = firstOperand * secondOperand;
            break;
        case '/':
            result = firstOperand / secondOperand;
            break;
        default:
            return;
    }
    display.textContent = result;
    currentInput = result;
    operator = null;
    shouldResetDisplay = true;
}
