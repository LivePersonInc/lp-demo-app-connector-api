"use strict";
const domains = require('../connector/CsdsProperties');
const Client = require("node-rest-client").Client;


class AppInstallationService {
    constructor(nconf) {
        // nconf object
        this.nconf = nconf;
        this.client = new Client();
    }

    installNewApp(args) {
        return new Promise((resolve, reject) => {
            return this.client
                .post(
                    `https://${this.nconf.get("APP_INSTALLATION_SERVER") || domains.getDomainByServiceName('accountConfigReadWrite')}/api/account/${this.nconf.get("BRAND_ID")}/configuration/app-install/installations?v=1.0`,
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

    uninstallAppById(app_id, args) {
        return new Promise((resolve, reject) => {
            return this.client
                .delete(
                    `https://${this.nconf.get("APP_INSTALLATION_SERVER") || domains.getDomainByServiceName('accountConfigReadWrite')}/api/account/${this.nconf.get("BRAND_ID")}/configuration/app-install/installations/${app_id}?v=1.0`,
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

    getAppById(app_id, args) {
        return new Promise((resolve, reject) => {
            return this.client
                .get(
                    `https://${this.nconf.get("APP_INSTALLATION_SERVER") || domains.getDomainByServiceName('accountConfigReadWrite')}/api/account/${this.nconf.get("BRAND_ID")}/configuration/app-install/installations/${app_id}?v=1.0`,
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