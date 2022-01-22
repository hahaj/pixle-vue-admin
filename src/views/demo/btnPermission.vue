<template>
  <div class="page-container">
    <div class="block flex-row">
        <!-- 有权限 -->
      <pi-button v-permission="'rolemanage:add'" icon="add_light" theme> 添加</pi-button>
      <!-- 无权限 -->
      <pi-button v-permission="'rolemanage:search'" icon="add_light" theme> 查找</pi-button>
    </div>

     <div class="prop-name">v-permission</div>
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
      <el-table-column label="说明" align="left" prop="desc" min-width="250">
      </el-table-column>
    </el-table>
  </div>
</template>
 <script>
export default {
  data() {
    return {
      richtext: `示例：<pi-button v-permission="'rolemanage:add'" icon="add_light" theme> 添加</pi-button>`,
      tableList: [
        {
          name: "v-permission",
          type: "自定义指令",
          desc: "按钮权限指令，有权限显示控件，无权限隐藏控件，用户所有按钮权限存储于store/router/state/permission_btns数组中，传入值将与permission_btns数组对比，存在数组里显示不存在则隐藏",
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
    margin-top: 50px;
    color: #333;
    font-weight: bold;
}
</style>