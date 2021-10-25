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
      } else {
        state.table[params.namespace][params.day] = params.data;
      }
    },
    UPDATE_ROW(state, params) {
      const itemIndex = state.table.food[params.day].findIndex(
        (item) => item.id === params.data.id
      );
      state.table.food[params.day].splice(itemIndex, 1, params.data);
    },
    RESET_TABLE(state) {
      Object.keys(state.table.food).forEach((key) => {
        state.table.food[key].forEach((item) => {
          item.cost = 0;
          item.count = 0;
        });
      });
    },
  },
  getters: {
    food: (state) => (day) => state.table.food[day],
    tableForSend: (state) => {
      const table = {};
      Object.keys(state.table.food).forEach((key) => {
        state.table.food[key].forEach((item) => {
          if (item.count > 0 && table[key]) {
            table[key].push(item);
          } else if (item.count > 0) {
            table[key] = [item];
          }
        });
      });
      return table;
    },
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
    async postTableData({ commit, getters }) {
      try {
        await api.sendTable(getters.tableForSend);
        commit('RESET_TABLE');
      } catch (e) {}
    },
  },
};
