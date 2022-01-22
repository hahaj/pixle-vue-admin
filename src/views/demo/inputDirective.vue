<template>
  <div class="page-container">
    <div class="block flex-row">
      <el-input
        class="input"
        v-input.num
        v-model="content1"
        placeholder="只能输入数字"
      ></el-input>
    </div>
    <div class="block flex-row">
      <el-input
        class="input"
        v-input.float
        v-model="content2"
        placeholder="只能输入数字和小数点"
      ></el-input>
    </div>
    <div class="block flex-row">
      <el-input
        class="input"
        v-input.alp
        v-model="content3"
        placeholder="只能输入字母"
      ></el-input>
    </div>
    <div class="block flex-row">
      <el-input
        class="input"
        v-input.num_alp
        v-model="content4"
        placeholder="只能输入数字和字母"
      ></el-input>
    </div>

    <div class="prop-name">v-input</div>
    <div class="richtext" v-text="richtext"></div>
    <!-- 表格 -->
    <el-table
      class="pi-table"
      :data="tableList"
      header-row-class-name="table-header"
    >
      <el-table-column label="属性名" align="left" prop="name">
      </el-table-column>
      <el-table-column label="修饰符" align="left" prop="type"> </el-table-column>
      <el-table-column label="使用方法" align="left" prop="methord"> </el-table-column>
      <el-table-column label="作用说明" align="left" prop="desc" min-width="250">
      </el-table-column>
    </el-table>
  </div>
</template>
 <script>
export default {
  data() {
    return {
      content1: "",
      content2: "",
      content3: "",
      content4: "",
      richtext: `示例：<el-input
        class="input"
        v-input.num
        v-model="content1"
        placeholder="只能输入数字"
      ></el-input>`,
      tableList: [
        {
          name: "v-input",
          type: "num",
          methord:'v-input.num',
          desc: "只能输入数字",
        },
         {
          name: "v-input",
          type: "float",
          methord:'v-input.float',
          desc: "只能输入数字和小数点",
        },
         {
          name: "v-input",
          type: "alp",
          methord:'v-input.alp',
          desc: "只能输入英文字母",
        },
         {
          name: "v-input",
          type: "num_alp",
          methord:'v-input.num_alp',
          desc: "只能输入数字和英文字母",
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
.input {
  width: 250px;
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