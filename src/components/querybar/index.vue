<template>
  <div class="query-bar flex-row">
    <pi-querybar-item :label="label">
      <el-input
        class="query-input"
        :placeholder="placeholder"
        :clearable="clearable"
        :value="value"
        @keyup.enter.native="handleSearch"
        @input="onInput"
      />
    </pi-querybar-item>
    <slot></slot>
    <pi-querybar-item v-permission="permission_tag">
      <pi-button theme @click="handleSearch" icon="search_light">
        查询</pi-button
      >
      <pi-button @click="handleReset" icon="el-icon-refresh"> 重置</pi-button>
    </pi-querybar-item>
  </div>
</template>
<script>
export default {
  props: {
    label: {
      type: String,
      default: "名称",
    },
    value: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "请输入内容",
    },
    clearable: {
      type: Boolean,
      default: true,
    },
    permission_tag:{
      type: String,
      default: "",
    }
  },
  model: {
    prop: "value",
    event: "input",
  },

  data() {
    return {};
  },
  methods: {
    handleSearch() {
      this.$emit("search");
    },
    handleReset() {
      this.$emit("reset");
    },
    onInput(e) {
      this.$emit("input", e);
    },
  },
};
</script>
<style scoped>
</style>