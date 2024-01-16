import { get, getWithAuth, post, put } from "../utils/request1";

const TokenKey = "access_token";
const TokenUserId = "user_tryout";
const AnswerToken = "answer_token";

export function getAccessToken() {
  return localStorage.getItem(TokenKey);
}

export function setAccessToken(token) {
  return localStorage.setItem(TokenKey, token);
}

export function removeAccessToken() {
  localStorage.removeItem(TokenKey);
  localStorage.removeItem(TokenUserId);
}

export function getUserId() {
  return localStorage.getItem(TokenUserId);
}

export function setUserId(token) {
  return localStorage.setItem(TokenUserId, token);
}

export function getAnswerToken() {
  return localStorage.getItem(AnswerToken);
}

export function setAnswerToken(token) {
  return localStorage.setItem(AnswerToken, token);
}

export function removeAnswerToken() {
  return localStorage.removeItem(AnswerToken);
}

export const loginWithPassword = async (email, password) => {
    const res = await post("auth/login", {
      email: email,
      password: password,
    });
    return res;
};

export const checkToken = async () => {
  if (getAccessToken()) {
    const res = await getWithAuth(getAccessToken(), "auth/verify");
    return res;
  }
};

export const getLogin = async () => {
  const res = await get("auth/login");
  return res;
};

export const ping = async () => {
  const res = await get("/ping");
  return res;
};

export const getAttempts = async () => {
  const res = await get("exam/my-attempt");
  return res;
};

export const getDetail = async (exam_id) => {
  const res = await get(`exam/${exam_id}`);
  return res;
};

export const getSubtests = async (exam_id) => {
  const res = await get(`exam/subtest?exam=${exam_id}`);
  return res;
};

export const startAttempt = async (exam_id) => {
  const res = await post("exam/user-attempt", {
    exam: exam_id,
  });
  return res;
};

export const getAttempt = async (attempt_id) => {
  const res = await get(`exam/attempt/${attempt_id}`);
  return res;
};

export const startSubattempt = async (
  subtest_id,
  attempt_id
) => {
  const res = await post("exam/subattempt", {
    subtest: subtest_id,
    attempt: attempt_id,
  });
  return res;
};

//kaji
export const getSubattempt = async (subattempt_id) => {
  const res = await get(
    `exam/subattempt/${subattempt_id}?answer_token=${getAnswerToken()}`
  );
  return res;
};

export const getQuestions = async (subattempt_id) => {
  const res = await get(
    `exam/subattempt/${subattempt_id}/questions?answer_token=${getAnswerToken()}`
  );
  return res;
};

export const getAnswers = async () => {
  const res = await get(`exam/answer?answer_token=${getAnswerToken()}`);
  return res;
};

export const putAnswer = async (answers) => {
  const res = await put(`exam/answer`, {
    answer_token: getAnswerToken(),
    answers: answers,
  });
  return res;
};

export const finishSubattempt = async (subattempt_id) => {
  const res = await post(`exam/subattempt/finish/${subattempt_id}`, {});
  return res;
};
