import { instance } from "./BaseService";

export function login(email, password) {
    return instance.post('auth/login', {
        email: email,
        password: password
    });
}