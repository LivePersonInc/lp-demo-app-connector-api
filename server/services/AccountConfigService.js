"use strict";
const domains = require('../connector/CsdsProperties');
const Client = require("node-rest-client").Client;


class AccountConfigService {
    constructor(nconf) {
        // nconf object
        this.nconf = nconf;
        this.client = new Client();
    }

    updateAccountPropertyList(brandId,args) {
      return new Promise((resolve, reject) => {
        return this.client
          .post(
            `https://${this.nconf.get("ACCOUNT_CONFIG_SERVER") || domains.getDomainByServiceName('accountConfigReadWrite')}/api/account/${brandId}/configuration/provision/featureGrants?v=1.0&overrideAll=false&jsonProvider=gson`,
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

    getAccountPropertyList(brandId, args) {
      return new Promise((resolve, reject) => {
        return this.client
          .get(
            `https://${this.nconf.get("ACCOUNT_CONFIG_SERVER") || domains.getDomainByServiceName('accountConfigReadWrite')}/api/account/${brandId}/configuration/provision/featureGrants?v1.0&excludeLegacy=true&jsonProvider=gson`,
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
