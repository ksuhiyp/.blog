const express = require('express');
const router = express.Router();
const user = require('../models/user')
const passport = require('passport');
const ensureLoggedIn = require('../auth/ensureLoggedIn')

module.exports = () => {


  router.all('*', ensureLoggedIn(), (req, res, next) => {
    console.log(req.isAuthenticated());
    next();
  });

  //below method seemed to handle user id type of queries only noting that model is capable to handle any query
  router.get('/:userId', (req, res, next) => {

    user.findUser({
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