"use strict";

const Client = require("node-rest-client").Client;

class AuthorizationService {
	constructor() {
		this.client = new Client();
	}

	getAppJWT(brandId, appKey, appSecret, domain, args) {
		const url = `https://${domain}/sentinel/api/account/${brandId}/app/token`;
		args.parameters = {};
		args.parameters = {
			'v': '1.0',
			'grant_type': 'client_credentials',
			'client_id': appKey,
			'client_secret': appSecret
		};

		return new Promise((resolve, reject) => {
			return this.client
				.post(url, args, function (data, response) {
					resolve([data, response]);
				})
				.on('error', e => {
					reject(e);
				});
		});
	}

	signJWT(brandId, domain, args) {
		const url = `https://${domain}/api/account/${brandId}/consumer`;
		args.parameters = {};
		args.parameters = {
			'v': '1.0'
		};

		return new Promise((resolve, reject) => {
			return this.client
				.post(url, args, function (data, response) {
					resolve([data, response]);
				})
				.on('error', e => {
					reject(e);
				});
		});
	}
}

module.exports = AuthorizationService;
