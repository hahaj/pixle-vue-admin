import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from "../layout";

Vue.use(VueRouter)


//静态路由
export const defaultRoutes = [{
  path: "/",
  name: "Layout",
  component: Layout,
  redirect: "/home",
  hidden: true,
},
{
  path: "/login",
  name: "Login",
  component: () => import("../views/login"),
  hidden: true,
  meta: {
    title: "登录",
  },
},

{
  path: "/404",
  meta: {
    title: "404",
  },
  name: "Error",
  component: () => import("../views/error/404"),
  hidden: true,
},

{
  path: "/person",
  name: "Person",
  meta: {
    title: "",
    icon: ""
  },
  component: Layout,
  redirect: "/person/center",
  hidden: true,
  children: [{
    path: "center",
    name: "PersonCenter",
    meta: {
      title: "个人中心",
      icon: ""
    },
    component: () => import("../views/common/person"),

  },],
},
  // {
  //   path: "/home",
  //   name: "Home",
  //   meta: {
  //     title: "",
  //     icon: ""
  //   },
  //   component: Layout,
  //   redirect: "/home/index",
  //   children: [{
  //     path: "index",
  //     name: "HomeIndex",
  //     meta: {
  //       title: "首页",
  //       icon: "icon0"
  //     },
  //     component: () => import("../views/home/index.vue"),
  //   }, ],
  // },
  // {
  //   path: "/admin",
  //   name: "Test",
  //   meta: {
  //     title: "系统管理",
  //     icon: "icon1"
  //   },
  //   component: Layout,
  //   redirect: "/admin/user",
  //   children: [{
  //     path: "user",
  //     name: "AdminUser",
  //     meta: {
  //       title: "用户管理",
  //       icon: "user"
  //     },
  //     component: () => import("../views/admin/user.vue"),
  //   }
  //   ,{
  //     path: "role",
  //     name: "AdminRole",
  //     meta: {
  //       title: "角色管理",
  //       icon: "role"
  //     },
  //     component: () => import("../views/admin/role.vue"),
  //   },
  //   {
  //     path: "menu",
  //     name: "AdminMenu",
  //     meta: {
  //       title: "菜单管理",
  //       icon: "menu"
  //     },
  //     component: () => import("../views/admin/menu.vue"),
  //   },
  //  ],
  // },




];

//404跳转结尾路由
export const endRoutes = [
  {
    path: "*",
    redirect: "/404",
    hidden: true,
  },
 //////////示例路由可删除
  {
    path: "/demo",
    name: "Demo",
    meta: {
      title: "组件示例",
      icon: "el-icon-s-data"
    },
    component: Layout,
    redirect: "/demo/button",
    children: [{
      path: "button",
      name: "Button",
      meta: {
        title: "按钮",
        icon: ""
      },
      component: () => import("../views/demo/button"),
  
    },
    {
      path: "dialog",
      name: "Dialog",
      meta: {
        title: "对话框",
        icon: ""
      },
      component: () => import("../views/demo/dialog"),
  
    },
    {
      path: "querybar",
      name: "Querybar",
      meta: {
        title: "搜索栏",
        icon: ""
      },
      component: () => import("../views/demo/querybar"),
  
    },
    {
      path: "avatarUpload",
      name: "AvatarUpload",
      meta: {
        title: "头像选择器",
        icon: ""
      },
      component: () => import("../views/demo/avatarUpload"),
  
    },
    {
      path: "tinymce",
      name: "Tinymce",
      meta: {
        title: "富文本编辑器",
        icon: ""
      },
      component: () => import("../views/demo/tinymce"),
  
    },
    {
      path: "fileExImport",
      name: "FileExImport",
      meta: {
        title: "文件导入导出",
        icon: ""
      },
      component: () => import("../views/demo/fileExImport"),
  
    },
    {
      path: "btnPermission",
      name: "BtnPermission",
      meta: {
        title: "按钮权限",
        icon: ""
      },
      component: () => import("../views/demo/btnPermission"),
  
    },
    {
      path: "inputDirective",
      name: "InputDirective",
      meta: {
        title: "输入指令",
        icon: ""
      },
      component: () => import("../views/demo/inputDirective"),
  
    },
    {
      path: "globalstyle",
      name: "GlobalStyle",
      meta: {
        title: "全局样式",
        icon: ""
      },
      component: () => import("../views/demo/globalstyle"),
  
    },
    {
      path: "routerMenu",
      name: "RouterMenu",
      meta: {
        title: "路由菜单",
        icon: ""
      },
      component: () => import("../views/demo/routerMenu"),
  
    },
    {
      path: "pageMixins",
      name: "PageMixins",
      meta: {
        title: "模板混入",
        icon: ""
      },
      component: () => import("../views/demo/pageMixins"),
  
    },
    ],
  },

];

const routes = defaultRoutes;

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


// 解决报错
const originalPush = VueRouter.prototype.push;
const originalReplace = VueRouter.prototype.replace;
// push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch((err) => err);
};
// replace
VueRouter.prototype.replace = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalReplace.call(this, location, onResolve, onReject);
  return originalReplace.call(this, location).catch((err) => err);
};

export default router