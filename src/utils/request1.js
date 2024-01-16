import axios, { AxiosResponse } from "axios";

const url = "http://localhost:8080/api/";

export const post = async (
  api,
  form
) => {
  return await axios.post(url + api, form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const postWithAuth = async (
  api,
  form,
  token
) => {
  return await axios.post(url + api, form, {
    headers: {
      // Accept: "multipart/form-data",
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + token,
    },
  });
};

export const postWithAuthJson = async (
  api,
  json,
  token
) => {
  return await axios.post(url + api, json, {
    headers: {
      // Accept: "multipart/form-data",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
};

export const put = async (
  api,
  form
) => {
  return await axios.put(url + api, form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const putWithAuth = async (
  api,
  form,
  token
) => {
  return await axios.put(url + api, form, {
    headers: {
      // Accept: "multipart/form-data",
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + token,
    },
  });
};

export const get = async (
  apiParams
) => {
  return await axios.get(url + apiParams);
};

export const getWithAuth = async (
  token,
  apiParams
) => {
  return await axios.get(url + apiParams, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "69420",
      Authorization: "Bearer " + token,
    },
  });
};
