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
const bodyParser = require('body-parser');
const logger = require('./server/util/logger');
const uuid = require('uuid/v4');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const passport = require('passport');
const authLocalStrategy = require('./server/auth/authLocalStrategy');
const router = express.Router();
const subscriptionsHandler = require('./server/util/subscriptionsHandler');

app.use(cors());
nconf.file({file: "settings.json"});
router.get("/", (req, res) => res.json({status: 'UP'}));

app.use("/health", router);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//receive webhooks notifications
app.use("/notifications", notifications);
// configure passport.js to use the local strategy
passport.use(authLocalStrategy());
// tell passport how to serialize the user
passport.serializeUser((user, done) => {
  //Here i have to save the user data in the format I want
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

const halfHour =  1800 * 1000;
app.use(session({
  genid: (req) => { return uuid()},
  store: new FileStore(),
  secret: process.env.secret || '582e3ed11562c6ed3808e3325fd',
  resave: true,
  cookie: {
    secure: 'auto',
    maxAge: halfHour,
    httpOnly: false,
    overwrite: false,
  },
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.get("/subscribe/notifications/:convid/:appKey", (req, res) => {
  req.isAuthenticated() ? subscriptionsHandler.handleSubscriptionRequest(req, res) : res.status(401).send("Unauthorized");
});
app.use('/demo', function (req, res, next) {
  req.isAuthenticated ? next() : res.status(401).send("Unauthorized");
});

app.use("/demo/installation", installationBridge);
app.use("/demo/account", accountConfBridge);
app.use("/demo/ums", umsBridge);
app.use("/demo/history", historyBridge);
//CSDS
app.use("/domains", csdsBridge);

app.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if(info) {return res.send(info.message)}
    if (err) { return next(err); }
    if (!user) { return res.redirect('/#/settings'); }
    req.login(user, (err) => res.send({bearer: user.bearer}));
  })(req, res, next);
});

app.get('/logout', (req, res, next) => {
  req.session.destroy((error) => {
    if(error) { res.status(500).send("LOG OUT ERROR");}
  });
  res.json({status: 'OK'});
});
app.get('/getSession', (req, res) => res.send(req.session));
app.get('/isAuthenticated',(req, res, next) => res.send(req.isAuthenticated()));
//Serve our UI
app.use(express.static('dist'));
//http server
app.listen(nconf.get("SERVER_HTTP_PORT"), () => {
  logger.info("listening");
  app.isReady = true;
  app.emit("ready", true);
});

module.exports = app;
