var express = require('express');
var router = express.Router();
const articles = require('../models/articleModel');

/**finds article by 
 * @_:id
 * in headers
 * returns
 * whole article Object  */
router.get('/', function (req, res, next) {
  articles.getArticleById(req.headers._id, (err, article) => {
    if (err)
      throw err;
    res.json(article);
  })
});
/**Posts article, currently piped to dummy data generator in articleModel.js
 * Params @article 
 * returns Object
 */
router.post('/', function (req, res, next) {
  articles.postArticle(function (err, article) {
    if (err)
      throw err;
    res.status(200).json(article);
  })
});
/**Deletes first article matches @cond 
 * returns deleted Object if done
 */
router.delete('/', function (req, res, next) {
  if (req.body._id.length > 1)
    articles.deleteMany(req.body._id, function (err, article) {
      if (err)
        throw err;
      res.json(article);
    });
  else
    articles.deleteOne(req.param._id, function (err, article) {
      if (err)
        throw err;
      res.json(article);

    });
});
router.put('/', function (req, res) {
  var id = req.headers._id;
  var update = req.body.body
  articles.findByIdAndUpdate(id, {"body":update}, function (err, article) {
    if (err)
      res.status(500).json(err);
    else
      res.json(article);

  });
});
module.exports = router;
