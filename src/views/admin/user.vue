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
      <pi-button @click="handleAdd" icon="add_light" theme v-permission="btnPermission.add"> 新增</pi-button>
      <pi-button @click="handleDelAll" icon="delete_dark" v-permission="btnPermission.del"> 批量删除</pi-button>
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
      <el-table-column label="用户名" align="center" prop="account">
      </el-table-column>
      <el-table-column label="昵称" align="center" prop="nickname">
      </el-table-column>
      <el-table-column label="头像" align="center">
        <template slot-scope="{ row }"
          ><img class="avatar" :src="row.avatar"
        /></template>
      </el-table-column>
      <el-table-column label="邮箱" align="center" prop="email" min-width="150">
      </el-table-column>
      <el-table-column label="角色名称" align="center" prop="role">
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
        label-width="6em"
        style="margin: 0 50px 0 30px"
        size="medium"
      >
        <el-form-item label=" 用户名：" prop="account">
          <el-input
            v-model="formQuery.account"
            placeholder="请输入内容"
            clearable
          />
        </el-form-item>
        <el-form-item label=" 密码：" prop="password">
          <el-input
            v-model="formQuery.password"
            placeholder="请输入内容"
            show-password
            clearable
          />
        </el-form-item>
        <el-form-item label="昵称：">
          <el-input
            v-model="formQuery.nickname"
            placeholder="请输入内容"
            clearable
          />
        </el-form-item>
        <el-form-item label=" 邮箱：">
          <el-input
            v-model="formQuery.email"
            placeholder="请输入内容"
            clearable
          />
        </el-form-item>
        <el-form-item label=" 角色：" prop="role">
          <el-select v-model="formQuery.role" clearable>
            <el-option
              v-for="item in roleOptions"
              :label="item.name"
              :value="item.id"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label=" 头像：">
          <avatar-upload
            action="/upload"
            name="avatar"
            :url="formQuery.avatar"
            @success="onUploadAvatarSuccess"
          ></avatar-upload>
        </el-form-item>
      </el-form>
    </pi-dialog>
  </div>
</template>
<script>
import {
  getList,
  getRoles,
  deleteUser,
  addUser,
  editUser,
} from "@api/admin/user.js";
import mixins from "@/mixins/page.js";
import avatarUpload from "@/components/avatarUpload";
//表格接口参数
const tableQuery = {
  page: 1,
  limit: 10,
  name: "",
};
//表单提交参数
const formQuery = {
  account: "",
  password: "",
  nickname: "",
  email: "",
  role: "",
  avatar: "",
};
export default {
  mixins: [mixins],
  components: { avatarUpload },
  data() {
    return {
      //按钮权限标识
      btnPermission: {
        add: "usermanage:add",
        edit: "usermanage:edit",
        del: "usermanage:del",
        query: "usermanage:query",
      },
      tableQuery: Object.assign({}, tableQuery),
      tableList: [],
      formQuery: Object.assign({}, formQuery),
      rules: {
        account: [{ required: true, message: "必须输入", trigger: "blur" }],
        password: [{ required: true, message: "必须输入", trigger: "blur" }],
        role: [{ required: true, message: "必须选择", trigger: "change" }],
        avatar: [{ required: true, message: "必须选择", trigger: "change" }],
      },
      roleOptions: [],
      avatarUrl: "", //上传头像url
    };
  },

  computed: {},
  created() {
    this.initOptions();
  },
  methods: {
    //加载下拉列表等其他数据
    initOptions() {
      //角色数据
      getRoles().then((res) => {
        this.roleOptions = res.data || [];
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
      let { id, account, password, email, role, avatar, nickname } = row;
      this.formQuery = { id, account, password, email, role, avatar, nickname };
      this.avatarUrl = avatar;
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
          deleteUser({ ids: this.selectionIds.join(",") }).then(() => {
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
          deleteUser({ ids: row.id }).then(() => {
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
          //添加提交
          if (this.openDialogType == "add") {
            // eslint-disable-next-line no-unused-vars
            addUser().then((res) => {
              this.dialogVisible = false;
              this.getTableList();
              this.$message.success("添加成功");
            });
          }
          //编辑提交
          else {
            // eslint-disable-next-line no-unused-vars
            editUser().then((res) => {
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
    },
    //表格选中监听
    handleSelectionChange(e) {
      this.selectionIds = e.map((item) => {
        return item.id;
      });
    },
    //头像图片上传成功
    onUploadAvatarSuccess(res) {
      this.avatarUrl = res.data;
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