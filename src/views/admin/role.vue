<template>
  <div class="page-container">
    <!-- 条件搜索 -->
    <pi-querybar
      label="姓名"
      v-model="tableQuery.name"
      @search="handleSearch"
      @reset="handleReset"
      :permission_tag="btnPermission.query"
    >
    </pi-querybar>
    <!-- 操作按钮 -->
    <div class="opt-bar">
      <pi-button @click="handleAdd" icon="add_light" theme   v-permission="btnPermission.add"> 新增</pi-button>
      <pi-button @click="handleDelAll" icon="delete_dark"   v-permission="btnPermission.del"> 批量删除</pi-button>
    </div>
    <!-- 表格 -->
    <el-table
      ref="table"
      v-loading="tableLoading"
      class="pi-table"
      :data="tableList"
      header-row-class-name="table-header"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column label="ID" align="center" prop="id" sortable width="80">
      </el-table-column>
      <el-table-column label="角色名称" align="center" prop="name">
      </el-table-column>
      <el-table-column label="角色标识" align="center" prop="tag">
      </el-table-column>
      <el-table-column
        label="角色描述"
        align="center"
        prop="desc"
        min-width="200"
      >
      </el-table-column>
      <el-table-column label="状态" align="center" prop="email">
        <template slot-scope="{ row }">
          <el-switch
            :value="row.status ? true : false"
            @change="onSwitchChange(row)"
          >
          </el-switch>
        </template>
      </el-table-column>

      <el-table-column
        label="修改时间"
        align="center"
        prop="update_time"
        sortable
        min-width="200"
      >
      </el-table-column>
      <el-table-column fixed="right" label="操作" align="center" width="250">
        <template slot-scope="{ row }">
          <el-tooltip
            effect="light"
            content="编辑"
            placement="bottom"
            v-fixtooltip
            v-permission="btnPermission.edit"
          >
            <img
              class="opt-icon"
              src="@/assets/images/common/edit_icon.png"
              @click="handleEdit(row)"
            />
          </el-tooltip>
          <el-tooltip
            effect="light"
            content="删除"
            placement="bottom"
            v-fixtooltip
            v-permission="btnPermission.del"
          >
            <img
              class="opt-icon"
              src="@/assets/images/common/delete_icon.png"
              @click="handleDelone(row)"
            />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <pi-pagination
      v-show="tableList && tableList.length > 0"
      :total="total"
      :page.sync="tableQuery.page"
      :limit.sync="tableQuery.limit"
      @pagination="getTableList"
    />
    <!-- 弹窗 -->
    <pi-dialog
      class="pi-dialog"
      width="550px"
      :visible.sync="dialogVisible"
      :title="getDialogTitle"
      @close="onCloseDialog"
      @confirm="onDialogConfirm"
    >
      <el-form
        ref="dialogForm"
        :rules="rules"
        :model="formQuery"
        label-position="right"
        label-width="7em"
        style="margin: 0 50px 0 30px"
        size="medium"
      >
        <el-form-item label=" 角色名称：" prop="name">
          <el-input
            v-model="formQuery.name"
            placeholder="请输入内容"
            clearable
          />
        </el-form-item>
        <el-form-item label=" 角色标识：" prop="tag">
          <el-input
            v-model="formQuery.tag"
            placeholder="请输入内容"
            clearable
          />
        </el-form-item>
        <el-form-item label=" 角色描述：">
          <el-input
            v-model="formQuery.desc"
            placeholder="请输入内容"
            clearable
            type="textarea"
            :rows="4"
          />
        </el-form-item>
        <el-form-item label=" 状态：">
          <el-radio-group v-model="formQuery.status">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="角色权限：">
          <el-tree
            ref="tree"
            :check-strictly="checkStrictly"
            :data="treeData"
            :props="defaultProps"
            show-checkbox
            node-key="id"
            class="permission-tree"
          />
        </el-form-item>
      </el-form>
    </pi-dialog>
  </div>
</template>
<script>
import {
  getList,
  deleteRole,
  addRole,
  editRole,
  getAuthTreeData,
} from "@api/admin/role.js";
import mixins from "@/mixins/page.js";
//表格接口参数
const tableQuery = {
  page: 1,
  limit: 10,
  name: "",
};
//表单提交参数
const formQuery = {
  name: "",
  desc: "",
  tag: "",
  status: 1,
  route_id:''
};
export default {
  mixins: [mixins],
  data() {
    return {
      btnPermission:{//按钮权限标识
        add:'rolemanage:add',
        edit:'rolemanage:edit',
        del:'rolemanage:del',
        query:'rolemanage:query',
      },
      tableQuery: Object.assign({}, tableQuery),
      tableList: [],
      formQuery: Object.assign({}, formQuery),
      rules: {
        name: [{ required: true, message: "必须输入", trigger: "blur" }],
        tag: [{ required: true, message: "必须输入", trigger: "blur" }],
      },
      roleOptions: [],
      treeData: [],
      defaultProps: {
        children: "children",
        label: "name",
      },
      checkStrictly: false,
    };
  },

  computed: {},
  created() {
    this.initOptions();
  },
  methods: {
    initOptions() {
      getAuthTreeData().then((res) => {
        this.treeData = res.data || [];
      });
    },
    //从接口获取表格数据
    getTableList() {
      getList().then((res) => {
        this.tableList = res?.data?.list || [];
        this.total = res?.data?.total || 0;
      });
      this.tableLoading = true;
      setTimeout(() => {
        this.tableLoading = false;
      }, 300);
    },
    //编辑前回调
    editBeforeCallback(row) {
      //恢复表单数据
      let { id, name, desc, tag, status } = row;
      this.formQuery = { id, name, desc, tag, status };

       this.checkStrictly = true;
        this.$nextTick(() => {
        this.$refs.tree.setCheckedKeys(row.route_id.split(','));
        this.checkStrictly = false;
      });
    },
    //批量删除
    handleDelAll() {
      if (this.selectionIds.length < 1) {
        this.$message.warning("请先勾选");
        return;
      }
      //删除前模态框确定
      this.showDelModal("all")
        .then(() => {
          //确定删除
          //http请求删除
          deleteRole({ ids: this.selectionIds.join(",") }).then(() => {
            //删除成功回调，刷新页面数据重新设置page
            this.delSuccessCallback("all");
          });
        })
        .catch(() => {
          //取消删除
        });
    },
    //单个删除
    handleDelone(row) {
      //删除前模态框确定
      this.showDelModal("one")
        .then(() => {
          //确定删除
          //http请求删除
          deleteRole({ ids: row.id }).then(() => {
            //删除成功回调，刷新页面数据重新设置page
            this.delSuccessCallback("one");
          });
        })
        .catch(() => {
          //取消删除
        });
    },
    //弹窗确定提交
    onDialogConfirm() {
      this.$refs["dialogForm"].validate((valid) => {
        if (valid) {
          this.formQuery.avatar = this.avatarUrl;

          const checkedKeys = this.$refs.tree.getCheckedKeys();
          const halfCheckKeys = this.$refs.tree.getHalfCheckedKeys();
          const allCheckKeys = [...checkedKeys, ...halfCheckKeys];
          this.formQuery.route_id = allCheckKeys.join(",");

          //添加提交
          if (this.openDialogType == "add") {
            // eslint-disable-next-line no-unused-vars
            addRole().then((res) => {
              this.dialogVisible = false;
              this.getTableList();
              this.$message.success("添加成功");
            
            });
          }
          //编辑提交
          else {
            // eslint-disable-next-line no-unused-vars
            editRole().then((res) => {
              this.dialogVisible = false;
              this.getTableList();
              this.$message.success("编辑成功");
            });
          }
        }
      });
    },
    //弹窗关闭前回调
    closeDialogBeforeCallback() {
      //清空头像url
      this.avatarUrl = "";
      if (this.$refs.tree) {
        this.$refs.tree.setCheckedNodes([]);
      }
    },
    //表格选中监听
    handleSelectionChange(e) {
      this.selectionIds = e.map((item) => {
        return item.id;
      });
    },
    onSwitchChange(e) {
      e.status = e.status ? 0 : 1;
      this.$message.success("模拟成功");
    },
  },
};
</script>
<style lang="scss" scoped>
.pi-table {
  .avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
}
</style>