import axios from "axios";
import {Notification } from "element-ui";
import store from "@/store";
import router from "@/router";

const http = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 10000,
});

http.interceptors.request.use(
  (config) => {
    if (config.method == "post" && store.getters.token) {
      config.data = Object.assign(config.data||{}, {
        token: store.getters.token,
      });
    } else if (config.method == "get" && store.getters.token) {
      config.params = Object.assign(config.params||{}, {
        token: store.getters.token,
      });
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res.code == 1) {
      return res;
    } else if (res.code == -1) {

      Notification({
        title:'错误',
        message: "身份失效，请重新登录",
        type:'error',
        duration: 3000,
      })
      // eslint-disable-next-line no-unused-vars
      store.dispatch("user/resetToken").then((res) => {
        router.replace("/login");
      });

      return res;
    } else {
      Notification({
        title:'错误',
        message:  res.msg || "Error",
        type:'error',
        duration: 3000,
      })
      return Promise.reject(new Error(res.msg || "Error"));
    }
  },
  (err) => {
    if (err && err.response) {

      switch (err.response.status) {
        case 400:
          err.message = "请求错误(400)";
          break;
        case 403:
          err.message = "拒绝访问(403)";
          break;
        case 404:
          err.message = "请求出错(404)";
          break;
        case 408:
          err.message = "请求超时(408)";
          break;
        case 500:
          err.message = "服务器错误(500)";
          break;
        case 501:
          err.message = "服务未实现(501)";
          break;
        case 502:
          err.message = "网络错误(502)";
          break;
        case 503:
          err.message = "服务不可用(503)";
          break;
        case 504:
          err.message = "网络超时(504)";
          break;
        case 505:
          err.message = "HTTP版本不受支持(505)";
          break;
        default:
          err.message = `连接出错(${err.response.status})!`;
      }
    } else {
      err.message = "连接服务器失败!";
    }
    // Message({
    //   message: err.message,
    //   type: "error",
    //   duration: 3000,
    // });

    Notification({
      title:'错误',
      message: err.message,
      type:'error',
      duration: 3000,
    })

    return Promise.reject(err);
  }
);

export default http;
