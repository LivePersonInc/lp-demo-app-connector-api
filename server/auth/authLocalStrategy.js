const LocalStrategy = require('passport-local').Strategy;
const handleStatusCode = require('../util/handleStatusCode');
const IdpService = require("../services/IdpService");
const nconf = require("nconf");
const logger = require('../util/logger');

function authLocalStrategy() {
  return new LocalStrategy(
    { usernameField: 'username',
      passReqToCallback: true },
    ( req, username, password, done) => {
      nconf.file({file: "./settings.json"});
      const idpService = new IdpService(nconf);
      const idpDomain = req.header('LP-DOMAIN');
      let aux = username.split(':');
      let brandId = aux[0];
      let email = aux[1];
      let user = {};

      logger.debug("Brand id inside Local Strategy: " + brandId);

      let args = {};
      args.headers = {};
      args.headers['content-type'] = "application/json";
      args.data = JSON.stringify({username: email, password: password});

      idpService
        .logIn(brandId, args, idpDomain)
        .then((resolve) => {

          if (handleStatusCode(resolve[1].statusCode)) {
            user = resolve[0];
            return done(null, user);
          } else {
            logger.error("Unauthorized");
            return done(null, false, { message: 'Invalid credentials.\n' });
          }

        }).catch((error) => {
        logger.error("ERROR: Promise rejected", error);
        return done(null, false, { message: 'Invalid credentials.\n' });
       });

    });
}

module.exports = authLocalStrategy;
