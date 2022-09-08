<template>
  <div class="detail">
    <div class="content">
      <!-- 新闻详情 -->
      <div class="content-detail">
        <h2 style="text-align: center;">新闻详情</h2>
        <p class="title">{{detailObj.title}}</p>
      </div>
      <ul>
        <li v-for="(item, i) in dataList" :key="i" class="request-remark">
          <!-- 评论 -->
          <p class="remark" v-html="item.text"></p>
          <!-- 答 -->
          <p class="request" v-for="(s, index) in item.children" :key="index" v-html="s.text"></p>
        </li>
      </ul>
      <div class="loading" v-if="isShow">加载中...</div>
    </div>
  </div>

</template>
<script>
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router';
import axios from 'axios'
export default defineComponent({
  setup() {
    const Route = useRoute(); //获取到值
    let Data = reactive({
      detailObj: {},
      dataList: [],
      isShow: false
    })
    onMounted(() => {
      Data.isShow = true
      getDetail()
    })
    const getDetail = () => {
      console.log(Route.query.id)
      axios
        .get(`https://hacker-news.firebaseio.com/v0/item/${Route.query.id}.json?print=pretty`)
        .then(function (res) {
          // handle success
          console.log(res, '=====')
          if (res.status === 200) {
            Data.detailObj = res.data
            let params = Data.detailObj.kids
            try {
              for (let i = 0; i < params.length; i++) {
                getNewList(params[i])
              }
            } catch (err) {
              Data.isShow = false
              console.log(err)
            } finally {
              Data.isShow = false
            }
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error)
        })
    }
    // 评论
    const getNewList = (id) => {
      axios
        .get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
        .then(function (res) {
          if (res.status === 200) {
            console.log(res, Data.dataList, '???????????')
            Data.dataList.push(res.data)
            console.log(Data.dataList, 'this.dataList')
            let params = res.data.kids
            Data.dataList.forEach((item) => {
              item.children = []
            })
            for (let i = 0; i < params.length; i++) {
              getNewList1(params[i], params)
            }
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
    const getNewList1 = (id) => {
      axios
        .get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
        .then(function (res) {
          if (res.status === 200) {
            Data.dataList = Data.dataList.map((element) => {
              if (element.kids && element.kids.length > 0) {
                element.kids.forEach((el) => {
                  if (el === id) {
                    element.children.push(res.data)
                  }
                })
              }
              return element
            })
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
    return {
      ...Data
    }
  }
})
</script>
<style lang="scss">
.detail {
  width: 1200px;
  margin: 0 auto;
}
.content {
  position: relative;
}
.content-detail {
  height: 300px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.title {
  padding: 0 20px;
}
ul,
li {
  margin: 0;
  padding: 0;
}
li {
  list-style: none;
  border: 1px solid;
  margin-top: 20px;
  border-radius: 5px;
}
.request-remark {
  padding: 20px;
}
.remark {
  color: #6b6969;
  padding: 5px 10px;
  background: #dfdaca;
  border-radius: 5px;
}
.request {
  margin-top: 20px;
  background: #bbbbc9;
  border-radius: 5px;
  padding: 5px 10px;
}
</style>