var express = require('express');
var models = require('../db/model');
var router = express.Router();
var utils = require('../utils');

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
      }else
      {
        models.User.create({username:user.username,password:utils.md5(user.password),email:user.email},
            function(err,doc){
              if(err){

              }else
              {
                //注册成功要重定向到登录页面
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

router.get('/login', function(req, res, next) {
  res.render('user/login');
});
router.post('/login', function(req, res, next) {

  var user = req.body;
  models.User.findOne({password:utils.md5(user.password)},function(err,doc){
    if(doc){
      res.redirect("/");
    }else{

    }
  });

});
router.get('/logout', function(req, res, next) {
  res.send('退出登录页面');
});

module.exports = router;
