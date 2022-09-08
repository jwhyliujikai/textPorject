// 程序的主入口文件,ts文件，是mian.ts
// 引入createApp函数，创建对应的应用，产生应用的实例对象
import { createApp } from "vue";
import tinyMce from "../myComponents/tinyMce/src/tinyMce.vue";
// import tinyMce from "../myComponents/tinyMce/index.js";

// 引入app组件（所有的父级组件）
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css"; //plus版本的样式文件
const app = createApp(App);

// 创建App应用返回对应的实例对象，调用mount方法进行挂载到id为app的dom上
createApp(App).use(store).use(router).use(ElementPlus).mount("#app");
// createApp(App).use(store).use(router).use(ElementPlus).mount("#app");
