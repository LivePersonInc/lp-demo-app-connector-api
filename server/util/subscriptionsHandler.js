'use strict';
const SSE = require('sse-nodejs');
const logger = require('./logger');
const subscriptionsHandler = {};
const hmacsha1 = require('hmacsha1');
//const HttpStatus = require('http-status-codes');
//const handleStatusCode = require('handleStatusCode');
const nconf = require("nconf");

nconf.file({file: "./settings.json"});

//const appInstallationService = new AppInstallationService(nconf);
const installationDomainName = 'accountConfigReadWrite';

subscriptionsHandler.subscriptions = [];

subscriptionsHandler.getNotificationConversationId = (notificationBody) => {
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
};

subscriptionsHandler.handleSubscriptionRequest = (req, res) => {
  logger.debug(JSON.stringify(req.session.passport.user.bearer));

  //TODO: get app secret given the appKey needed for notifications vailidation
  subscriptionsHandler.subscriptions[req.params.convid] = [SSE(res), req.params.appKey];;
  logger.debug("Client subscribed width: " + req.params.convid);
  subscriptionsHandler.subscriptions[req.params.convid][0].disconnect(function () {
    subscriptionsHandler.subscriptions.splice(req.params.convid,1);
    logger.debug("Client unsubscribed width: " + req.params.convid);
  });
};

subscriptionsHandler.validateNotificationSignature = (event, signature, appSecret) => {
  return ('sha1=' + hmacsha1(appSecret,event)) === signature;
};

function findAppSecret(req,res) {

};
module.exports = subscriptionsHandler;
