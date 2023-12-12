const $ = e => document.querySelector(e);
const $$ = e => document.querySelectorAll(e);

const history = JSON.parse(localStorage.getItem("history")) || [];
const calcButton = $(".calculate");
const dateInputs = $$("input[type=date]");
const timeInputs = $$("input[type=text]");
const perMin = $(".perMin");
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
let tempMoneyVar;

calcButton.addEventListener("click", () => {
    calculate();
})

function calculate() {
    firstDate = new Date(dateInputs[0].value + " " + timeInputs[0].value);
    secondDate = new Date(dateInputs[1].value + " " + timeInputs[1].value);
    timeResult = (secondDate - firstDate) / 60000;
    tempMoneyVar = ((secondMoney.value - firstMoney.value) / timeResult).toFixed(0);
    perMin.innerText = "Per Minute: " + parseFloat(tempMoneyVar).toLocaleString();
    perDay.innerText = "Per Day: " + parseFloat(tempMoneyVar * 1440).toLocaleString();
    hours.innerText = "Total Hours: " + (timeResult / 60).toFixed(0);
    results.style.opacity = "1";
    history.push(tempMoneyVar);
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

clearHistory.addEventListener("click", () => {
    localStorage.clear();
    window.location.reload();
})