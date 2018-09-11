"use strict";
const Client = require("node-rest-client").Client;


class AppInstallationService {
  constructor(nconf) {
    this.nconf = nconf;
    this.client = new Client();
  }

  installNewApp(brandId, args, domain) {
    return new Promise((resolve, reject) => {
      return this.client
        .post(
          `https://${domain}/api/account/${brandId}/configuration/app-install/installations?v=${this.nconf.get("APP_INSTALL_VERSION")}`,
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

  uninstallAppById(app_id, brandId, args, domain) {
    return new Promise((resolve, reject) => {
      return this.client
        .delete(
          `https://${domain}/api/account/${brandId}/configuration/app-install/installations/${app_id}?v=${this.nconf.get("APP_INSTALL_VERSION")}`,
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

  getAppsForBrandId(brandId, args, domain) {
    return new Promise((resolve, reject) => {
      return this.client
        .get(
          `https://${domain}/api/account/${brandId}/configuration/app-install/installations?v=${this.nconf.get("APP_INSTALL_VERSION")}`,
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

  getAppById(app_id, brandId, args, domain) {
    return new Promise((resolve, reject) => {
      return this.client
        .get(
          `https://${domain}/api/account/${brandId}/configuration/app-install/installations/${app_id}?v=${this.nconf.get("APP_INSTALL_VERSION")}`,
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

  update(app_id, brandId, args, domain) {
    return new Promise((resolve, reject) => {
      return this.client
        .put(
          `https://${domain}/api/account/${brandId}/configuration/app-install/installations/${app_id}?v=${this.nconf.get("APP_INSTALL_VERSION")}`,
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
