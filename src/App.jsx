import { useState } from "react";
import "./App.css";

function App() {
  const Screeen = ["formula", "display"];
  const ButtonsIds = {
    clear: "AC",
    deleteLeft: <i className="fa-solid fa-delete-left"></i>,
    divide: "/",
    seven: "7",
    eight: "8",
    nine: "9",
    subtract: "-",
    four: "4",
    five: "5",
    six: "6",
    add: "+",
    one: "1",
    two: "2",
    three: "3",
    multiply: "*",
    zero: "0",
    decimal: ".",
    equals: "=",
  };
  const [isNegative, setIsNegative] = useState(false);

  function HandleClicks(id) {
    const formula = document.getElementById("formula");
    const display = document.getElementById("display");
    const lastCharIsOperator = ["+", "-", "*", "/"].includes(
      formula.textContent.slice(-1)
    );
    const lastTwoCharOperator = ["*-", "/-"].includes(
      formula.textContent.slice(-2)
    );

    function ClearDisplay() {
      formula.textContent = 0;
      display.textContent = 0;
      setIsNegative(false);
    }
    function BackSpace() {
      if (display.textContent.length == 1 && display.textContent != 0) {
        display.textContent = 0;
      } else if (display.textContent.length >= 1 && display.textContent != 0) {
        display.textContent = display.textContent.slice(0, -1);
      }
    }
    function GetNumbers() {
      if (display.textContent.startsWith("0")) {
        display.textContent = display.textContent.substring(1);
        display.textContent += ButtonsIds[id];
      } else {
        display.textContent += ButtonsIds[id];
      }
      setIsNegative(false);
    }
    function Operation(Op) {
      calculate(Op);
    }
    function calculate(Op) {
      //hanfle muslti numbers
      if (
        !lastCharIsOperator &&
        display.textContent != "" &&
        formula.textContent != ""
      ) {
        formula.textContent = display.textContent;
        display.textContent = "";
      }
      //continue the formula
      if (display.textContent != "") {
        formula.textContent += display.textContent + `${ButtonsIds[Op]}`;
        display.textContent = "";
      }
      //change the last sign or continue the formula
      if (lastCharIsOperator) {
        if (
          (formula.textContent.endsWith("*") ||
            formula.textContent.endsWith("/")) &&
          Op == "subtract"
        ) {
          formula.textContent += "-";
        }
        formula.textContent =
          formula.textContent.slice(0, -1) + `${ButtonsIds[Op]}`;
      } else {
        formula.textContent += display.textContent + `${ButtonsIds[Op]}`;
        display.textContent = "";
        console.log("hi");
        //bruuuuuuh
      }

      if (lastTwoCharOperator) {
        formula.textContent =
          formula.textContent.slice(0, -2) + `${ButtonsIds[Op]}`;
      }

      if (formula.textContent.startsWith("0")) {
        formula.textContent = `${ButtonsIds[Op]}`;
      }
      if (
        (formula.textContent.endsWith("*") ||
          formula.textContent.endsWith("/")) &&
        display.textContent != ""
      ) {
        formula.textContent += "M";
      }

      if (
        Op == "subtract" &&
        isNegative &&
        !formula.textContent.endsWith(" -")
      ) {
        formula.textContent = `${formula.textContent} -`;
      }
      //remove the number- - from formula to add another opration
      if (
        formula.textContent.endsWith(`- ${ButtonsIds[id]}`) &&
        Op != "subtract"
      ) {
        formula.textContent = formula.textContent.slice(0, -3) + ButtonsIds[id];
      }
    }

    function Negative() {
      if (isNegative) {
        setIsNegative(false);
        return;
      }
      setIsNegative(true);
    }

    function GetResult() {
      try {
        if (lastCharIsOperator && display.textContent == "") {
          formula.textContent = formula.textContent.slice(0, -1);
          display.textContent = eval(formula.textContent);
        } else if (lastCharIsOperator) {
          display.textContent = eval(
            (formula.textContent += display.textContent)
          );
        }
      } catch (error) {}
    }
    switch (id) {
      case "clear":
        ClearDisplay();
        break;
      case "deleteLeft":
        BackSpace();
        break;
      case "decimal":
        if (!display.textContent.includes(".")) display.textContent += ".";
        break;
      case "divide":
        Operation("divide");
        break;
      case "subtract":
        Negative();
        Operation("subtract");
        break;
      case "add":
        Operation("add");
        break;
      case "multiply":
        Operation("multiply");
        break;
      case "equals":
        GetResult();
        break;
      default:
        GetNumbers();
        break;
    }
  }

  const ButtonsIdsKey = Object.keys(ButtonsIds);
  return (
    <div id="container">
      {Screeen.map((elem) => (
        <div id={elem} key={elem} className="screen">
          0
        </div>
      ))}
      <div className="ButtonsDiv">
        {ButtonsIdsKey.map((key) => (
          <button
            id={key}
            key={key}
            className="btn"
            onClick={() => HandleClicks(key)}
          >
            {ButtonsIds[key]}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
