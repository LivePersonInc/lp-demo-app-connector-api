const express = require('express');
const app = express();
const nconf = require("nconf");
const fs = require('fs');
const cors = require('cors');
const umsBrigeServer = require('./server/umsBrige');
const installationBrige = require('./server/appInstallationBrige');
const accountConfBrige = require('./server/accountConfBrige');
const notifications = require('./server/notifications');
const domains = require('./server/connector/CsdsProperties');
const authenticationBrige = require('./server/authenticationBrige');
const csdsBrige = require('./server/csdsBrige');

const https = require('https');
const forceSsl = require('express-force-ssl');
const SSE = require('sse-nodejs');

//  configuration from a designated file.
nconf.file({file: "settings.json"});

//load certificates
const key = fs.readFileSync('./server/certs/dev.lpchatforconnectorapi.com.key');
const cert = fs.readFileSync('./server/certs/dev.lpchatforconnectorapi.com.crt');
const ca = fs.readFileSync('./server/certs/dev.lpchatforconnectorapi.com.crt');

const options = {
  key: key,
  cert: cert,
  ca: ca
};
app.use(cors());

https.createServer(options, app).listen(443);

domains.init("le92127075"); //TODO: THE DOMAINS HAS TO BE PASSED FROM THE  CLIENT!!

//Force https
//app.use(forceSsl);

app.use("/installation", installationBrige);
app.use("/account", accountConfBrige);
app.use("/ums", umsBrigeServer);
app.use("/notifications", notifications); //receive webhooks notifications
app.use("/authentication", authenticationBrige); //receive webhooks notifications
app.use("/domains", csdsBrige); //receive webhooks notifications
//Serve our UI
app.use(express.static('dist'));

//http server
app.listen("8282", function () {
  console.log("listening");
  app.isReady = true;
  app.emit("ready", true);
});


module.exports = app;
