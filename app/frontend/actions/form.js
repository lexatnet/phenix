import {
  login
} from './api';

export default function loginFormSubmit(data) {
  const {
    login,
    password,
  } = data;
  return shareViaEmail(login, password);
}
