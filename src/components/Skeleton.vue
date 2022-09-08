<template>
  <div class="a ant-skeleton-title"></div>
  <div class="c ant-skeleton-title"></div>
  <div class="b ant-skeleton-title"></div>
  <div class="a ant-skeleton-title"></div>
  <div class="b ant-skeleton-title"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'HelloWorld',
  components: {},
  props: {
    msg: String
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.a {
  width: 80%;
  background: #ccc;
  height: 60px;
}
.b {
  height: 60px;
  width: 60%;
  background: #ccc;
}
.c {
  height: 60px;
  width: 50%;
  background: #ccc;
}
.ant-skeleton-title {
  background: linear-gradient(90deg, #f2f2f2 25%, #e6e6e6 37%, #f2f2f2 63%);
  background-size: 400% 100%;
  animation: ant-skeleton-loading 1.4s ease infinite;
}
@keyframes ant-skeleton-loading {
  0% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
}
</style>
