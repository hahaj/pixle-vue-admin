import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from "axios";
import utils from './utils/index';
import fixTooltip from './directive/fixTooltip/install';
import piButton from './components/button/install';
import piPagination from './components/pagination/install';
import piDialog from './components/dialog/install';
import piQuerybar from './components/querybar/install';
import piQuerybarItem from './components/querybarItem/install';
import permission from './directive/permission/install';
import inputDirective from './directive/input/install';
import './style/index.css';
import './router/watch';
import '../mock';


Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use( fixTooltip);
Vue.use(piButton);
Vue.use(piPagination);
Vue.use(piDialog);
Vue.use(piQuerybar);
Vue.use(piQuerybarItem);
Vue.use(permission);
Vue.use(inputDirective)

Vue.prototype.$utils= utils;
Vue.prototype.$axios=axios;
Vue.prototype.$bus=new Vue();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
