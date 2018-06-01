import TaskAjaxService from "../services/taskAjaxService";
import ListsComponent from "./listsComponent";
import IObserver from "../contracts/observer";

export default class AddTaskComponent implements IObserver {
    private addTaskForm: HTMLFormElement;
    private addTaskFormId = "AddTaskForm";
    private listIdInput: HTMLInputElement;
    private listIdInputId = "AddTaskId";

    constructor(private taskAjaxService: TaskAjaxService,
                private listsComponent: ListsComponent) {
        this.addTaskForm = document.getElementById(this.addTaskFormId) as HTMLFormElement;
        this.listIdInput = document.getElementById(this.listIdInputId) as HTMLInputElement;

        this.addTaskForm.addEventListener('submit', (e) => this.onSubmit(e));
    };

    setFormListId(): void {
        const listId = this.listsComponent.getIdActivedLi();

        this.listIdInput.value = listId.toString();
    };

    onSubmit(e: Event): void {
        e.preventDefault();
        const formData = $(this.addTaskForm).serialize();

        this.taskAjaxService.add(formData).then(() => {
            window.location.reload();
            console.log('Task added.');
        }).catch((e) => { console.log(e); });
    };

    update(): void {
        this.setFormListId();
    };
};