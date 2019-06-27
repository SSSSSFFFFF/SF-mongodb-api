// mongodb数据库
var mongodb = require('./mongodb');
mongodb.mongodbFunc();

// token登陆验证
var token = require('./token');
token.jsonWebToken();