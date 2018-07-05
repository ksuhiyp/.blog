const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel')
const passport = require('passport')
module.exports = () => {
  router.post('/login', passport.authenticate('local-login'), (req, res, next) => {
    // console.log(req.isAuthenticated(), req.user);
    res.status(200).json({'messege':'success'}).end();
  })
  router.post('/', (req, res, next) => {
    let body = req.body
    user = new userModel(body);
    user.save((err, user) => {
      if (err)
        res.status(200).json(err);
      else
        res.status(200).json(user)
    })
  });
  return router
}
