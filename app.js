const express = require('express');
const app = express();
const nconf = require("nconf");
const fs = require('fs');
const cors = require('cors')
const umsBrigeServer = require("./server/umsBrige");
const domains = require('./server/connector/CsdsProperties');
const https = require('https');


//load certificates

const key = fs.readFileSync('dev.lpchatforconnectorapi.com.key');
const cert = fs.readFileSync( 'dev.lpchatforconnectorapi.com.crt' );
const ca = fs.readFileSync( 'dev.lpchatforconnectorapi.com.crt' );

const options = {
  key: key,
  cert: cert,
  ca: ca
};


https.createServer(options, app).listen(8282, function () {

});

//  configuration from a designated file.
nconf.file({file:"settings.json"});


app.domains = domains;

app.use(cors());
app.use("/umsbrige", umsBrigeServer);
app.use(express.static('dist'));

app.listen("8383", function() {
  console.log("listening");
  app.isReady = true;
  app.emit("ready", true);
});




module.exports = app;
