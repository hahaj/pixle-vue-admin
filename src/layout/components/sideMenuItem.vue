<template>
  <div class="side-menu-item">
    <el-submenu
      v-if="item.children && item.children.length > 0"
      :index="item.path"
    >
      <template slot="title">
        <i v-if="item.meta&&item.meta.icon&& isElementIcon(item.meta.icon)" :class="['m-icon',item.meta.icon]"  style="color:white;"></i>
        <img
          v-else-if="item.meta && item.meta.icon"
          class="m-icon" 
          :src="getIcon(item.meta.icon)"
        />
        <span slot="title">{{ item.meta.title || "" }}</span>
        <img class="arrow" src="~@/assets/images/layout/arrow.png" />
      </template>
      <div v-for="val in item.children" :key="val.name||val.path">
        <side-menu-item
          :item="val"
          :allParentPath="getAllParentPath"
        ></side-menu-item>
      </div>
    </el-submenu>
    <el-menu-item v-else :index="setItemPath(item.path, allParentPath)">
      <i v-if="item.meta&&item.meta.icon&& isElementIcon(item.meta.icon)" :class="['m-icon',item.meta.icon]"  style="color:white;"></i>
      <img
         v-else-if="item.meta && item.meta.icon"
        class="m-icon"
        :src="getIcon(item.meta.icon)"
      />
      <span slot="title">{{ item.meta.title || "" }}</span>
    </el-menu-item>
  </div>
</template>
<script>
export default {
  name: "sideMenuItem",
  props: {
    allParentPath: {
      //所有父级路由
      type: String,
      default: "",
    },
    item: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {};
  },
  computed: {
    getIcon() {
      return (icon) => {
        return require(`@/assets/menu_icon/${icon}.png`);
      };
    },
    isElementIcon(){
         return icon=>{
           if(icon){
              return icon.includes('el-icon-')
           }
           return false
         }
    },
    setItemPath() {
      return (path, parentPath) => {
        if (path.indexOf("/") == 0) {
          return parentPath + path;
        } else {
          return parentPath + "/" + path;
        }
      };
    },
    getAllParentPath() {
      if (this.item.path.indexOf("/") == 0) {
        return this.allParentPath + this.item.path;
      } else {
        return this.allParentPath + "/" + this.item.path;
      }
    },
  },
  watch: {},
};
</script>
<style lang="scss" scoped>
.m-icon {
  margin-right: 10px;
  width: 18px;
}

</style>