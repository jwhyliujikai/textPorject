<template>
<!-- vue2中的html模板中必须有一对跟标签，vue3组件的html模板中可以没有跟标签 -->
  <div id="nav">
  </div>
  <router-view/>
</template>
<script>
import { defineComponent } from 'vue'
import Home from '@/views/Home.vue'

export default defineComponent({
  name: 'Home',
  components: {
    // 注册一个子组件
    // Home,
  },
  setup() {
    
  },
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  /* padding: 30px; */
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
