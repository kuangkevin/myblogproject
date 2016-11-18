var express = require('express');
var models = require('../db/model');
//加载express的路由模块
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  models.Article.find({},function(err,articles){
    console.log(articles);
    res.render('index', { title: 'zkingblog' ,articles:articles});
  });

});

module.exports = router;
