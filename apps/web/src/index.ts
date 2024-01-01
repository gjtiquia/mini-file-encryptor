import { Counter } from "core";

let _counter: Counter;
let _countTextElement: HTMLParagraphElement;

enum ElementID {
    IncrementButton = "IncrementButton",
    DecrementButton = "DecrementButton",
    CountText = "CountText"
}

function initialize() {
    _counter = new Counter();
    _countTextElement = document.getElementById(ElementID.CountText) as HTMLParagraphElement;

    _counter.addOnValueChangedListener(onValueChanged);
    document.getElementById(ElementID.IncrementButton)?.addEventListener("click", onIncrementClicked);
    document.getElementById(ElementID.DecrementButton)?.addEventListener("click", onDecrementClicked);
}

function onIncrementClicked() {
    _counter.increment();
}

function onDecrementClicked() {
    _counter.decrement();
}

function onValueChanged(newValue: number) {
    _countTextElement.textContent = `Count: ${newValue}`
}

initialize();