const express = require('express');
const app = express();
const nconf = require("nconf");
const fs = require('fs');
const cors = require('cors');
const umsBridge = require('./server/umsBridge');
const installationBridge = require('./server/appInstallationBridge');
const accountConfBridge = require('./server/accountConfBridge');
const notifications = require('./server/notifications');
const csdsBridge = require('./server/csdsBridge');
const https = require('https');
var bodyParser = require('body-parser');

//load certificates
const key = fs.readFileSync('./server/certs/dev.lpchatforconnectorapi.com.key');
const cert = fs.readFileSync('./server/certs/dev.lpchatforconnectorapi.com.crt');
const ca = fs.readFileSync('./server/certs/dev.lpchatforconnectorapi.com.crt');

const options = {
  key: key,
  cert: cert,
  ca: ca
};

nconf.file({file: "settings.json"});

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/installation", installationBridge);
app.use("/account", accountConfBridge);
app.use("/ums", umsBridge);
app.use("/notifications", notifications); //receive webhooks notifications
app.use("/domains", csdsBridge);

//Serve our UI
app.use(express.static('dist'));

https.createServer(options, app).listen(443);

//http server
app.listen(nconf.get("SERVER_HTTP_PORT"), function () {
  console.log("listening");
  app.isReady = true;
  app.emit("ready", true);
});

module.exports = app;
