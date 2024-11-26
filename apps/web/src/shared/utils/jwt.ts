export function decodeJwtToken(token: string) {
    return JSON.parse(atob(token.split(".")[1]));
}
