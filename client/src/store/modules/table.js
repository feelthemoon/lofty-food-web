import api from '@/api/modules/table';

export default {
  namespaced: true,
  state: {
    table: {
      food: {
        data: [],
        total: null,
      },
      users: {
        data: [],
        total: null,
      },
      loadedDays: [],
      loadedPages: { 1: [], 2: [], 3: [], 4: [], 5: [] },
    },
  },
  mutations: {
    UPDATE_DATA(state, params) {
      state.table.food.data = [...params.data.data];
      state.table.food.total = params.data.total;
    },
  },
  getters: {
    food: (state) =>
      state.table.food.data.map((item) => ({ ...item, count: 0, cost: 0 })),
    totalFood: (state) => state.table.food.total,
  },
  actions: {
    async loadTable({ commit }, params) {
      try {
        const res = await api.getTable(params.day, params.page);
        commit('UPDATE_DATA', { namespace: 'food', data: res.data });
      } catch (e) {
        console.log(e);
      }
    },
  },
};
