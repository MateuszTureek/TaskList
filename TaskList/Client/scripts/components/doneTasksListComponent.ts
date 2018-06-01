import IUlListActivator from "../contracts/ulListActivator";
import TaskAjaxService from "../services/taskAjaxService";
import { Promise } from "es6-promise";
import UlListActivator from "../classes/UlListActivator";
import Task from "../model/task";
import ListsComponent from "./listsComponent";
import IObserver from "../contracts/observer";

export default class DoneTasksListComponent implements IObserver {
    private ulList: HTMLUListElement;
    private ulListId = "DoneListOfTasks";
    private liElements: HTMLCollection;

    constructor(private taskAjaxService: TaskAjaxService,
        private listsComponent: ListsComponent) {

        this.ulList = document.getElementById(this.ulListId) as HTMLUListElement;
    };

    generate(): Promise<{}> {
        return new Promise((resolve, reject) => {
            const listId = this.listsComponent.getIdActivedLi();
            this.taskAjaxService.getAllToDoByListId(listId, 'done').then((tasks) => {
                if (tasks.length === 0) {
                    let infoElem: HTMLElement;

                    infoElem = document.createElement('h3');
                    infoElem.classList.add('text-center');
                    infoElem.classList.add('mt-4');
                    infoElem.classList.add('mb-4');
                    infoElem.innerText = 'Lack of completed tasks.';
                    this.ulList.innerHTML = '';
                    this.ulList.appendChild(infoElem);

                    resolve();
                    return;
                }

                let i = 0,
                    length = tasks.length,
                    liElem: HTMLLIElement,
                    div1: HTMLDivElement, div2: HTMLDivElement, div3: HTMLDivElement,
                    span2: HTMLSpanElement,
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
                    div3.classList.add("mt-1", "task-done");
                    div3.innerText = "Done";

                    span2 = document.createElement('span');
                    span2.classList.add("task-name");
                    span2.innerText = tasks[i].Name;

                    div2.appendChild(span2);

                    div1.appendChild(div2);

                    liElem.appendChild(div1);
                    liElem.appendChild(div3);

                    docFrag.appendChild(liElem);
                }
                this.ulList.innerHTML = '';
                this.ulList.appendChild(docFrag);
                // To Do: li elements get from docFrag
                this.liElements = this.ulList.children;
                resolve();
            }).catch((e) => { console.log(e); });
        });
    };

    update(): void {
        this.generate();
    };
};