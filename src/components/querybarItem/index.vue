<template>
  <div class="panel-wrap flex-row">
    <span v-if="label">{{label}}</span>
    <slot></slot>
  </div>
</template>
<script>
export default {
  props:{
    label:{
      type:String,
      default:''
    }
  }
};
</script>
<style lang="scss" scoped>
</style>