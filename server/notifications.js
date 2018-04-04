const express = require("express");
const router = express.Router();
const nconf = require("nconf");
const fetch = require("node-fetch");

nconf.file({file: "./settings.json"});
/* http://localhost:8000/testconnector/event */


router.post("/event", function (req, res, next) {
  let body = "";
  req.on('data', function (chunk) {
    body += chunk;
  });
  req.on('end', function () {
    let args = {};
    args.data = {};
    args.data = body;

    console.log(body);
    res.send("ok");
  });

});



module.exports = router;
