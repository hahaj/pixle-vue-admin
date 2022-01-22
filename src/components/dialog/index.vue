<template>
  <div>
    <el-dialog
      class="pi-dialog"
      :visible.sync="dialogVisible"
      @close="onCloseDialog"
      v-bind="$attrs"
    >
      <span slot="title">{{ title }}</span>
      <div class="flex-row" slot="footer" v-if="showFooter">
        <pi-button v-if="showConfirm" theme @click="handleConfirm">{{
          confirmText
        }}</pi-button>
        <pi-button v-if="showCancle" @click.native="dialogVisible = false">{{
          cancleText
        }}</pi-button>
      </div>
      <div class="content-wrap">
        <slot></slot>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
    showFooter: {
      type: Boolean,
      default: true,
    },
    showConfirm: {
      type: Boolean,
      default: true,
    },
    showCancle: {
      type: Boolean,
      default: true,
    },
    confirmText: {
      type: String,
      default: "确定",
    },
    cancleText: {
      type: String,
      default: "取消",
    },
  },
  data() {
    return {
      dialogVisible: false,
    };
  },
  watch: {
    visible(newVal) {
      this.dialogVisible = newVal;
    },
  },
  methods: {
    onCloseDialog() {
      this.$emit("update:visible", false);
      this.$emit("close");
    },
    handleConfirm() {
      this.$emit("confirm");
    },
    
  },
};
</script>
<style lang="scss" scoped>
</style>