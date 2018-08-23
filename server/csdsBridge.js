const express = require("express");
const router = express.Router();
const nconf = require("nconf");
const CsdsService = require("./services/CsdsService");
const HttpStatus = require('http-status-codes');
const handleStatusCode = require('./util/handleStatusCode');

nconf.file({file: "./settings.json"});

const csdsService = new CsdsService(nconf);

router.get("/csds/:brandId", (req, res, next) => {
  let brandId = req.params.brandId;

  csdsService
    .getDomainList(brandId)
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

module.exports = router;
