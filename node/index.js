var express = require('express');
var app = express();


var dbName = 'sf',
    collectionName = '';
//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});


var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://139.196.102.62:27017/";

var questions = [{
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
app.post("/user", (req, res) => {
    //接收客户端请求主体数据

    req.on('data', (buf, err) => {

        try {
            var obj = JSON.parse(buf.toString())
            buf = JSON.parse(buf.toString());
            console.log('buf', buf)
            MongoClient.connect(url, {
                useNewUrlParser: true
            }, function (err, db) {
                if (err) throw err;
                console.log('created database');
                var dbase = db.db(dbName);
                dbase.createCollection('site', function (err, res) {
                    if (err) throw err;
                    console.log("created collection!");
                    db.close();
                });
            });
            res.send(buf);
        } catch (err) {
            console.error(err)
        }
    });

});


//配置服务端口
var server = app.listen(8000, function () {
    console.log('server address http://139.196.102.62:8000/123');
    console.log('local address http://localhost:8000/123')
})