const calc = document.querySelector(".calc");
const output = document.querySelector(".output");
const keys = document.querySelectorAll(".key");

let currentOperation = "";
let currentOperand = "";
let previousOperand = "";

keys.forEach((key) => {
  key.addEventListener("click", (event) => {
    const keyValue = event.target.textContent;

    if (Number.isFinite(parseFloat(keyValue))) {
      if (currentOperand === "") {
        currentOperand = keyValue;
      } else {
        currentOperand += keyValue;
      }
      output.textContent = currentOperand;
    } else if (keyValue === "AC") {
      currentOperand = "";
      output.textContent = "0";
    } else if (keyValue === "DEL") {
      currentOperand = currentOperand.slice(0, -1);
      output.textContent = currentOperand;
    } else if (
      keyValue === "+" ||
      keyValue === "-" ||
      keyValue === "x" ||
      keyValue === "÷" ||
      keyValue === "%"
    ) {
      if (currentOperand !== "") {
        previousOperand = currentOperand;
        currentOperation = keyValue;
        currentOperand = "";
        output.textContent = previousOperand + " " + currentOperation;
      }
    } else if (keyValue === "=") {
      if (currentOperand !== "" && previousOperand !== "") {
        const result = calculate(
          previousOperand,
          currentOperand,
          currentOperation
        );
        currentOperand = result;
        output.textContent = currentOperand;
      }
    }
  });
});

function calculate(a, b, operation) {
  a = parseFloat(a);
  b = parseFloat(b);

  switch (operation) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "x":
      return a * b;
    case "÷":
      return a / b;
    case "%":
      return a % b;
    default:
      return "Error";
  }
}
