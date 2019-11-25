const express = require("express");
const router = express.Router();
const HttpStatus = require('http-status-codes');
const ConvHistoryService = require("./services/ConvHistoryService");
const handleStatusCode = require('./util/handleStatusCode');
const logger = require('./util/logger');
const getDomainObjectByServiceName = require('./util/subscriptionsHandler.js').getDomainObjectByServiceName;

const convHistoryService = new ConvHistoryService();

const serviceName = 'msgHist';

router.get("/:brandId/consumer/:conversationId", function (req, res, next) {
  try {
    let brandId = req.params.brandId;
    let conversationId = req.params.conversationId;
    let args = {};
    args.data = {};
    args.headers = {};
    args.headers['content-type'] = 'application/json';
    args.headers['authorization'] = `Bearer ${req.session.passport.user.bearer}`
    const domain = getDomainObjectByServiceName(serviceName, req.session.passport.user.csdsCollectionResponse).baseURI;

    convHistoryService
      .getHistoryByConsumerId(conversationId, brandId, args, domain)
      .then((resolve) => {
        if (handleStatusCode(resolve[1].statusCode)) {
          res.send(resolve[0]);
        } else {
          res.status(resolve[1].statusCode).send("Something wrong");
        }
      }).catch((error) => {
      logger.error("ERROR: Promise rejected", error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR)});
    });
  } catch(error) {
    logger.error("ERROR: " + error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR)});
  }
});

module.exports = router;
