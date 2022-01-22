<template>
      <div class="page-container">
          <div class="richtext" v-html="richtext"></div>
      </div>
</template>
<script>
export default {
    data(){
        return {
            richtext:`<p style="margin-bottom:10px"><strong><span style="font-size: 18px;">项目介绍</span></strong></p>          
<hr />
<ul style="margin-top:20px;padding:0 30px; box-sizing: border-box;">
<li>pixle-vue-admin基于vue2.0、element-ui搭建，提供一套轻量级ui定制简约便捷的后台管理系统，方便快速搭建页面和扩展。</li>
<li>集成登录模块，动态路由（菜单），用户管理，角色管理，菜单管理，个人中心&nbsp; &nbsp; &nbsp;&nbsp;</li>
<li>集成常用组件例如： 搜索栏，对话框，富文本编辑器</li>
<li>提供权限指令快速构建页面级别权限控制</li>
<li>提供了页面模板混入，方便快速构建页面&nbsp;</li>
<li>常用全局样式</li>
<li>输入指令&nbsp;</li>
<li>路由配置功能&nbsp; &nbsp;</li>
<li>mock数据模拟</li>
</ul>`
        }
    }
}
</script>
<style lang="scss" scoped>
.richtext{
    padding: 0 20px;
    box-sizing: border-box;
    font-size: 15px;
    line-height: 30px;
}
</style>