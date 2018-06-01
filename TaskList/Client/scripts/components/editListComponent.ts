import ListOfTask from "../model/ListOfTask";
import ListAjaxService from "../services/listAjaxService";
import ListsComponent from "./listsComponent";
import IObserver from "../contracts/observer";
import Task from "../model/task";
import ActionComponent from "./actionComponent";

export default class EditListComponent implements IObserver {
    private editLink: HTMLLinkElement;
    private editLinkId = "EditLink";
    private editFrom: HTMLFormElement;
    private editCancel: HTMLButtonElement;
    private editListFormId = "EditListForm";
    private editListCancelId = "ListEditCancel";

    constructor(private listAjaxService: ListAjaxService,
                private listsComponent: ListsComponent,
                private actionComponent: ActionComponent) {

        this.editLink = document.getElementById(this.editLinkId) as HTMLLinkElement;
        this.editFrom = document.getElementById(this.editListFormId) as HTMLFormElement;
        this.editCancel = document.getElementById(this.editListCancelId) as HTMLButtonElement;

        this.editLink.addEventListener('click', (e) => this.editOnClick(e),false);
        this.editCancel.addEventListener('click', (e) => this.cancelOnClick(e),false);
        this.editFrom.addEventListener('submit', (e) => this.onSubmit(e),false);
    };
    editOnClick(e: Event): void {
        e.preventDefault();

        if (this.actionComponent.IsTask) return;

        const listId = this.listsComponent.getIdActivedLi();

        this.listAjaxService.getById(listId)
            .then((task: Task) => {
                const listIdInput = document.getElementById('EditListId') as HTMLInputElement;
                const listNameImput = document.getElementById('EditListName') as HTMLInputElement;

                listIdInput.value = task.Id.toString();
                listNameImput.value = task.Name;

                this.showForm();
            })
            .catch((e) => { console.log(e); });
    };

    cancelOnClick(e: Event): void {
        this.hideForm();
    };

    onSubmit(e: Event): void {
        e.preventDefault();
        e.stopPropagation();

        const formData = $(this.editFrom).serialize();

        this.listAjaxService.edit(formData)
            .then(() => { window.location.reload(); console.log('list edit done'); })
            .catch((e) => { console.log(e); });
    };

    showForm(): void {
        this.editFrom.classList.add('d-inline-block');
    };

    hideForm(): void {
        this.editFrom.classList.remove('d-inline-block');
    };

    update(): void {
        this.hideForm();
    };
};