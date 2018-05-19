var express = require('express');
var router = express.Router();
const articles = require('../models/articles')

router.get('/:_id',function(req,res,next){
    articles.getArticleById(req.params._id,(err, article)=>{
        if (err)
            throw err
        res.render('index',{ data: article,title: 'Articles' })
    })
});
router.post('/',function(req,res,next){
    articles.postArticle(function(err, article){
        if (err)
        throw err;
        res.json(article)
    })
})
module.exports = router;
