import IUlListActivator from "../contracts/ulListActivator";

export default class UlListActivator implements IUlListActivator {
    constructor(private activeClass: string,
        private liElements: HTMLCollection) { };

    activeLiElement(liElement: HTMLLIElement): void {
        liElement.classList.add(this.activeClass);
    };

    deactiveLiElement(liElement: HTMLLIElement): void {
        liElement.classList.remove(this.activeClass);
    };

    getActiveLiElement(): HTMLLIElement | undefined {
        let i = 0,
            length = this.liElements.length;

        if (length !== 0) {
            for (i; i < length; i += 1) {
                if (this.liElements[i].classList.contains(this.activeClass)) {
                    return this.liElements[i] as HTMLLIElement;
                }
            }
        }
        return undefined;
    };
};