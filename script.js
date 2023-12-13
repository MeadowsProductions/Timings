const $ = e => document.querySelector(e);
const $$ = e => document.querySelectorAll(e);

const history = JSON.parse(localStorage.getItem("history")) || [];
const calcButton = $(".calculate");
const dateInputs = $$("input[type=date]");
const timeInputs = $$("input[time]");
const perMin = $(".perMin");
const perHour = $(".perHour");
const perDay = $(".perDay");
const hours = $(".hours");
const firstMoney = $(".first");
const secondMoney = $(".second");
const results = $(".results");
const historyDisplay = $(".history");
const clearHistory = $(".clearHistory");

let min;
let day;
let firstDate;
let secondDate;
let timeResult;
let moneyResult;
let tempOne;
let tempTwo;

calcButton.addEventListener("click", () => {
    calculate();
})

function calculate() {
    tempOne = firstMoney.value.replace(/,/g, '');
    tempTwo = secondMoney.value.replace(/,/g, '');
    firstDate = new Date(dateInputs[0].value + " " + timeInputs[0].value);
    secondDate = new Date(dateInputs[1].value + " " + timeInputs[1].value);
    timeResult = (secondDate - firstDate) / 60000;
    moneyResult = ((tempTwo - tempOne) / timeResult).toFixed(0);
    perMin.innerText = "Per Minute: " + parseFloat(moneyResult).toLocaleString();
    perHour.innerText = "Per Hour: " + parseFloat(moneyResult * 60).toLocaleString();
    perDay.innerText = "Per Day: " + parseFloat(moneyResult * 1440).toLocaleString();
    hours.innerText = "Total Hours: " + (timeResult / 60).toFixed(0);
    results.style.opacity = "1";
    history.push(moneyResult);
    localStorage.setItem("history", JSON.stringify(history));
    update(history);
}

timeInputs.forEach(el => {
    el.addEventListener("input", () => {
        if(el.value.length === 2 || el.value.length === 5) {
            el.value = el.value + ":";
        }
    })
})

if(history) {
    update(history);
}

function update(history) {
    historyDisplay.innerHTML = "";
    for(i = 0; i < history.length; i++) {
        const temp = document.createElement("h1");
        temp.innerText = parseFloat(history[i]).toLocaleString();
        historyDisplay.appendChild(temp);
    }
}

[firstMoney, secondMoney].forEach(el => el.addEventListener("blur", () => {
    if(!el.value) {
        return false;
    }
    el.value = parseFloat(el.value).toLocaleString();
}));

[firstMoney, secondMoney].forEach(el => el.addEventListener("focus", () => {
    if(!el.value) {
        return false;
    }
    el.value = el.value.replace(/,/g, '');
}));

clearHistory.addEventListener("click", () => {
    localStorage.clear();
    window.location.reload();
})