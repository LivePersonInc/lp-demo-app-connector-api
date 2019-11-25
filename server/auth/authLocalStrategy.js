const LocalStrategy = require('passport-local').Strategy;
const handleStatusCode = require('../util/handleStatusCode');
const IdpService = require("../services/IdpService");
const nconf = require("nconf");
const logger = require('../util/logger');
const CsdsService = require("../services/CsdsService");
const LOGIN_DOMAIN_NAME = "agentVep";

function authLocalStrategy() {
  return new LocalStrategy(
    { usernameField: 'username',
      passReqToCallback: true },
    ( req, username, password, done) => {
      try {
        nconf.file({file: "./settings.json"});
        const idpService = new IdpService(nconf);
        const csdsService = new CsdsService(nconf);

        let aux = username.split(':');
        let brandId = aux[0];
        let email = aux[1];
        let user = {};

        logger.debug("Brand id inside Local Strategy: " + brandId);

        let args = {};
        args.headers = {};
        args.headers['content-type'] = "application/json";
        args.data = JSON.stringify({username: email, password: password});

        csdsService.getDomainList(brandId)
          .then((resolve) => {
            if (!handleStatusCode(resolve[1].statusCode)) {
              return res.status(resolve[1].statusCode).send({error: "Something was wrong"});
            }

            const loginDomain = resolve[0].baseURIs.filter(d => d.service === LOGIN_DOMAIN_NAME)[0].baseURI;

            if (!loginDomain) {
              logger.error("ERROR: Domain with name: " + LOGIN_DOMAIN_NAME + " was not found");
              return;
            }

            idpService
              .logIn(brandId, args, loginDomain)
              .then((resolve) => {
                if (handleStatusCode(resolve[1].statusCode)) {
                  user = resolve[0];
                  if (user.config && user.config.isAdmin) {
                    return done(null, user);
                  } else {
                    logger.error("Unauthorized, Only admins users can login.");
                    return done(null, false, {message: 'Only admins users can login.\n'});
                  }
                } else {
                  logger.error("Unauthorized");
                  return done(null, false, {message: 'Invalid credentials.\n'});
                }

              }).catch((error) => {
              logger.error("ERROR: Promise rejected", error);
              return done(null, false, {message: 'Invalid credentials.\n'});
            });
          }).catch((error) => {
          logger.error("ERROR: Promise rejected", error);
          return done(null, false, {message: 'Invalid credentials.\n'});
        });
      } catch(error) {
        logger.error("ERROR: " + error);
        return done(null, false, {message: 'Invalid credentials.\n'});
      }
    });
}

module.exports = authLocalStrategy;
