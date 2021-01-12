// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from "axios";

//挂载axios原型，之后Vue组件即可使用axios发起http请求
Vue.prototype.$http = axios;
//配置请求的根路径
axios.defaults.baseURL='http://localhost:8081'
//导入全局样式表
import './assets/css/global.css';
import Home from "./components/Home";
import Login from "./components/Login";
import OrderList from "./components/content/OrderList";
import UpdateSellerInfo from "./components/content/UpdateSellerInfo";
import UpdateProduct from "./components/content/UpdateProduct";
import UpdateCategory from "./components/content/UpdateCategory";

Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.config.productionTip = false;


//定义路由规则
const routes = [
  { path: "/", redirect: '/Login' },
  { path: "/Login", component: Login },
  {
    path: "/Home",
    component: Home,
    children:[
      {
        path: '',
        component: OrderList
      },
      {
        path: 'OrderList',
        component: OrderList
      },
      {
        path: 'UpdateSellerInfo',
        component: UpdateSellerInfo
      },
      {
        path: 'UpdateProduct',
        component: UpdateProduct
      },
      // {
      //   path: "AddNewProduct",
      //   component: AddNewProduct
      // },
      {
        path: "UpdateCategory",
        component: UpdateCategory
      }
    ]
  }
]
//创建router实例，通过routes配置
const router = new VueRouter({routes})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router: router
})



