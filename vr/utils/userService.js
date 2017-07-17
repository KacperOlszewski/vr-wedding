export class UserService {};
class UserData {

    user = null;

    setUser(newUser) {
        this.user = newUser;
    }

    getUser() {
        return this.user;
    }
}