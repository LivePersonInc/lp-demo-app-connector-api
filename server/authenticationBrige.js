const express = require("express");
const router = express.Router();
const nconf = require("nconf");
const fetch = require("node-fetch");
const AuthenticationService = require("./services/AuthenticationService");
const domains = require('./connector/CsdsProperties');

nconf.file({file: "./settings.json"});

const authenticationService = new AuthenticationService(nconf);

router.post("/login/:id", function (req, res, next) {
  let body = "";
  let brandId = req.params.id;

  req.on('data', function (chunk) {
    body += chunk;
  });

  req.on('end', function () {
    let args = {};
    args.data = {};
    args.data = body;
    args.headers = {Accept: "application/json", "Content-Type": "application/json"};

    authenticationService.getBearerAuthorization(brandId,args)
      .then((resolve) => {
        if (handleStatusCode(resolve[1].statusCode)) {
          res.send(resolve[0]);
        } else {
          res.status(resolve[1].statusCode).send("Authentication error");
        }
      }).catch((error) => {
      console.error("ERROR: Promise rejected", error);
      res.status(500).send("Authentication error");
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
