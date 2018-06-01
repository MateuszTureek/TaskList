import IObserver from "../contracts/observer";
import ListsComponent from "./listsComponent";
import IUlListActivator from "../contracts/ulListActivator";
import UlListActivator from "../classes/UlListActivator";
import TaskAjaxService from "../services/taskAjaxService";
import { Promise } from "es6-promise";
import Task from "../model/task";
import Observable from "../abstracts/observable";

export default class TasksListComponent extends Observable implements IObserver{
    private ulList: HTMLUListElement;
    private ulListId = "TodoListOfTasks";
    private liElements: HTMLCollection;
    private ulActivator: IUlListActivator;
    private activeClass = "active-task";
    private processId: number = undefined;

    constructor(private taskAjaxService: TaskAjaxService,
        private listsComponent: ListsComponent) {

        super();
        this.ulList = document.getElementById(this.ulListId) as HTMLUListElement;
    };

    generate(): Promise<{}> {
        return new Promise((resolve, reject) => {
            const listId = this.listsComponent.getIdActivedLi();
            
            this.taskAjaxService.getAllToDoByListId(listId).then((tasks) => {
                if (tasks.length === 0) {
                    let infoElem: HTMLElement;

                    infoElem = document.createElement('h3');
                    infoElem.classList.add('text-center');
                    infoElem.classList.add('mt-4');
                    infoElem.classList.add('mb-4');
                    infoElem.innerText = 'Not any tasks to do.';
                    this.ulList.innerHTML = '';
                    this.ulList.appendChild(infoElem);

                    resolve();
                    return;
                }

                let i = 0,
                    length = tasks.length,
                    liElem: HTMLLIElement,
                    div1: HTMLDivElement, div2: HTMLDivElement, div3: HTMLDivElement,
                    input: HTMLInputElement, span1: HTMLSpanElement, span2: HTMLSpanElement,
                    docFrag = document.createDocumentFragment();

                for (i; i < length; i += 1) {
                    liElem = document.createElement('li');
                    liElem.classList.add("list-group-item", "d-flex", "justify-content-between");
                    liElem.dataset.id = tasks[i].Id + '';

                    div1 = document.createElement('div');
                    div1.classList.add("li-content-wrapper");

                    div2 = document.createElement('div');
                    div2.classList.add("justify-content-between", "align-items-center");

                    div3 = document.createElement('div');
                    div3.classList.add("mt-1", "task-to-do");
                    div3.innerText = "TO DO";

                    input = document.createElement('input');
                    input.setAttribute('type', 'checkbox');

                    span1 = document.createElement('span');
                    span1.classList.add("added-time");
                    span1.innerText = this.getAddedTime(tasks[i].Created);

                    span2 = document.createElement('span');
                    span2.classList.add("task-name");
                    span2.innerText = tasks[i].Name;

                    div2.appendChild(input);
                    div2.appendChild(span2);

                    div1.appendChild(div2);
                    div1.appendChild(div3);

                    liElem.appendChild(div1);
                    liElem.appendChild(span1);

                    docFrag.appendChild(liElem);
                }
                this.ulList.innerHTML = '';
                this.ulList.appendChild(docFrag);
                // To Do: li elements get from docFrag
                this.liElements = this.ulList.children;

                if (this.liElements !== undefined) {
                    this.ulActivator = new UlListActivator(this.activeClass, this.liElements);
                    this.initEventForLiElements();
                    this.renderAddedTime();
                }

                resolve();
            }).catch((e) => { console.log(e); });
        });
    };

    initEventForLiElements(): void {
        let i = 0, length = this.liElements.length;
        for (i; i < length; i += 1) {
            this.liElements[i].addEventListener('change', (e) => this.onCheck(e));
        }
    };

    onCheck(e: Event): void {
        let checkbox = e.target as HTMLInputElement;
        let liElem = checkbox.closest('li') as HTMLLIElement;
        let currentLi = this.ulActivator.getActiveLiElement();
        
        if (currentLi !== undefined) {
            if (currentLi === liElem) {
                this.ulActivator.deactiveLiElement(currentLi);
            }
            else {
                this.ulActivator.deactiveLiElement(currentLi);
                currentLi.getElementsByTagName('input')[0].checked = false;
                this.ulActivator.activeLiElement(liElem);
            }
        }
        else {
            this.ulActivator.activeLiElement(liElem);
        }

        this.notify();
    };

    getIdActiveLi(): number {
        if (this.liElements === undefined) { return -1; }

        this.ulActivator = new UlListActivator(this.activeClass, this.liElements);
        const liElem = this.ulActivator.getActiveLiElement();
        
        if (liElem === undefined) return -1;
        return parseInt(liElem.dataset.id);
    };

    renderAddedTime() {
        this.processId = setInterval(() => {
            const listId = this.listsComponent.getIdActivedLi();

            this.taskAjaxService.getAllToDoByListId(listId).then((tasks: Task[]) => {
                let i = 0, length = tasks.length,
                    timeSpans = document.querySelectorAll('.added-time');
                for (i; i < length; i += 1) {
                    let span = timeSpans[i] as HTMLSpanElement;
                    span.innerText = this.getAddedTime(tasks[i].Created);
                }
            });
        }, 1000);
    };

    getAddedTime(createDate): string {
        let today = new Date().getTime();
        let sub = today - createDate;
        const decimalPlaces = 0;
        const days = sub / 86400000;

        if (days < 1) {
            const godz = sub / 3600000;
            if (godz < 1) {
                const minutes = sub / 60000;
                return minutes.toFixed(decimalPlaces) + ' minutes ago';
            }
            return godz.toFixed(decimalPlaces) + ' hours ago';
        }
        return days.toFixed(decimalPlaces) + ' days ago';
    };

    update(): void {
        if (this.processId !== undefined) {
            clearInterval(this.processId);
        }
        this.generate();
    };
};