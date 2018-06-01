import ListsComponent from "./listsComponent";
import IObserver from "../contracts/observer";
import TasksListComponent from "./tasksListComponent";
import ListOfTask from "../model/ListOfTask";
import Task from "../model/task";
import ListAjaxService from "../services/listAjaxService";
import TaskAjaxService from "../services/taskAjaxService";
import { Promise } from "es6-promise";
import Observable from "../abstracts/observable";

export default class ActionComponent extends Observable implements IObserver {
    private title: HTMLElement;
    private titleClass = "action-title";
    private isTask = false;
    private activatedTaskOrListId: number;
    private editLink: HTMLLinkElement;
    private deleteLink: HTMLLinkElement;
    objName: string;


    constructor(private listAjaxService: ListAjaxService,
        private taskAjaxService: TaskAjaxService,
        private listsComponent: ListsComponent,
        private tasksListComponent: TasksListComponent) {

        super();

        this.title = document.querySelector('.' + this.titleClass);
        this.activatedTaskOrListId = this.listsComponent.getIdActivedLi();
        this.deleteLink = document.getElementById('DeleteLink') as HTMLLinkElement;
        this.editLink = document.getElementById('EditLink') as HTMLLinkElement;
    };

    get ActivatedId() {
        return this.activatedTaskOrListId;
    };

    get IsTask() {
        return this.isTask;
    };

    setListName(listId) {
        this.listAjaxService.getById(listId).then((list: ListOfTask) => {
            this.title.innerText = list.Name;
            this.objName = list.Name;
            this.deleteLink.getElementsByTagName('a')[0].innerText = 'Delete list ...';
            this.editLink.getElementsByTagName('a')[0].innerText = 'Edit list ...';
        }).catch((e) => { console.log('Error: get list by id.'); console.log(e); });
    };

    setTaskName(taskId) {
        this.taskAjaxService.getById(taskId).then((task: Task) => {
            this.title.innerText = task.Name;
            this.objName = task.Name;
            this.deleteLink.getElementsByTagName('a')[0].innerText = 'Delete task ...';
            this.editLink.getElementsByTagName('a')[0].innerText = 'Edit task ...';
        }).catch((e) => { console.log('Error: get task by id.'); console.log(e); });
    };
    
    generateTitle() {
        let actTaskId = this.tasksListComponent.getIdActiveLi();

        if (actTaskId !== -1 && actTaskId !== undefined) {
            this.setTaskName(actTaskId);
        }
        else {
            let actListId = this.listsComponent.getIdActivedLi();
            if (actListId != -1) {
                this.setListName(actListId);
            }
        }
        this.notify();
    };

    isTaskActive() {        
        let id = this.tasksListComponent.getIdActiveLi();

        if (id === -1) {
            this.activatedTaskOrListId = this.listsComponent.getIdActivedLi();
            this.isTask = false;
        }
        else {
            this.isTask = true;
            this.activatedTaskOrListId = id;
        }
    };

    update(): void {
        this.generateTitle();
        this.isTaskActive();
    };
};