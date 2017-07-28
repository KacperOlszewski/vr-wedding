export class AuthHelper {
    passAttempt = 'pass';
    progress = false;

    setProgress(bool) {
        this.progress = bool;
    }

    setPassAttempt(pass) {
        this.passAttempt = pass;
    }

    passIsUnique(newPass) {
        return newPass !== this.passAttempt;
    }

    passLengthFive(newPass) {
        return newPass.length === 5;
    }
}
