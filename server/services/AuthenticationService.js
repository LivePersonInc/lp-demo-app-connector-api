"use strict";
const domains = require('../connector/CsdsProperties');
const Client = require("node-rest-client").Client;

class AuthenticationService {
    constructor(nconf) {
        // nconf object
        this.nconf = nconf;
        this.client = new Client();
    }

    getAppJWT(args) {
        console.log(`https://${this.nconf.get("SENTINEL") || domains.getDomainByServiceName('sentinel')}/sentinel/api/account/${this.nconf.get("BRAND_ID")}/app/token?v=1.0&grant_type=client_credentials&client_id=${this.nconf.get("APP_KEY")}&client_secret=${this.nconf.get("APP_SECRET")}`);
        return new Promise((resolve, reject) => {
            return this.client
                .post(`https://${this.nconf.get("SENTINEL") || domains.getDomainByServiceName('sentinel')}/sentinel/api/account/${this.nconf.get("BRAND_ID")}/app/token?v=1.0&grant_type=client_credentials&client_id=${this.nconf.get("APP_KEY")}&client_secret=${this.nconf.get("APP_SECRET")}`,
                    args,
                    function (data, response) {
                        resolve(data);
                    }).on('error', (e) => {
                    reject(e);
                });
        });
    }

    getConsumerJWS(args) {
        return new Promise((resolve, reject) => {
            return this.client
                .post(`https://${this.nconf.get("IDP") || domains.getDomainByServiceName('idp')}/api/account/${this.nconf.get("BRAND_ID")}/consumer?v=1.0`,
                    args,
                    function (data, response) {
                        resolve([data, response]);
                    }).on('error', (e) => {
                    reject(e);
                });
        });
    }

    /**
     * This is used for APP Installation
     * @returns {Promise}
     */
    getBearerAuthorization(brandId, args) {
        return new Promise((resolve, reject) => {
            return this.client
                .post(
                    `https://${this.nconf.get("AGENT_VEP") || domains.getDomainByServiceName('agentVep')}/api/account/${brandId}/login`,
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

module.exports = AuthenticationService;
