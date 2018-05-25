var express = require('express');
var router = express.Router();
const articles = require('../models/articleModel')
/* GET home page. */
router.get('/', function(req, res, next) {
  articles.getArticles(function(err,data){
    if (err){throw err}
    res.render('index', { data: data,title: 'Articles' });
});
});


module.exports = router;


/**TODO: 
 * refer to windsberg article about 
 * static express routing or find a way to 
 * make layout*/