<template>
  <div class="page-container">
    <div class="block flex-row">
      <pi-button icon="import_dark" @click="handleImport"> 导入</pi-button>
      <pi-button icon="export_dark" @click="handleExport"> 导出</pi-button>
    </div>

    <div class="prop-name">导入导出功能</div>
    <div class="richtext" v-html="richtext"></div>
    <!-- 表格 -->
    <el-table
      class="pi-table"
      :data="tableList"
      header-row-class-name="table-header"
    >
      <el-table-column label="方法名" align="left" prop="name" width="200">
      </el-table-column>
      <el-table-column label="使用方法" align="left" prop="type" width="250"> </el-table-column>
      <el-table-column label="参数说明" align="left" prop="default" min-width="250">
      </el-table-column>
      <el-table-column label="作用说明" align="left" prop="desc" width="250">
      </el-table-column>
    </el-table>
  </div>
</template>
 <script>
export default {
  components: {
  },
  data() {
    return {
      richtext: `<pre class="language-markup"><code>&lt;pi-button icon="import_dark" @click="handleImport"&gt; 导入&lt;/pi-button&gt;
&lt;pi-button icon="export_dark" @click="handleExport"&gt; 导出&lt;/pi-button&gt;</code></pre>
<p>&nbsp;</p>
<pre class="language-javascript"><code>export default {
   methods: {
   //导入文件
    handleImport() {
      this.$utils.importFile(
        this,
        "/upload",
        () =&gt; {
          this.$message.success("导入成功");
         
        },
        () =&gt; {
          this.$message.error("导入失败");
        }
      );
    },
    //导出文件
    handleExport(){
         this.$utils.exportFile(
        this,
        "/export_file",
        "物品清单.csv"
      );
    }
  },

}</code></pre>`,
      tableList: [
        {
          name: "importFile",
          type: "this.$utils.importFile",
          default: "(that,url,successFun=()=>{},failFun=()=>{})，that:页面this实例，url：文件上传地址，successFun：导入成功回调，failFun：导出失败回调",
          desc: "导入文件上传文件功能",
        },
        {
          name: "exportFile",
          type: " this.$utils.exportFile",
          default: "(that, url, filename,data={},method='post',successFun=()=>{},failFun=()=>{})，that:页面this实例，url：文件下载地址，filename:导出文件重命名名称，data：下载请求额外参数，method:下载请求方式，successFun：导出成功回调，failFun：导出失败回调",
          desc: "导出文件下载文件功能",
        },
        
      ],
    };
  },
  methods: {
   //导入文件
    handleImport() {
      this.$utils.importFile(
        this,
        "/upload",
        () => {
          this.$message.success("导入成功");
         
        },
        () => {
          this.$message.error("导入失败");
        }
      );
    },
    //导出文件
    handleExport(){
         this.$utils.exportFile(
        this,
        "/export_file",
        "物品清单.csv",
      );
    }
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
  margin-top: 50px;
  color: #333;
  font-weight: bold;
}
</style>