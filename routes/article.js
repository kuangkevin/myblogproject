/**
 * Created by K on 2016/11/16.
 */
var express = require('express');
var auto = require('../middle/autoauth');
var router = express.Router();
var models = require('../db/model');
var utils = require('../utils');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});
//添加文章
router.get('/add',auto.checkLogin,function(req, res, next) {
    res.render('article/add');
});
router.post('/add',auto.checkLogin, function(req, res, next) {
    var article = req.body;
    models.Article.create({
        title:article.title,
        content:article.content,
        user:req.session.user._id,
        createTime:{type:Date,default:new Date().now}
    },function(err,art){
        if(err)
        {
            req.flash('error','发布失败,请稍后再试');
            res.redirect('add');
        }else{
            console.log(art);
            req.flash('success','发布成功');
            res.redirect('/');
        }
    })
});
//查看文章
router.get('/view', function(req, res, next) {
    res.send('查看文章');
});


module.exports = router;