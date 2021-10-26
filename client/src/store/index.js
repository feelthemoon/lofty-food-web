import Vue from 'vue';
import Vuex from 'vuex';
import table from '@/store/modules/table';
import auth from '@/store/modules/auth';
import user from '@/store/modules/user';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('auth') || null
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
      localStorage.setItem('auth', token);
    }
  },
  getters: {
    token: state => state.token
  },
  modules: {
    table,
    auth,
    user
  }
});
