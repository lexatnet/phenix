'use strict'
/**
 * Message object
 *
 * defaults :
 * 	- status : 'info',
 *  - tag: null,
 *  - entityType:null,
 *  - entityId:null,
 *  - text:null,
 *
 * @constructor
 * @this {Message}
 * @param {Object} options :
 *        - status : one of ['success','info','warning', 'danger'],
 *        - tag:,
 *        - entityType:,
 *        - entityId:,
 *        - text:,
 *
 *
 */
class Message {
	constructor(params) {
		let defaults = {
			status: 'info', // success, info, warning, danger
			tag: null,
			entityType: null,
			entityId: null,
			text: null,
		};
		Object.assign(this, defaults, params)
	}
}

exports.Message = Message;
