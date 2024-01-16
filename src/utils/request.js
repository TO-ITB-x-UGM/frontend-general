import axios from "axios";
import { getAccessToken } from "./auth";

const AXIOS_CONFIGURATION = {
    baseURL: "http://localhost:8080/api",
    timeout: 12000
};

const headerConfiguration = config => {
    const configuration = { ...config };
    config.headers.authorization = `BEARER ${getAccessToken()}`;
    return configuration;
}

const errorResponseHandling = error => {
    console.error({ ...error });
}

const errorRequestHandling = error => {
    console.error(error); // for debug
};

const service = axios.create(AXIOS_CONFIGURATION);

service.interceptors.request.use(
    config => {
        if (getAccessToken()) {
            return headerConfiguration(config);
        }
        return config;
    },
    error => {
        errorRequestHandling(error);
        return Promise.reject(error);
    }
);

service.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        errorResponseHandling(error);
        return Promise.reject(error);
    }
);

export default service;
