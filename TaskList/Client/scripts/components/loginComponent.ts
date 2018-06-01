import AuthService from "../services/authService";
import { authData } from "../classes/authSettings";

export default class LoginComponent {
    private $form = $('#LoginForm');
    private $username = $('#UserName');
    private $password = $('#Password');
    private $logoutForm = $('#LogoutForm');

    constructor(private authService: AuthService) {
        this.$form.on('submit', (e: Event) => { this.onSubmit(e); });
        this.$logoutForm.on('submit', (e: Event) => { this.onSubmitLogout(e); });
    };
    
    onSubmitLogout(e: Event) {
        e.preventDefault();
        AuthService.logout();
    };

    onSubmit(e: Event) {
        e.preventDefault();

        $('#LoginCard').hide();
        $('#Loading').show();

        this.authService.login(this.$username.val(), this.$password.val()).done((response) => {
            sessionStorage.setItem(authData.sessionTokenKey, response.access_token);
        }).fail((err) => {
            console.log(err);
            $('#LoginCard').show();
            $('#Loading').hide();
            $('.error-info').text('Błędne dane logowanie. Nazwa urzytkownika lub hasło moze być nieprawidłowe.');
        }).then(() => {
            $('.error-info').text('');
            const host = window.location.host;
            window.location.replace('http://' + host + '/Home');
        });
    };
};