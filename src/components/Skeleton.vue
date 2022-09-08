<template>
  <div class="a"></div>
  <div class="c"></div>
  <div class="b"></div>
  <div class="a"></div>
  <div class="b"></div>
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
</style>
