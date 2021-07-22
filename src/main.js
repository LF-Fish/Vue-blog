import Vue from 'vue'
import App from './App.vue'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import animated from 'animate.css'
import mavonEditor from 'mavon-editor'  //引入mavon-editor 就是上面所安装的
import "mavon-editor/dist/css/index.css";
import 'wowjs/css/libs/animate.css'
import router from './router'
import '@babel/polyfill';
import setAxios from './network/index.js'
setAxios()

// 导入axios
import axios from 'axios'

// 全局配置  挂载到vue的原型对象上  这样每个vue组件都可以通过this.$http 使用axios
Vue.prototype.$http = axios;
Vue.use(ElementUI);
Vue.use(animated)
Vue.use(mavonEditor)  //让Vue使用mavonEditor

Vue.config.productionTip = false



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
