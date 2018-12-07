const express = require("express");
const router = express.Router();
const SSE = require('sse-nodejs');
const logger = require('./util/logger');
const hmacsha1 = require('hmacsha1');
const HttpStatus = require('http-status-codes');

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
  if(!convId) {
    res.status(HttpStatus.BAD_REQUEST).send({error: HttpStatus.getStatusText(HttpStatus.BAD_REQUEST)});
  }else {

    if(subscriptions[convId]){
      subscriptions[convId].send(req.body);
    }
    res.json('OK');
  }

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

/*var hash = hmacsha1('e4vl53s0kcke2o7h5ck50cqra9', '{"kind":"notification","body":{"changes":[{"sequence":6,"originatorId":"a2e7db3bff972a18302869f88e3c4b08662c9c2c257510961b2bf2250ff4d341","originatorMetadata":{"id":"a2e7db3bff972a18302869f88e3c4b08662c9c2c257510961b2bf2250ff4d341","role":"CONSUMER"},"serverTimestamp":1543937700828,"event":{"type":"ContentEvent","message":"ds","contentType":"text/plain"},"conversationId":"f5ba6f66-bf4e-4db0-bcf1-e4b14faf5491","dialogId":"f5ba6f66-bf4e-4db0-bcf1-e4b14faf5491"}]},"type":"ms.MessagingEventNotification"}');
console.log(hash);*/

module.exports = router;
