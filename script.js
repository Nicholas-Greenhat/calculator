let displayElement = document.getElementById('display');
let currentInput = '';
let lastOperationWasCalculation = false;

function clearDisplay() {
    currentInput = '';
    displayElement.textContent = '0';
    adjustFontSize();
    lastOperationWasCalculation = false;
}

function deleteLast() {
    currentInput = currentInput.slice(0, -1);
    displayElement.textContent = currentInput || '0';
    adjustFontSize();
}

function appendNumber(number) {
    if (lastOperationWasCalculation) {
        clearDisplay();
    }
    if (currentInput === '0') {
        currentInput = number.toString();
    } else {
        currentInput += number;
    }
    displayElement.textContent = currentInput;
    adjustFontSize();
    lastOperationWasCalculation = false;
}

function appendOperator(operator) {
    if (lastOperationWasCalculation) {
        lastOperationWasCalculation = false;
    }
    currentInput += ' ' + operator + ' ';
    displayElement.textContent = currentInput;
    adjustFontSize();
}

function calculateResult() {
    try {
        let result = eval(currentInput.replace(/×/g, '*').replace(/÷/g, '/'));
        displayElement.textContent = result;
        currentInput = result.toString();
        adjustFontSize();
        lastOperationWasCalculation = true;
    } catch {
        displayElement.textContent = 'Error';
        currentInput = '';
        adjustFontSize();
    }
}

function adjustFontSize() {
    const maxFontSize = 2; // maximum font size in em
    const minFontSize = 1; // minimum font size in em
    const displayWidth = displayElement.clientWidth;
    let fontSize = maxFontSize;

    displayElement.style.fontSize = `${fontSize}em`;

    while (displayElement.scrollWidth > displayWidth && fontSize > minFontSize) {
        fontSize -= 0.1;
        displayElement.style.fontSize = `${fontSize}em`;
    }
}
