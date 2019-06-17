## 接口文档目录 （开发添加中）
<a href="#add 插入一条或多条数据">add 插入一条或多条数据</a><br>
<a href="#query 查询指定条件的数据">query 查询指定条件的数据</a>

## 前后端分离的项目模式，ajax+node+mongodb

后端只需一次配置好此项目提供的数据库接口。<br>
前端多次开发，直接操作MongoDB数据库增删改查。<br>
案例：使用vue-cli 3.0搭建可视化数据库管理系统。

***

## 后端：node链接Mongodb，提供可供前端使用的操作数据库接口
本地安装node http://nodejs.cn/download/<br>
本地安装mongodb https://www.mongodb.com/download-center/community <br>
```
cd node 

//安装依赖
npm install

//启动数据库链接
node app.js
```
***
## 前端：此CMS内容管理系统使用vue-cli搭建，如只需使用接口用postman等框架工具能请求ajax就可。


#### 示例
![Image text](http://139.196.102.62/img/TIM20190614135926.png)
![Image text](http://139.196.102.62/img/weixin20190614143711.png)

#### vue-cli数据可视化管理系统（待开发）
```
//新建终端

cd vue-cli 

//安装依赖
npm install

//启动
npm run serve
```

***


## 接口文档


```
//在index.html中定义
//接口ip为/node/app.js中执行的，具体代码查看/node/app.js
<script>
    var host = "http://localhost:8888"
</script>

```


#### add 插入一条或多条数据

```
//定义数据，第一次如果没有表和数据库则自动创建
var datas = {
	"dataBase" : "SFCMS",
	"collectionName" : "userInfo",
	"data":[
		{
            "userInfo" : {
                "name": "sf",
                "email" : "1074260090@qq.com"
            },
            "stars": "4"
		},
		{
            "userInfo" : {
                "name": "what",
                "email" : "123@qq.com"
            },
            "stars": "1000"
		}
	]
}
```
##### 发送jq-ajax和axios写法，后面接口只提供axios
```
$.ajax({
    type: "post",
    url: host + "/add",
    data: JSON.stringify(datas),
    contentType : 'application/json',
    success: function (res) {
        console.log(res)
    },
    error:function(err){
        console.log(err)
    }
});
axios.post(host + "/add",JSON.stringify(datas))
    .then(res => {
        console.log(res.data)
    })
    .catch(err => {
        console.error(err); 
 })
```

#### query 查询指定条件的数据
```
var datas = {
	"dataBase" : "SFCMS",
	"collectionName" : "userInfo",
	"data":{
		"stars": "4"
		"userInfo.name": "sf",
	}
}
axios.post(host + "/query",JSON.stringify(datas))
    .then(res => {
        console.log(res.data)
    })
```