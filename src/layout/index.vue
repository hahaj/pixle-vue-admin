<template>
  <div class="container">
    <!-- 左侧菜单栏 -->
    <sideMenu> </sideMenu>
    <div class="main">
      <!-- 导航栏 -->
      <narBar class="navBar"> </narBar>
      <!-- 内容 -->
      <pageMain class="pageMain"> </pageMain>
      <!-- 侧滑栏 -->
      <!-- <drawer :show.sync="showDrawer"></drawer>
      <div v-show="!showDrawer&&login_type==0" class="xfan-btn" @click="onShowDrawer">帮助中心《</div> -->
    </div>
  </div>
</template>
<script>
import sideMenu from "./components/sideMenu.vue";
import narBar from "./components/navBar.vue";
import pageMain from "./components/pageMain.vue";
//import drawer from "./components/drawer.vue";
import {mapGetters} from 'vuex'
export default {
  data() {
    return {
      showDrawer:false
    };
  },
  components: {
    sideMenu,
    narBar,
    pageMain,
   // drawer,
  },
  computed:{
    ...mapGetters(['login_type']),
  },

  methods:{
    onShowDrawer(){
      this.showDrawer=true
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  height: 100%;
  min-height: 675px;
  width: 100%;
  min-width: 1200px;
  display: flex;

  .main {
    flex: 1;
    width: 0px;
    height: 100%;
    display: flex;
    flex-direction: column;
    background: #f7f7f7;
    padding: 10px 10px 0;
    box-sizing: border-box;
    position: relative;
    .navBar {
      width: 100%;
      flex-shrink: 0;
      background: #fff;
      border-radius:8px;
      box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.03);
    }
    .pageMain {
      flex: 1;
      width: 100%;
      height: 0px;
      border-radius: 8px;
      margin-top: 10px;
      overflow-x: auto;
    }
    .xfan-btn{
      width:40px;
      padding:10px;
      box-sizing: border-box;
      position: absolute;
      top: 85px;
      background-color: #fff;
      right: 0;
      font-size: 14px;
      text-align: center;
      box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
      display: flex;
      flex-direction: column;
      align-items: center;
      cursor: pointer;
      border-radius: 2px;
      z-index: 999;
    }
  }
}
</style>
