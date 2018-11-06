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
const uuid = require('uuid/v4');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const passport = require('passport');
const authLocalStrategy = require('./server/auth/authLocalStrategy');
var bodyParser = require('body-parser');

// configure passport.js to use the local strategy
passport.use(authLocalStrategy());

// tell passport how to serialize the user
passport.serializeUser((user, done) => {
  console.log(user);
  console.log('Inside serializeUser callback. User id is save to the session file store here')

  //Here i have to save the user data in the format I want
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log('Inside deserializeUser callback. id ' + id)
  console.log(`The user id passport saved in the session file store is: ${id}`)
  const user = {id: '2f24vvg', email: "wsfsf", password: "sfsf"};

  done(null, user);
});

nconf.file({file: "settings.json"});

app.use(cors());

app.use(session({
  genid: (req) => {
    console.log('Inside the session middleware')
    console.log(req.sessionID)
    return uuid() // use UUIDs for session IDs
  },
  store: new FileStore(),
  secret: 'keyboard cat', //ADD ENVIRONMENT VAR
  resave: false,
  cookie: {
    secure: false,
    maxAge: 2160000000,
    httpOnly: false,
    overwrite: true,
  },
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/installation", installationBridge);
app.use("/account", accountConfBridge);
app.use("/ums", umsBridge);
app.use("/notifications", notifications); //receive webhooks notifications
app.use("/domains", csdsBridge);
app.use("/history", historyBridge);

//app.use("/authentication", loginBridge);
app.post('/authentication/:id', (req, res, next) => {
  console.log('Inside POST /login callback')
  passport.authenticate('local', (err, user, info) => {
    console.log('Inside passport.authenticate() callback');
    console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`)
    console.log(`req.user: ${JSON.stringify(req.user)}`)
    req.login(user, (err) => {
      console.log('Inside req.login() callback')
      console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`)
      console.log(`req.user: ${JSON.stringify(req.user)}`)
      return res.send('You were authenticated & logged in!\n');
    })
  })(req, res, next);
});

//Serve our UI
app.use(express.static('dist'));

//http server
app.listen(nconf.get("SERVER_HTTP_PORT"), function () {
  console.log("listening");
  app.isReady = true;
  app.emit("ready", true);
});

module.exports = app;
