import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
//导入modules所有模块
const modulesFiles = require.context('./modules', true, /\.js$/);

let defaulModules={};
modulesFiles.keys().forEach(key => {
    let module= modulesFiles(key).default;
    let moduleName=key.split('/')[key.split('/').length-1].split('.')[0];
    defaulModules[moduleName]=module
});


const getters={
   routes:state=>state.router.routes,//所有动态路由
   cur_routes:state=>state.router.cur_routes,
   token:state=>state.user.token,
   avatar:state=>state.user.avatar,
   nickname:state=>state.user.nickname,
   is_login:state=>state.user.is_login,
   permission_btns:state=>state.router.permission_btns
}


export default new Vuex.Store({
  modules:defaulModules,
  getters
})
