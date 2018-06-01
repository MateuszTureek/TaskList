import IObserver from "../contracts/observer";
import ListsComponent from "./listsComponent";
import { days, months } from "../classes/date";
import ListAjaxService from "../services/listAjaxService";
import ListOfTask from "../model/ListOfTask";
import { Promise } from 'es6-promise';

export default class TaskHeaderComponent implements IObserver {
    private title: HTMLElement;
    private date: HTMLParagraphElement;
    private titleClass = "header-title";
    private dateClass = "header-current-date";

    constructor(private listAjaxService: ListAjaxService,
                private listsComponent: ListsComponent) {

        this.title = document.querySelector('.' + this.titleClass);
        this.date = document.querySelector('.' + this.dateClass);
    };

    generate(): void {
        this.generateTitle();
        this.generateDate();
    };

    generateTitle() {
        const id = this.listsComponent.getIdActivedLi();

        this.listAjaxService.getById(id).then((list: ListOfTask) => {
            this.title.innerText = list.Name;
        }).catch((e) => { console.log(e); });
    };

    generateDate() {
        const now = new Date(),
              day = now.getDay(),
              month = now.getMonth();
        let dateText: string = '';

        dateText += days[day] + ', ';
        dateText += months[month] + ' ';
        dateText += now.getDate();

        this.date.innerText = dateText;
    };

    update(): void {
        this.generate();
    };
};