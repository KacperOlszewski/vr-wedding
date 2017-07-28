import { MyHttp } from './utils/http';
import { getHtml } from './utils/getHtmlElement';
import { LocalStorage, keys } from './utils/localStorage';
import { AuthHelper } from './utils/authHelper';
import { bootstrap } from './bootstrap';

const authHelper = new AuthHelper();

export function checkPassword() {
    const input = getHtml('pass');
    const pass = input.value;

    if (authHelper.passLengthFive(pass) &&
        authHelper.passIsUnique(pass) &&
        !authHelper.progress)
    {
        authHelper.setProgress(true);
        input.className = '';
        authorize(pass).then(
            (user) => {
                const store = new LocalStorage();
                store.set(keys.token, user.validToken);
                authHelper.setProgress(false);
                bootstrap(user.bundle, document.body);
            },
            (err) => {
                authHelper.setPassAttempt(pass);
                authHelper.setProgress(false);
                input.classList.add('error');
            }
        );
    } else {
        input.classList.add('error');
    }
}

export function authorize(pass) {
    const http = new MyHttp();
    return http.post('/api/authorize', {pass})
}

export function showAuthSection() {
    getHtml('password-section').classList.add('first-log');
}