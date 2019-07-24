const express = require("express");
const router = express.Router();
const SSE = require('sse-nodejs');
const logger = require('./util/logger');
const HttpStatus = require('http-status-codes');
const subscriptionsHandler = require('./util/subscriptionsHandler');

//webhooks notifications
router.post("/event", function (req, res, next) {
  const convId = subscriptionsHandler.getNotificationConversationId(req.body);
  if(!convId || !subscriptionsHandler.subscriptions[convId]) {
    //res.status(HttpStatus.BAD_REQUEST).send({error: HttpStatus.getStatusText(HttpStatus.BAD_REQUEST)});
    logger.error(`Webhooks event with wrong payload received or conversation id does not match`);
    res.json('OK');
  }else if(subscriptionsHandler.validateWebhooksEventRequestSignature(req, convId)){
    logger.debug("convId: " + convId);
    subscriptionsHandler.subscriptions[convId].sseObject.send(req.body);
    res.json('OK');
  } else {
    logger.error(`Webhooks event request with convID: ${convId} is not valid: UNAUTHORIZED`);
    res.json('OK');
   // res.status(HttpStatus.UNAUTHORIZED).send({error: HttpStatus.getStatusText(HttpStatus.UNAUTHORIZED)});
  }
});

module.exports = router;
