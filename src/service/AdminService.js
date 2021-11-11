import instance from "./BaseService";

export function adminLogin(email, password) {
  return instance.post('admin/login', {
    email: email,
    password: password
  });
}