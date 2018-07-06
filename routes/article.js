var express = require('express');
var router = express.Router();
const articles = require('../models/article');
const ensureLoggedIn = require('../auth/ensureLoggedIn')

/**finds article by
 * @_:id
 * in headers
 * returns
 * whole article Object  */

router.all('*', ensureLoggedIn('/auth/login'), (req, res, next) => {
  next();
});
router.get('/', function(req, res, next) {
  console.log(req.flash())
  if (req.headers._id)
    articles.getArticleById(req.headers._id, (err, article) => {
      if (err)
        throw err;
      res.json(article);
    })
  else {
    articles.getArticles(function(err, articles) {
      if (err) {
        throw err
      }
      res.status(200).json(articles);
    });
  }
});

/**Posts article, currently piped to dummy data generator in article.js
 * Params @article
 * returns Object
 */
router.post('/', function(req, res, next) {
  let body = req.body;
  console.log(body);
  articles.postArticle(body, function(err, body) {
    if (err)
      res.status(500).json(err);
    else
      res.status(200).json(body);
  })
});
/**Deletes first article matches @cond
 * returns deleted Object if done
 */
//TODO:to check wiered behaviour of delete one when there is no succefull deletion
router.delete('/', function(req, res, next) {
  if (req.body._id) {
    console.log(req.body._id);
    articles.deleteMany({
      _id: {
        $in: req.body._id
      }
    }, function(err, article) {
      if (err)
        res.status(500).json(req);
      res.status(200).json(article);
    });
  } else {
    console.log(req.query._id);
    articles.deleteOneArticle({
      _id: req.query._id
    }, function(err) {
      if (err)
        res.status(500).json();
      res.status(200);

    });
  }
});
router.put('/', function(req, res) {
  var id = req.query._id;
  var update = req.body
  articles.updateArticle(id, update, null, function(err, article) {
    console.log(id, update);
    if (err)
      res.status(500).json(err);
    else
      res.status(200).json(article);

  });
});
module.exports = router;
