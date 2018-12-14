const express = require("express");
const router = express.Router();
const SSE = require('sse-nodejs');
const logger = require('./util/logger');
const HttpStatus = require('http-status-codes');
const subscriptionsHandler = require('./util/subscriptionsHandler');

//webhooks notifications
router.post("/event", function (req, res, next) {
  let convId = subscriptionsHandler.getNotificationConversationId(req.body);
  if(!convId || !subscriptionsHandler.subscriptions[convId]) {
    res.status(HttpStatus.BAD_REQUEST).send({error: HttpStatus.getStatusText(HttpStatus.BAD_REQUEST)});
  }else {
    logger.debug("convId: " + convId);
    subscriptionsHandler.subscriptions[convId][0].send(req.body);
    res.json('OK');
  }
});

module.exports = router;
