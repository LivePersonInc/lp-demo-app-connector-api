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
  let body = JSON.stringify(req.body);
  let convId = getNotificationConversationId(body);
  if(subscriptions[convId]){
    subscriptions[convId].send(body);
  }
  res.json('OK');
});

function getNotificationConversationId(notificationBody) {
  logger.debug(notificationBody);
  let jsonBody;
  let conversationId = null;

  try {
    jsonBody = JSON.parse(notificationBody);
    if(jsonBody.body.changes[0].hasOwnProperty("conversationId")) {

      conversationId = jsonBody.body.changes[0].conversationId;

    } else if(jsonBody.body.changes[0].hasOwnProperty("result") && jsonBody.body.changes[0].result.hasOwnProperty("convId")) {

      conversationId = jsonBody.body.changes[0].result.convId;

    }
  }catch(err) {
    logger.error("ERROR parsing JSON:", err);
  }
  return conversationId;
}

module.exports = router;
