import getUser from '@/api/modules/user';

export default {
  namespaced: true,
  state: {
    userInfo: {},
  },
  mutations: {
    SET_USER_INFO(state, user) {
      state.userInfo = user;
    },
  },
  getters: {
    user: state => state.userInfo,
  },
  actions: {
    async getUserInfo({ commit, rootState }) {
      try {
        const res = await getUser(rootState.token);
        commit('SET_USER_INFO', {
          email: res.data.email,
          name: res.data.name,
          username: res.data.given_name,
          uid: res.data.sub,
          pic: res.data.picture,
        });
      } catch (e) {
        console.log(e);
      }
    },
  },
};
