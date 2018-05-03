"use strict";
const Request = require( "../models/Request");
const UpdateConversationField = require( "../models/UpdateConversationField");

const Client = require("node-rest-client").Client;

class SendApiConnectorService {
    constructor(nconf) {
        // nconf object
        this.nconf = nconf;
        this.client = new Client();
        this.baseUri = ``;
        this.closeConversationField = {
          "field": "ConversationStateField",
          "conversationState": "CLOSE"
        }
    }

    openConversation(brandId, args, domain) {
        return new Promise((resolve, reject) => {
            this.client
                .post(
                    `http://${domain}/api/account/${brandId}/messaging/consumer/conversation?v=${this.nconf.get("VERSION")}`,
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

    sendRaw(brandId, args, domain) {
      return new Promise((resolve, reject) => {
            this.client
                .post(`http://${domain}/api/account/${brandId}/messaging/consumer/conversation/send?v=${this.nconf.get("VERSION")}`,
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
      args.data = JSON.stringify(this.createCloseConversationPayload(conversationId));
      return new Promise((resolve, reject) => {
            this.client
                .post(`http://${domain}/api/account/${brandId}/messaging/consumer/conversation/send?v=${this.nconf.get("VERSION")}`,
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

  createCloseConversationPayload(conversationId) {
    const update = new UpdateConversationField(conversationId, this.closeConversationField)
    return new Request("req", "1,", "cm.UpdateConversationField", update);
  }
}

module.exports = SendApiConnectorService;
