<template>
  <div class="page-container">
    <div class="block flex-row">
      <pi-button icon="add_light" theme> 深色按钮</pi-button>
    </div>
    <div class="block flex-row">
      <pi-button icon="add_dark"> 朴素按钮</pi-button>
    </div>
    <div class="block flex-row">
      <pi-button theme> 不带图标</pi-button>
    </div>

    <div class="block flex-row">
      <pi-button> 不带图标</pi-button>
    </div>
     <div class="prop-name">pi-button</div>
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
  </div>
</template>
 <script>
export default {
  data() {
    return {
      richtext: `示例：<pi-button  icon="add_light" theme @click="onClick"> 深色按钮</pi-button>`,
      tableList: [
        {
          name: "icon",
          type: "prop",
          default: "",
          desc: "按钮图标，支持element图标或assets/button文件夹下的图标",
        },
        {
          name: "theme",
          type: "prop",
          default: "",
          desc: "按钮类型，配置为深色按钮不配置为朴素按钮",
        },
         {
          name: "@click",
          type: "event",
          default: "",
          desc: "点击事件，点击时候触发",
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