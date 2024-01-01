type OnValueChangedCallback = (x: number) => void;

export class Counter {
    private get _value(): number { return this.m_value }
    private set _value(value: number) {
        this.m_value = value;
        this._onValueChangedCallbacks.forEach(x => x(this.m_value));
    }
    private m_value: number = 0;

    private _onValueChangedCallbacks: OnValueChangedCallback[] = [];

    public get value(): number { return this._value };

    public increment(): void {
        this._value++;
    }

    public decrement(): void {
        this._value--;
    }

    public addOnValueChangedListener(callback: OnValueChangedCallback): void {
        this._onValueChangedCallbacks.push(callback);
    }

    public removeOnValueChangedListener(callback: OnValueChangedCallback): void {
        this._onValueChangedCallbacks = this._onValueChangedCallbacks.filter(x => x !== callback);
    }
}