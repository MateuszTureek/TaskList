import IObserver from "./observer";

export default interface IObservable {
    add(observer: IObserver): void;
    remove(observer: IObserver): void;
    notify();
};