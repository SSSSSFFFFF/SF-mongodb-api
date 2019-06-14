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
        var datas = {
          "dataBase": "SFCMS",
          "collectionName": "userInfo",
          "data": [{
              "userInfo": {
                "name": "sbsf",
                "email": "1074260090@qq.com"
              },
              "stars": "6"
            },
            {
              "userInfo": {
                "name": "what",
                "email": "123@qq.com"
              },
              "stars": "1000"
            }
          ]
        }
        this.axios.post(host + "/add",JSON.stringify(datas))
        .then(res => {
          console.log(res.data)
        })
        .catch(err => {
          console.error(err); 
        })
      }
    }

  }
</script>