import getUser from '@/api/modules/user';

export default {
  namespaced: true,
  state: {
    userInfo: {},
    noAccess: false,
  },
  mutations: {
    SET_USER_INFO(state, user) {
      state.userInfo = user;
    },
    SET_NO_ACCESS(state, noAccess) {
      state.noAccess = noAccess;
    },
  },
  getters: {
    user: state => state.userInfo,
    noAccess: state => state.noAccess,
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
        if (e.response.status === 403) {
          localStorage.clear();
          commit('SET_NO_ACCESS', e.response.data.message);
        }
      }
    },
  },
};
