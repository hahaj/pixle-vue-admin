import {
  login,
  getUserInfo,
} from "@/api/user.js";

const state = {
  token: localStorage.getItem("token") || '',
  avatar: null,
  nickname: null,
  is_login: false, //是否已登录
  is_outlogin: false, //是否退出登录形式回到登录页

};

const mutations = {
  //清除token
  CLEAR_TOKEN(state) {
    localStorage.removeItem("token");
    state.token = "";
  },
  //设置token
  SET_TOKEN(state, token) {
    state.token = token;
  },
  //设置头像
  SET_AVATAR(state, avatar) {
    state.avatar = avatar||'';
  },
  SET_NICKNAME(state, nickname) {
    state.nickname = nickname||'';
  },
  //state恢复初始值
  RESET_STATE(state) {
    state.avatar = null;
    state.nickname = null;
  },
  //设置是否已登录
  SET_ISLOGIN(state, val) {
    state.is_login = val
  },
  //设置是否退出登录
  SET_ISOUTLOGIN(state, val) {
    state.is_outlogin = val
  },

};
const actions = {
  //清除token
  resetToken({
    commit
  }) {
    return new Promise((resolve) => {
      commit("CLEAR_TOKEN");
      resolve();
    });
  },
  //登录
  login({
    commit
  }, params) {
    return new Promise((resolve, reject) => {
      login(params.params)
        .then((res) => {
          commit("SET_TOKEN", res.data.token);
          localStorage.setItem("token", res.data.token);
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  //获取用户信息
  getUserInfo({
    commit
  }) {
    // eslint-disable-next-line no-unused-vars
    return new Promise((resolve, reject) => {
      getUserInfo({})
        .then((res) => {
          if (res.data) {
            commit("SET_AVATAR", res.data.avatar);
            commit("SET_NICKNAME", res.data.nickname);
            commit('SET_ISLOGIN',true)
          }
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};