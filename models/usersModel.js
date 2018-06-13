/**
Users can be Admins || Authors || Editors || *Visitors by design under @role attr
Admins only can grant access to this model

*/
const mongoose = require('mongoose');
const userModel = mongoose.Schema({
  userName: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  middleName: {
    type: String,
    required: false
  },
  lastName: {
    type: String,
    required: true
  },
  hash: {
    type: String,
    required: true
  },
  profilePicture: {
    type: String,
    required: flase
  },
  email: {
    type: String,
    required: true
  },
  twitter: {
    type: String,
    required: false
  },
  country: {
    type: String,
    required: flase
  },
  language: {
    type: String,
    required: true
  },
  mobile: {
    type: String,
    required: false
  }

})
