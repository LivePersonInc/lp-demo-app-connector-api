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
const uuid = require('uuid/v4');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const passport = require('passport');
const authLocalStrategy = require('./server/auth/authLocalStrategy');
const router = express.Router();

app.use(cors());

router.get("/", (req, res, next) => {
  res.json({status: 'UP'});
});
app.use("/health", router);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// configure passport.js to use the local strategy
passport.use(authLocalStrategy());

// tell passport how to serialize the user
passport.serializeUser((user, done) => {
  console.log('Inside serializeUser callback. User id is save to the session file store here');

  //Here i have to save the user data in the format I want
  done(null, user);
});

passport.deserializeUser((user, done) => {
  console.log('Inside deserializeUser callback. id ' + user);

  done(null, user);
});

nconf.file({file: "settings.json"});

app.use(session({
  genid: (req) => { return uuid()},
  store: new FileStore({
    checkPeriod: 86400000
  }),
  secret: 'keyboard cat', //TODO: ADD ENVIRONMENT VAR
  resave: false,
  cookie: {
    secure: false,
    maxAge: 824000,
    httpOnly: false,
    overwrite: true,
  },
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

//receive webhooks notifications
app.use("/notifications", notifications);

app.use('/demo', function (req, res, next) {
  if(req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send("ERROR");
  }
});

app.use("/demo/installation", installationBridge);
app.use("/demo/account", accountConfBridge);
app.use("/demo/ums", umsBridge);
app.use("/demo/history", historyBridge);

//CSDS
app.use("/domains", csdsBridge);


//app.use("/authentication", loginBridge);
app.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    console.log('Inside passport.authenticate() callback');
    if(info) {return res.send(info.message)}
    if (err) { return next(err); }
    if (!user) { return res.redirect('/#/settings'); }
    req.login(user, (err) => {
      console.log('Inside req.login() callback')
      return res.send({bearer: user.bearer});
    })
  })(req, res, next);
});

app.get('/logout', (req, res, next) => {
  req.session.destroy(function(error) {
    if(error) {
      res.status(500).send("LOG OUT ERROR");
    }
  });
  res.json({status: 'OK'});
});

app.get('/getSession', function(req, res) {
  res.send(req.session);
});

app.get('/isAuthenticated',(req, res, next) => {
  if(req.isAuthenticated()) {
    res.send(true);
  } else {
    res.send(false);
  }
});

//Serve our UI
app.use(express.static('dist'));

//http server
app.listen(nconf.get("SERVER_HTTP_PORT"), function () {
  logger.info("listening");
  app.isReady = true;
  app.emit("ready", true);
});

module.exports = app;
