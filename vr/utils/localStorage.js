export const keys = {
    token: 'token'
};

export class LocalStorage {
    get(key) {
        return window.localStorage.getItem(key);
    };

    set(key, value) {
        if (typeof value === 'object') {
            value = JSON.stringify(value);
        }

        window.localStorage.setItem(key, value);
    }

    remove(key) {
        window.localStorage.removeItem(key);
    }
}
