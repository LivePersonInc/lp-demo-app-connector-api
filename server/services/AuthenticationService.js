"use strict";

const Client = require("node-rest-client").Client;

class AuthenticationService {
	constructor(nconf) {
		this.nconf = nconf;
		this.client = new Client();
	}

	getAppJWT(brandId, args, domain) {
		const url = `https://ca-a.sentinel.liveperson.net/sentinel/api/account/${brandId}/app/token?v=1.0&grant_type=client_credentials&client_id=${appKey}&client_secret=${appSecret}`;
		return new Promise((resolve, reject) => {
			return this.client
				.post(url, args, function (data, response) {
					resolve([data, response]);
				})
				.on("error", e => {
					reject(e);
				});
		});
	}
}

module.exports = AuthenticationService;
