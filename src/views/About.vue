<template>
  <div class="about">
    <el-button>Default</el-button>
    <h1 class="title">This is an about page</h1>
    <!-- <el-row>
      <el-col :span="6">
        <el-form-item label="Activity name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="Activity name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-col>
    </el-row> -->
    <div>{{count}}</div>
    <button @click="add">点击</button>
    <ul>
      <li>{{user.name}}</li>
      <li>{{user.age}}</li>
      <li>{{user.wife}}</li>
      <li v-for="(item, index) in arr" :key="index">{{item}}</li>
    </ul>
    <button @click="updateUser">点击</button>
  </div>

</template>
<script>
import { getPositionCategoryList, getRecruitNewsNoticeList } from '@/api/jobList';
import { defineComponent, onMounted, reactive, ref } from 'vue';

export default defineComponent({
  setup () {
    console.log('渲染一次')
    // proxy对象用于定义基本操作的自定义行为（如属性查找、赋值、枚举、函数调用等）
    // 变量
    // let count = 0 此时的数据并不是响应式的数据（响应式数据：数据变化，页面跟着渲染变化）
    // ref 是一个函数，作用：定义一个响应式的数据，返回的是一个ref对象，对象中有一个value属性，如果需要对数据进行操作，需要使用ref对象调用value属性的方式进行数据的操作
    // 一般用来定义一个基本类型的响应式数据
    const count = ref(0)
    function add () {
      // count ++  // 报错，原因：count是一个ref对象，对象是不能进行++的操作
      count.value++
    }
    /**
     * 作用: 定义多个数据的响应式
     * const proxy = reactive(obj): 接收一个普通对象然后返回该普通对象的响应式代理器对象
     * 响应式转换是“深层的”：会影响对象内部所有嵌套的属性
     * 内部基于 ES6 的 Proxy 实现，通过代理对象操作源对象内部数据都是响应式的
     */
    let obj = {
      name: '司马无情',
      age: 18,
      wife: {
        name: '小红',
        age: 16,
        cars: ['奔驰', '宝马']
      },
      jobList: []
    }
    // 把数据变成响应式的数据
    // 返回的是一个proxy的代理对象，被代理的目标对象就是obj对象
    // user现在是代理对象，obj是目标对象
    // user对象的类型是proxy
    // 如果操作代理对象，目标对象中的数据也会随之改变，同时如果想要在操作数据的时候，界面也要跟着重新跟新渲染，那么也要操作代理对象
    let user = reactive(obj)


    // let arr = reactive([]) // 赋值以后页面不渲染，解决方法：一、依旧是reactive，可以在外面包一层let state = reactive({data:[]})，//  二、改为ref赋值：let data =ref([])

    let arr = ref([])
    const updateUser = () => {
      // 直接使用目标对象的方式来更新目标对象中的成员，是不可能的，只能使用代理对象的方式来更新数据（响应式数据）
      user.name += '++'
      user.age = 20
      user.wife.name += '--'
      user.wife.cars[0] += '麻辣小龙虾'
      console.log(user)
    }
    onMounted(() => {
      console.log(user, 'jobList1111111111')
      // console.log(jobList, 'jobList')
      queryPositionCategoryList()
    })
    const queryPositionCategoryList = () => {
      let params = {
        type: 1
      }
      getPositionCategoryList(params).then(res => {
        console.log(res, arr, '????')
        if (res.code === 200) {
          // user.jobList = res.data
          arr.value = res.data
          console.log(user, arr, 'jobListjobList')
        }
      }).catch(err => {
        console.log(err)
      })
    }
    return {
      count, // 属性
      add, // 方法
      arr,
      user,
      updateUser,
      // queryPositionCategoryList,

    }
  },

  // vue2 写法

  // data () {
  //   return {
  //     count: 0,
  //     form: {
  //       name: ''
  //     },
  //     user: {
  //       name: '司马无情',
  //       age: 18,
  //       wife: {
  //         name: '小红',
  //         age: 16,
  //         cars: ['奔驰', '宝马']
  //       },
  //     }
  //   }
  // },
  // mounted () {
  //   this.queryPositionCategoryList()
  // },
  // methods: {
  //   updateUser() {
  //     this.user.name = 111
  //   },
  //   // 职位列表
  //   queryPositionCategoryList () {
  //     let params = {
  //       type: 1
  //     }
  //     getPositionCategoryList(params).then(res => {
  //       console.log(res, '????')
  //       if (res.code === 200) {
  //         this.jobList = res.data
  //         let obj = {
  //           positionCategoryIcon: 'iconfont icon-quanbu_huaban',
  //           positionCategoryCode: '',
  //           positionCategoryName: '查找更多工作机会'
  //         }
  //         this.jobList.push(obj)
  //         // this.jobList.forEach(item => {
  //         //   item.icon = 'iconfont icon-xiexiangbao'
  //         // })
  //       }
  //     }).catch(err => {
  //       console.log(err)
  //     })
  //   },
  // },
})
</script>
<style lang="scss">
.about {
  border: 1px solid;
  .title {
    color: red;
  }
}
</style>