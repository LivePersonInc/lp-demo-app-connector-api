const express = require("express");
const router = express.Router();
const nconf = require("nconf");
const HttpStatus = require('http-status-codes');
const AccountConfigService = require("./services/AccountConfigService");
const handleStatusCode = require('./util/handleStatusCode');
const logger = require('./util/logger');

nconf.file({file: "./settings.json"});

const accountConfigService = new AccountConfigService(nconf);

router.get("/properties/:id", (req, res, next) => {
  let brandId = req.params.id;
  let args = {};

  args.headers = {};
  args.headers['authorization'] = req.header('authorization');
  args.headers['Accept'] = 'application/json';

  accountConfigService
    .getAccountPropertyList(brandId, args, req.header('LP-DOMAIN'))
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


module.exports = router;
