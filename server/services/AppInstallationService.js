"use strict";
const domains = require('../connector/CsdsProperties');
const Client = require("node-rest-client").Client;


class AppInstallationService {
  constructor(nconf) {
    // nconf object
    this.nconf = nconf;
    this.client = new Client();
  }

  installNewApp(brandId, args) {
    return new Promise((resolve, reject) => {
      return this.client
        .post(
          `https://${this.nconf.get("APP_INSTALLATION_SERVER") || domains.getDomainByServiceName('accountConfigReadWrite')}/api/account/${brandId}/configuration/app-install/installations?v=1.0`,
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

  uninstallAppById(app_id, brandId, args) {
    return new Promise((resolve, reject) => {
      return this.client
        .delete(
          `https://${this.nconf.get("ACCOUNT_CONFIG_SERVER") || domains.getDomainByServiceName('accountConfigReadWrite')}/api/account/${brandId}/configuration/app-install/installations/${app_id}?v=1.0`,
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

  getAppsForBrandId(brandId, args) {
    return new Promise((resolve, reject) => {
      return this.client
        .get(
          `https://${this.nconf.get("ACCOUNT_CONFIG_SERVER") || domains.getDomainByServiceName('accountConfigReadWrite')}/api/account/${brandId}/configuration/app-install/installations?v=1.0`,
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

  getAppById(app_id, brandId, args) {
    return new Promise((resolve, reject) => {
      return this.client
        .get(
          `https://${this.nconf.get("ACCOUNT_CONFIG_SERVER") || domains.getDomainByServiceName('accountConfigReadWrite')}/api/account/${brandId}/configuration/app-install/installations/${app_id}?v=1.0`,
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

  update(app_id, brandId, args) {
    return new Promise((resolve, reject) => {
      return this.client
        .put(
          `https://${this.nconf.get("APP_INSTALLATION_SERVER") || domains.getDomainByServiceName('accountConfigReadWrite')}/api/account/${brandId}/configuration/app-install/installations/${app_id}?v=1.0`,
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

module.exports = AppInstallationService;
