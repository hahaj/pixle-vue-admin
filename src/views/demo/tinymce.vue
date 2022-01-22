<template>
  <div class="page-container">
    <div class="block flex-row">
      <tinymce
        :action="upload_url"
        :name="upload_name"
        :formdata="upload_data"
        v-model="content"
        :height="300"
        width="80%"
      />
    </div>

    <div class="prop-name">tinymce</div>
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
      <el-table-column label="默认值" align="left" prop="default" width="250">
      </el-table-column>
      <el-table-column label="说明" align="left" prop="desc" min-width="250">
      </el-table-column>
    </el-table>
  </div>
</template>
 <script>
import tinymce from "@/components/Tinymce";
export default {
  components: {
    tinymce
  },
  data() {
    return {
      content: "",
      upload_url: "", //上传地址
      upload_name: "file", //上传的文件字段名
      upload_data: {}, //上传时附带的额外参数
      richtext: `示例：<tinymce
          v-model="content"
              action="/upload"
              name="file"
              :height="300"
              width="80%"
            />`,
      tableList: [
        {
          name: "height",
          type: "prop",
          default: "360",
          desc: "控件高,number、string",
        },
       {
          name: "width",
          type: "prop",
          default: "auto",
          desc: "控件宽",
        },
        {
          name: "action",
          type: "prop",
          default: '',
          desc: "上传地址",
        },
        {
          name: "name",
          type: "prop",
          default: "",
          desc: "上传的文件字段名",
        },
        {
          name: "formdata",
          type: "prop",
          default: "",
          desc: "上传时附带的额外参数",
        },
      ],
    };
  },
  methods: {
    onUploadAvatarSuccess(e) {
      console.log(e);
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
.prop-name {
  margin-top: 50px;
  color: #333;
  font-weight: bold;
}
</style>