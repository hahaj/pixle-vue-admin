<template>
  <div class="navbar">
    <div class="main">
      <img class="icon" src="@/assets/images/layout/gzt.png" />
      <h3 class="text">工作台</h3>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item
          v-for="(item, index) in cur_routes"
          :key="item.title"
          :to="index < cur_routes.length - 1 ? { path: item.path } : ''"
          >{{ item.title }}</el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>
    <div class="right">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          {{ nickname }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-for="item  in dropdownMenu"
            :key="item.title"
            :command="item"
            >{{ item.title }}</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      dropdownMenu: [
        {
          title: "个人中心",
        },
        {
          title: "退出登录",
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["cur_routes", "nickname"]),
  },
  watch: {},
  methods: {
    
    handleCommand(item) {
      if (item.title == "退出登录") {
        //退出 登录
        this.outLogin();
      } else if (item.title == "个人中心") {
        //
        this.$router.push('/person/center')
      }
    },
    //退出登录清除数据
    outLogin() {
      this.$store.dispatch("user/resetToken");
      this.$store.commit("user/RESET_STATE");
      this.$store.commit("user/SET_ISOUTLOGIN", true);
      this.$store.commit("user/SET_ISLOGIN", false);
      this.$router.replace("/login");
    },
  },
};
</script>
<style lang="scss" scoped>
.navbar {
  width: 100%;
  height: 66px;
  min-height: 66px;
  display: flex;
  justify-content: space-between;
  padding: 0px 30px;
  box-sizing: border-box;
  .main {
    height: 100%;
    flex: 1;
    width: 0;
    display: flex;
    align-items: center;
    .icon {
      width: 40px;
      height: 40px;
    }
    .text {
      font-size: 32px;
      font-weight: bold;
      color: #41a5e0;
      display: flex;
      align-items: center;
      margin-left: 20px;
      height: 100%;
      &::after {
        display: inline-block;
        content: "";
        height: 30px;
        width: 2px;
        border-radius: 1px;
        background: #41a5e0;
        margin-left: 20px;
        margin-right: 30px;
      }
    }
    ::v-deep .el-breadcrumb {
      font-size: 16px;
    }
  }
  .right {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    .el-dropdown-link {
      cursor: pointer;
      white-space: nowrap;
      color: #333;
      font-size: 15px;
    }
    .el-icon-arrow-down {
      font-size: 12px;
    }
    &::v-deep .el-dropdown {
      display: block;
      font-size: 15px !important;
    }
  }
}
.identity-wrap {
  display: flex;
  align-items: center;
  .icon {
    width: 33px;
    height: auto;
    margin-right: 5px;
  }
}
.msg-wrap {
  margin-right: 20px;
  .icon {
    width: 33px;
    height: auto;
    margin-right: 5px;
  }
  & > span {
    font-size: 15px;
    color: #333;
  }
}
</style>
