<template>
  <div class="side-menu">
    <div class="userinfo-view">
       <img class="logo" src="@assets/images/layout/logo.png" />
      <img class="avatar" :src="avatar" />
      <div class="nickname">{{ nickname }}</div>
    </div>
    <el-menu
      background-color="rgba(0,0,0,0)"
      text-color="#D7E9EF"
      active-text-color="#fff"
      :router="true"
      :default-active="default_active"
    >
      <div v-for="item in routeList" :key="item.name||item.path">
        <sideMenuItem :item="item"></sideMenuItem>
      </div>
    </el-menu>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import sideMenuItem from "./sideMenuItem.vue";
export default {
  components: { sideMenuItem },
  data() {
    return {
      default_active: "",
      routeList: [], //过滤掉hidden所有需要展示的路由
    };
  },
  computed: {
    ...mapGetters([
      "routes", //所有路由
      "avatar",
      "nickname",
    ]),
    getIcon() {
      return (icon) => {
        return require(`@/assets/menu_icon/${icon}.png`);
      };
    },
  },

  watch: {
    $route(newval) {
      this.setMenuItemHightColor(newval);
    },
    routes: {
      handler(val) {
        //过滤掉hidden=tru路由设置菜单栏显示路由
        this.routeList = this.filterRouter(val);
        this.setMenuItemHightColor(this.$route);
      },
      immediate: true,
    },
  },
  methods: {
    //过滤掉hidden=true路由（在菜单显示的路由）
    filterRouter(list, arr = []) {
      if (list && list.length > 0 && Array.isArray(list)) {
        list = JSON.parse(JSON.stringify(list));
        for (let item of list) {
          if (!item.hidden) {
            if (item.meta && item.meta.title) {
              if (
                item.children &&
                Array.isArray(item.children) &&
                item.children.length > 0
              ) {
                item["children"] = this.filterRouter(item.children);
              }
              arr.push(item);
            } else if (
              item.children &&
              Array.isArray(item.children) &&
              item.children.length == 1 &&
              !item.children[0].hidden
            ) {
              const path = item.path + "/" + item.children[0].path;
              item.meta = {
                title: item.children[0].meta.title || item.meta.title,
                icon: item.children[0].meta.icon || item.meta.icon,
              };
              item.path = path;
              item.children = item.children[0];
              arr.push(item);
            }
          }
        }
      }

      return arr;
    },

    //判断路由是否在菜单里面
    isIncludeRoute(routeList, routePath, parentPath) {
      for (let item of routeList) {
        let newPath = parentPath ? parentPath + "/" + item.path : item.path;
        if (newPath === routePath) {
          return true;
        } else {
          if (item.children && item.children.length > 0) {
            let is = this.isIncludeRoute(item.children, routePath, newPath);
            if (is) {
              return true;
            }
          }
        }
      }
      return false;
    },
    //设置菜单栏选中项高亮
    setMenuItemHightColor(newval) {
      if (
        newval.matched &&
        Array.isArray(newval.matched) &&
        newval.matched.length > 0
      ) {
        for (let item of newval.matched.slice(0).reverse()) {
          if (this.isIncludeRoute(this.routeList, item.path, "")) {
            this.default_active = item.path;
            return
          }
        }
        this.default_active=''

      }
    },
  },
};
</script>

<style lang="scss" scoped>
.side-menu {
  width: 200px;
  min-width: 200px;
  height: 100%;
  background: linear-gradient(to bottom, #41a5e0, hsl(181, 61%, 43%));
  box-sizing: border-box;
  overflow-y: auto;
  color: white;
  overflow-x: hidden;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  .userinfo-view {
    width: 100%;
    height: auto;
    padding: 10px 5px 20px ;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    .logo {
      width: 100%;
    }
    .avatar {
      border-radius: 50%;
      height: 100px;
      width: 100px;
      display: block;
      margin: 20px auto 15px;
    }
    .nickname {
      font-size: 15px;
      width: 100%;
      text-align: center;
    }
  }
  ::v-deep .el-menu {
    border-right: none;
    width: 100%;
  }
  ::v-deep .el-submenu__icon-arrow.el-icon-arrow-down {
    display: none;
  }
  ::v-deep .el-submenu__title {
    position: relative;
    padding-right: 20px;
    box-sizing: border-box;
    line-height: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    font-size: 15px;
    & > span {
      flex: 1;
      width: 0px;
      overflow: hidden;
      margin-right: 2px;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  ::v-deep .is-opened > .el-submenu__title .arrow {
    animation: arrowRote 0.3s forwards;
    transform-origin: center center;
  }

  ::v-deep .el-menu-item {
    width: 100%;
    font-size: 15px;
    height: 50px;
    line-height: 50px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    > span {
      flex: 1;
      width: 0px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  ::v-deep .el-menu-item.is-active {
    font-weight: bold;
  }
  ::v-deep .el-submenu__title .arrow {
    width: 13px;
    height: auto;
  }
  ::v-deep .el-submenu__title:hover {
    background: rgba($color: #000000, $alpha: 0) !important;
  }
  ::v-deep .el-menu-item:hover {
    background: rgba($color: #000000, $alpha: 0) !important;
  }
  @keyframes arrowRote {
    100% {
      transform: rotate(90deg);
      transform-origin: center center;
    }
  }
}
</style>
