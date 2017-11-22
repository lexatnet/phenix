import {
  login as loginRequest,
  logout as logoutRequest
} from 'actions/api';

export function loginFormSubmit(data) {
  const {
    csrf,
    login,
    password,
  } = data;
  return loginRequest(csrf, login, password);
}

export function logoutFormSubmit(data) {
  const {
    csrf
  } = data;
  return logoutRequest(csrf);
}
