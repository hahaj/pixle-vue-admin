<template>
  <div class="page-container">
    <div class="block flex-row">
      <avatar-upload
        action="/upload"
        name="avatar"
        @success="onUploadAvatarSuccess"
      ></avatar-upload>
    </div>

    <div class="prop-name">avatarUpload</div>
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
import avatarUpload from "@/components/avatarUpload";
export default {
  components: {
    avatarUpload,
  },
  data() {
    return {
      richtext: `示例：<avatar-upload
        action="/upload"
        name="avatar"
        @success="onUploadAvatarSuccess"
      ></avatar-upload>`,
      tableList: [
        {
          name: "width",
          type: "prop",
          default: "100",
          desc: "控件宽,number、string",
        },
        {
          name: "limitSize",
          type: "prop",
          default: "10",
          desc: "图片大小限制，单位M,number",
        },
        {
          name: "type",
          type: "prop",
          default: '["image/jpeg", "image/png"]',
          desc: "允许上传的图片类型，array",
        },
        {
          name: "url",
          type: "prop",
          default: "",
          desc: "默认要显示图片的地址",
        },
        {
          name: "@success",
          type: "event",
          default: "",
          desc: "图片上传成功回调",
        },
        {
          name: "——",
          type: "——",
          default: "——",
          desc: "其他属性同element-upload",
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