<template>
  <div class="page-container">
    <div class="prop-name">router/index.js</div>
    <div class="richtext" v-html="richtext"></div>
    <!-- 表格 -->
    <el-table
      class="pi-table"
      :data="tableList"
      header-row-class-name="table-header"
    >
      <el-table-column label="属性名" align="left" prop="name">
      </el-table-column>
      <el-table-column label="参数类型" align="left" prop="type">
      </el-table-column>
      <el-table-column label="是否必须" align="left" prop="necessary">
      </el-table-column>
      <el-table-column label="说明" align="left" prop="desc" min-width="250">
      </el-table-column>
    </el-table>
    <div class="richtext" v-html="warnRichText"></div>
  </div>
</template>
 <script>
export default {
  data() {
    return {
      richtext: `<p>示例：</p>
<pre class="language-javascript"><code>{
  path: "/test",
  name: "Test",
  meta: {
      title: "测试",
      icon: "icon1"
    },
  component: () =&gt; import("../views/test"),
  hidden: true,
  alive:true, 
}</code></pre>`,
      tableList: [
        {
          name: "title",
          type: "string",
          necessary: "否",
          desc: "路由在左侧菜单栏显示的标题",
        },
        {
          name: "icon",
          type: "string",
          necessary: "否",
          desc: "路由在左侧菜单栏显示的图标，支持element图标或assets/button文件夹下的图标",
        },
        {
          name: "hidden",
          type: "boolean,number",
          necessary: "否",
          desc: "路由是否在左侧菜单栏显示，true（1）不显示，false（0）显示",
        },
        {
          name: "alive",
          type: "boolean,number",
          necessary: "否",
          desc: "是否缓存路由，true（1）缓存，false（0）不缓存,功能同<keep-alive>,true（1）时候name属性必须配置",
        },
      ],
      warnRichText: `<p><span style="color: #ff0000;">ps:</span></p>
<p><span style="color: #ff0000;">&nbsp; &nbsp;如果路由的children只有一个子路由且不配置title和icon,子路由将当做根路由显示在左侧菜单栏，</span></p>
<p><span style="color: #ff0000;">&nbsp; 例如：</span></p>
<pre class="language-javascript"><code>  {
    path: "/home",
    name: "Home",
    meta: {
      title: "",
      icon: ""
    },
    component: Layout,
    redirect: "/home/index",
    children: [{
      path: "index",
      name: "HomeIndex",
      meta: {
        title: "首页",
        icon: "icon0"
      },
      component: () =&gt; import("../views/home/index.vue"),
    }, ],
  },</code></pre>
<p>&nbsp;</p>`,
    };
  },
};
</script>
 <style lang="scss" scoped>
.block {
  margin-bottom: 15px;
}
.richtext {
  margin-top: 30px;
  margin-bottom: 30px;
  color: rgb(48, 141, 247);
  font-size: 15px;
}
.prop-name {
  color: #333;
  font-weight: bold;
}
</style>