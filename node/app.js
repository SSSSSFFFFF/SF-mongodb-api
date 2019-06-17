// 数据库设置在根目录 config.json
var json = require('../config.json');
// mongodb的ip
var mongoIp = json.mongoIp;
// 服务器ip
var host = json.serverHost;
//端口号
var port = json.port

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


// 创每个接口都要建库和表（有了则不创建）,传递参数和type = api的值
var dbAndCol = (req, res, type)=>{
   //接收客户端请求主体数据
   req.on('data', (buffer, err) => {
      try {
         let buf = JSON.parse(buffer.toString());
         MongoClient.connect(url, {
            useNewUrlParser: true
         }, function (err, db) {
            try {
               if (err) throw err;
               // 创建数据库
               let dbase = db.db(buf.dataBase);
               let col = buf.collectionName
               console.log('✅  created database:' + buf.dataBase);
               // 添加表和数据
               apis(db, buf, dbase, col, res, type);
            } catch (e) {
               console.error(e)
            }
            
         });
      } catch (err) {
         console.error(err)
      }
   });
}

// 通过api的type来区别做哪些对应的操作
var apis = (db, buf, dbase, col, response, type) => {
   // 传过来的api的类型
   console.log('🏽',type)
   if(type == 'add'){
      // 添加时间
      buf.data.forEach(element => {
         element.createTime = new Date()
      });
      dbase.collection(col).insertMany(buf.data, function (err, res) {
         if (err) throw err;
         console.log("✅  data insert success");
         // 发送返回值
         response.send(buf);
         db.close();
      });
   } else if(type == 'query'){
      console.log(buf.data)
      dbase.collection(col).find(buf.data).toArray(function (err, result) {
         if (err) throw err;
         response.send(result);
         db.close();
     });
   }
   
}
// 添加库，表和数据接口
app.post("/add", (req, res) => {
   dbAndCol(req, res , 'add');
});

// 查询接口
app.post("/query",(req,res) => {
   dbAndCol(req, res, 'query');
})


// 配置服务端口
var server = app.listen(port, function () {
   console.log('✅  local address '+ host + ':' + port)
   console.log('✅  查看接口文档 ../README.md')
})