<template>
  <el-upload
    class="avatar-uploader"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <img
      v-if="imageUrl"
      :src="imageUrl"
      class="avatar"
      :style="{ width: setWidth, height: setWidth }"
    />
    <i
      v-else
      class="el-icon-plus avatar-uploader-icon"
      :style="{ width: setWidth, height: setWidth, lineHeight: setWidth }"
    ></i>
  </el-upload>
</template>
<script>
export default {
  props: {
    width: {
      type: [Number, String],
      default: 100,
    },
    //图片大小限制
    limitSize: {
      type: Number,
      default: 10,
    },
    //图片类型限制
    type: {
      type: Array,
      default: () => ["image/jpeg", "image/png"],
    },
    url:{
     type:String,
     default:''
    }
  },
  data() {
    return {
      imageUrl: "",
    };
  },
  watch:{
      url:{
          handler(newVal){
              this.imageUrl=newVal
          },immediate:true
      }
  },
  computed: {
    setWidth() {
      if (this.width) {
        if (
          typeof this.width === "string" &&
          (this.width.includes("px") || this.width.includes("%"))
        ) {
          return this.width;
        } else {
          return this.width + "px";
        }
      }
      return "100px";
    },
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.$emit("success", res);
    },
    beforeAvatarUpload(file) {
      const isCorrFormat = this.type.includes(file.type);
      const isLtM = file.size / 1024 / 1024 < this.limitSize;

      if (!isCorrFormat) {
        this.$message.error("上传图片格式不支持!");
      }
      if (!isLtM) {
        this.$message.error(`上传图片大小不能超过 ${this.limitSize}MB!`);
      }
      return isCorrFormat && isLtM;
    },
  },
};
</script>
<style lang="scss" scoped>
.avatar-uploader {
  &::v-deep .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>