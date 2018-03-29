"use strict";

const Client = require("node-rest-client").Client;

class CsdsService {

    constructor(nconf) {
        // nconf object
        this.nconf = nconf;
        this.client = new Client();
    }

    getDomainList() {
        return new Promise((resolve, reject) => {
            return this.client
                .get(`http://${this.nconf.get('CSDS_DOMAIN')}/api/account/${this.nconf.get('BRAND_ID')}/service/baseURI.json?version=1.0`,
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
