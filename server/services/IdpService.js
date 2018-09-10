"use strict";
const Client = require("node-rest-client").Client;

class IdpService {
  constructor(nconf) {
    this.nconf = nconf;
    this.client = new Client();
  }

  logIn(brandId, args, domain) {

    return new Promise((resolve, reject) => {
      return this.client
        .post(
          `https://${domain}/api/account/${brandId}/login`,
          args,
          function (data, response) {
            resolve([data, response]);
          }
        )
        .on("error", e => {
          reject(e);
        });
    });
  }

}

module.exports = IdpService;
