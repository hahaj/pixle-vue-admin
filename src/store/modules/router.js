
import {getAsyncRouter,getPermissionBtns as initPermissionBtns} from '@/api/user'
const state = {
    routes: [], //用户有权限的所有路由
    cur_routes:[],//当前页面路由（导航栏面包屑数据）
    alive_routes:[],//需缓存路由名称数组同keep-alive
    permission_btns:[],//有权限的所有按钮权限标识符

  };
  const mutations = {
    SET_ROUTES(state, routes) {
      state.routes = routes;
    },
    SET_CURROUTE(state, route){
     state.cur_routes=route;
    },
    SET_ALIVEROUTE(state,route){
      state.alive_routes=route;
    },
    SET_PERMISSIONBTNS(state, btns) {
      state.permission_btns = btns
    }

  };
  const actions = {
    //存储路由
    setRoutes({ commit },routes) {
      return new Promise((resolve) => {
          commit("SET_ROUTES", routes);
          resolve();
      });
    },
    //获取动态路由
   // eslint-disable-next-line no-unused-vars
   getSyncRoutes({ commit }) {
      return new Promise((resolve) => {
        getAsyncRouter().then(res=>{
          resolve(res.data||[])
        })
      });
    },
    //获取所有有权限按钮
  getPermissionBtns({commit}) {
    return new Promise(resolve => {
      initPermissionBtns({}).then(res=>{
        let btns=res.data||[];
         commit("SET_PERMISSIONBTNS",btns)
        resolve()
      })
    })
  },
 

  };
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions,
  };
  