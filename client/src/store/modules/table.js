import api from '@/api/modules/table';
import Vue from 'vue';

export default {
  namespaced: true,
  state: {
    table: {
      food: {},
      users: {
        data: [],
      },
    },
  },
  mutations: {
    UPDATE_DATA(state, params) {
      if (!state.table[params.namespace][params.day] && params.day) {
        Vue.set(state.table[params.namespace], params.day, params.data);
      }
      // state.table.food.data = [...params.data.data];
    },
  },
  getters: {
    food: (state) => (day) => state.table.food[day],
  },
  actions: {
    async loadTable({ commit }, params) {
      try {
        const res = await api.getTable(params.day, params.page);
        commit('UPDATE_DATA', {
          namespace: 'food',
          data: res.data,
          day: params.day,
        });
      } catch (e) {
        console.log(e);
      }
    },
  },
};
