<template>
  <div class="page-container">
    <div class="main flex-row" v-show="userInfo">
      <div class="userinfo">
        <img
          class="avatar"
          src="https://img1.baidu.com/it/u=984185799,2448847625&fm=26&fmt=auto"
        />
        <div class="nickname text-hide">{{ userInfo.nickname }}</div>
        <div class="indro">{{ userInfo.indro }}</div>
        <ul class="panel-list">
          <li class="panel-item flex-row">
            <div class="left flex-row">
              <i class="el-icon-user-solid"></i>
              <span class="title">用户名</span>
            </div>
            <div class="content">{{ userInfo.account }}</div>
          </li>
          <li class="panel-item flex-row">
            <div class="left flex-row">
              <i class="el-icon-s-custom"></i>
              <span class="title">性别</span>
            </div>
            <div class="content">{{ userInfo.sex === 0 ? "男" : "女" }}</div>
          </li>
          <li class="panel-item flex-row">
            <div class="left flex-row">
              <i class="el-icon-s-comment"></i>
              <span class="title">邮箱</span>
            </div>
            <div class="content">{{ userInfo.email }}</div>
          </li>
          <li class="panel-item flex-row">
            <div class="left flex-row">
              <i class="el-icon-s-check"></i>
              <span class="title">角色名称</span>
            </div>
            <div class="content">{{ userInfo.role }}</div>
          </li>
          <li class="panel-item flex-row">
            <div class="left flex-row">
              <i class="el-icon-timer"></i>
              <span class="title">创建日期</span>
            </div>
            <div class="content">{{ userInfo.createTime }}</div>
          </li>
        </ul>
      </div>
      <div class="input-box">
        <el-tabs v-model="activeMenu">
          <el-tab-pane label="基本信息" name="first">
            <el-form
              class="form"
              ref="form"
              :rules="rules"
              :model="infoFormQuery"
              label-position="right"
              label-width="6em"
              size="medium"
            >
              <el-form-item label="昵称">
                <el-input
                  class="input"
                  v-model="infoFormQuery.nickname"
                  placeholder="请输入内容"
                  clearable
                />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input
                  class="input"
                  v-model="infoFormQuery.email"
                  placeholder="请输入内容"
                  clearable
                />
              </el-form-item>
              <el-form-item label="简介">
                <el-input
                  class="input"
                  type="textarea"
                  :rows="4"
                  v-model="infoFormQuery.indro"
                  placeholder="请输入内容"
                  clearable
                />
              </el-form-item>
              <el-form-item label="性别">
                <el-radio-group v-model="infoFormQuery.sex">
                  <el-radio :label="0">男</el-radio>
                  <el-radio :label="1">女</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-form>
            <div class="btn-wrap flex-row">
              <pi-button class="save-btn" theme @click="handleSumbitInfo"
                >保存</pi-button
              >
              <pi-button class="closed-btn" @click="handleClose"
                >关闭</pi-button
              >
            </div>
          </el-tab-pane>
          <el-tab-pane label="修改密码" name="second">
            <el-form
              class="form"
              ref="form2"
              :rules="rules"
              :model="psdFormQuery"
              label-position="right"
              label-width="6em"
              size="medium"
            >
              <el-form-item label="旧密码" prop="oldpsd">
                <el-input
                  class="input"
                  v-model="psdFormQuery.oldpsd"
                  placeholder="请输入内容"
                  clearable
                />
              </el-form-item>
              <el-form-item label="新密码" prop="newpsd">
                <el-input
                  class="input"
                  v-model="psdFormQuery.newpsd"
                  placeholder="请输入内容"
                  clearable
                />
              </el-form-item>
              <el-form-item label="确认密码" prop="surepsd">
                <el-input
                  class="input"
                  v-model="psdFormQuery.surepsd"
                  placeholder="请输入内容"
                  clearable
                />
              </el-form-item>
            </el-form>
            <div class="btn-wrap flex-row">
              <pi-button class="save-btn" theme @click="handleSumbitPsd"
                >保存</pi-button
              >
              <pi-button class="closed-btn" @click="handleClose"
                >关闭</pi-button
              >
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script>
import { getUserInfo } from "@/api/user.js";
export default {
  data() {
    return {
      activeMenu: "first",
      rules: {
        oldpsd: [{ required: true, message: "必须输入", trigger: "blur" }],
        newpsd: [{ required: true, message: "必须输入", trigger: "blur" }],
        surepsd: [{ required: true, message: "必须输入", trigger: "blur" }],
      },
      infoFormQuery: {
        nickname: "",
        sex: 0,
        email: "",
        indro: "",
      },
      psdFormQuery: {
        oldpsd: "",
        newpsd: "",
        surepsd: "",
      },
      userInfo: "",
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      getUserInfo().then((res) => {
        this.userInfo = res.data ?? {};
        this.infoFormQuery = { ...this.infoFormQuery, ...this.userInfo };
      });
    },
    handleClose() {
      this.$router.go(-1);
    },
    //保存基本信息
    handleSumbitInfo() {},
    //修改密码保存
    handleSumbitPsd() {
      this.$refs["form2"].validate((valid) => {
        if (valid) {
            if(this.psdFormQuery.surepsd===this.psdFormQuery.newpsd){
                 console.log('提交')
            }
            else{
                this.$message.warning('两次密码不一致')
            }
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.main {
  width: 100%;
  box-sizing: border-box;
  align-items: flex-start;
}
.userinfo {
  width: 400px;
  min-width: 300px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 30px 25px 50px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 5px;
  .avatar {
    width: 120px;
    height: 120px;
    border-radius: 50%;
  }
  .nickname {
    width: 100%;
    font-size: 20px;
    margin-top: 15px;
    text-align: center;
    font-weight: 500;
    color: #262626;
  }
  .indro {
    font-size: 13px;
    width: 100%;
    text-align: center;
    margin-top: 10px;
    color: #555;
  }
  .panel-list {
    width: 100%;
    margin-top: 40px;
    .panel-item {
      width: 100%;
      justify-content: space-between;
      padding: 15px 5px;
      box-sizing: border-box;
      border-bottom: 1px solid #eee;
      font-size: 15px;
      .title {
        margin-left: 4px;
      }
    }
  }
}
.input-box {
  flex: 1;
  width: 0;
  margin-left: 30px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 25px;
  box-sizing: border-box;
  .input {
    width: 400px;
  }
  .save-btn {
    margin-left: 3em;
  }
  .closed-btn {
    margin-left: 5px;
  }
}
.form {
  margin-top: 10px;
}
</style>