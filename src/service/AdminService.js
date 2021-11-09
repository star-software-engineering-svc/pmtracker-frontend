import instance from "./BaseService";

export function login(email, password) {
  return instance.post('admin/login', {
    email: email,
    password: password
  });
}