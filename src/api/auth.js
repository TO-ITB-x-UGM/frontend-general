import service from "../utils/request";

export default class Auth {
    static baseGroupURL = '/auth';
    static async loginWithGoogle(credential) {
        const res = await service.post(`${this.baseGroupURL}/google`, {
            credential: credential
        });
        return res;
    }

    static async loginWithPassword(email, password) {
        const res = await service.post(`${this.baseGroupURL}/login`, {
            email: email,
            password: password
        });
        return res;
    }

    static async checkToken(token) {
        const res = await service.post(`${this.baseGroupURL}/verify`, {
            token: token
        });
        return res;
    }

    static async getLogin() {
        const res = await service.get(`${this.baseGroupURL}/login`);
        return res;
    }
}