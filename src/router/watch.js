import {
  defaultRoutes,
  endRoutes,
} from "@/router";
import router from "@/router";
import store from "@/store";

// eslint-disable-next-line no-unused-vars
router.beforeEach(async (to, from, next) => {

  if (to.path == "/login" || to.path == "/404") {
    document.title = to.meta.title || '';
    next();
  } else if (!store.getters.token) {
    //未登录
    next({
      path: "/login",
      replace: true,
    });

  } else if (!store.getters.is_login) {
    await store.dispatch("user/getUserInfo"); //获取用户信息
    await setAsyncRouter(); //设置动态路由
    setAliveRouter(); //设置缓存路由
    await store.dispatch("router/getPermissionBtns");//获取按钮权限
    next({
      ...to
    });
  } else {
    document.title = to.meta.title || '';
    setBreadcrumbData(to.matched); //设置顶部导航栏
    next();
  }
});

// eslint-disable-next-line no-unused-vars
router.afterEach((to, from) => {
  if (to.path == "/login") {
    if (store.state.user.is_outlogin) {
      //退出登录页重新刷新页面防止再次登录不同端动态路由不生效
      window.location.reload();
    }
  }
});

//设置动态路由（菜单栏）
async function setAsyncRouter() {

  const syncRoutes = mappingRouter(await store.dispatch("router/getSyncRoutes")); //获取动态路由(菜单栏)

  let allSyncRoutes = []; //所有需要动态添加路由
  let routeList = []; //所有路由

  allSyncRoutes = [...syncRoutes, ...endRoutes];
  routeList = [
    ...defaultRoutes,
    ...syncRoutes,
    ...endRoutes,
  ];


  await store.dispatch("router/setRoutes", routeList); //设置左边栏菜单
  // resetRouter(); //恢复路由
  for (let item of allSyncRoutes) {
    router.addRoute(item);
  }

}

//设置面包屑数据
function setBreadcrumbData(routers) {
  let arr = [];
  for (let item of routers) {
    if (item.meta && item.meta.title) {
      const obj = {
        path: item.path,
        title: item.meta.title,
        name: item.name || "",
      };
      arr.push(obj);
    }
  }

  store.commit("router/SET_CURROUTE", arr);
}

//设置缓存路由
function setAliveRouter() {
  let aliveRouteList = getAliveRouter(store.state.router.routes);
  store.commit("router/SET_ALIVEROUTE", aliveRouteList);
}

//获取alive=true路由（缓存路由名称）,list:所有路由表
function getAliveRouter(list, arr = []) {
  if (list && list.length > 0 && Array.isArray(list)) {
    list = JSON.parse(JSON.stringify(list));
    for (let item of list) {
      if (item.alive) {
        arr.push(item.name);
      }

      if (
        item.children &&
        Array.isArray(item.children) &&
        item.children.length > 0
      ) {
        arr = getAliveRouter(item.children, arr);
      }
    }
  }

  return arr;
}

//动态路由映射组件
// eslint-disable-next-line no-unused-vars
function mappingRouter(routerList) {

  if (!Array.isArray(routerList)) return []
  routerList.forEach(item => {
    if (item.component) {
      let path = item.component;
      item.component = () => import(`@/${path}`)
    }
    if (item.children) {
      item.children = mappingRouter(item.children)
    }
  })

  return routerList
}