const express = require("express");
const router = express.Router();
const nconf = require("nconf");
const SendApiConnector = require("./services/SendApiConnectorService");
const HttpStatus = require('http-status-codes');
const handleStatusCode = require('./util/handleStatusCode');
const logger = require('./util/logger');
const getDomainObjectByServiceName = require('./util/subscriptionsHandler.js').getDomainObjectByServiceName;


nconf.file({file: "./settings.json"});

const sendApiConnector = new SendApiConnector(nconf);

const serviceName = 'asyncMessagingEnt';

router.post("/openconv/:id", (req, res, next) => {
  try {
    let brandID = req.params.id;

    let args = {};
    args.data = {};
    args.headers = {};
    args.headers['content-type'] = req.header('content-type');
    args.headers['authorization'] = req.header('authorization');
    args.headers['X-LP-ON-BEHALF'] = req.header('X-LP-ON-BEHALF');
    args.headers['Client-Properties'] = req.header('Client-Properties');

    args.data = JSON.stringify(req.body);

    const domain = getDomainObjectByServiceName(serviceName, req.session.passport.user.csdsCollectionResponse).baseURI;

    sendApiConnector
      .openConversation(brandID, args, domain)
      .then((resolve) => {

        if (handleStatusCode(resolve[1].statusCode)) {
          let conversationId = resolve[0][1].body.conversationId;
          res.send({"convId": conversationId});
        } else {
          res.status(resolve[1].statusCode).send(resolve[1].statusMessage);
        }

      }).catch((error) => {
      logger.error("ERROR: Promise rejected", error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR)});
    });
  } catch (error) {
    logger.error("ERROR: " + error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR)});
  }
});

router.post("/sendraw/:id", (req, res, next) => {
  try {
    let brandID = req.params.id;

    let args = {};
    args.data = {};
    args.headers = {};
    args.headers['content-type'] = req.header('content-type');
    args.headers['authorization'] = req.header('authorization');
    args.headers['X-LP-ON-BEHALF'] = req.header('X-LP-ON-BEHALF');
    args.headers['Client-Properties'] = req.header('Client-Properties');

    args.data = JSON.stringify(req.body);

    const domain = getDomainObjectByServiceName(serviceName, req.session.passport.user.csdsCollectionResponse).baseURI;

    sendApiConnector
      .sendRaw(brandID, args, domain)
      .then((resolve) => {
        if (handleStatusCode(resolve[1].statusCode)) {
          res.send(resolve[0]);
        } else {
          res.status(resolve[1].statusCode).send(resolve[1].statusMessage);
        }
      }).catch((error) => {
      logger.error("ERROR: Promise rejected", error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR)});
    });
  }catch (error) {
    logger.error("ERROR: " + error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR)});
  }
});

router.post("/close/:id/conv/:convId", (req, res, next) => {
  try {
    let brandID = req.params.id;
    let convID = req.params.convId;

    let args = {};
    args.headers = {};
    args.headers['content-type'] = req.header('content-type');
    args.headers['authorization'] = req.header('authorization');
    args.headers['X-LP-ON-BEHALF'] = req.header('X-LP-ON-BEHALF');
    args.headers['Client-Properties'] = req.header('Client-Properties');

    const domain = getDomainObjectByServiceName(serviceName, req.session.passport.user.csdsCollectionResponse).baseURI;

    sendApiConnector
      .closeConversation(brandID, convID, args, domain)
      .then((resolve) => {
        if (handleStatusCode(resolve[1].statusCode)) {
          res.send({"message": "Conversation closed sucesfully"});
        } else {
          res.status(resolve[1].statusCode).send(resolve[1].statusMessage);
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

router.get("/alive", (req, res, next) => {
  res.send("Hello!!!!");
});

module.exports = router;
