"use strict";
const domains = require('../connector/CsdsProperties');
const Client = require("node-rest-client").Client;


class AccountService {
    constructor(nconf) {
        // nconf object
        this.nconf = nconf;
        this.client = new Client();
    }

    updateAccountPropertyList(args) {
        return new Promise((resolve, reject) => {
          //TODO:
        });
    }


    getAccountPropertyList(brandId, args) {
        return new Promise((resolve, reject) => {
            //TODO:
        });
    }

}

module.exports = AppInstallationService;
