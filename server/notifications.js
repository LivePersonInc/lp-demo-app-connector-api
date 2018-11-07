const express = require("express");
const router = express.Router();
const SSE = require('sse-nodejs');
const logger = require('./util/logger');

const subscriptions = [];

router.get("/subscribe/:convid", (req, res, next) => {
  subscriptions[req.params.convid] = SSE(res);
  logger.debug("Client subscribed width: " + req.params.convid);
  subscriptions[req.params.convid].disconnect(function () {
    subscriptions.splice(req.params.convid,1);
    logger.debug("Client unsubscribed width: " + req.params.convid);
  });
});

//webhooks notifications
router.post("/event", function (req, res, next) {
  let convId = getNotificationConversationId(req.body);
  if(subscriptions[convId]){
    subscriptions[convId].send(req.body);
  }
  res.json('OK');
});

function getNotificationConversationId(notificationBody) {
  logger.debug(JSON.stringify(notificationBody));

  const noConversationId = "";

  try {
    if(notificationBody.body.changes[0].hasOwnProperty("conversationId")) {
      return notificationBody.body.changes[0].conversationId;
    } else if(notificationBody.body.changes[0].hasOwnProperty("result") && notificationBody.body.changes[0].result.hasOwnProperty("convId")) {
      return notificationBody.body.changes[0].result.convId;
    }
  }catch(err) {
    logger.error("ERROR parsing notification JSON, the conversation ID cannot be found ", err);
  }
  return noConversationId;
}

module.exports = router;
