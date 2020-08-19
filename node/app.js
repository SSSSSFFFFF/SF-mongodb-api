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
var dbAuth = json.dbAuth;
var dbPasswords = json.dbPasswords;
var bodyParser = require('body-parser');
// parse application/json
app.use(bodyParser.json())
//设置允许跨域访问该服务，禁止他人访问需关闭允许跨域
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});


var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://" + dbAuth + ':' + dbPasswords + '@' + mongoIp + ":27017/";


/* 创每个接口都要建库和表（有了则不创建）,传递参数和type = api的值 */
var dbAndCol = (req, res, type) => {
    //接收客户端请求主体数据
        try {
            let buf = req.body;
            MongoClient.connect(url, {
                useNewUrlParser: true
            }, function (err, db) {
                try {
                    if (err) throw err;
                    // 创建数据库
                    let dbase = db.db(buf.dataBase);
                    let col = buf.collectionName
                    console.log('database:' + buf.dataBase + '✅');
                    // 添加表和数据
                    apis(db, buf, dbase, col, res, type);
                } catch (e) {
                    console.error(e)
                }

            });
        } catch (err) {
            console.error(err)
        }
}

/* api 通过api的type来区别做哪些对应的操作 */
var apis = (db, buf, dbase, col, response, type) => {
    // 传过来的api的类型
    console.log('⭐', type)
    // 添加库，表和数据
    if (type == 'add') {
        // 添加时间
        buf.data.forEach(element => {
            element.createTime = new Date()
        });
        dbase.collection(col).insertMany(buf.data, function (err, res) {
            if (err) throw err;
            // 发送返回值
            buf.code = '201'
            buf.mean = '添加成功'
            response.send(buf);
            db.close();
        });
    }
    // 查询
    else if (type == 'query') {
        let findData = '';
        findData = buf.data
        let limitNum = 0;
        //每页显示条数
        if (buf.pageSize != undefined) {
            limitNum = buf.pageSize;
        }
        //第几页
        let skipNum = 0;
        if (buf.page != undefined) {
            skipNum = limitNum * (buf.page - 1)
        }
        let mysort = buf.sort
        dbase.collection(col).find(findData).skip(skipNum).limit(limitNum).sort(mysort).toArray(function (err, result) {
            if (err) throw err;
            result.code = '202'
            result.mean = '查询成功'
            response.send(result);
            db.close();
        });
    }
    //更新
    else if (type == 'update') {
        let whereStr = buf.whereStr; // 查询条件
        let updateStr = {
            $set: buf.updateStr
        };
        dbase.collection(col).updateMany(whereStr, updateStr, function (err, res) {
            if (err) throw err;
            let sendMessage = {
                code: '202',
                mean: '更新成功',
                modifiedCount: res.modifiedCount
            }
            response.send(sendMessage);
            db.close();
        });
    }
    //删除
    else if (type == 'delete') {
        let whereStr = buf.whereStr;
        dbase.collection(col).deleteMany(whereStr, function (err, res) {
            if (err) throw err;
            let sendMessage = {
                code: '202',
                mean: '删除成功',
                deletedCount: res.deletedCount
            }
            response.send(sendMessage);
            db.close();
        });
    }
    //排序
    else if (type == 'sort') {
        let mysort = buf.sort
        dbase.collection(col).find().sort(mysort).toArray(function (err, result) {
            if (err) throw err;
            result.code = '202'
            result.mean = '排序成功'
            response.send(result);
            db.close();
        });
    }
    //删除集合
    else if (type == 'deleteCol') {
        dbase.collection(col).drop(function (err, delOK) { // 执行成功 delOK 返回 true，否则返回 false
            if (err) throw err;
            let result = {
                code: '202',
                mean: '删除集合成功'
            }
            response.send(result);
            db.close();
        });
    }
}

/********POST请求********* */

// 添加库，表和数据
app.post("/add", (req, res) => {
    dbAndCol(req, res, 'add');
});

// 查询
app.post("/query", (req, res) => {
    dbAndCol(req, res, 'query');
})
//更新
app.post("/update", (req, res) => {
    dbAndCol(req, res, 'update');
})
//删除
app.post("/delete", (req, res) => {
    dbAndCol(req, res, 'delete');
})
//排序
app.post("/sort", (req, res) => {
    dbAndCol(req, res, 'sort');
})
//删除集合
app.post("/deleteCol", (req, res) => {
    dbAndCol(req, res, 'deleteCol');
})

/***配置服务端口***/
var server = app.listen(port, function () {
    console.log('接口地址' + host + ':' + port + '✅')
    console.log('文档查看：https://github.com/SSSSSFFFFF/SF-mongodb-api' + '✅')
})