const LocalStrategy = require('passport-local').Strategy;
const init = require('./init');
const User = require('../models/user');

module.exports = (passport) => {
  passport.use('local-login', new LocalStrategy({
    passReqToCallback: true
  }, (req, username, password, done) => {
    if (username)
      User.findOne({
        "userName": username
      }, (err, user) => {
        if (err)
          return done(err);
        if (!user)
          return done(null, false, req.flash('loginMessage', 'No user found.'))
        User.comparePassword(password, user.password, (err, isMatch) => {
          if (err) {
            return done(err);
          }

          if (!isMatch) {
            return done(null, false)
            // return done(null, false, req.flash('loginMessage', 'password dose not match!'))
          }

          return done(null, user);

        })

      })
  }));
  init();
}
