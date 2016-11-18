var express = require('express');

var router = express.Router();
var models = require('../db/model');
var utils = require('../utils');
var auto = require('../middle/autoauth');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/reg', function(req, res, next) {
  res.render('user/reg');
});

//路径与上面访问注册页面的路径是一致的,只是动作是post,这种设计是RESTful设计原则
router.post('/reg',function(req,res,next){
  var user = req.body;
  if(user.password === user.repassword)
  {
    models.User.findOne({username:user.username},function(err,doc){
      if(doc)
      {
        //如果有值,用户名已存在
        req.flash('error',"用户名已存在");
        res.redirect("reg");
      }else
      {
            models.User.create(
                {
                  username:user.username,
                  password:utils.md5(user.password),
                  email:user.email,
                  avatar:'https://s.gravatar.com.avatar'+utils.md5(user.email)+'?s=40'
                },
            function(err,doc){
              if(err){
                req.flash('error',"注册失败请稍后再试");
                res.redirect("reg");
              }else
              {
                req.flash('success',"注册成功");
                //注册成功要重定向到登录页面
                //重定向是服务器端向客户端浏览器发出状态是302(301)的响应,告诉客户端浏览器要发出新的请求,地址是/0
                res.redirect("login");
              }
            });
      }
    });
  }else{
    //两次密码不一致
  }
  console.log(user);
});

router.get('/login',auto.checkNotLogin, function(req, res, next) {
  res.render('user/login');
});
router.post('/login', function(req, res, next) {

  var user = req.body;
  models.User.findOne({password:utils.md5(user.password)},function(err,doc){
    if(doc){
      //登录成功后,将用户的信息放入session保存
      req.session.user = doc;
      req.flash('success',"登录成功!");
      res.redirect('/');
    }else{
      req.flash('error',"登录失败!");
      res.redirect('login');
    }
  });

});
router.get('/logout',auto.checkLogin, function(req, res, next) {
  req.session.user = "";
  res.redirect('/');
});

module.exports = router;
