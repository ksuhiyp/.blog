const mongoose = require('mongoose');
const articleSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  tags: {
    type: Array,
    required: false
  },
  categories: {
    type: Array,
    required: false
  },
  create_date: {
    type: Date,
    default: Date.now
  },
  description: {
    type: String,
    required: false
  },
  article_images: {
    main_image: {
      String
    },
    body_images: {
      type: Array
    }
  }
});
const Article = module.exports = mongoose.model('articles', articleSchema);

const dummy = require('mongoose-dummy');

const ignoredFields = ['_id', 'create_date'];


module.exports.getArticles = (callback, limit) => {
  Article.find(callback).limit(limit)
}

module.exports.getArticleById = (id, callback) => {
  Article.findById(id, callback);
}
module.exports.postArticle = (article, callback) => {
  let randomObject = dummy(Article, {
    ignore: ignoredFields,
    returnDate: true
  })
  Article.create(randomObject, callback)
}
module.exports.deleteOneArticle = function(query, callback) {
  Article.deleteOne(query, callback);
}
module.exports.deleteManyArticles = function(query, callback) {
  Article.deleteMany(query, callback);
}
module.exports.updateArticle = function(id, update, options, callback) {
  Article.findByIdAndUpdate(id, update, callback);
}


/**TODO:
seperate REST work into a contrller dir
 */
