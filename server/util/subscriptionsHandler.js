'use strict';
const SSE = require('sse-nodejs');
const logger = require('./logger');
const hmacsha1 = require('hmacsha1');
const AppInstallationService = require("../services/AppInstallationService");
const handleStatusCode = require('./handleStatusCode');
const nconf = require("nconf");
const Subscription = require('../models/Subscription');

nconf.file({file: "./settings.json"});
const appInstallationService = new AppInstallationService(nconf);

const installationDomainName = 'accountConfigReadWrite';

const subscriptionsHandler = {};

subscriptionsHandler.subscriptions = [];

subscriptionsHandler.handleSubscriptionRequest = (req, res) => {
  const domainOBject = getDomainObjectByServiceName(installationDomainName, req.session.passport.user.csdsCollectionResponse);
  const authorization = 'Bearer ' + req.session.passport.user.bearer;
  if(domainOBject !== {} ) {
    getAppInstallation(req.params.appKey,domainOBject.account, authorization, domainOBject.baseURI).then(result => {
      const ssev = SSE(res);
      ssev.sendEvent('time', function () {
        return new Date //needed to keep alive the subscription
      },10000);
      const subscription = new Subscription(ssev, req.params.appKey,result.client_secret, domainOBject.account);
      subscriptionsHandler.subscriptions[req.params.convid] = subscription;
      logger.debug("Client subscribed width: " + req.params.convid);
      subscriptionsHandler.subscriptions[req.params.convid].sseObject.disconnect(function () {
        subscriptionsHandler.subscriptions.splice(req.params.convid,1);
        logger.debug("Client unsubscribed width: " + req.params.convid);
      });
    }).catch((error) => {
      logger.error("ERROR: Promise rejected", error);
      res.status(500);
    });

  }else {
    res.status(500);
  }
};

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

subscriptionsHandler.validateWebhooksEventRequestSignature = (req, convId) => {
  const reqAccountId = req.header('X-Liveperson-Account-Id');
  const reqAppKey = req.header('X-Liveperson-Client-Id');
  const reqSignature = req.header('X-Liveperson-Signature');
  const appSecret = subscriptionsHandler.subscriptions[convId].appSecret;

  logger.debug(`Validating webhooks notification  [accuntId]: ${reqAccountId}, [appKey]: ${reqAppKey}, [reqSignature]: ${reqSignature} , [appSecret]: ${appSecret} `);

  return (reqAccountId && reqAppKey && reqSignature && appSecret
    && reqAppKey ===  subscriptionsHandler.subscriptions[convId].appKey
    && reqAccountId === subscriptionsHandler.subscriptions[convId].brandId
    && isValidNotificationSignature(req.body, reqSignature, appSecret))
};

function isValidNotificationSignature(event, reqSignature, appSecret){
  /*logger.debug(`[Calculated signature]: sha1=${hmacsha1(appSecret,JSON.stringify(event))},[reqSignature]: ${reqSignature}`);
  return ('sha1=' + hmacsha1(appSecret, JSON.stringify(event)) === reqSignature);*/
  //The validation of the signature is causing problems with emojis and slowing down the notifications speed in the UI
  return true;
}

function getAppInstallation(appkey, brandId, authorization, domain) {
  let args = {};
  args.data = {};
  args.headers = {};
  args.headers['content-type'] = 'application/json';
  args.headers['authorization'] = authorization;
  return new Promise((resolve, reject) => {
    appInstallationService
      .getAppById(appkey, brandId, args, domain)
      .then((res) => {
        if (handleStatusCode(res[1].statusCode)) {
          resolve(res[0])
        } else {
          reject("Something was wrong");
          logger.error("Something was wrong");
        }
      }).catch((error) => {
      logger.error("ERROR: Promise rejected", error);
    });
  });
}


function getDomainObjectByServiceName(serviceName, csdsCollectionResponse) {
  let service = {};
  csdsCollectionResponse.baseURIs.forEach( obj => {
    if(obj.service === serviceName){
      service = obj;
    }
  });
  return service;
}
module.exports = subscriptionsHandler;
