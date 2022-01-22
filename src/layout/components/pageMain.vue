<template>
  <div class="page-main">
    <!-- 被缓存页面 -->
    <transition name="fade-transform" mode="out-in" >
      <keep-alive>
        <router-view v-if="isAlive"> </router-view>
      </keep-alive>
    </transition>
    <!-- 不被缓存页面 -->
    <transition name="fade-transform" mode="out-in">
      <router-view v-if="!isAlive"> </router-view>
    </transition>
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
    isAlive() {
      if (this.alive_routes.includes(this.$route.name)) {
        return true;
      }
      return false;
    },
  },
};
</script>
<style lang="scss" scoped>


.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.5s;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
