export default {
  namespaced: true,
  state: {
    cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
    orderSum: +localStorage.getItem('orderSum') || 0,
  },
  mutations: {
    UPDATE_CART_ITEMS(state, { typeAction, foodData, day }) {
      let foundItemIndex = state.cartItems.findIndex(
        item => item.id === foodData.id && item.day === day,
      );
      foundItemIndex = ~foundItemIndex
        ? foundItemIndex
        : state.cartItems.length;

      if (foodData.count > 0 || typeAction === 'add') {
        state.cartItems.splice(foundItemIndex, 1, { day, ...foodData });
      } else {
        state.cartItems.splice(foundItemIndex, 1);
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    UPDATE_ORDER_SUM(state, { type, foodData }) {
      if (type === 'add') {
        state.orderSum += foodData.price;
      } else {
        state.orderSum -= foodData.price;
      }
      localStorage.setItem('orderSum', state.orderSum);
    },
    RESET_CART(state) {
      state.cartItems = [];
      state.orderSum = 0;
      localStorage.removeItem('cartItems');
      localStorage.removeItem('orderSum');
    },
  },
  getters: {
    cartItems: state => state.cartItems,
    finalSum: state => state.orderSum,
  },
};
