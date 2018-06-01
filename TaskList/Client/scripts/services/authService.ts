import { authData } from "../classes/authSettings";

export default class AuthService {
    login(login, password) {
        const data = {
            grant_type: 'password',
            username: login,
            password: password
        };

        return $.ajax({
            url: '/Token',
            method: 'POST',
            data: data,
            headers: { "Accept": "application/json" },
            contentType: "application/x-www-form-url; charset=urf-8"
        });
    };

    static logout() {
        sessionStorage.removeItem(authData.sessionTokenKey);
        window.location.href = '/account/login';
    };

    register(username, password, confirmPassword) {
        const data = {
            "UserName": username,
            "Password": password,
            "ConfirmPassword": confirmPassword
        };

        return $.ajax({
            url: '/api/account/register',
            method: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data)
        }).done((response) => {
            const host = window.location.host;
            window.location.href = 'http://' + host + '/account/login';
        }).fail((err) => { console.log(err); });
    };
};