import api from '@/api/modules/table';
import Vue from 'vue';

export default {
  namespaced: true,
  state: {
    table: {
      food: JSON.parse(localStorage.getItem('food')) || {},
      orders: {
        data: [],
      },
    },
    totalCount: null
  },
  mutations: {
    UPDATE_DATA(state, params) {
      if (params.namespace === 'users') {
        return (state.table.orders.data = params.data);
      }
      if (!state.table[params.namespace][params.day] && params.day) {
        Vue.set(state.table[params.namespace], params.day, params.data);
      } else {
        state.table[params.namespace][params.day] = params.data;
      }
    },
    UPDATE_ROW(state, params) {
      if (state.table.food[params.day]) {
        const itemIndex = state.table.food[params.day].findIndex(
          item => item.id === params.data.id,
        );
        state.table.food[params.day].splice(itemIndex, 1, params.data);
      }
    },
    RESET_TABLE(state) {
      Object.keys(state.table.food).forEach(key => {
        state.table.food[key].forEach(item => {
          item.cost = 0;
          item.count = 0;
        });
      });
      localStorage.removeItem('food');
    },

    UPDATE_USERS_TOTAL(state, total) {
      state.totalCount = total;
    }
  },
  getters: {
    food: state => day => state.table.food[day],
    orders: state => {
      if (state.table.orders.data.length) {
        return state.table.orders.data.map(order => ({
          ...order,
          slack_id: order.user.slack_id,
          name: order.user.name,
          email: order.user.email,
          createdAt: order.createdAt
            .split('T')[0]
            .split('-')
            .reverse()
            .join('.'),
        }));
      }
      return [];
    },
    orderFood: state => (user, day, createdAt) =>
      state.table.orders.data.map(order => {
        if (order.user.email === user && order.createdAt.split('T')[0] === createdAt) {
          return order.food
            .filter(value => value.day - 1 === day)
            .map(val => {
              if (val.food.count > 1) {
                return `${val.food.title} ${val.food.count}шт.`;
              }
              return val.food.title;
            });
        }
      }),
    totalCount: state => state.totalCount
  },
  actions: {
    async loadTable({ commit, rootGetters, getters }, params) {
      try {
        const res = await api.getTable(params.day, rootGetters.token);
        commit('UPDATE_DATA', {
          namespace: 'food',
          data: res.data,
          day: params.day,
        });
        const cartItems = JSON.parse(localStorage.getItem('cartItems'));
        if (cartItems) {
          cartItems.forEach(item => {
            const day = item.day;
            delete item.day;
            commit('UPDATE_ROW', { day, data: item });
          });
        }
      } catch (e) {
        console.log(e);
      }
    },
    async postTableData({ commit, rootGetters }) {
      try {
        const table = {};
        const cartItems = JSON.parse(localStorage.getItem('cartItems'));
        cartItems.forEach(item => {
          if (table[item.day]) {
            return table[item.day].push(item);
          }
          table[item.day] = [item];
        });
        await api.sendTable(table, rootGetters.token);
        commit('RESET_TABLE');
      } catch (e) {
        console.log(e);
      }
    },
    async loadUsersTable({ commit, rootGetters }, page) {
      try {
        const res = await api.usersTable(rootGetters.token, page);
        commit('UPDATE_DATA', {
          namespace: 'users',
          data: res.data.orders,
        });
        commit('UPDATE_USERS_TOTAL', res.data.totalCount);
      } catch (e) {
        console.log(e);
      }
    },
  },
};
