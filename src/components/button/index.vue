<template>
  <div :class="['pi-button', theme ? 'theme-button' : '']">
    <el-button
      ref="elbutton"
      :plain="theme ? false : true"
      @click="handleClick"
    >
      <i
        v-if="isElementIcon"
        :class="['icon', icon]"
        :style="{ color: getIconColor }"
      ></i>
      <img v-else-if="icon" class="icon" :src="getIconUrl" />
      <slot></slot>
    </el-button>
  </div>
</template>
<script>
export default {
  props: {
    icon: {
      //图标名不带后缀例如icon0，默认放置/assets/button目录下
      type: String,
      default: "",
    },
    theme: {
      type: Boolean,
      default: false,
    },
    iconColor:{
       type: String,
      default: "#000",
    }
  },
  computed: {
    isElementIcon() {
      if (this.icon) {
        return this.icon.includes("el-icon-");
      }
      return false;
    },
    getIconUrl() {
      return this.icon ? require(`@/assets/button/${this.icon}.png`) : "";
    },
    getIconColor() {
      return this.theme ? "#fff" :  this.iconColor||"#000";
    },
  },
  methods: {
    handleClick() {
      this.$emit("click");
    },
  },
};
</script>
<style lang="scss" scoped>
.pi-button {
  font-size: 14px;
  margin-right: 6px;
  &::v-deep .el-button {
    border-color: #999999;
    border-radius: 5px;
    font-size: 14px;
    padding: 8px 20px;
    & > span {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  &::v-deep .el-button.is-plain:focus,
  .el-button.is-plain:hover {
    color: #999999;
  }
  &.theme-button {
    &::v-deep .el-button {
      border: 0px solid transparent;
      background: #40a6db;
      color: white;
      overflow: hidden;
      outline: none;
    }
    &::v-deep .el-button:active,
    .el-button:hover {
      opacity: 0.85;
    }
  }
}
.icon {
  width: 15px;
  height: auto;
  margin-right: 4px;
}
</style>