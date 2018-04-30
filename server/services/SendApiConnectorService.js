"use strict";
const Client = require("node-rest-client").Client;

class SendApiConnectorService {
    constructor(nconf) {
        // nconf object
        this.nconf = nconf;
        this.client = new Client();
        this.baseUri = ``;
    }

    openConversation(brandId, args, domain) {
      console.log(`http://${domain}/api/send/account/${brandId}/conversation?v=${this.nconf.get("VERSION")}`); //XXX
        return new Promise((resolve, reject) => {
            this.client
                .post(
                    `http://${domain}/api/send/account/${brandId}/conversation?v=${this.nconf.get("VERSION")}`,
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

    sendRaw(brandId, conversationId, args, domain) {
        return new Promise((resolve, reject) => {
            this.client
                .post(`http://${domain}/api/send/conversation/${conversationId}/send?v=${this.nconf.get("VERSION")}`,
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

    closeConversation(brandId, conversationId, args, domain) {
        return new Promise((resolve, reject) => {
            this.client
                .post(`http://${domain}/api/send/account/${brandId}/conversation/${conversationId}/close?v=${this.nconf.get("VERSION")}`,
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
