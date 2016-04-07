import {
	CALL_API
} from 'redux-api-middleware'

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

export function login(login,password) {
	return {
		[CALL_API]: {
			endpoint: '/api/login',
			method: 'POST',
			types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE],
			// headers: {
			// 	'Accept': 'application/json',
			// 	'Content-Type': 'application/json'
			// },
			// body: JSON.stringify({
			// 	sender_name: sender,
			// 	sender_email: sender,
			// 	recipient_email: recipient,
			// 	message: message,
			// 	story_url: shareUrl
			// }),
			body: "sender_name=joseph.george%40globe.com&sender_email=joseph.george%40globe.com&recipient_email=jacob.brush%40globe.com&message=80LIMIT&story_url=http%3A%2F%2Fwww.bostonglobe.com%2Fnews%2Fnation%2F2016%2F03%2F29%2Ffla-police-charge-trump-aide-after-incident-with-reporter%2FoditTmQNMxiZTNm0X32OLO%2Fstory.html"

		}
	}
}
