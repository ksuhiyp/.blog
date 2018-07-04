const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel')
const passport = require('passport')
module.exports = () => {

  router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  }));
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

  //below method seemed to handle user id type of queries only noting that model is capable to handle any query
  router.get('/:userId', (req, res, next) => {

    userModel.findUser({
      "_id": req.params.userId
    }, (err, user) => {
      if (err)
        res.status(200).json(err);
      else
        res.status(200).json(user)
    })

  });

  //TODO define put and delete
  return router
}
