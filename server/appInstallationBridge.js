const express = require("express");
const router = express.Router();
const AppInstallationService = require("./services/AppInstallationService");
const HttpStatus = require('http-status-codes');
const handleStatusCode = require('./util/handleStatusCode');
const nconf = require("nconf");
const logger = require('./util/logger');
const getDomainObjectByServiceName = require('./util/subscriptionsHandler.js').getDomainObjectByServiceName;

nconf.file({file: "./settings.json"});

const appInstallationService = new AppInstallationService(nconf);

const serviceName = 'accountConfigReadWrite';

router.get("/:brandId", (req, res, next) => {
  let brandId = req.params.brandId;
  let args = {};
  args.data = {};
  args.headers = {};
  args.headers['content-type'] = 'application/json';
  args.headers['authorization'] = `Bearer ${req.session.passport.user.bearer}`;
  const domain = getDomainObjectByServiceName(serviceName, req.session.passport.user.csdsCollectionResponse).baseURI;

  appInstallationService
    .getAppsForBrandId(brandId, args, domain)
    .then((resolve) => {

      if (handleStatusCode(resolve[1].statusCode)) {
        res.send(resolve[0]);
      } else {
        res.status(resolve[1].statusCode).send({error: "Something was wrong"});
      }

    }).catch((error) => {
      logger.error("ERROR: Promise rejected", error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR)});
    });
});

router.get("/:brandId/:appId", (req, res, next) => {
  let brandId = req.params.brandId;
  let appId = req.params.appId;
  let args = {};
  args.data = {};
  args.headers = {};
  args.headers['content-type'] = 'application/json';
  args.headers['authorization'] = `Bearer ${req.session.passport.user.bearer}`
  const domain = getDomainObjectByServiceName(serviceName, req.session.passport.user.csdsCollectionResponse).baseURI;

  appInstallationService
    .getAppById(appId, brandId, args, domain)
    .then((resolve) => {

      if (handleStatusCode(resolve[1].statusCode)) {
        res.send(resolve[0]);
      } else {
        res.status(resolve[1].statusCode).send({error: "Something was wrong"});
      }

    }).catch((error) => {
    logger.error("ERROR: Promise rejected", error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR)});
  });
});

router.post("/:brandId", (req, res, next) => {
  let brandId = req.params.brandId;

  let args = {};
  args.data = {};
  args.headers = {};
  args.headers['content-type'] = 'application/json';
  args.headers['authorization'] = `Bearer ${req.session.passport.user.bearer}`
  args.data = JSON.stringify(req.body);
  const domain = getDomainObjectByServiceName(serviceName, req.session.passport.user.csdsCollectionResponse).baseURI;

  appInstallationService.installNewApp(brandId, args, domain)
    .then((resolve) => {

      if (handleStatusCode(resolve[1].statusCode)) {
        res.json('OK');
      } else {
        res.status(resolve[1].statusCode).send({error: "Something was wrong"});
      }

    }).catch((error) => {
      logger.error("ERROR: Promise rejected", error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR)});
    });
});

router.put("/:brandId/:appId", (req, res, next) => {
  let brandId = req.params.brandId;
  let appId = req.params.appId;

  let args = {};
  args.data = {};
  args.headers = {};
  args.headers['authorization'] = `Bearer ${req.session.passport.user.bearer}`
  args.data = JSON.stringify(req.body);
  const domain = getDomainObjectByServiceName(serviceName, req.session.passport.user.csdsCollectionResponse).baseURI;

  appInstallationService.getAppById(appId, brandId, args, domain)
    .then((data) => {
      args.headers['If-Match'] = data[1].headers['ac-revision'];
      args.headers['X-HTTP-Method-Override'] = 'PUT';
      args.headers['content-type'] = 'application/json';

      return appInstallationService.update(appId, brandId, args, domain)
        .then((resolve) => {

          if (handleStatusCode(resolve[1].statusCode)) {
            res.json('OK');
          } else {
            res.status(resolve[1].statusCode).send({error: "Something was wrong"});
          }
        })
    }).catch((error) => {
      logger.error("ERROR: Promise rejected", error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR)});
    });
});


module.exports = router;
