import * as jwt from 'jsonwebtoken';
import * as moment from 'moment';

class AuthService {

    tokenKey = 'auth_token';

    getToken() {
        return localStorage.getItem(this.tokenKey);
    }

    decode(token) {
        return jwt.decode(token);
    }
    getExpiration(token) {
        const exp = this.decode(token).exp;

        return moment.unix(exp);
    }

    saveToken(token){
        localStorage.setItem(this.tokenKey, token);
    }

    inValidateUser(){
        localStorage.removeItem(this.tokenKey);
    }

    isValid(token) {
        return moment().isBefore(this.getExpiration(token));
    }

    isAuthenticated() {
        const token = this.getToken();

        if (token && this.isValid(token)) {
            return true;
        }

        return false;
    }

    getUsername(){
        return this.decode(this.getToken()).username;
    }

}

export default new AuthService();