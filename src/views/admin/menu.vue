<template>
  <div class="page-container">
    <!-- 操作按钮 -->
    <div class="opt-bar">
      <pi-button @click="handleAdd" icon="add_light" theme> 新增</pi-button>
    </div>
    <!-- 表格 -->
    <el-table
      ref="table"
      v-loading="tableLoading"
      class="pi-table"
      :data="tableList"
      header-row-class-name="table-header"
      :row-key="getRowId"
      :tree-props="{ children: 'children' }"
    >
      <el-table-column
        label="菜单名称"
        align="center"
        prop="name"
        min-width="180"
      >
      </el-table-column>
      <el-table-column label="类型" align="center" prop="name">
        <template slot-scope="{ row }">
          <span>{{ getTypeStr(row.type) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="路由名称"
        align="center"
        prop="routeName"
        min-width="150"
      >
      </el-table-column>
      <el-table-column
        label="路由路径"
        align="center"
        prop="routePath"
        min-width="150"
      >
      </el-table-column>
      <el-table-column
        label="文件路径"
        align="center"
        prop="filePath"
        min-width="200"
      >
      </el-table-column>
      <el-table-column label="授权标识" align="center" prop="permission" min-width="120">
      </el-table-column>
      <el-table-column label="显示状态" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.hidden ? "隐藏" : "显示" }}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否缓存" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.alive ? "缓存" : "不缓存" }}</span>
        </template>
      </el-table-column>

      <el-table-column label="菜单状态" align="center">
        <template slot-scope="{ row }">
          <el-switch
            :value="row.status ? true : false"
            @change="onSwitchChange(row)"
          >
          </el-switch>
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="操作" align="center" width="200">
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
    <!-- <pi-pagination
      v-show="tableList && tableList.length > 0"
      :total="total"
      :page.sync="tableQuery.page"
      :limit.sync="tableQuery.limit"
      @pagination="getTableList"
    /> -->
    <!-- 弹窗 -->
    <pi-dialog
      class="pi-dialog"
      width="700px"
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
        label-width="9em"
        style="margin: 0 50px 0 20px"
        size="medium"
      >
        <el-form-item label=" 类型：">
          <el-radio-group v-model="formQuery.type">
            <el-radio :label="0">根目录</el-radio>
            <el-radio :label="1">菜单</el-radio>
            <el-radio :label="2">按钮</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          v-show="formQuery.type==0"
          label="目录名称"
          ref="form-item-name"
        >
          <el-input
            v-model="formQuery.name"
            placeholder="请输入内容（当子菜单只有一项时，不填将合并子菜单到目录）"
            clearable
          />
        </el-form-item>
        <el-form-item
           v-show="formQuery.type!=0"
          :label="formQuery.type != 2 ? '菜单名称：' : '按钮名称：'"
          prop="name"
          ref="form-item-name"
        >
          <el-input
            v-model="formQuery.name"
            placeholder="请输入内容"
            clearable
          />
        </el-form-item>
        <el-form-item label="上级菜单：" prop="pid">
          <el-cascader
            v-model="formQuery.pid"
            :options="treeData"
            :props="{ value: 'id', label: 'title', checkStrictly: true }"
            clearable
          ></el-cascader>
        </el-form-item>
        <el-form-item v-show="formQuery.type != 2" label="菜单图标：">
          <el-input
            v-model="formQuery.icon"
            placeholder="element icon图标或src\assets\menu_icon 图标名称，例如：icon0"
            clearable
          />
        </el-form-item>
        <el-form-item
          v-if="formQuery.type != 2"
          label="路由路径："
          prop="routePath"
        >
          <el-input
            v-model="formQuery.routePath"
            placeholder="请输入内容（路由path）"
            clearable
          />
        </el-form-item>
        <el-form-item v-show="formQuery.type != 2" label="路由名称：">
          <el-input
            v-model="formQuery.routeName"
            placeholder="请输入内容（路由name）"
            clearable
          />
        </el-form-item>
        <el-form-item
          v-show="formQuery.type == 1"
          label="vue文件路径："
          prop="filePath"
        >
          <el-input
            v-model="formQuery.filePath"
            placeholder="请输入内容（路由component）"
            clearable
          />
        </el-form-item>
        <el-form-item v-show="formQuery.type != 2" label="重定向：">
          <el-input
            v-model="formQuery.redirect"
            placeholder="请输入内容（路由redirect）"
            clearable
          />
        </el-form-item>
        <el-form-item
          label="授权标识："
          v-if="formQuery.type != 0"
          prop="permission"
          
        >
          <el-input
            v-model="formQuery.permission"
            placeholder="请输入内容"
            clearable
          />
        </el-form-item>
        <el-form-item v-show="formQuery.type != 2" label=" 显示状态：">
          <el-radio-group v-model="formQuery.hidden">
            <el-radio :label="0">显示</el-radio>
            <el-radio :label="1">隐藏</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-show="formQuery.type != 2" label="是否缓存：">
          <el-radio-group v-model="formQuery.alive">
            <el-radio :label="1">缓存</el-radio>
            <el-radio :label="0">不缓存</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          :label="formQuery.type != 2 ? '菜单状态：' : '按钮状态：'"
        >
          <el-radio-group v-model="formQuery.status">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </pi-dialog>
  </div>
</template>
<script>
import { getList, deleteMenu, addMenu, editMenu } from "@api/admin/menu.js";
import { getAllRouter } from "@api/admin/router.js";
import mixins from "@/mixins/page.js";
//表格接口参数
const tableQuery = {
  page: 1,
  limit: 10,
  name: "",
};
//表单提交参数
const formQuery = {
  type: 0,
  name: "",
  pid: "", //上级路由
  icon: "",
  routePath: "",
  routeName: "",
  filePath: "",
  redirect: "",
  permission: "",
  hidden: 0,
  alive: 0,
  status: 1,
};
export default {
  mixins: [mixins],
  data() {
    return {
      tableQuery: Object.assign({}, tableQuery),
      tableList: [],
      formQuery: Object.assign({}, formQuery),
      rules: {
        name: [{ required: true, message: "必须输入", trigger: "blur" }],
        tag: [{ required: true, message: "必须输入", trigger: "blur" }],
        pid: [{ required: true, message: "必须选择", trigger: "change" }],
        routePath: [{ required: true, message: "必须输入", trigger: "blur" }],
        filePath: [{ required: true, message: "必须输入", trigger: "blur" }],
        permission: [{ required: true, message: "必须输入", trigger: "blur" }],
      },
      roleOptions: [],
      treeData: [],
    };
  },

  computed: {
    getRowId() {
      return (row) => {
        return row.id + "";
      };
    },
    getTypeStr() {
      return (type) => {
        let obj = ["目录", "菜单", "按钮"];
        if (type < obj.length) {
          return obj[type];
        }
        return "";
      };
    },
  },
  created() {
    this.initOptions();
  },
  methods: {
    initOptions() {
      getAllRouter().then((res) => {
        let treeData = this.generateRoutes(res.data || []);
        this.treeData = [
          {
            id: -1,
            path: "/",
            title: "根目录",
            children: treeData,
          },
        ];
      });
    },
    //从接口获取表格数据
    getTableList() {
      getList().then((res) => {
        this.tableList = res?.data || [];
      });
      this.tableLoading = true;
      setTimeout(() => {
        this.tableLoading = false;
      }, 300);
    },
    //编辑前回调
    editBeforeCallback(row) {
      //恢复表单数据
      let {
        id,
        type,
        name,
        pid,
        icon,
        routePath,
        routeName,
        filePath,
        redirect,
        permission,
        hidden,
        alive,
        status,
      } = row;
      this.formQuery = {
        id,
        type,
        name,
        pid,
        icon,
        routePath,
        routeName,
        filePath,
        redirect,
        permission,
        hidden,
        alive,
        status,
      };
    },

    //单个删除
    handleDelone(row) {
      //删除前模态框确定
      this.showDelModal("one")
        .then(() => {
          //确定删除
          //http请求删除
          deleteMenu({ ids: row.id }).then(() => {
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
            addMenu().then((res) => {
              this.dialogVisible = false;
              this.getTableList();
              this.$message.success("添加成功");
            });
          }
          //编辑提交
          else {
            // eslint-disable-next-line no-unused-vars
            editMenu().then((res) => {
              this.dialogVisible = false;
              this.getTableList();
              this.$message.success("编辑成功");
            });
          }
        }
      });
    },
    //弹窗关闭前回调
    closeDialogBeforeCallback() {},
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

    //生成满足树形结构路由
    generateRoutes(routes) {
      const res = [];
      for (let route of routes) {
        if (route.hidden) {
          continue;
        }

        if (
          !(route.meta && route.meta.title) &&
          route.children &&
          route.children.length == 1
        ) {
          route.meta = route.children[0].meta;
        }

        const data = {
          title: route.meta && route.meta.title,
          id: route.id,
        };
        if (route.children) {
          data.children = this.generateRoutes(route.children);
        }
        res.push(data);
      }
      return res;
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