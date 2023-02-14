// mode toggle
const changeMode = () => {
  document.body.classList.toggle("dark");
};

// history dialog toggle
window.addEventListener("click", (e) => {
  if (e.target.classList.contains("backgroundEffect")) {
    document.body.classList.remove("open");
  }
});

const openDailog = () => {
  document.body.classList.add("open");
};

// calculater handler
const input = document.querySelector(".calculator .input");
const output = document.querySelector(".calculator .output");

let currentInput = "";
let result = "";
const operators = ["/", "+", "-", "×"];
const createHTMLForInput = () => {
  let html = "";
  let currentText = "";
  currentInput.split("").forEach((char) => {
    if (char === "/" || char === "+" || char === "-" || char === "×") {
      html += `<span class='text'>${currentText}</span><span class='operator'>${char}</span>`;
      currentText = "";
    } else {
      currentText += char;
    }
  });
  if (currentText !== "") {
    html += `<span class='text'>${currentText}</span>`;
  }
  return html;
};

const createHTMLForOutput = () => {
  try {
    if (currentInput) {
      result = String(eval(currentInput.replace("×", "*")));
      return `=${result}`;
    } else return "";
  } catch (e) {
    if (currentInput) {
      result = String(
        eval(
          currentInput.substring(0, currentInput.length - 1).replace("×", "*")
        )
      );
      return `=${result}`;
    } else return "";
  }
};

const execute = (target, value) => {
  switch (target.name) {
    case "val":
      currentInput += value;
      break;
    case "op":
      let char = currentInput.charAt(currentInput.length - 1);
      if (currentInput === "") {
        break;
      } else if (char === "/" || char === "+" || char === "-" || char === "×") {
        currentInput =
          currentInput.substring(0, currentInput.length - 1) + value;
        break;
      } else {
        currentInput += value;
        break;
      }
    case "clear":
      currentInput = "";
      break;
    case "equal":
      updateHistory();
      currentInput = result;
      result = "";
      break;
    case "del":
      currentInput = currentInput.substring(0, currentInput.length - 1);
      break;
    default:
      alert("Something went wrong");
      break;
  }

  input.innerHTML = createHTMLForInput();
  output.innerHTML = createHTMLForOutput();
  input.scrollLeft = input.scrollWidth;
};

// history handler
let historyDailog = document.querySelector(".historyDailog");

const updateHistory = () => {
  html = `<div class="info">
    <p class="input">
    ${createHTMLForInput()}
    </p>
    <p class="output">${createHTMLForOutput()}</p>
  </div>`;
  historyDailog.innerHTML += html;
  localStorageUpdater();
};

// local storage handler
const localStorageUpdater = () => {
  localStorage.setItem("history", historyDailog.innerHTML);
};

const localStorageLoader = () => {
  if (localStorage.getItem("history")) {
    historyDailog.innerHTML = localStorage.getItem("history");
  }
};
localStorageLoader();
