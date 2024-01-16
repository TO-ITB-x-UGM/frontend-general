const TokenKey = "UIxITB-TOKEN";
const TokenUserId = "userrrrrrrr"
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

export function getUserId(){
    return localStorage.getItem(TokenUserId);
}

export function setUserId(token){
    return localStorage.setItem(TokenUserId, token);
}
