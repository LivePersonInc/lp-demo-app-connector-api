"use strict";
const Request = require( "../models/Request");
const UpdateConversationField = require( "../models/UpdateConversationField");

const Client = require("node-rest-client").Client;

class SendApiConnectorService {
    constructor(nconf) {
        this.nconf = nconf;
        this.client = new Client();

        //TODO: Needs to be removed
        this.closeConversationField = {
          "field": "ConversationStateField",
          "conversationState": "CLOSE"
        }
    }

    openConversation(brandId, args, domain) {
        return new Promise((resolve, reject) => {
            this.client
                .post(
                    `https://${domain}/api/account/${brandId}/messaging/consumer/conversation?v=${this.nconf.get("UMS_VERSION")}`,
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
                .post(`https://${domain}/api/account/${brandId}/messaging/consumer/conversation/send?v=${this.nconf.get("UMS_VERSION")}`,
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

    //TODO Should be removed  and the right payload should be passer from the UI app, Send Raw will send the CLose conv Payload
    closeConversation(brandId, conversationId, args, domain) {
      args.data = JSON.stringify(this.createCloseConversationPayload(conversationId));
      return new Promise((resolve, reject) => {
            this.client
                .post(`https://${domain}/api/account/${brandId}/messaging/consumer/conversation/send?v=${this.nconf.get("UMS_VERSION")}`,
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

  //TODO Should be removed  and the right payload should be passer from the UI app
  createCloseConversationPayload(conversationId) {
    const update = new UpdateConversationField(conversationId, this.closeConversationField);
    return new Request("req", "1,", "cm.UpdateConversationField", update);
  }
}

module.exports = SendApiConnectorService;
