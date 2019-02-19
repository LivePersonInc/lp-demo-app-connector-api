"use strict";
const Client = require("node-rest-client").Client;

class SwiftStorageService {
  constructor(nconf) {
    this.nconf = nconf;
    this.client = new Client();
  }

  uploadFile(args, swiftDomain, relativePath, tempUrlSig, tempUrlExpires) {
    return new Promise((resolve, reject) => {
      return this.client
        .put(
          `https://${swiftDomain}${relativePath}?temp_url_sig=${tempUrlSig}&temp_url_expires=${tempUrlExpires}`,
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

module.exports = SwiftStorageService;
