const express = require("express");
const router = express.Router();
const AppInstallationService = require("./services/AppInstallationService");

const appInstallationService = new AppInstallationService();

router.get("/:brandId", function (req, res, next) {
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
        res.status(resolve[1].statusCode).send("Something wrong");
      }
    }).catch((error) => {
    console.error("ERROR: Promise rejected", error);
    res.status(500).send("somthing wrong");
  });
});

router.post("/:brandId", function (req, res, next) {
  let brandId = req.params.brandId;
  let body = "";

  req.on('data', function (chunk) {
    body += chunk;
  });
  req.on('end', function () {
    let args = {};
    args.data = {};
    args.headers = {};
    args.headers['content-type'] = 'application/json';
    args.headers['authorization'] = req.header('authorization');
    args.data = body;

    appInstallationService.installNewApp(brandId,args, req.header('LP-DOMAIN'))
      .then((resolve) => {
        if (handleStatusCode(resolve[1].statusCode)) {
          res.send("OK");
        } else {
          res.status(resolve[1].statusCode).send("Something wrong");
        }
      }).catch((error) => {
      console.error("ERROR: Promise rejected", error);
      res.status(500).send("somthing wrong");
    });
  });
});

router.put("/:brandId/:appId", function (req, res, next) {
  let brandId = req.params.brandId;
  let appId = req.params.appId;
  let body = "";

  req.on('data', function (chunk) {
    body += chunk;
  });
  req.on('end', function () {
    let args = {};
    args.data = {};
    args.headers = {};
    args.headers['authorization'] = req.header('authorization');
    args.data = body;

    appInstallationService.getAppById(appId, brandId, args, req.header('LP-DOMAIN')).then((data) => {
      args.headers['If-Match'] = data[1].headers['ac-revision'];
      args.headers['X-HTTP-Method-Override'] = 'PUT';
      args.headers['content-type'] = 'application/json';

      return appInstallationService.update(appId, brandId, args, req.header('LP-DOMAIN'))
        .then((resolve) => {
          if (handleStatusCode(resolve[1].statusCode)) {
            res.status(200).send();
          } else {
            res.status(resolve[1].statusCode).send("Something wrong");
          }
        })

    }).catch((error) => {
      console.error("ERROR: Promise rejected", error);
      res.status(500).send("somthing wrong");
    });
  });
});

function handleStatusCode(statusCode) {
  if (statusCode >= 200 && statusCode < 300) {
    return true;
  } else {
    console.error("ERROR: Status code: ", statusCode);
    return false;
  }
}

module.exports = router;
