### 前后端分离的项目模式，ajax+node+mongodb

后端只需一次配置好此项目提供的数据库接口。<br>
前端多次开发，直接操作MongoDB数据库增删改查。<br>
案例：使用vue-cli 3.0搭建可视化数据库管理系统。

***

#### 后端：node链接Mongodb，提供可供前端使用的操作数据库接口

本地安装mongodb https://www.mongodb.com/download-center/community <br>
```
cd node 

//安装依赖
npm install

//启动数据库链接
node app.js
```
***
#### 前端：此CMS内容管理系统使用vue-cli搭建，如只需使用接口用postman等框架工具能请求ajax就可。

```
cd vue-cli 

//安装依赖
npm install

//启动
npm run serve
```

***
### 接口文档 

配置项在根目录config.json，默认本地跑通后，用在服务器上自行更改，具体代码查看/node/app.js

```
//host =  config.json下的 "serverHost" + "port"
//默认
var host = http://localhost:8888
```

#### 创建数据（第一次如果没有表和数据库则自动创建）
![Image text](http://139.196.102.62/img/TIM20190614135926.png)
```
//定义数据
var datas = {
	"dataBase" : "SFCMS",
	"collectionName" : "userInfo",
	"data":[
		{
		"userInfo" : {
			"name": "sbsf",
			"email" : "1074260090@qq.com"
		},
		"stars": "6"
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
//发送ajax
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
```
