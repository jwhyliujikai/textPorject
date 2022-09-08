<template>
  <div class="out">
    <div class="content">
      <div class="head"><input type="text" v-model='message.formValue' /><button @click="searchHandle" title="例如输入 32761060，可以查出第一条数据">查询</button></div>
      <div class="people-msg" ref="peopleMsg">
        <ul class="ul-style" ref="ulStyle">
          <li class="li-style" v-for="(item, i) in message.dataList" :key="i" @click="toDetail(item)">{{i}}----{{item.title}}</li>
          <div v-if="message.showTip" class="no-data">没有更多信息了</div>
        </ul>
      </div>
      <div class="loading" v-if="message.isShow">
        <Skeleton />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// 这里可以写ts代码

// defineComponent函数，目的是定义一个组件，内部可以传入一个配置对象
import { defineComponent, onMounted, ref, reactive } from 'vue'
import Skeleton from '@/components/Skeleton.vue' // @ is an alias to /src
import axios from 'axios'
import { useRouter } from 'vue-router';
// import svg from '@/svg/1.svg'
// 暴露出去一个定义好的组件
export default defineComponent({
  // 当前组件的名字
  name: 'Home',
  // 注册组件
  components: {
    // 注册一个子组件
    Skeleton,
  },
  setup() {
    const router = useRouter();
    let objPage = {
      title: 'hello',
      dataList: [] as any[],
      idList: [],
      indexId: 1,
      isShow: false,
      formValue: '',
      showTip: false,
      oldDom: true
    }
    const peopleMsg = ref()
    const ulStyle = ref()
    let message = reactive(objPage)
    onMounted(() => {
      console.log(peopleMsg.value, 'peopleMsgDom.value')
      peopleMsg.value.addEventListener('scroll', addEventListenerHandle)
      setTimeout(() => {
        getDataList()
      }, 2000)
    })
    const searchHandle = () => {
      message.dataList = []
      if (message.formValue) {
        getNewList(message.formValue)
      } else {
        getDataList()
      }
    }
    const getDataList = () => {
      message.isShow = true
      axios
        .get('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty')
        .then(function (res) {
          if (res.status === 200) {
            message.idList = res.data
            let params = message.idList.slice(0, 20)
            try {
              for (let i = 0; i < params.length; i++) {
                getNewList(params[i])
              }
            } catch (err) {
              message.isShow = false
              console.log(err)
            } finally {
              message.isShow = false
            }
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
    // 监听滚动条是否到底部事件
    const addEventListenerHandle = () => {
      console.log(12, message.idList.length, message.dataList.length)
      if (message.idList.length === message.dataList.length) {
        message.showTip = true
        return
      }
      const peopleMsgDom: any = peopleMsg.value
      const ulStyleDom = ulStyle.value
      peopleMsgDom.onscroll = () => {
        let max = Math.ceil(ulStyleDom.scrollHeight - peopleMsgDom.scrollTop + 10) - peopleMsgDom.clientHeight
        if (Math.abs(max) < 5) {
          message.indexId += 1
          console.log(message.indexId, 'this.indexId', message.idList)
          let params = message.idList.slice(message.indexId * 10, (message.indexId + 1) * 10)
          console.log('11133333', params)
          for (let i = 0; i < params.length; i++) {
            getNewList(params[i])
          }
        }
      }
    }
    // 新闻请求
    const getNewList = (id: string) => {
      axios
        .get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
        .then(function (res) {
          if (res.status === 200) {
            message.oldDom = false
            message.dataList.push(res.data)
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
    // 跳转详情
    const toDetail = (msg: { id: any }) => {
      router.push({
        path: '/Detail',
        query:{
          id: msg.id
        }
      })
    }
    return {
      message,
      peopleMsg,
      ulStyle,
      searchHandle,
      getNewList,
      getDataList,
      addEventListenerHandle,
      toDetail
    }
  }
})
</script>
<style lang="scss">
.out {
  width: 1200px;
  margin: 0 auto;
}
.head {
  width: 400px;
  /* border: 1px solid; */
  display: flex;
  justify-content: space-between;
  margin: 12px auto;
}
input {
  height: 24px;
  border-color: #ccc;
  width: 312px;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 40px;
  line-height: 40px;
  outline: none;
  padding: 0 15px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
button {
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
}
.people-msg {
  width: 100%;
  height: calc(100vh - 103px);
  background: #f2f6fc;
  overflow-y: auto;
  /* z-index: 10; */
}
.ul-style {
  width: 96%;
  margin: 0;
}
.li-style {
  width: 98%;
  height: 100px;
  border: 1px solid yellowgreen;
  margin-top: 10px;
  cursor: pointer;
  z-index: 1;
  border-radius: 5px;
  padding: 5px;
}
li {
  list-style: none;
  margin: 0;
  padding: 0;
}
.no-data {
  text-align: center;
  color: #ccc;
}

.content {
  position: relative;
}
.loading {
  position: absolute;
  top: 0;
  /* position: fixed; */
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background: #ccc;
  opacity: 0.5;
  background: rgba(255, 255, 255, 0.4);
  color: #409eff;
}

</style>
