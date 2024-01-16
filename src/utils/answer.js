const TokenKey = "UIxITB-AnswerToken";

export function getAnswerToken() {
    return localStorage.getItem(TokenKey);
}

export function setAnswerToken(token) {
    return localStorage.setItem(TokenKey, token);
}

export function removeAnswerToken() {
    return localStorage.removeItem(TokenKey);
}