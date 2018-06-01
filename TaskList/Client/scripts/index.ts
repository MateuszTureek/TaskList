//import 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

import ListOfTask from './model/ListOfTask';
import SearchComponent from './components/searchComponent';
import ListsComponent from './components/listsComponent';
import Task from './model/task';
import TaskHeaderComponent from './components/taskHeaderComponent';
import ActionComponent from './components/actionComponent';
import DeleteComponent from './components/deleteComponent';
import ListAjaxService from './services/listAjaxService';
import TaskAjaxService from './services/taskAjaxService';
import AddTaskComponent from './components/addTaskComponent';
import EditListComponent from './components/editListComponent';
import EditTaskComponent from './components/editTaskComponent';
import AddListComponent from './components/addListComponent';
import DoneTaskComponent from './components/doneTaskComponent';
import TabsTaskComponent from './components/tabsTaskComponent';
import TasksListComponent from './components/tasksListComponent';
import DoneTasksListComponent from './components/doneTasksListComponent';
import { authData } from './classes/authSettings';
import LoginComponent from './components/loginComponent';
import AuthService from './services/authService';

class Client {
    private listAjaxService: ListAjaxService;
    private taskAjaxService: TaskAjaxService;
    private authService: AuthService;

    private searchComp: SearchComponent;
    private listsComp: ListsComponent;
    private headerComp: TaskHeaderComponent;
    private todoTasksListComp: TasksListComponent;
    private addTaskComp: AddTaskComponent;
    private actionComp: ActionComponent;
    private editListComp: EditListComponent;
    private editTaskComp: EditTaskComponent;
    private deleteComp: DeleteComponent;
    private addListComp: AddListComponent;
    private doneComp: DoneTaskComponent;
    private tabsTaskComp: TabsTaskComponent;
    private doneTasksListComp: DoneTasksListComponent;
    private loginComp: LoginComponent;

    constructor() {
        this.listAjaxService = new ListAjaxService();
        this.taskAjaxService = new TaskAjaxService();
        this.authService = new AuthService();

        this.searchComp = new SearchComponent();
        this.listsComp = new ListsComponent(this.listAjaxService, this.searchComp);
        this.headerComp = new TaskHeaderComponent(this.listAjaxService, this.listsComp);
        this.todoTasksListComp = new TasksListComponent(this.taskAjaxService, this.listsComp);
        this.addTaskComp = new AddTaskComponent(this.taskAjaxService, this.listsComp);
        this.actionComp = new ActionComponent(this.listAjaxService, this.taskAjaxService, this.listsComp, this.todoTasksListComp);
        this.editListComp = new EditListComponent(this.listAjaxService, this.listsComp, this.actionComp);
        this.deleteComp = new DeleteComponent(this.listAjaxService, this.taskAjaxService, this.actionComp);
        this.editTaskComp = new EditTaskComponent(this.taskAjaxService, this.todoTasksListComp, this.actionComp);
        this.addListComp = new AddListComponent(this.listAjaxService);
        this.doneComp = new DoneTaskComponent(this.taskAjaxService, this.todoTasksListComp);
        this.tabsTaskComp = new TabsTaskComponent();
        this.doneTasksListComp = new DoneTasksListComponent(this.taskAjaxService, this.listsComp);
        this.loginComp = new LoginComponent(this.authService);

        this.registerObservables();
        this.initApp();
    };

    registerObservables(): void {
        this.searchComp.add(this.listsComp);

        this.listsComp.add(this.headerComp);
        this.listsComp.add(this.todoTasksListComp);
        this.listsComp.add(this.addTaskComp);
        this.listsComp.add(this.actionComp);
        this.listsComp.add(this.editListComp);
        this.listsComp.add(this.doneTasksListComp);

        this.todoTasksListComp.add(this.actionComp);
        this.todoTasksListComp.add(this.editTaskComp);
        this.todoTasksListComp.add(this.doneComp);

        this.actionComp.add(this.editListComp);
        this.actionComp.add(this.editTaskComp);
        this.actionComp.add(this.deleteComp);
    };

    initApp(): void {
        this.listsComp.generate().then(() => {
            this.headerComp.generate();
            this.addTaskComp.setFormListId();
            this.doneTasksListComp.generate();
            
            this.todoTasksListComp.generate().then(() => {
                this.actionComp.generateTitle();
            });
        }).then(() => {
            $('.loader').fadeOut('slow');
        }).catch((e) => {
            console.log(e);
        });
    };
};

window.onload = () => {
    $('#Loading').hide();
    if (sessionStorage.getItem(authData.sessionTokenKey) === undefined || sessionStorage.getItem(authData.sessionTokenKey) === null)
        window.location.href = '/account/login';
};

document.addEventListener('DOMContentLoaded', () => {
    // run
    const c = new Client();
});