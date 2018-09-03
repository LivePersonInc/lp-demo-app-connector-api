const express = require("express");
const router = express.Router();
const HttpStatus = require('http-status-codes');
const ConvHistoryService = require("./services/ConvHistoryService");
const handleStatusCode = require('./util/handleStatusCode');

const convHistoryService = new ConvHistoryService();

router.get("/:brandId/consumer/:consumerId", function (req, res, next) {
  let brandId = req.params.brandId;
  let consumerId = req.params.consumerId;

  let args = {};
  args.data = {};
  args.headers = {};
  args.headers['content-type'] = 'application/json';
  args.headers['authorization'] = req.header('authorization');

  convHistoryService
    .getHistoryByConsumerId(consumerId, brandId, args, req.header('LP-DOMAIN'))
    .then((resolve) => {
      if (handleStatusCode(resolve[1].statusCode)) {
        res.send(resolve[0]);
      } else {
        res.status(resolve[1].statusCode).send("Something wrong");
      }
    }).catch((error) => {
    console.error("ERROR: Promise rejected", error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR)});
  });
});

module.exports = router;
