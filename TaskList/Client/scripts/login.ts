import 'bootstrap/dist/css/bootstrap.min.css';

import AuthService from "./services/authService";
import LoginComponent from "./components/loginComponent";
import RegisterComponent from "./components/registerComponent";

class Client {
    private authService: AuthService;
    private loginComp: LoginComponent;
    private registerComp: RegisterComponent;

    constructor() {
        this.authService = new AuthService();

        this.loginComp = new LoginComponent(this.authService);
        this.registerComp = new RegisterComponent(this.authService);
    };
};

window.onload = () => {
    $('#Loading').hide();
};

document.addEventListener('DOMContentLoaded', () => {
    $('.loader').fadeOut('slow');
    const c = new Client();
});