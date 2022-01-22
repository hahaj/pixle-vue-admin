<template>
  <div class="container">
    <div class="main flex-row">
      <section class="title-box">
        <h3 class="title">...&nbsp;&nbsp;&nbsp;Hello!&nbsp;&nbsp;&nbsp;...</h3>
        <h4 class="subtitle">欢迎来到Pixle Vue Admin!</h4>
        <div class="english">
          <span>A simple and portable background management system </span>
          <span>vue framework</span>
        </div>
      </section>
      <section class="login-window">
        <h2 class="txt">Login</h2>
        <div v-if="loginType == 'account'" class="input-row">
          <img class="icon" src="@assets/images/login/user.png" />
          <input
            class="input"
            v-model="account"
            placeholder="请输入用户名"
            :readonly="readonlyInput"
            @focus="cancelReadOnly()"
          />
        </div>
        <div v-else class="input-row">
          <img class="icon" src="@assets/images/login/user.png" />
          <input
            class="input"
            v-input.num
            v-model="mobile"
            placeholder="请输入手机号"
            maxlength="11"
            :readonly="readonlyInput"
            @focus="cancelReadOnly()"
          />
        </div>
        <div v-if="loginType == 'account'" class="input-row">
          <img class="icon" src="@assets/images/login/lock2.png" />
          <input
            class="input"
            v-model="password"
            placeholder="请输入密码"
            type="password"
            :readonly="readonlyInput"
            @focus="cancelReadOnly()"
          />
        </div>
        <div class="verif-view">
          <div class="input-panel">
            <img class="icon" src="@assets/images/login/code.png" />
            <input
              v-if="loginType == 'account'"
              v-model="inputRamCode"
              class="input"
                v-input.num
              placeholder="请输入验证码"
            />
            <input
              v-else
              class="input"
              v-input.num_alp
              v-model="inputMsgCode"
              placeholder="请输入验证码"
            />
          </div>
          <div
            v-if="loginType == 'account'"
            class="code-panel"
            @click="getRamdonCode"
          >
            <verficode-view :identifyCode="ramdoCode"></verficode-view>
          </div>
          <div v-else class="code-panel get-code-btn" @click="handlePhoneCode">
            {{ getCodeTxt || "获取验证码" }}
          </div>
        </div>
        <div class="opt-bar flex-row">
          <div
            v-if="loginType == 'account'"
            class="panel"
            @click="isRembPsd = !isRembPsd"
          >
            <img class="icon" :src="setRemPsdIcon" />
            <span class="_txt">记住密码</span>
          </div>
          <div
            class="panel"
            @click="loginType = loginType == 'account' ? 'phone' : 'account'"
          >
            <img class="icon icon2" :src="setLoginTypeIcon" />
            <span class="_txt">
              {{ loginType == "account" ? "手机登录" : "密码登录" }}</span
            >
          </div>
        </div>
        <div class="login-btn" @click="handleLogin">登录</div>
      </section>
    </div>
  </div>
</template>
<script>
import verficodeView from "@/components/verficode.vue";
export default {
  components: { verficodeView },
  data() {
    return {
      ramdoCode: "", //随机验证码
      isRembPsd: false, //记住密码
      loginType: "account", //登录方式phone:手机号 account:'账号密码'
      getCodeTxt: "",
      account: "", //账号
      mobile: "",
      password: "",
      interval: null,
      inputRamCode: "", //用户输入的随机验证码
      inputMsgCode: "", //用户输入的短信验证码
      readonlyInput: true,
    };
  },
  created() {
    this.getRamdonCode();
    //从本地还原账号密码

    let isRembPsd = localStorage.getItem("isRembPsd") || false;
    this.isRembPsd = isRembPsd === "true" ? true : false;
    this.account = this.isRembPsd ? localStorage.getItem("account") : "";
    this.password = this.isRembPsd ? localStorage.getItem("password") : "";
  },
  computed: {
    setRemPsdIcon() {
      //设置记住密码勾选图标
      return this.isRembPsd
        ? require("@assets/images/login/checked_active.png")
        : require("@assets/images/login/checked_normal.png");
    },
    setLoginTypeIcon() {
      return this.loginType == "account"
        ? require("@assets/images/login/phone.png")
        : require("@assets/images/login/lock.png");
    },
  },
  methods: {
    //生成随机码
    getRamdonCode() {
      let code = "";
      for (let i = 0; i < 4; i++) {
        code += Math.floor(Math.random() * 10);
      }
      this.ramdoCode = code;
    },
    //获取手机验证码
    handlePhoneCode() {
      if (this.interval == null) {
        let i = 60;
        this.getCodeTxt = `${i}秒后重获`;
        this.interval = setInterval(
          () => {
            if (i > 1) {
              i--;
              this.getCodeTxt = `${i}秒后重获`;
            } else {
              clearInterval(this.interval);
              this.interval = null;
              this.getCodeTxt = "重新获取";
            }
          },
          1000,
          true
        );
      }
    },
    //登录
    async handleLogin() {
      if (!this.checkParamsLegal()) return; //检查参数是否合法

      let params = {}; //登录接口参数
      if (this.loginType == "account") {
        //账号密码的呢轮毂
        params = {
          type: 1,
          account: this.account,
          password: this.password,
        };
      }

      try {
        await this.$store.dispatch("user/login", {
          params: params,
        });
        if (this.loginType == "account") {
          localStorage.setItem("isRembPsd", this.isRembPsd);
          localStorage.setItem("account", this.isRembPsd ? this.account : "");
          localStorage.setItem("password", this.isRembPsd ? this.password : "");
        }

          this.$router.replace("/home/index");
          this.$notify({
            title:'登录成功',
            message:'欢迎回来！',
            type:'success',
            duration:3000
          })
      } catch (err) {
        console.log(err);
      }
    },
    //检查参数是否合法
    checkParamsLegal() {
      if (this.loginType == "account") {
        if (!this.account) {
          this.showMsg("请输入账号");
          return false;
        } else if (!this.password) {
          this.showMsg("请输入密码");
          return false;
        } else if (this.inputRamCode != this.ramdoCode) {
          this.showMsg("验证码错误");
          return false;
        }
        return true;
      }
    },
    showMsg(msg) {
      this.$message({
        type: "warning",
        message: msg,
        duration: 3000,
      });
    },
    cancelReadOnly() {
      this.readonlyInput = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  min-width: 1200px;
  overflow: auto;
  height: 100%;
  min-height: 675px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background: url("~@assets/images/login/bodybg.png") no-repeat;
  background-size: 100% 100%;
  &::after {
    display: block;
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 85%;
    height: 80%;
    min-height: 600px;
    z-index: 9;
    border-radius: 15px;
    background: #c1e1eb;
  }
  &::before {
    display: block;
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateX(20px) translateY(-50%)
      translateY(20px);
    width: 85%;
    height: 80%;
    min-height: 600px;
    z-index: 9;
    border-radius: 15px;
    background: #72c0d7;
  }
}
.main {
  width: 85%;
  height: 80%;
  min-height: 600px;
  z-index: 10;
  border-radius: 15px;
  background: url("~@assets/images/login/mainbg.png") no-repeat;
  background-size: 100% 100%;
  position: relative;
  left: -20px;
  top: -20px;
  justify-content: center;
}
.title-box {
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  .title {
    font-size: 36px;
    font-weight: 900;
    letter-spacing: 2px;
  }
  .subtitle {
    font-weight: 500;
    font-size: 25px;
    margin-top: 40px;
    letter-spacing: 5px;
  }
  .english {
    font-size: 13px;
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #f7f7f7;
  }
}
.login-window {
  margin-left: 260px;
  width: 350px;
  height: 486px;
  //height: 530px;
  border-radius: 10px;
  background: rgba($color: #fff, $alpha: 0.15);
  box-shadow: 0 0 5px 1px rgba($color: #000000, $alpha: 0.04);
  display: flex;
  flex-direction: column;
  align-items: center;

  .txt {
    width: 100%;
    color: white;
    font-size: 46px;
    margin-top: 50px;
    margin-bottom: 40px;
    padding-left: 30px;
    box-sizing: border-box;
    font-weight: normal;
  }
  // .txt2 {
  //   width: 100%;
  //   color: white;
  //   font-size: 16px;
  //   margin-top: 15px;
  //   padding-left: 30px;
  //   box-sizing: border-box;
  //   margin-bottom: 30px;
  //   font-weight: normal;
  //   letter-spacing: 1px;
  // }
  .input-row {
    width: 290px;
    height: 45px;
    border-radius: 6px;
    background: #fff;
    box-shadow: 0 0 2px 1px rgba($color: #000000, $alpha: 0.02);
    display: flex;
    align-items: center;
    padding: 4px 8px;
    box-sizing: border-box;
    margin-bottom: 15px;
    .icon {
      width: 18px;
      height: auto;
      flex-shrink: 0;
      margin-right: 8px;
    }
  }
  .verif-view {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 290px;
    height: 45px;

    .input-panel {
      height: 100%;
      width: 155px;
      display: flex;
      align-items: center;
      border-radius: 6px;
      background: #fff;
      box-shadow: 0 0 2px 1px rgba($color: #000000, $alpha: 0.02);
      padding: 4px 8px;
      box-sizing: border-box;
      .icon {
        width: 18px;
        height: auto;
        flex-shrink: 0;
        margin-right: 8px;
      }
    }
    .code-panel {
      width: 125px;
      height: 100%;
      border-radius: 6px;
      background: #fff;
      box-shadow: 0 0 2px 1px rgba($color: #000000, $alpha: 0.02);
      // padding: 4px 8px;
      overflow: hidden;
      box-sizing: border-box;
      font-size: 28px;
      color: #999;
      display: flex;
      justify-content: center;
      align-items: center;
      letter-spacing: 1px;
      position: relative;
      cursor: pointer;
      &::after {
        display: block;
        content: "";
        position: absolute;
        left: 50%;
        top: 60%;
        transform: translate(-50%, -50%);
        height: 1px;
        width: 55%;
        background-color: #777;
        z-index: 11;
      }
      &.get-code-btn {
        background-color: #2cadae;
        color: #fff;
        text-decoration: none;
        font-size: 16px;
        white-space: nowrap;
        overflow: hidden;
        &:hover {
          background-color: rgba($color: #46bbbb, $alpha: 1);
        }
        &::after {
          display: none;
        }
      }
    }
  }
}
.input {
  flex: 1;
  width: 0px;
  height: 100%;
  background: none;
  outline: none;
  border: none;
  font-size: 15px;
}
.login-btn {
  width: 290px;
  height: 45px;
  line-height: 45px;
  text-align: center;
  color: #fff;
  background-color: #2cadae;
  //background-color: #40a6db;;
  font-size: 20px;
  border-radius: 6px;
  box-shadow: 0 0 2px 1px rgba($color: #000000, $alpha: 0.02);
  margin-top: 20px;
  font-size: 17px;
  cursor: pointer;
  letter-spacing: 6px;
  &:hover {
    background-color: rgba($color: #46bbbb, $alpha: 1);
  }
}
.opt-bar {
  justify-content: space-between;
  width: 280px;
  margin-top: 10px;
  .panel {
    min-width: 40%;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    line-height: 45px;
    padding-left: 10px;
    box-sizing: border-box;
    cursor: pointer;
    .icon {
      width: 18px;
      height: auto;
      margin-right: 6px;
    }
    .icon2 {
      width: 14px;
    }
    ._txt {
      color: #fff;
      font-size: 16px;
    }
  }
}
</style>
