const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const config = require('./main');

// Setup work and export for the JWT passport strategy
module.exports = function(passport) {
	console.log("config.secret ",config.secret)
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.secret
  };
	console.log("passport")
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
	console.log("jwt_payload")
    done(null,'asdasdqwe234wefrw4tgsdf')
  }));
};
