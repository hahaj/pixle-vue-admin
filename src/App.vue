<template>
  <div id="app" v-cloak>
    <keep-alive>
      <router-view v-if="isAlive" />
    </keep-alive>
    <router-view v-if="!isAlive" />
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState("router", ["alive_routes"]),
    isAlive(){
       if (this.alive_routes.includes(this.$route.name)) {
        return true;
      }
      return false
    },
  },
};
</script>

<style lang="scss">
@import "./style/index";
@import "./style/page";
#app {
  height: 100%;
  width: 100%;
}
[v-cloak] {
  display: none;
}
</style>
