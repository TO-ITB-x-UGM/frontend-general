import service from "../utils/request";

export default class Server {
    static async ping() {
        const res = await service.get('/ping');
        return res;
    }

    static async time() {
        const res = await service.get('/ping');
        return res;
    }
}