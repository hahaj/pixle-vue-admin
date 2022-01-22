//角色列表
const getMenuList = {
    url: "/menus",
    type: "post",
    response: () => {
        return {
            code: 1,
            data: [
                {

                    id: 3,
                    routePath: "/home/index",
                    routeName: "HomeIndex",
                    name: '首页',
                    icon: 'icon0',
                    filePath: 'views/home/index.vue',
                    permission: 'homepg',
                    redirect: "",
                    hidden: 0,
                    alive: 0,
                    status: 1,
                    type: 1,
                    pid: -1
                },
                {
                    id: 4,
                    routePath: "/admin",
                    routeName: "Test",
                    name: '系统管理',
                    icon: 'icon1',
                    filePath: 'layout/index.vue',
                    redirect: "/admin/user",
                    hidden: 0,
                    alive: 0,
                    status: 1,
                    type: 0,
                    pid: -1,
                    permission: 'systemmanage',
                    children: [{
                        id: 5,
                        routePath: "/admin/user",
                        routeName: "AdminUser",
                        name: "用户管理",
                        icon: "user",
                        filePath: 'views/admin/user.vue',
                        hidden: 0,
                        alive: 0,
                        status: 1,
                        type: 1,
                        pid: 4,
                        permission: 'usermanage',
                        children: [
                            {
                                id: 8,
                                name: "用户管理新增",
                                status: 1,
                                type: 2,
                                pid: 5,
                                permission: 'usermanage:add',
                            },
                            {
                                id: 9,
                                name: "用户管理编辑",
                                status: 1,
                                type: 2,
                                pid: 5,
                                permission: 'usermanage:edit',
                            },
                            {
                                id: 10,
                                name: "用户管理删除",
                                status: 1,
                                type: 2,
                                pid: 5,
                                permission: 'usermanage:del',
                            },
                            {
                                id: 20,
                                name: "用户管理查询",
                                status: 1,
                                type: 2,
                                pid: 5,
                                permission: 'usermanage:query',
                            }
                        ]
                    }
                        , {
                        id: 6,
                        routePath: "/admin/role",
                        routeName: "AdminRole",
                        name: "角色管理",
                        icon: "role",
                        filePath: 'views/admin/role.vue',
                        hidden: 0,
                        alive: 0,
                        status: 1,
                        type: 1,
                        pid: 4,
                        permission: 'rolemanage',
                        children: [
                            {
                                id: 11,
                                name: "角色管理新增",
                                status: 1,
                                type: 2,
                                pid: 6,
                                permission: 'rolemanage:add',
                            },
                            {
                                id: 12,
                                name: "角色管理编辑",
                                status: 1,
                                type: 2,
                                pid: 6,
                                permission: 'rolemanage:edit',
                            },
                            {
                                id: 13,
                                name: "角色管理删除",
                                status: 1,
                                type: 2,
                                pid: 6,
                                permission: 'rolemanage:del',
                            },
                            {
                                id: 14,
                                name: "角色管理查询",
                                status: 1,
                                type: 2,
                                pid: 6,
                                permission: 'rolemanage:query',
                            }
                        ]
                    },
                    {
                        id: 7,
                        routePath: "/admin/menu",
                        routeName: "AdminMenu",
                        name: "菜单管理",
                        icon: "menu",
                        filePath: 'views/admin/menu.vue',
                        hidden: 0,
                        alive: 0,
                        status: 1,
                        type: 1,
                        pid: 4,
                        permission: 'menumanage',
                    },
                    ],
                },]

        }
    }
}



//删除角色
const deleteMenu = {
    url: "/delMenu",
    type: "post",
    response: () => {
        return {
            code: 1,
            data: '',
            msg: '删除成功'
        }
    }
}

//添加角色
const addMenu = {
    url: "/addMenu",
    type: "post",
    response: () => {
        return {
            code: 1,
            data: '',
            msg: '添加成功'
        }
    }
}


//编辑角色
const editMenu = {
    url: "/editMenu",
    type: "post",
    response: () => {
        return {
            code: 1,
            data: '',
            msg: '编辑成功'
        }
    }
}

module.exports = [
    getMenuList,
    deleteMenu,
    addMenu,
    editMenu
]