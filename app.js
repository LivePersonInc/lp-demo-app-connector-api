process.title = "demoapp";

const express = require('express');
const app = express();
const nconf = require("nconf");
const cors = require('cors');
const umsBridge = require('./server/umsBridge');
const installationBridge = require('./server/appInstallationBridge');
const accountConfBridge = require('./server/accountConfBridge');
const notifications = require('./server/notifications');
const csdsBridge = require('./server/csdsBridge');
const historyBridge = require('./server/convHistoryBridge');
const loginBridge = require('./server/loginBridge');
const bodyParser = require('body-parser');
const logger = require('./server/util/logger');
const router = express.Router();

app.use(cors());

router.get("/", (req, res, next) => {
  res.json({status: 'UP'});
});
app.use("/health", router);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/installation", installationBridge);
app.use("/account", accountConfBridge);
app.use("/ums", umsBridge);
app.use("/notifications", notifications); //receive webhooks notifications
app.use("/domains", csdsBridge);
app.use("/history", historyBridge);
app.use("/authentication", loginBridge);

//Serve our UI
app.use(express.static('dist'));

//http server
app.listen(nconf.get("SERVER_HTTP_PORT"), function () {
  logger.info("listening");
  app.isReady = true;
  app.emit("ready", true);
});

module.exports = app;
