import IObserver from "../contracts/observer";
import IObservable from "../contracts/observable";
import Observable from "../abstracts/observable";
import TodoTaskComponent from "./tasksListComponent";
import IUlListActivator from "../contracts/ulListActivator";
import UlListActivator from "../classes/UlListActivator";
import SearchComponent from "./searchComponent";
import ListAjaxService from "../services/listAjaxService";
import ListOfTask from "../model/ListOfTask";
import { Promise } from 'es6-promise';

export default class ListsComponent extends Observable implements IObserver {
    private ulList: HTMLUListElement;
    private ulListId = "Lists";
    private liElements: HTMLCollection;
    private activeClass = "active-list";
    private ulActivator: IUlListActivator;

    constructor(private listAjaxService: ListAjaxService,
                private searchComponent: SearchComponent) {

        super();
        this.ulList = document.getElementById(this.ulListId) as HTMLUListElement;
    };

    private addLiElementsToOnClickEvent(liElements: HTMLCollection): void {
        let i=0,
            length = this.liElements.length;

        for (i; i < length; i += 1) {
            this.liElements[i].addEventListener('click', (e) => this.onClick(e), false);
        }
    };

    private onClick(e: Event): void {
        let currentLi = this.ulActivator.getActiveLiElement();
        let liElem = e.target as HTMLLIElement;
        
        if (currentLi !== undefined)
            this.ulActivator.deactiveLiElement(currentLi);
        this.ulActivator.activeLiElement(liElem);

        this.notify();
    };

    generate(): Promise<{}> {
        return new Promise((resolve, reject) => {
            const searchText = this.searchComponent.InputValue;
            let ajax: JQuery.jqXHR<any>;

            if (searchText === '') ajax = this.listAjaxService.getAll();
            else ajax = this.listAjaxService.getAllContains(searchText);

            ajax.then((lists: ListOfTask[]) => {
                const length = lists.length;
                
                if (length !== 0) {

                    let liElem: HTMLLIElement,
                        i = 0,
                        docFrag = new DocumentFragment();

                    for (i; i < length; i += 1) {
                        liElem = document.createElement('li');
                        liElem.classList.add('list-group-item');
                        liElem.dataset.id = lists[i].Id + '';
                        liElem.innerText = lists[i].Name;

                        docFrag.appendChild(liElem);
                    }
                    this.ulList.innerHTML = '';
                    this.ulList.appendChild(docFrag);

                    this.liElements = this.ulList.children;
                    this.ulActivator = new UlListActivator(this.activeClass, this.liElements);
                    // always if generate set active first list elem
                    // To Do: save active elem id in session storage and check condiosion
                    this.liElements[0].classList.add(this.activeClass);
                    this.initLiElem();
                    resolve();
                }
                else {
                    resolve();
                }
            }).catch((e: any) => {
                console.log(e);
            });
        });
    };

    initLiElem(): void {
        this.addLiElementsToOnClickEvent(this.liElements); 
    };

    getIdActivedLi(): number {
        this.ulActivator = new UlListActivator(this.activeClass, this.ulList.children);
        const liElem = this.ulActivator.getActiveLiElement();
        if (liElem === undefined) return -1;
        return parseInt(liElem.dataset.id);
    };

    update(): void {
        this.generate().then(() => { this.notify(); });
    };
};