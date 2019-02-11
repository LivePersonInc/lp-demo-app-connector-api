"use strict";

const Client = require("node-rest-client").Client;

class CsdsService {

    constructor(nconf) {
        this.nconf = nconf;
        this.client = new Client();
    }

    getDomainList(brandId) {
        const csdDomain = brandId.toString().toLowerCase().startsWith('le')? this.nconf.get('CSDS_DOMAIN_QA'): this.nconf.get('CSDS_DOMAIN');
        return new Promise((resolve, reject) => {
            return this.client
                .get(`http://${csdDomain}/api/account/${brandId}/service/baseURI.json?version=${this.nconf.get("CSDS_VERSION")}`,
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
