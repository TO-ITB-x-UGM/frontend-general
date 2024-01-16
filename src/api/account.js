import service from "../utils/request";

export default class Account {
    static baseGroupURL = '/profile';
    static async getProfile() {
        const res = await service.get(`${this.baseGroupURL}/`);
        return res;
    }

    static async updateProfile(data) {
        const res = await service.patch(`${this.baseGroupURL}/`, {
            data: data,
        });
        return res;
    }
}