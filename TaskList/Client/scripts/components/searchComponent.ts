import Observable from "../abstracts/observable";

export default class SearchComponent extends Observable {
    private input: HTMLInputElement;
    private inputId = "Search";

    constructor() {
        super();
        this.input = document.getElementById(this.inputId) as HTMLInputElement;

        this.input.addEventListener('keyup', (e) => { this.onKeyUp(e); });
    };
    get InputValue() {
        return this.input.value;
    };
    onKeyUp(e: KeyboardEvent) {
        const code = e.keyCode;
        if (code >= 48 && code <= 90 || code === 8 || code === 13) {
            this.notify();
        }
    };
};