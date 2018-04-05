const express = require("express");
const router = express.Router();
const nconf = require("nconf");
const fetch = require("node-fetch");
const SSE = require('sse-nodejs');
const app  = require("../app.js");

nconf.file({file: "./settings.json"});
/* http://localhost:8000/testconnector/event */

router.get("/subscribe", function (req, res, next) {
  app.see =  SSE(res);
  app.see.send({"Data":"dsgs"});
  console.log("Client subscribed");
});

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
    app.see.send({"message":"received"}); //TODO Add data
    res.send("ok");
  if(app.see){
      console.log("send event");
      app.see.sendEvent('time', function () {
        return new Date
      });
    }
  });

});



module.exports = router;
