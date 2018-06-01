import { authData } from "../classes/authSettings";

export default class ListAjaxService {
    private url = "api/list";
    private headers = { Authorization: '' };

    constructor() {
        const sessionVal = sessionStorage.getItem(authData.sessionTokenKey);
        if (sessionVal !== null && sessionVal !== undefined) {
            this.headers.Authorization = authData.header + sessionStorage.getItem(authData.sessionTokenKey);
        }
    };

    getAll() {
        return $.ajax({
            url: this.url,
            type: 'GET',
            dataType: 'JSON',
            headers: this.headers
        });
    };

    getAllContains(name: string) {
        return $.ajax({
            url: this.url + '/name/' + name,
            type: 'GET',
            dataType: 'JSON',
            headers: this.headers
        });
    };

    getById(id: number) {
        return $.ajax({
            url: this.url + '/' + id,
            type: 'GET',
            dataType: 'JSON',
            headers: this.headers
        });
    };

    add(listName: string) {
        return $.ajax({
            url: this.url + '/add/' + listName,
            type: 'POST',
            dataType: 'JSON',
            headers: this.headers
        });
    };

    edit(serializedData) {
        return $.ajax({
            url: this.url+'/edit',
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
            dataType: 'JSON',
            headers: this.headers
        });
    };
};