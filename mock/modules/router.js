//获取所有路由表
const getAllRouter = {
    url: "/all_routers",
    type: "post",
    response: () => {
        return {
            code: 1,
            data: [{
                id: 1,
                path: "/",
                name: "Layout",
                component: "layout/index.vue",
                redirect: "/home",
                hidden: true,
            },
            {
                id: 2,
                path: "/home",
                name: "Home",
                meta: {
                    title: "",
                    icon: ""
                },
                component: 'layout/index.vue',
                redirect: "/home/index",
                children: [{
                    id: 3,
                    path: "index",
                    name: "HomeIndex",
                    meta: {
                        title: "首页",
                        icon: "icon0"
                    },
                    component: 'views/home/index.vue',
                },],
            },
            {
                id: 4,
                path: "/admin",
                name: "Test",
                meta: {
                    title: "系统管理",
                    icon: "icon1"
                },
                component: 'layout/index.vue',
                redirect: "/admin/user",
                children: [{
                    id: 5,
                    path: "user",
                    name: "AdminUser",
                    meta: {
                        title: "用户管理",
                        icon: "user"
                    },
                    component: 'views/admin/user.vue',
                }
                    , {
                    id: 6,
                    path: "role",
                    name: "AdminRole",
                    meta: {
                        title: "角色管理",
                        icon: "role"
                    },
                    component: 'views/admin/role.vue',
                },
                {
                    id: 7,
                    path: "menu",
                    name: "AdminMenu",
                    meta: {
                        title: "菜单管理",
                        icon: "menu"
                    },
                    component: 'views/admin/menu.vue',
                },
                ],
            },]


        }
    }
}



//获取动态路由表
const getAsyncRouter = {
    url: "/async_routers",
    type: "post",
    response: () => {
        return {
            code: 1,
            data: [
            {
                id: 2,
                path: "/home",
                name: "Home",
                meta: {
                    title: "",
                    icon: ""
                },
                component: 'layout/index.vue',
                redirect: "/home/index",
                children: [{
                    id: 3,
                    path: "index",
                    name: "HomeIndex",
                    meta: {
                        title: "首页",
                        icon: "icon0"
                    },
                    component: 'views/home/index.vue',
                },],
            },
            {
                id: 4,
                path: "/admin",
                name: "Test",
                meta: {
                    title: "系统管理",
                    icon: "icon1"
                },
                component: 'layout/index.vue',
                redirect: "/admin/user",
                children: [{
                    id: 5,
                    path: "user",
                    name: "AdminUser",
                    meta: {
                        title: "用户管理",
                        icon: "user"
                    },
                    component: 'views/admin/user.vue',
                }
                    , {
                    id: 6,
                    path: "role",
                    name: "AdminRole",
                    meta: {
                        title: "角色管理",
                        icon: "role"
                    },
                    component: 'views/admin/role.vue',
                },
                {
                    id: 7,
                    path: "menu",
                    name: "AdminMenu",
                    meta: {
                        title: "菜单管理",
                        icon: "menu"
                    },
                    component: 'views/admin/menu.vue',
                },
                ],
            },]


        }
    }
}


//获取动态路由表
const getPermissionBtns = {
    url: "/permission_btns",
    type: "post",
    response: () => {
        return {
            code: 1,
            data: ['usermanage:add','usermanage:edit','usermanage:del','usermanage:query','rolemanage:add','rolemanage:edit','rolemanage:del','rolemanage:query']
        }
    }
}



module.exports = [
    getAllRouter,
    getAsyncRouter ,
    getPermissionBtns

]