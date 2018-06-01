export default interface IUlListActivator {
    activeLiElement(liElement: HTMLLIElement): void;
    deactiveLiElement(liElement: HTMLLIElement): void;
    getActiveLiElement(): HTMLLIElement;
};