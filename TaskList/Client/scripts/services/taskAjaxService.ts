import { authData } from "../classes/authSettings";

export default class TaskAjaxService {
    private url = "api/task";
    private headers = { Authorization: '' };

    constructor() {
        const sessionVal = sessionStorage.getItem(authData.sessionTokenKey);
        if (sessionVal !== null && sessionVal !== undefined) {
            this.headers.Authorization = authData.header + sessionStorage.getItem(authData.sessionTokenKey);
        }
    };

    add(serializedData) {
        return $.ajax({
            url: this.url,
            type: 'POST',
            dataType: 'JSON',
            data: serializedData,
            headers: this.headers
        });
    };

    getAll() {
        return $.ajax({
            url: this.url,
            type: 'GET',
            contentType: "application/json",
            dataType: 'JSON'
        })
    };

    getAllToDoByListId(listId: number, taskType?: string) {
        if (taskType === null || taskType === undefined) taskType = 'todo';
        return $.ajax({
            url: this.url + '/byList/' + listId + '/' + taskType,
            type: 'GET',
            contentType: "application/json",
            dataType: 'JSON',
            headers: this.headers
        })
    };

    getById(id: number) {
        return $.ajax({
            url: this.url + '/' + id,
            type: 'GET',
            contentType: "application/json",
            dataType: 'JSON',
            headers: this.headers
        });
    };

    edit(serializedData) {
        return $.ajax({
            url: this.url + '/edit',
            type: 'PUT',
            dataType: 'JSON',
            data: serializedData,
            headers: this.headers
        });
    };

    delete(id: number) {
        return $.ajax({
            url: this.url + '/' + id,
            type: 'DELETE',
            contentType: "application/json",
            dataType: 'JSON',
            headers: this.headers
        });
    };

    isDone(id: number) {
        return $.ajax({
            url: this.url + '/done/' + id,
            type: 'POST',
            contentType: "application/json",
            dataType: 'JSON',
            headers: this.headers
        });
    };
};