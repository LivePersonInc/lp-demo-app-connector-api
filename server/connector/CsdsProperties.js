const CsdService = require("../services/CsdsService");
const nconf = require("nconf");
const events = require('events');

nconf.file({ file: "../settings.json" });

const csdsProperties = new events.EventEmitter();
const csdService = new CsdService(nconf);

let domains = []; //Hash table accessed by serviceName

csdsProperties.init = ((brandId) => {
    return csdService.getDomainList(brandId).then((data, reject) => {
        let length = data[0].baseURIs.length;
        for(let i=0; i < length; i++) {
            domains[data[0].baseURIs[i].service] = data[0].baseURIs[i].baseURI;
        }
        csdsProperties.emit('READY');
    });
});

csdsProperties.getDomainByServiceName = (serviceName => domains[serviceName]);

module.exports = csdsProperties;
