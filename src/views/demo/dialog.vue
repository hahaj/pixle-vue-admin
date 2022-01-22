<template>
  <div class="page-container">
    <div class="block flex-row">
      <pi-button icon="add_light" theme @click="dialogVisible=true">
        对话框展示</pi-button
      >
    </div>
       <div class="prop-name">pi-dialog</div>
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
    <!--  -->
    <pi-dialog  width="550px" :visible.sync="dialogVisible" title="标题" @close="onCloseDialog" @confirm="onDialogConfirm">内容</pi-dialog>
  </div>
</template>
 <script>
export default {
  data() {
    return {
      dialogVisible: false,
      richtext: `示例： <pi-dialog  width="550px" :visible.sync="dialogVisible" title="标题" @close="onCloseDialog" @confirm="onDialogConfirm">内容</pi-dialog>`,
      tableList: [
        {
          name: "visible",
          type: "prop",
          default: "false",
          desc: "显示隐藏标识，支持sync修饰",
        },
        {
          name: "width",
          type: "prop",
          default: "50%",
          desc: "控件宽度",
        },
        {
          name: "showFooter",
          type: "prop",
          default: "true",
          desc: "是否显示底部确定取消按钮行",
        },
        {
          name: "showConfirm",
          type: "prop",
          default: "true",
          desc: "是否显示确定按钮",
        },
        {
          name: "showCancle",
          type: "prop",
          default: "true",
          desc: "是否显示取消按钮",
        },
        {
          name: "confirmText",
          type: "prop",
          default: "确定",
          desc: "确定按钮文字",
        },
         {
          name: "cancleText",
          type: "prop",
          default: "取消",
          desc: "取消按钮文字",
        },
        {
          name: "@close",
          type: "event",
          default: "",
          desc: "控件关闭触发",
        },
        {
          name: "@confirm",
          type: "event",
          default: "",
          desc: "确定按钮点击触发",
        },
         {
          name: "——",
          type: "——",
          default: "——",
          desc: "支持匿名插槽，其他属性同（继承）element-dialog",
        },
      ],
    };
  },
  methods:{
      onCloseDialog(){
          console.log('关闭')
      },
      onDialogConfirm(){
          this.$message.success('确定')
      }
  }
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