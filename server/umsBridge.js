const express = require("express");
const router = express.Router();
const nconf = require("nconf");
const SendApiConnector = require("./services/SendApiConnectorService");
const HttpStatus = require('http-status-codes');
const handleStatusCode = require('./util/handleStatusCode');

nconf.file({file: "./settings.json"});

const sendApiConnector = new SendApiConnector(nconf);

router.post("/openconv/:id", (req, res, next) => {
  let brandID = req.params.id;

  let args = {};
  args.data = {};
  args.headers = {};
  args.headers['content-type'] = req.header('content-type');
  args.headers['authorization'] = req.header('authorization');
  args.headers['X-LP-ON-BEHALF'] = req.header('X-LP-ON-BEHALF');
  args.data = JSON.stringify(req.body);

  sendApiConnector
    .openConversation(brandID, args, req.header('LP-DOMAIN'))
    .then((resolve) => {

      if (handleStatusCode(resolve[1].statusCode)) {
        let conversationId = resolve[0][1].body.conversationId;
        res.send({"convId": conversationId});
      } else {
        res.status(resolve[1].statusCode).send(resolve[1].statusMessage);
      }

    }).catch((error) => {
    console.error("ERROR: Promise rejected", error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR)});
  });

});

router.post("/sendraw/:id", (req, res, next) => {
  let brandID = req.params.id;

  let args = {};
  args.data = {};
  args.headers = {};
  args.headers['content-type'] = req.header('content-type');
  args.headers['authorization'] = req.header('authorization');
  args.headers['X-LP-ON-BEHALF'] = req.header('X-LP-ON-BEHALF');
  args.data = JSON.stringify(req.body);


  sendApiConnector
    .sendRaw(brandID, args, req.header('LP-DOMAIN'))
    .then((resolve) => {
      console.log(resolve[1]);

      if (handleStatusCode(resolve[1].statusCode)) {
        res.send({"message": "Message successfully sent"});
      } else {
        res.status(resolve[1].statusCode).send(resolve[1].statusMessage);

      }
    }).catch((error) => {
    console.error("ERROR: Promise rejected", error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR)});
  });

});

router.post("/close/:id/conv/:convId", (req, res, next) => {
  let brandID = req.params.id;
  let convID = req.params.convId;

  let args = {};
  args.headers = {};
  args.headers['content-type'] = req.header('content-type');
  args.headers['authorization'] = req.header('authorization');
  args.headers['X-LP-ON-BEHALF'] = req.header('X-LP-ON-BEHALF');

  sendApiConnector
    .closeConversation(brandID, convID, args, req.header('LP-DOMAIN'))
    .then((resolve) => {

      if (handleStatusCode(resolve[1].statusCode)) {

        res.send({"message": "Conversation closed sucesfully"});

      } else {

        res.status(resolve[1].statusCode).send(resolve[1].statusMessage);

      }
    }).catch((error) => {
    console.error("ERROR: Promise rejected");
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR)});
  });

});

router.get("/alive", (req, res, next) => {
  res.send("Hello!!!!");
});

module.exports = router;
