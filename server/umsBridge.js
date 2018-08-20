const express = require("express");
const router = express.Router();
const nconf = require("nconf");
const fetch = require("node-fetch");
const SendApiConnector = require("./services/SendApiConnectorService");

nconf.file({file: "./settings.json"});

const sendApiConnector = new SendApiConnector(nconf);

router.post("/openconv/:id", function (req, res, next) {
  let brandID = req.params.id;
  let body = "";

  req.on('data', function (chunk) {
    body += chunk;
  });
  req.on('end', function () {
    let args = {};
    args.data = {};
    args.headers = {};
    args.headers['content-type'] = req.header('content-type');
    args.headers['authorization'] = req.header('authorization');
    args.headers['X-LP-ON-BEHALF'] = req.header('X-LP-ON-BEHALF');
    args.data = body;

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
      res.status(500).send("Something was wrong");
    });
  });

});

router.post("/sendraw/:id", function (req, res, next) {
  let brandID = req.params.id;
  let body = "";
  req.on('data', function (chunk) {
    body += chunk;
  });
  req.on('end', function () {
    let args = {};
    args.data = {};
    args.headers = {};
    args.headers['content-type'] = req.header('content-type');
    args.headers['authorization'] = req.header('authorization');
    args.headers['X-LP-ON-BEHALF'] = req.header('X-LP-ON-BEHALF');
    args.data = body;

    sendApiConnector
      .sendRaw(brandID, args, req.header('LP-DOMAIN'))
      .then((resolve) => {
        if (handleStatusCode(resolve[1].statusCode)) {
          res.send({"message": "Message successfully sent"});
        } else {
          res.status(resolve[1].statusCode).send(resolve[1].statusMessage);
        }
      }).catch((error) => {
      console.error("ERROR: Promise rejected", error);
      res.status(500).send('Something was wrong!');
    });
  });

});

router.post("/close/:id/conv/:convId", function (req, res, next) {
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
    res.status(500).send('Something was wrong!')
  });

});

router.get("/alive", function (req, res, next) {
  res.send("Hello!!!!");
});

function handleStatusCode(statusCode) {
  if (statusCode >= 200 && statusCode < 300) {
    return true;
  } else {
    console.error("ERROR: Status code: ", statusCode);
    return false;
  }
}

module.exports = router;
