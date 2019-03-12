const express = require("express");
const router = express.Router();
const nconf = require("nconf");


nconf.file({file: "./settings.json"});

router.get("/JWTtoken/:id", (req, res, next) => {

  console.log("GET JWT: ", req.sessionID);

  let brandID = req.params.id;

  /*let args = {};
  args.data = {};
  args.headers = {};
  args.headers['content-type'] = req.header('content-type');
  args.headers['authorization'] = req.header('authorization');
  args.headers['X-LP-ON-BEHALF'] = req.header('X-LP-ON-BEHALF');
  args.headers['Client-Properties'] = req.header('Client-Properties');

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
    logger.error("ERROR: Promise rejected", error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR)});
  });*/
});

router.get("/JWTtoken", (req, res, next) => {
  res.send("Hello JWT!!!!");
});

module.exports = router;
