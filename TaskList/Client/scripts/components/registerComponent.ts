import AuthService from "../services/authService";

export  default class RegisterComponent {
    private $form = $('#RegisterForm');
    private $username = $('#UserName');
    private $password = $('#Password');
    private $confPassword = $('#ConfirmPassword');

    constructor(private authService: AuthService) {
        this.$password.on('blur', (e: Event) => { this.onBlur(e); });
        this.$confPassword.on('blur', (e: Event) => { this.onBlur(e); });
        this.$form.on('submit', (e: Event) => { this.onSubmit(e); });
    };

    onBlur(e: Event) {
        const passVal = this.$password.val();
        const confPassVal = this.$confPassword.val();
        let input = this.$confPassword.get(0) as HTMLInputElement;

        if (passVal !== confPassVal) {
            input.setCustomValidity('Podane hasło i potwierdzone hasłon nie są takie same.');
        } else {
            input.setCustomValidity('');
        }
    };

    onSubmit(e: Event) {
        e.preventDefault();

        $('#RegisterCard').hide();
        $('#Loading').show();

        const name = this.$username.val();
        const pass = this.$password.val();
        const confPass = this.$confPassword.val();

        this.authService.register(name, pass, confPass).fail((e) => {
            console.log(e);
            $('#RegisterCard').show();
            $('#Loading').hide();
            $('.error-info').text('Błędne dane rejestracji.');
        });
    };
};