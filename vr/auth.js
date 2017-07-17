import { MyHttp } from './utils/http';
import { getHtml } from './utils/getHtmlElement';
import { LocalStorage, keys } from './utils/localStorage';
import { bootstrap } from './bootstrap';

export function checkPassword() {
    const pass = getHtml('pass').value;

    authorize(pass).then(
        (user) => {
            const store = new LocalStorage();
            store.set(keys.token, user.validToken);

            bootstrap(user.bundle, document.body)
        },
        (err) => console.log('err',err)
    );
}

export function authorize(pass) {
    const http = new MyHttp();
    return http.post('/api/authorize', {pass})
}

export function showAuthSection() {
    getHtml('password-section').classList.add('first-log');
}