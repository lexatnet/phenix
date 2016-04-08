import {
  CALL_API
} from 'redux-api-middleware';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export function login(login, password) {
  return {
    [CALL_API]: {
      endpoint: '/api/login',
      method: 'POST',
      types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sender_name: sender,
        sender_email: sender,
        recipient_email: recipient,
        message: message,
        story_url: shareUrl,
      }),
    },
  };
}
