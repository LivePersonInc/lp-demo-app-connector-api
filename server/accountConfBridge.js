const express = require("express");
const router = express.Router();
const nconf = require("nconf");
const HttpStatus = require('http-status-codes');
const AccountConfigService = require("./services/AccountConfigService");
const handleStatusCode = require('./util/handleStatusCode');
const logger = require('./util/logger');
const getDomainObjectByServiceName = require('./util/subscriptionsHandler.js').getDomainObjectByServiceName;

nconf.file({file: "./settings.json"});

const accountConfigService = new AccountConfigService(nconf);

const serviceName = 'accountConfigReadWrite';

router.get("/properties/:id", (req, res, next) => {
  let brandId = req.params.id;
  let args = {};

  args.headers = {};
  args.headers['authorization'] = `Bearer ${req.session.passport.user.bearer}`
  args.headers['Accept'] = 'application/json';
  const domain = getDomainObjectByServiceName(serviceName, req.session.passport.user.csdsCollectionResponse).baseURI;

  accountConfigService
    .getAccountPropertyList(brandId, args, domain)
    .then((resolve) => {

      if (handleStatusCode(resolve[1].statusCode)) {
        res.send(resolve[0]);
      } else {
        res.status(resolve[1].statusCode).send({error: "Something was wrong"});
      }

    }).catch((error) => {
      logger.error("ERROR: Promise rejected", error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR)});
    });
});


module.exports = router;
