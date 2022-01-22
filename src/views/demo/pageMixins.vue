<template>
  <div class="page-container">
    <div class="prop-name">mixins/page.js</div>
    <div class="richtext" v-html="richtext"></div>
    <div class="sutitle">混入data</div>
    <!-- 表格 -->
    <el-table
      class="pi-table"
      :data="tableList"
      header-row-class-name="table-header"
    >
      <el-table-column label="混入字段" align="left" prop="name">
      </el-table-column>
      <el-table-column label="值" align="left" prop="type"> </el-table-column>
      <el-table-column
        label="作用说明"
        align="left"
        prop="desc"
        min-width="250"
      >
      </el-table-column>
    </el-table>
    <div class="sutitle">混入methods</div>
    <el-table
      class="pi-table"
      :data="tableList2"
      header-row-class-name="table-header"
    >
      <el-table-column label="混入函数" align="left" prop="name" width="250">
      </el-table-column>
      <el-table-column label="是否必须重写" align="left" prop="type">
      </el-table-column>
      <el-table-column label="是否空函数" align="left" prop="isempty">
      </el-table-column>
      <el-table-column
        label="作用说明"
        align="left"
        prop="desc"
        min-width="250"
      >
      </el-table-column>
    </el-table>
  </div>
</template>
 <script>
export default {
  data() {
    return {
      richtext: `<p><span style="color: #ff0000;">页面模板混入主要功能是抽取公用方法、变量和回调函数暴露减少书写代码量快速生成增删改查带表格的通用页面（类似用户管理，角色管理页），请结合用户管理，角色管理页例子学习使用方法。</span></p>
<br><pre class="language-javascript"><code>示例：

import mixins from "@/mixins/page.js";

export default {  
   mixins: [mixins], 
   methods:{
       //查询前回调
        searchBeforeCallback() {

        },
       //重置前回调
        resetBeforeCallback() {

        },
        //编辑前回调
        editBeforeCallback(row) {

        },
  }
    
}
</code></pre>`,
      tableList: [
        {
          name: "tableQuery",
          type: "{}",
          desc: "表格搜索接口参数",
        },
        {
          name: "total",
          type: "0",
          desc: "总页数",
        },
        {
          name: "tableLoading",
          type: "false",
          desc: "表格是否显示加载状态",
        },
        {
          name: "dialogVisible",
          type: "false",
          desc: "新增或编辑对话框是否显示",
        },
        {
          name: "tableList",
          type: "[]",
          desc: "表格数据",
        },
        {
          name: "openDialogType",
          type: "",
          desc: "打开对话框类型add:'添加'，edit:'编辑'，detail:'详情'",
        },
        {
          name: "selectionIds",
          type: "[]",
          desc: "选中项id数组",
        },
      ],
      tableList2: [
        {
          name: "getTableList",
          type: "必须",
          isempty: "是",
          desc: "从接口获取表格数据",
        },
        {
          name: "handleSearch",
          type: "否",
          desc: "搜索内容，点击搜索按钮触发",
          isempty: "否",
        },
        {
          name: "searchBeforeCallback",
          type: "否",
          desc: "搜索前回调函数",
          isempty: "是",
        },
        {
          name: "handleReset",
          type: "否",
          desc: "重置内容，点击重置按钮触发",
          isempty: "否",
        },
        {
          name: "resetBeforeCallback",
          type: "否",
          desc: "重置前回调函数",
          isempty: "是",
        },
        {
          name: "handleAdd",
          type: "否",
          desc: "显示新增对话框，点击新增按钮触发",
          isempty: "否",
        },
        {
          name: "addBeforeCallback",
          type: "否",
          desc: "新增前回调函数",
          isempty: "是",
        },
        {
          name: "handleEdit",
          type: "否",
          desc: "显示编辑对话框，点击编辑按钮触发",
          isempty: "否",
        },
        {
          name: "editBeforeCallback",
          type: "否",
          desc: "编辑前前回调函数",
          isempty: "是",
        },
        {
          name: "showDelModal",
          type: "否",
          desc: "删除前显示确定模态框",
          isempty: "否",
        },
        {
          name: "delSuccessCallback",
          type: "否",
          desc: "删除成功回调,重新设置page，刷新列表",
          isempty: "否",
        },

        {
          name: "onCloseDialog",
          type: "否",
          desc: "关闭（新增或编辑）对话框触发，恢复表单数据去除表单校验",
          isempty: "否",
        },
        {
          name: "closeDialogBeforeCallback",
          type: "否",
          desc: "关闭对话框前回调",
          isempty: "是",
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
  font-size: 15px;
}
.prop-name {
  color: #333;
  font-weight: bold;
}
.sutitle {
  &:nth-last-child(2) {
    margin-top: 30px;
  }
}
</style>