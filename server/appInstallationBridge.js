const express = require("express");
const router = express.Router();
const AppInstallationService = require("./services/AppInstallationService");
const HttpStatus = require('http-status-codes');
const handleStatusCode = require('./util/handleStatusCode');
const nconf = require("nconf");

nconf.file({file: "./settings.json"});

const appInstallationService = new AppInstallationService(nconf);

router.get("/:brandId", (req, res, next) => {
  let brandId = req.params.brandId;
  let args = {};
  args.data = {};
  args.headers = {};
  args.headers['content-type'] = 'application/json';
  args.headers['authorization'] = req.header('authorization');

  appInstallationService
    .getAppsForBrandId(brandId, args, req.header('LP-DOMAIN'))
    .then((resolve) => {

      if (handleStatusCode(resolve[1].statusCode)) {
        res.send(resolve[0]);
      } else {
        res.status(resolve[1].statusCode).send({error: "Something was wrong"});
      }

    }).catch((error) => {
      console.error("ERROR: Promise rejected", error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR)});
    });
});

router.post("/:brandId", (req, res, next) => {
  let brandId = req.params.brandId;

  let args = {};
  args.data = {};
  args.headers = {};
  args.headers['content-type'] = 'application/json';
  args.headers['authorization'] = req.header('authorization');
  args.data = JSON.stringify(req.body);

  appInstallationService.installNewApp(brandId, args, req.header('LP-DOMAIN'))
    .then((resolve) => {

      if (handleStatusCode(resolve[1].statusCode)) {
        res.json('OK');
      } else {
        res.status(resolve[1].statusCode).send({error: "Something was wrong"});
      }

    }).catch((error) => {
      console.error("ERROR: Promise rejected", error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR)});
    });
});

router.put("/:brandId/:appId", (req, res, next) => {
  let brandId = req.params.brandId;
  let appId = req.params.appId;

  let args = {};
  args.data = {};
  args.headers = {};
  args.headers['authorization'] = req.header('authorization');
  args.data = JSON.stringify(req.body);

  appInstallationService.getAppById(appId, brandId, args, req.header('LP-DOMAIN')).then((data) => {
    args.headers['If-Match'] = data[1].headers['ac-revision'];
    args.headers['X-HTTP-Method-Override'] = 'PUT';
    args.headers['content-type'] = 'application/json';

    return appInstallationService.update(appId, brandId, args, req.header('LP-DOMAIN'))
      .then((resolve) => {

        if (handleStatusCode(resolve[1].statusCode)) {
          res.json('OK');
        } else {
          res.status(resolve[1].statusCode).send({error: "Something was wrong"});
        }

      })

  }).catch((error) => {
    console.error("ERROR: Promise rejected", error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR)});
  });
});


module.exports = router;
