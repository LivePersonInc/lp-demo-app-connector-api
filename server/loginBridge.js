const express = require("express");
const router = express.Router();
const nconf = require("nconf");
const HttpStatus = require('http-status-codes');
const IdpService = require("./services/IdpService");
const handleStatusCode = require('./util/handleStatusCode');

nconf.file({file: "./settings.json"});

const idpService = new IdpService(nconf);

router.post("/:id", (req, res, next) => {
  let brandId = req.params.id;
  let args = {};
  args.headers = {};
  args.headers['content-type'] = req.header('content-type');
  args.data = JSON.stringify(req.body);

  idpService
    .logIn(brandId, args, req.header('LP-DOMAIN'))
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
