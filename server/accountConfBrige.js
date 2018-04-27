const express = require("express");
const router = express.Router();
const nconf = require("nconf");
const fetch = require("node-fetch");
const AccountConfigService = require("./services/AccountConfigService");

nconf.file({file: "./settings.json"});

const accountConfigService = new AccountConfigService(nconf);

router.get("/properties/:id", function (req, res, next) {
  let brandId = req.params.id;
  let args = {};
  args.headers = {};
  args.headers['authorization'] = req.header('authorization');
  args.headers['Accept'] = 'application/json';

  accountConfigService
    .getAccountPropertyList(brandId, args)
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

router.post("/properties/:id", function (req, res, next) {
  let brandId = req.params.id;
  let body = "";

  req.on('data', function (chunk) {
    body += chunk;
  });
  req.on('end', function () {
    let args = {};
    args.data = {};
    args.headers = {};
    args.headers['content-type'] = 'application/json';
    args.headers['Accept'] = 'application/json';
    args.headers['X-HTTP-Method-Override'] = 'PUT';
    args.headers['authorization'] = req.header('authorization');
    args.data = body;
    console.log(args.headers);
    accountConfigService
      .updateAccountPropertyList(brandId,args)
      .then((resolve) => {
        console.log(resolve);
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
