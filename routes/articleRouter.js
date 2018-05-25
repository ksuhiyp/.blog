var express = require('express');
var router = express.Router();
const articles = require('../models/articleModel');

 /**finds article by 
  * @_:id
  * returns
  * whole article Object  */
router.get('/:_id',function(req,res,next){
    articles.getArticleById(req.params._id,(err, article)=>{
        if (err)
            throw err;
        res.json(article);
    })
});
/**Posts article, currently piped to dummy data generator in the model
 * Params @article 
 * returns Object
 */
router.post('/',function(req,res,next){
    articles.postArticle(function(err, article){
        if (err)
        throw err;
        res.json(article);
    });
});
/**Deletes first article matches @cond 
 * returns deleted Object if done
 */
router.delete('/',function(req,res,next){
    console.log(req.body._id)
    if (req.body._id.length>1)
    articles.deleteMany(req.body._id,function(err, article){
        if (err)
        throw err;
        res.json(article);
    });
    else
    articles.deleteOne(req.param._id, function(err, article){
        if (err)
        throw err;
        res.json(article);

    });

    

});
module.exports = router;
