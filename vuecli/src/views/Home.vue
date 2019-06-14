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
  data(){
    return{
      text : "添加一条数据"
    }
  },
  methods: {
      add(){
        axios({
          method:'post',
          url: requestUrl,
          data: {
            id:requestUrl
          }
        })
      }
  }

}

</script>
