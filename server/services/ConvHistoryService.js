"use strict";
const Client = require("node-rest-client").Client;

class ConvHistoryService {
  constructor() {
    this.client = new Client();
  }

  getHistoryByConsumerId(consumerId, brandId, args, domain) {
    args.data = JSON.stringify(this.createHistoryBody(consumerId));
    return new Promise((resolve, reject) => {
      return this.client
        .post(
          `https://${domain}/messaging_history/api/account/${brandId}/conversations/consumer/search?offset=0&limit=100&sort=start%3Adesc&NC=true&__d=2013`,
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

  createHistoryBody(consumerId) {
    let body = {
      "consumer": consumerId,
      "contentToRetrieve":["campaign","messageRecords","agentParticipants","agentParticipantsLeave","agentParticipantsActive","consumerParticipants","transfers","messageScores","messageStatuses"]

    };

    return body;
  }


}

module.exports = ConvHistoryService;
