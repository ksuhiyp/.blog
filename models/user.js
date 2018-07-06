/**
Users can be Admins || Authors || Editors || *Visitors by design under @role attr
Admins only can grant access to this model

*/
const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    required: false
  },
  middleName: {
    type: String,
    required: false
  },
  lastName: {
    type: String,
    required: false
  },
  password: {
    type: String,
    required: true
  },
  profilePicture: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: false,
    unique: true
  },
  twitter: {
    type: String,
    required: false
  },
  country: {
    type: String,
    required: false
  },
  language: {
    type: String,
    required: false
  },
  mobile: {
    type: String,
    required: false
  }

});
//TODO salt the pass using bcrypt
const user = module.exports = mongoose.model('user', schema);
module.exports.createUser = (entity) => {
  let newUser = new user(entity);
  newUser.save(err, callback)
}
module.exports.findUser = (query, callback) => {
  user.findOne(query, callback)
}
module.exports.comparePassword = (password, userPassword, callback) => {
  if (password == userPassword)
    callback(null, true);
  else {
    callback(null, false)
  }
}
