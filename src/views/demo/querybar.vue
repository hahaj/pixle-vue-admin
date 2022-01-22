<template>
  <div class="page-container">
    <!--  -->
    <div class="block flex-row">
      <pi-querybar
        label="姓名"
        v-model="name"
        @search="handleSearch"
        @reset="handleReset"
      >
      </pi-querybar>
    </div>
    <!--  -->
    <div class="block flex-row">
      <pi-querybar
        label="姓名"
        v-model="name"
        @search="handleSearch"
        @reset="handleReset"
      >
        <pi-querybar-item label="班级">
          <el-input placeholder="请输入内容" />
        </pi-querybar-item>
      </pi-querybar>
    </div>
    <!-- querybar -->
    <div class="prop-name">querybar</div>
    <div class="richtext" v-text="richtext"></div>
    <!-- 表格 -->
    <el-table
      class="pi-table"
      :data="tableList"
      header-row-class-name="table-header"
    >
      <el-table-column label="属性名" align="left" prop="name">
      </el-table-column>
      <el-table-column label="类型" align="left" prop="type"> </el-table-column>
      <el-table-column label="默认值" align="left" prop="default">
      </el-table-column>
      <el-table-column label="说明" align="left" prop="desc" min-width="250">
      </el-table-column>
    </el-table>

    <!-- querybar-item -->
    <div class="prop-name">querybar-item</div>
    <div class="richtext" v-text="richtext2"></div>
    <!-- 表格 -->
    <el-table
      class="pi-table"
      :data="tableList2"
      header-row-class-name="table-header"
    >
      <el-table-column label="属性名" align="left" prop="name">
      </el-table-column>
      <el-table-column label="类型" align="left" prop="type"> </el-table-column>
      <el-table-column label="默认值" align="left" prop="default">
      </el-table-column>
      <el-table-column label="说明" align="left" prop="desc" min-width="250">
      </el-table-column>
    </el-table>
  </div>
</template>
 <script>
export default {
  data() {
    return {
      richtext: `示例：<pi-querybar
        label="姓名"
        v-model="name"
        @search="handleSearch"
        @reset="handleReset"
      >
      </pi-querybar>`,
      richtext2:`示例：<pi-querybar-item label="班级">
          <el-input placeholder="请输入内容" />
        </pi-querybar-item>`,
      tableList: [
        {
          name: "label",
          type: "prop",
          default: "",
          desc: "输入框左侧标题",
        },
        {
          name: "value",
          type: "prop",
          default: "",
          desc: "输入框内容",
        },
        {
          name: "placeholder",
          type: "prop",
          default: "请输入内容",
          desc: "输入框提示内容",
        },
        {
          name: "clearable",
          type: "prop",
          default: "false",
          desc: "是否可清空",
        },
        {
          name: "permission_tag",
          type: "prop",
          default: "",
          desc: "按钮权限标识",
        },
                {
          name: "@search",
          type: "event",
          default: "",
          desc: "点击查询触发",
        },
                {
          name: "@reset",
          type: "event",
          default: "",
          desc: "点击重置触发",
        },
        {
          name: "——",
          type: "——",
          default: "",
          desc: "支持匿名插槽，填充内容位于输入框和查询按钮之间",
        },
      ],
      name: "",
       tableList2: [
        {
          name: "label",
          type: "prop",
          default: "",
          desc: "左侧标题",
        },
        ]
    };
  },
  methods: {
    handleSearch() {
      console.log("搜索");
    },
    handleReset() {
      console.log("重置");
    },
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
    margin-top: 50px;
    color: #333;
    font-weight: bold;
}
</style>