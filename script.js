
const display = document.getElementById("display");

// Add value to display
function appendValue(value) {
    if (display.value === "Error") {
        display.value = "";
    }
    display.value += value;
}

// Add scientific functions
function appendFunction(func) {
    if (func === "sin" || func === "cos" || func === "tan") {
        display.value += `Math.${func}((`;
    }
    else if (func === "log") {
        display.value += "Math.log10(";
    }
    else if (func === "ln") {
        display.value += "Math.log(";
    }
}

// Clear display
function clearDisplay() {
    display.value = "";
}

// Delete last character
function deleteLast() {
    display.value = display.value.slice(0, -1);
}

// Calculate result
function calculate() {
    try {
        let expression = display.value;

        // Convert trigonometric input from degrees to radians
        expression = expression.replace(
            /Math\.(sin|cos|tan)\(\(/g,
            "Math.$1((Math.PI/180)*("
        );

        // Calculate expression
        let result = Function(
            '"use strict"; return (' + expression + ')'
        )();

        if (!Number.isFinite(result)) {
            throw new Error("Invalid calculation");
        }

        display.value = Number(result.toFixed(10)).toString();

    } catch (error) {
        display.value = "Error";
    }
}
