// This variable keeps track of the ongoing calculation result.
let runningTotal = 0;

// This variable stores what the user is currently typing (as a string).
let buffer = '0';

// This variable remembers the last operator (+, −, ×, ÷) the user pressed.
let previousOperator;

// This gets the calculator's display element from the HTML.
const screen = document.querySelector('.screen');

// This function is called whenever a calculator button is clicked.
function buttonClick(value) {
    // If the value is not a number (like '+', '=', etc.), handle it as a symbol.
    if (isNaN(value)) {
        handleSymbol(value);
    } else {
        // Otherwise, handle it as a number.
        handleNumber(value);
    }
    // Update the calculator's display with the current buffer.
    screen.innerText = buffer;
}

// This function handles special buttons like AC, =, DEL, ., and the operators.
function handleSymbol(symbol) {
    switch(symbol) {
        case 'AC':
            // 'AC' clears everything and resets the calculator.
            buffer = '0';
            runningTotal = 0;
            previousOperator = null;
            break;
        case '=':
            // '=' calculates the result using the previous operator.
            if (previousOperator === null) {
                return; // If there's no previous operator, do nothing.
            }
            flushOperation(parseFloat(buffer)); // Perform the calculation.
            previousOperator = null; // Reset the operator.
            buffer = runningTotal.toString(); // Show the result.
            runningTotal = 0; // Reset running total for next calculation.
            break;
        case 'DEL':
            // 'DEL' removes the last digit or character from the buffer.
            if (buffer.length === 1) {
                buffer = '0'; // If only one character left, reset to '0'.
            } else {
                buffer = buffer.slice(0, buffer.length - 1); // Remove last character.
            }
            break;
        case '.':
            // '.' adds a decimal point if there isn't one already.
            if (!buffer.includes('.')) {
                buffer += '.';
            }
            break;
        case '+':
        case '−':
        case '÷':
        case '×':
            // If an operator is pressed, handle the math operation.
            handleMath(symbol);
            break;
    }
}

// This function handles what happens when an operator (+, −, ×, ÷) is pressed.
function handleMath(symbol) {
    // If buffer is '0' or just a '.', ignore the operator.
    if (buffer === '0' || buffer === '.') {
        return;
    }
    // Convert the buffer (string) to a floating-point number.
    const floatBuffer = parseFloat(buffer);
    if (runningTotal === 0) {
        // If this is the first operation, set runningTotal to the buffer value.
        runningTotal = floatBuffer;
    } else {
        // Otherwise, perform the previous operation.
        flushOperation(floatBuffer);
    }
    // Remember which operator was pressed.
    previousOperator = symbol;
    // Reset buffer for the next number input.
    buffer = '0';
}

// This function actually performs the math operation based on the previous operator.
function flushOperation(floatBuffer) {
    if (previousOperator === '+') {
        runningTotal += floatBuffer;
    }
    else if (previousOperator === '−') {
        runningTotal -= floatBuffer;
    }
    else if (previousOperator === '×') {
        runningTotal *= floatBuffer;
    }
    else if (previousOperator === '÷') {
        runningTotal /= floatBuffer;
    }
}

// This function handles number button clicks and builds up the buffer.
function handleNumber(numberString) {
    if (buffer === '0') {
        // If buffer is '0', replace it with the new number.
        buffer = numberString;
    } else {
        // Otherwise, add the new number to the end of the buffer.
        buffer += numberString;
    }
}

// This function sets up the calculator so it listens for button clicks.
function init() {
    // Find the element that contains all the calculator buttons.
    document.querySelector('.calc-buttons').addEventListener('click', function(event) {
        // When any button is clicked, call buttonClick with the button's text.
        buttonClick(event.target.innerText);
    });
}

// Start the calculator when the page loads.
init();
