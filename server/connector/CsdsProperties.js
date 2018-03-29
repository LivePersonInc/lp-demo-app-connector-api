const CsdService = require("../services/CsdsService");
const nconf = require("nconf");

nconf.file({ file: "../settings.json" });

const csdsProperties = {};
const csdService = new CsdService(nconf);

let domains = []; //Hash table accessed by serviceName

csdsProperties.init = (() => {
    return csdService.getDomainList().then((data, reject) => {
        let length = data[0].baseURIs.length;
        for(let i=0; i < length; i++) {
            domains[data[0].baseURIs[i].service] = data[0].baseURIs[i].baseURI;
        }
    });
});

csdsProperties.getDomainByServiceName = (serviceName => domains[serviceName]);

module.exports = csdsProperties;
