import ListAjaxService from "../services/listAjaxService";
import ListsComponent from "./listsComponent";
import IObserver from "../contracts/observer";
import Task from "../model/task";
import ActionComponent from "./actionComponent";
import ListOfTask from "../model/ListOfTask";
import TodoTaskComponent from "./tasksListComponent";
import TaskAjaxService from "../services/taskAjaxService";

export default class DeleteComponent implements IObserver {
    private deleteLink: HTMLLinkElement;
    private deleteLinkId = "DeleteLink";
    private deleteAlert: HTMLDivElement;
    private deleteAlertId = "DeleteConfirm";
    private deleteCancel: HTMLButtonElement;
    private deleteCancelId = "DeleteCancel";
    private deleteForm: HTMLFormElement;
    private deleteFormId = "DeleteForm";

    constructor(private listAjaxService: ListAjaxService,
        private taskAjaxService: TaskAjaxService,
        private actionComponent: ActionComponent) {

        this.deleteLink = document.getElementById(this.deleteLinkId) as HTMLLinkElement;
        this.deleteAlert = document.getElementById(this.deleteAlertId) as HTMLDivElement;
        this.deleteCancel = document.getElementById(this.deleteCancelId) as HTMLButtonElement;
        this.deleteForm = document.getElementById(this.deleteFormId) as HTMLFormElement;

        this.deleteLink.addEventListener('click', (e) => this.deleteOnClik(e), false);
        this.deleteCancel.addEventListener('click', (e) => this.cancelOnClick(e), false);
        this.deleteForm.addEventListener('submit', (e) => this.onSubmit(e), false);
    };

    deleteOnClik(e: Event): void {
        e.preventDefault();

        let id = this.actionComponent.ActivatedId;
        let idInput = document.getElementById('DeleteId') as HTMLInputElement;
        let nameDeleteObj = document.getElementById('DeleteObjName') as HTMLInputElement;

        nameDeleteObj.innerText = this.actionComponent.objName;
        idInput.value = id.toString();
        this.showDialog();
    };

    cancelOnClick(e: Event): void {
        this.hideDialog();
    };

    onSubmit(e: Event): void {
        e.preventDefault();

        const id = this.actionComponent.ActivatedId;

        if (this.actionComponent.IsTask) {
            this.taskAjaxService.delete(id)
                .then(() => { window.location.reload(); console.log('Task deleted.'); })
                .catch((e) => { console.log(e); });
        }
        else {
            this.listAjaxService.delete(id)
                .then(() => { window.location.reload(); console.log('List deleted.'); })
                .catch((e) => { console.log(e); });
        }
    };

    showDialog(): void {
        this.deleteAlert.classList.add('d-block');
    };

    hideDialog(): void {
        this.deleteAlert.classList.remove('d-block');
    };

    update(): void {
        this.hideDialog();
    };
};