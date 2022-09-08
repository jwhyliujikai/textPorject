<template>
  <div class="home">
    {{strTest()}}
  </div>
</template>

<script lang="ts">
// 这里可以写ts代码

// defineComponent函数，目的是定义一个组件，内部可以传入一个配置对象
import { defineComponent } from 'vue'
// 暴露出去一个定义好的组件
export default defineComponent({
  // 当前组件的名字
  name: 'Setup',
  /**
   * 在beforeCreate之前执行(一次), 此时组件对象还没有创建
   * 由此可以推断：setup在执行额时候，当前的组件还没有创建出来，也就意味着：组件实例对象this根本就不能用
   * this是undefined, 不能通过this来访问data/computed/methods / props
   * 其实所有的composition API相关回调函数中也都不可以
   */

  beforeCreate() {
    console.log(222)
  },
  setup() {
    console.log(111)
    // setup中一班都是返回一个对象，对象中的属性和方法都可以在html模板中直接使用
    // setup中的对象内部的属性和data函数中的return对象中的属性都可以在html模板中使用
    // setup中的对象中的属性和data函数中的对象中的属性会合并为组件对象的属性
    // setup中的对象中的方法和methods对象中的方法会合并为组件对象方法
    // 在vue3中尽量不要混合的使用data和setup及methods和setup
    // setup不能是一个async函数: 因为返回值不再是return的对象, 而是promise, 模板看不到return对象中的属性数据
    // 一般不要混合使用: methods中可以访问setup提供的属性和方法, 但在setup方法中不能访问data和methods
    const strTest = () => {
      return 'what are you no sha lei'
    }
    return {
      strTest,
    }
  },
})
</script>
