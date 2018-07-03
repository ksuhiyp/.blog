const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel')
module.exports = (app, mongoose, passport) => {
  router.post('/login', (req, res, next) => {
    let body = req.body
    user = new userModel(body);
    user.save((err, user) => {
      if (err) throw new error(err);
      res.json(user)

    })


  })
  return router
}
