import ListAjaxService from "../services/listAjaxService";

export default class AddListComponent {
    private addListForm: HTMLFormElement;
    private addListFormId = "AddListForm";
    private listNameInput: HTMLInputElement;
    private listNameInputId = "ListName";

    constructor(private listAjaxService: ListAjaxService) {
        this.addListForm = document.getElementById(this.addListFormId) as HTMLFormElement;
        this.listNameInput = document.getElementById(this.listNameInputId) as HTMLInputElement;

        this.addListForm.addEventListener('submit', (e) => this.onSubmit(e));
    };

    onSubmit(e: Event): void {
        e.preventDefault();

        if (!this.addListForm.checkValidity()) return;

        const listName = this.listNameInput.value;

        this.listAjaxService.add(listName).then(() => {
            window.location.reload();
            console.log('List added.');
        }).catch((e) => { console.log(e); });
    };
};