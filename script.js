// Utility functions for DOM manipulation
const $ = e => document.querySelector(e);
const $$ = e => document.querySelectorAll(e);

// DOM elements
const calcButton = $(".calculate");
const dateInputs = $$("input[date]");
const timeInputs = $$("input[time]");
const labelInput = $("input[label]");
const perMin = $(".perMin");
const perHour = $(".perHour");
const perDay = $(".perDay");
const timeElapsed = $(".hours");
const firstMoney = $(".first");
const secondMoney = $(".second");
const results = $(".results");
const historyDisplay = $(".history");
const clearHistory = $(".clearHistory");
const copyDate = $(".copyDate");

// Variables for calculations
let tempOne, tempTwo, firstDate, secondDate, timeResult, moneyResult, time, dateOne, dateTwo;

// Event listener for the calculate button
calcButton.addEventListener("click", calculate);

// Event listeners for formatting time inputs
timeInputs.forEach(el => {
    el.addEventListener("input", formatTimeInput);
});

// Event listeners for formatting money inputs
[firstMoney, secondMoney].forEach(el => {
    el.addEventListener("blur", formatMoneyInput);
    el.addEventListener("focus", removeFormatting);
});

// Event listener for clearing history
clearHistory.addEventListener("click", clearLocalStorage);

// Load and display history if available
let savedHistory = JSON.parse(localStorage.getItem("historyV2")) || [];
updateHistory(savedHistory);

function calculate() {
    const parseValue = (input) => parseFloat(input.value.replace(/,/g, ''));
    const parseDateTime = (date, time) => new Date(`${date.value} ${time.value}`);
    const formatTime = (seconds) => new Date(seconds * 1000).toISOString().substr(11, 8);
    const tempOne = parseValue(firstMoney);
    const tempTwo = parseValue(secondMoney);
    const firstDate = parseDateTime(dateInputs[0], timeInputs[0]);
    const secondDate = parseDateTime(dateInputs[1], timeInputs[1]);
    const time = (secondDate - firstDate) / 60000;
    const timeResult = [(secondDate - firstDate) / 3600000, (secondDate - firstDate) / 60000, (secondDate - firstDate) / 1000];
    const totalSeconds = Math.floor(timeResult[2]);
    const formattedTime = formatTime(totalSeconds);
    const moneyResult = ((tempTwo - tempOne) / time).toFixed(0);
    perMin.innerText = `Per Minute: ${parseFloat(moneyResult).toLocaleString()}`;
    perHour.innerText = `Per Hour: ${parseFloat(moneyResult * 60).toLocaleString()}`;
    perDay.innerText = `Per Day: ${parseFloat(moneyResult * 1440).toLocaleString()}`;
    timeElapsed.innerText = `Time Elapsed: ${formattedTime}`;
    results.style.opacity = "1";
    const resultEntry = { label: labelInput.value || "[Blank]", result: parseFloat(moneyResult).toLocaleString() };
    savedHistory.push(resultEntry);
    localStorage.setItem("historyV2", JSON.stringify(savedHistory));
    updateHistory(savedHistory);
}

// Function to format time inputs
function formatTimeInput() {
    if (this.value.length === 2 || this.value.length === 5) {
        this.value = this.value + ":";
    }
}

// Function to format money inputs on blur
function formatMoneyInput() {
    if (this.value) {
        this.value = parseFloat(this.value).toLocaleString();
    }
}

// Function to remove formatting on focus
function removeFormatting() {
    if (this.value) {
        this.value = this.value.replace(/,/g, '');
    }
}

// Function to clear localStorage and reload the page
function clearLocalStorage() {
    localStorage.clear();
    savedHistory = [];
    updateHistory(savedHistory);
}

// Function to updateHistory history
function updateHistory(history) {
    historyDisplay.innerHTML = "";
    for (let i = 0; i < history.length; i++) {
        const entry = history[i];
        const entryElement = document.createElement("div");
        entryElement.innerHTML = `<h2>${entry.label}:</h2><h2>${entry.result}</h2>`;
        historyDisplay.appendChild(entryElement);
    }
}

copyDate.addEventListener("click", () => {
    if(dateInputs[1].value === "") {
        dateInputs[1].value = dateInputs[0].value;
    } else {
        dateInputs[0].value = dateInputs[1].value;
    }
})