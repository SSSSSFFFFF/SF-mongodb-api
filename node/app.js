

// 数据库设置在根目录 config.json
var json = require('../config.json');
// mongodb的ip
var mongoIp = json.mongoIp;
// 服务器ip
var host = json.serverHost;
// 数据库名
var dbName = json.dbName
//表名

var express = require('express');
var app = express();

//设置允许跨域访问该服务，禁止他人访问需关闭允许跨域
app.all('*', function (req, res, next) {
   res.header('Access-Control-Allow-Origin', '*');
   res.header('Access-Control-Allow-Headers', 'Content-Type');
   res.header('Access-Control-Allow-Methods', '*');
   res.header('Content-Type', 'application/json;charset=utf-8');
   next();
 });


var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://" + mongoIp + ":27017/";

var questions = [
   {
      data: 213,
      num: 444,
      age: 12
   },
   {
      data: 456,
      num: 678,
      age: 13
   }
];

//写个接口123
app.get('/123', function (req, res) {
   res.status(200),
      res.json(questions)
});

// POST method route
app.post("/collection", (req, res) => {
   //接收客户端请求主体数据
   req.on('data', (buf,err) => { 
      try{
         var obj = JSON.parse(buf.toString())
         buf = JSON.parse(buf.toString());
         console.log('buf',buf)
         var collectionName = buf.collectionName
         MongoClient.connect(url, {
            useNewUrlParser: true
         }, function (err, db) {
            if (err) throw err;
            var dbase = db.db(dbName);
            console.log('✅  created database:' + dbName);
            dbase.createCollection(collectionName, function (err, res) {
               if (err) throw err;
               console.log('✅  created collection:' + collectionName);
               db.close();
            });
         });
         res.send(buf);
      } catch(err){
         console.error(err)
      }
   });

});


//配置服务端口
var server = app.listen(8888, function () {
   console.log('✅  local address '+host+':8888')
   console.log('✅  查看接口文档 ../README.md')
})