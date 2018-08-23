"use strict";
const Client = require("node-rest-client").Client;

class AccountConfigService {
    constructor(nconf) {
        // nconf object
        this.nconf = nconf;
        this.client = new Client();
    }

    updateAccountPropertyList(brandId,args, domain) {
      return new Promise((resolve, reject) => {
        return this.client
          .post(
            `https://${domain}/api/account/${brandId}/configuration/provision/featureGrants?v=${this.nconf.get("AC_VERSION")}&overrideAll=false&jsonProvider=gson`,
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

    getAccountPropertyList(brandId, args, domain) {
      return new Promise((resolve, reject) => {
        return this.client
          .get(
            `https://${domain}/api/account/${brandId}/configuration/provision/featureGrants?v=${this.nconf.get("AC_VERSION")}&excludeLegacy=true&jsonProvider=gson`,
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

module.exports = AccountConfigService;
