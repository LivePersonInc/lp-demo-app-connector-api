const express = require("express");
const router = express.Router();
const nconf = require("nconf");
const fetch = require("node-fetch");
const AppInstallationService = require("./services/AppInstallationService");

nconf.file({file: "./settings.json"});

const appInstallationService = new AppInstallationService(nconf);


router.get("/installations/:brandId", function (req, res, next) {
  let brandId = req.params.brandId;
  let args = {};
  args.data = {};
  args.headers = {};
  args.headers['content-type'] = req.header('content-type');
  args.headers['authorization'] = req.header('authorization');

  appInstallationService
    .getAppsForBrandId(brandId, args)
    .then((resolve) => {
      if (handleStatusCode(resolve[1].statusCode)) {
        let data= resolve[0][1].body;
        res.send( data);
      } else {
        res.status(resolve[1].statusCode).send("Something wrong");
      }
    }).catch((error) => {
    console.error("ERROR: Promise rejected", error);
    res.status(500).send("somthing wrong");
  });
});

router.post("/installation/:brandId", function (req, res, next) {
  let brandId = req.params.brandId;
  let body = "";

  req.on('data', function (chunk) {
    body += chunk;
  });
  req.on('end', function () {
    let args = {};
    args.data = {};
    args.headers = {};
    args.headers['content-type'] = req.header('content-type');
    args.headers['authorization'] = req.header('authorization');
    args.data = body;

    appInstallationService.installNewApp(brandId,args)
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

function handleStatusCode(statusCode) {
  if (statusCode >= 200 && statusCode < 300) {
    return true;
  } else {
    console.error("ERROR: Status code: ", statusCode);
    return false;
  }
}

module.exports = router;
