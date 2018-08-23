"use strict";

const Client = require("node-rest-client").Client;

class CsdsService {

    constructor(nconf) {
        // nconf object
        this.nconf = nconf;
        this.client = new Client();
    }

    getDomainList(brandId) {
        return new Promise((resolve, reject) => {
            return this.client
                .get(`http://${this.nconf.get('CSDS_DOMAIN')}/api/account/${brandId}/service/baseURI.json?version=${this.nconf.get("CSDS_VERSION")}`,
                    {},
                    function (data, response) {
                        resolve([data, response]);
                    }).on('error', (e) => {
                    reject(e);
                });
        });
    }

}

module.exports = CsdsService;
