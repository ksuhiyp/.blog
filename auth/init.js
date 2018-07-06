const passport = require('passport');
const User = require('../models/user');

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user._id)
  });
  passport.deserializeUser((id, done) => {
    User.findOne({
      "_id": id
    }, (err, user) => {
      done(err, user);

    })
  })
}
