<template>
  <div class="page-container">
     <div class="prop-name">全局样式（style/index.css page.css）</div>
    <div class="richtext" v-html="richtext"></div>
    <!-- 表格 -->
    <el-table
      class="pi-table"
      :data="tableList"
      header-row-class-name="table-header"
    >
      <el-table-column label="class名称" align="left" prop="name">
      </el-table-column>
      <el-table-column label="作用对象" align="left" prop="type"> </el-table-column>
      <el-table-column label="说明" align="left" prop="desc" min-width="250">
      </el-table-column>
    </el-table>
  </div>
</template>
 <script>
export default {
  data() {
    return {
      richtext: `<div>示例：</div>
<div>&nbsp;</div>
<div>&nbsp; &nbsp; &nbsp;表格：&nbsp;</div>
<div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;el-table class="pi-table" header-row-class-name="table-header"&gt;&lt;/el-table&gt;</div>
<div>
<div>&nbsp; &nbsp;&nbsp;</div>
<div>&nbsp; &nbsp; 对话框：&nbsp; &nbsp;</div>
<div>
<div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;el-dialog class="pi-dialog"&gt;&lt;/el-table&gt;</div>
</div>
<div>&nbsp; &nbsp; &nbsp;</div>
<div>&nbsp;</div>
</div>`,
      tableList: [
           {
          name: "page-container",
          type: "不限",
          desc: "页面最外层容器样式",
        },
           {
          name: "flex-row",
          type: "不限",
          desc: "flex横向布局，垂直方向居中对齐",
        },
            {
          name: "flex-col",
          type: "不限",
          desc: "flex纵向布局，横向方向居中对齐",
        },
            {
          name: "text-hide",
          type: "不限",
          desc: "文字单行显示，超出省略号",
        },
         {
          name: "text-hide-two",
          type: "不限",
          desc: "文字最多2行显示，超出省略号",
        },
             {
          name: "theme-color",
          type: "不限",
          desc: "快速设置主题色字体颜色==color: #40a6db;",
        },
             {
          name: "theme-bg",
          type: "不限",
          desc: "快速设置主题色背景==background-color: #40a6db;",
        },
        {
          name: "pi-table",
          type: "el-table",
          desc: "表格样式，添加该样式将生成改造过后的简约风格（全局例子使用的表格）",
        },
        {
          name: "table-header",
          type: "el-table",
          desc: "表头样式",
        },
         {
          name: "pi-dialog",
          type: "el-dialog",
          desc: "对话框样式，添加该样式将生成改造过后的简约风格（全局例子使用的对话框）",
        },
      ],
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
}
.prop-name{
    color: #333;
    font-weight: bold;
}
</style>