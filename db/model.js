/**
 * Created by K on 2016/11/17.
 */

var mongoose = require('mongoose');
var dbconfig = require('../dbconfig.js');

mongoose.connect(dbconfig.dburl);
//创建数据模型
var userSchema = new mongoose.Schema({
    username:String,
    password:String,
    email:{type:String,default:''}
});
exports.User = mongoose.model('userinfo',userSchema);

