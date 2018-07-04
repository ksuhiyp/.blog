 // helper modules
 const express = require('express');
 const createError = require('http-errors');
 const path = require('path');
 const bodyParser = require('body-parser');
 const logger = require('morgan');
 const mongoose = require('mongoose');
 const passport = require('passport');
 const authintication = require('./auth/local-auth')(passport)
 const session = require('express-session');
 const db = require('./config/db');
 const app = express();
 const flash    = require('connect-flash');
 const userRouter = require('./routes/userRouter')(passport)
 // view engine setup
 app.set('views', path.join(__dirname, 'views'));
 app.set('view engine', 'ejs');
 //debugger
 app.use(logger('dev'));
 app.use(express.json());
 app.use(express.urlencoded({
   extended: false
 }));
 app.use(flash());

 //static dir
 app.use(express.static(path.join(__dirname, 'public')));

 app.use(bodyParser.json());
 //session
 app.use(session({
   secret: 'stray',
   resave: true,
   saveUninitialized: true
 }));
 app.use(flash())
 app.use(passport.initialize());
 app.use(passport.session());
 //Routers
 app.use('/', require('./routes/indexRouter'));
 app.use('/article', require('./routes/articleRouter'));
 app.use('/user', require('./routes/userRouter')(app, mongoose, passport));
 // error handler
 app.use(function(err, req, res, next) {
   // set locals, only providing error in development
   res.locals.message = err.message;
   res.locals.error = req.app.get('env') === 'development' ? err : {};

   // render the error page
   res.status(err.status || 500);
   res.render('error');
 });
 module.exports = app;
