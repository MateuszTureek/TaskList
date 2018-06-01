import TaskAjaxService from "../services/taskAjaxService";
import IObserver from "../contracts/observer";
import TodoTaskComponent from "./tasksListComponent";

export default class DoneTaskComponent implements IObserver {
    private form: HTMLFormElement;
    private formId = 'DoneForm';
    private doneIdInput: HTMLInputElement;
    private doneIdInputId = 'DoneId';
    private disabledClass = 'disabled';
    private submitButton: HTMLButtonElement;

    constructor(private taskAjaxService: TaskAjaxService,
        private taskComponent: TodoTaskComponent) {

        this.doneIdInput = document.getElementById(this.doneIdInputId) as HTMLInputElement;
        this.form = document.getElementById(this.formId) as HTMLFormElement;
        this.submitButton = this.form.getElementsByTagName('button')[0];

        this.form.addEventListener('submit', (e) => this.onSubmit(e));
    };

    onSubmit(e: Event) {
        e.preventDefault();
        if (this.submitButton.classList.contains(this.disabledClass)) return;

        const id = parseInt(this.doneIdInput.value);

        this.taskAjaxService.isDone(id).then(() => {
            window.location.reload();
            console.log('task is done');
        }).catch((e) => { console.log(e); });
    };

    private setActivatedTask() {
        const id = this.taskComponent.getIdActiveLi();
        if (id !== -1) {
            this.doneIdInput.value = id.toString();
            this.submitButton.classList.remove(this.disabledClass);
        }
        else {
            this.doneIdInput.value = '';
            this.submitButton.classList.add(this.disabledClass);
        }
    };

    update() {
        this.setActivatedTask();
    };
};