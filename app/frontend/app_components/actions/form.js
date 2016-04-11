import {
  login as loginRequest
} from './api';

export function loginFormSubmit(data) {
  console.log('loginFormSubmit()', data);
  const {
    csrf,
    login,
    password,
  } = data;
  return loginRequest(csrf, login, password);
}
