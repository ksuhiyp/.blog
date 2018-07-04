const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel')

module.exports = (app, mongoose, passport) => {
  router.post('/', (req, res, next) => {
    let body = req.body
    user = new userModel(body);
    user.save((err, user) => {
      if (err)
        res.status(204).json(err);
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
        res.status(204).json(err);
      else
        res.status(200).json(user)
    })

  })
  return router
}
