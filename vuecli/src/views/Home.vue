<template>
  <div class="home">
    <div>
      Welcome to Your SFCMS App
      <button @click="add">{{text}}</button>
    </div>
  </div>
</template>

<script>
  // @ is an alias to /src
  import HelloWorld from '@/components/HelloWorld.vue'

  export default {
    name: 'home',
    components: {
      HelloWorld
    },
    data() {
      return {
        text: "添加一条数据"
      }
    },
    methods: {
      add() {
       //whereStr查询条件
//updateStr更改的内容
var datas = {
	"dataBase" : "SFCMS",
	"collectionName" : "userInfo",
	"whereStr" : {
		"stars": "4"
	},
	"updateStr" : {
		"createTime": "timeChanged"
	}
}
this.axios.post(host + "/update",JSON.stringify(datas))
    .then(res => {
        console.log(res.data)
    })
      }
    }

  }
</script>