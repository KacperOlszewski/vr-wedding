import { checkPassword, authorize, showAuthSection } from './auth';
import { LocalStorage, keys } from './utils/localStorage';
import { bootstrap } from './bootstrap';
import { UserService } from './utils/userService';

window.usrService = UserService;
window.onload = function () {
    const store = new LocalStorage();
    const token = store.get(keys.token);

    if (token) {
      authorize(token).then(
          (user) => {
            bootstrap(user.bundle, document.body)
          },
          () => {
              store.remove(keys.token);
              window.checkPass = checkPassword;
              showAuthSection();
          }
      )
    } else {
        window.checkPass = checkPassword;
        showAuthSection();
    }
};
