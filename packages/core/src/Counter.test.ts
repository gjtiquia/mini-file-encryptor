import { Counter } from "./Counter";

describe("Counter Tests", () => {
    let _counter = new Counter();

    beforeEach(() => {
        _counter = new Counter();
    })

    it("should start with a count of 0", () => {
        expect(_counter.value).toBe(0);
    })

    it("should have value 1 after increment", () => {
        _counter.increment();
        expect(_counter.value).toBe(1);
    })

    it("should have value -1 after decrement", () => {
        _counter.decrement();
        expect(_counter.value).toBe(-1);
    })

    it("should subscribe to counter value changes", () => {
        let externalCount = 0;

        const onValueChanged = (x: number) => externalCount = x;
        _counter.addOnValueChangedListener(onValueChanged);

        _counter.increment();
        expect(externalCount).toBe(1);

        _counter.decrement();
        expect(externalCount).toBe(0);
    })

    it("should unsubscribe to counter value changes successfully", () => {
        let externalCount = 0;

        const onValueChanged = (x: number) => externalCount = x;
        _counter.addOnValueChangedListener(onValueChanged);

        _counter.increment();
        expect(externalCount).toBe(1);

        _counter.removeOnValueChangedListener(onValueChanged);

        _counter.decrement();
        expect(externalCount).toBe(1); // Remain unchanged
    })
})