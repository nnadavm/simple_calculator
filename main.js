const screen = document.querySelector(".screen");
let runningTotal = 0;
let buffer = "0";
let previousOperator = null;

function buttonClick(value){
    if (isNaN(value)) {
        handleSymbol(value)
    } else {
        handleNumber(value)
    }
    screen.innerText = buffer;
    console.log(runningTotal);
}

function handleNumber(value) {
    if (buffer === "0") {
        buffer = value;
    } else {
        buffer += value;
    }
}

function handleSymbol(symbol) {
    if (symbol === "C") {
        buffer = "0";
        runningTotal = 0;
    }

    else if (symbol === "←") {
        if (buffer.length === 1) {
            buffer = "0";
        } else {
        buffer = buffer.substring(0, buffer.length - 1);
        }
    }

    else if (symbol === "=") {
        if (previousOperator === null) {
            return
        } else {
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = runningTotal;
            runningTotal = 0;
        };
    }

    else if (symbol === "+" || "-" || "&times;" || "&divide;") {
        handleMath(symbol)
    }
}

function handleMath(operator) {
    if (buffer === "0") {
        return;
    }

    const intBuffer = parseInt(buffer);
    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }

    previousOperator = operator;
    buffer = "0";
}

function flushOperation(intBuffer) {
    if (previousOperator === "-") {
        runningTotal -= intBuffer;
    } else if (previousOperator === "+") {
        runningTotal += intBuffer;
    } else if (previousOperator === "×") {
        runningTotal *= intBuffer;
    } else if (previousOperator === "÷") {
        runningTotal /= intBuffer;
    }   
}



function init() {
    document.querySelector(".buttons").addEventListener("click" , function(event) {
    buttonClick(event.target.innerText)
    })
}

init();
