"use strict";
const Client = require("node-rest-client").Client;
const domains = require('../connector/CsdsProperties');

class SendApiConnectorService {
    constructor(nconf) {
        // nconf object
        this.nconf = nconf;
        this.client = new Client();
        this.baseUri = `http://${this.nconf.get("ASYNC_MESSAGING") || domains.getDomainByServiceName('asyncMessaging')}/api/send`;
    }

    openConversation(brandId, args) {
      console.log(`${this.baseUri}/account/${brandId}/conversation?v=${this.nconf.get("VERSION")}`); //XXX
        return new Promise((resolve, reject) => {
            this.client
                .post(
                    `${this.baseUri}/account/${brandId}/conversation?v=${this.nconf.get("VERSION")}`,
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

    sendRaw(brandId, conversationId, args) {
        return new Promise((resolve, reject) => {
            this.client
                .post(`${this.baseUri}/account/${brandId}/conversation/${conversationId}/send?v=${this.nconf.get("VERSION")}`,
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

    closeConversation(brandId, conversationId, args) {
        return new Promise((resolve, reject) => {
            this.client
                .post(`${this.baseUri}/account/${brandId}/conversation/${conversationId}/close?v=${this.nconf.get("VERSION")}`,
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

module.exports = SendApiConnectorService;
