const express = require('express');
const path = require('path');
const http = require('http');
const app = express();
const nconf = require("nconf");
const cors = require('cors')
const umsBrigeServer = require("./server/umsBrige");
const domains = require('./server/connector/CsdsProperties');
const bodyParser = require('body-parser')
//  configuration from a designated file.
nconf.file({file:"settings.json"});

app.domains = domains;
//app.use( bodyParser() );

app.use(cors());
app.use("/umsbrige", umsBrigeServer);
app.use(express.static('dist'));
app.get("/chat", function (req,res) {
  res.sendFile(__dirname +"/dist/index.html");
})
app.listen("8282", function() {
  console.log("listening");
  app.isReady = true;
  app.emit("ready", true);
});

/*domains.init().then(function (app) {


}.bind(null, app));*/



module.exports = app;
