import IObserver from "../contracts/observer";
import ListAjaxService from "../services/listAjaxService";
import ListsComponent from "./listsComponent";
import ActionComponent from "./actionComponent";
import Task from "../model/task";
import TaskAjaxService from "../services/taskAjaxService";
import DateConverter from "../classes/date";
import TodoTaskComponent from "./tasksListComponent";

export default class EditTaskComponent implements IObserver {
    private editLink: HTMLLinkElement;
    private editLinkId = "EditLink";
    private editFrom: HTMLFormElement;
    private editCancel: HTMLButtonElement;
    private editListFormId = "EditTaskForm";
    private editListCancelId = "EditTaskCancel";
    private dateConverter: DateConverter;

    constructor(private taskAjaxService: TaskAjaxService,
                private taskComponent: TodoTaskComponent,
                private actionComponent: ActionComponent) {

        this.editLink = document.getElementById(this.editLinkId) as HTMLLinkElement;
        this.editFrom = document.getElementById(this.editListFormId) as HTMLFormElement;
        this.editCancel = document.getElementById(this.editListCancelId) as HTMLButtonElement;
        this.dateConverter = new DateConverter();

        this.editLink.addEventListener('click', (e) => this.editOnClick(e), false);
        this.editCancel.addEventListener('click', (e) => this.cancelOnClick(e), false);
        this.editFrom.addEventListener('submit', (e) => this.onSubmit(e), false);
    };

    editOnClick(e: Event): void {
        e.preventDefault();

        if (!this.actionComponent.IsTask) return;

        const taskId = this.taskComponent.getIdActiveLi();

        this.taskAjaxService.getById(taskId) 
            .then((byIdTaskDTO) => {

                let totalMiliseconds = byIdTaskDTO.EndMiliseconds;
                let date = new Date(totalMiliseconds); //total miliseconds to date and time
                
                const taskIdInput = document.getElementById('EditTaskId') as HTMLInputElement;
                const taskNameImput = document.getElementById('EditTaskName') as HTMLInputElement;
                const taskEndDateInput = document.getElementById('EditEndDate') as HTMLInputElement;

                taskIdInput.value = byIdTaskDTO.Id.toString();
                taskNameImput.value = byIdTaskDTO.Name;
                taskEndDateInput.value = this.dateConverter.getFullDateToString(date);

                this.showForm();
            })
            .catch((e) => { console.log(e); });
    };

    cancelOnClick(e: Event): void {
        this.hideForm();
    };

    onSubmit(e: Event): void {
        e.preventDefault();

        const formData = $(this.editFrom).serialize();

        this.taskAjaxService.edit(formData)
            .then(() => { window.location.reload(); console.log('task edit done'); })
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