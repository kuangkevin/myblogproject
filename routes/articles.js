/**
 * Created by K on 2016/11/16.
 */
var express = require('express');
var auto = require('../middle/autoauth');
var router = express.Router();
var models = require('../db/model');
var utils = require('../utils');
var multer  = require('multer');
var markdown = require('markdown').markdown;
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});
//添加文章
router.get('/add',auto.checkLogin,function(req, res, next) {
    //console.log(req.body);
    res.render('article/add');
});

router.post('/add',auto.checkLogin, function(req, res, next) {
    var article = req.body;
    console.log(req.session.user._id);
    models.Article.create({
        title:article.title,
        content:article.content,
        img:article.img,
        user:req.session.user._id
    },function(err,art){
        if(err)
        {
            req.flash('error','发布失败,请稍后再试');
            res.redirect('add');
        }else{
            //console.log(art);
            req.flash('success','发布成功');
            console.log(req.session.user.username);
            res.redirect('/');
        }
    })
});
//查看文章
router.get('/detail/:id', function(req, res, next) {
    models.Article.findById(req.params.id).populate('user').exec(function(err,articles){
        articles.content = markdown.toHTML(articles.content);
        res.render('article/detail',{articles:articles});
    });

});
module.exports = router;