"use client";

import { useCallback, useState } from "react";

type CalcButton =
  | { label: string; action: "clear" | "backspace" | "/" | "*" | "-" | "+" | "="; css?: string }
  | { label: string; number: string; css?: string };

const buttons: CalcButton[] = [
  { label: "C", action: "clear" },
  { label: "←", action: "backspace" },
  { label: "÷", action: "/" },
  { label: "×", action: "*" },
  { label: "7", number: "7" },
  { label: "8", number: "8" },
  { label: "9", number: "9" },
  { label: "-", action: "-" },
  { label: "4", number: "4" },
  { label: "5", number: "5" },
  { label: "6", number: "6" },
  { label: "+", action: "+" },
  { label: "1", number: "1" },
  { label: "2", number: "2" },
  { label: "3", number: "3" },
  { label: "=", action: "=", css: "equal" },
  { label: "0", number: "0", css: "zero" },
  { label: ".", number: "." },
];

export function CalculatorToolSection() {
  const [currentInput, setCurrentInput] = useState("");

  const updateDisplay = useCallback((text: string) => {
    setCurrentInput(text);
  }, []);

  const addOperator = useCallback(
    (operator: string) => {
      if (!currentInput) return;
      const lastChar = currentInput.slice(-1);
      const expression = "+-*/".includes(lastChar) ? currentInput.slice(0, -1) : currentInput;
      updateDisplay(`${expression}${operator}`);
    },
    [currentInput, updateDisplay],
  );

  const calculateResult = useCallback(() => {
    if (!currentInput) return;
    let expression = currentInput;
    if ("+-*/".includes(expression.slice(-1))) {
      expression = expression.slice(0, -1);
    }
    try {
      const result = Function(`return (${expression})`)();
      updateDisplay(String(result));
    } catch {
      updateDisplay("Error");
      setTimeout(() => updateDisplay(""), 800);
    }
  }, [currentInput, updateDisplay]);

  const handleAction = useCallback(
    (action: string) => {
      switch (action) {
        case "clear":
          updateDisplay("");
          return;
        case "backspace":
          updateDisplay(currentInput.slice(0, -1));
          return;
        case "=":
          calculateResult();
          return;
        case "+":
        case "-":
        case "*":
        case "/":
          addOperator(action);
          return;
        default:
      }
    },
    [addOperator, calculateResult, currentInput, updateDisplay],
  );

  function handleButtonPress(button: CalcButton) {
    if ("number" in button) {
      if (button.number === "." && currentInput.split(/[+\-*/]/).slice(-1)[0].includes(".")) {
        return;
      }
      updateDisplay(currentInput + button.number);
    } else if ("action" in button) {
      handleAction(button.action);
    }
  }

  return (
    <section className="calculator-page">
      <div className="calculator-container">
        <h2>Simple Calculator</h2>
        <input id="display" readOnly value={currentInput || "0"} aria-live="polite" />
        <div className="buttons">
          {buttons.map((button, i) => (
            <button
              type="button"
              key={`${button.label}-${i}`}
              className={`btn ${button.css ?? ""}`}
              onClick={() => handleButtonPress(button)}
            >
              {button.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
