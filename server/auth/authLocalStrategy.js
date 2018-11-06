const LocalStrategy = require('passport-local').Strategy;
const IdpService = require("../services/IdpService");
const handleStatusCode = require('../util/handleStatusCode');

function authLocalStrategy() {
  return new LocalStrategy(
    { usernameField: 'username' },
    (username, password, done) => {

      let aux = username.split('-');
      let brandId = aux[0];
      let email = aux[1];


      console.log("BRANDID inside Local Strategy" + brandId);


      // here is where you make a call to the database
      // to find the user based on their username or email address
      // for now, we'll just pretend we found that it was users[0]
      const user = {id: '2f24vvg', token: "dsgsdg",email: username, password: password};

      console.log('Local strategy returned true')
      return done(null, user)

    });
};

module.exports = authLocalStrategy;
