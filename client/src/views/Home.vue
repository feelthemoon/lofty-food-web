<template>
  <v-main class="main mb-8">
    <v-tabs class="mt-5 mb-5" color="deep-purple accent-4" centered>
      <v-tab
        @click="updateTable(index)"
        v-for="(tab, index) in tabs"
        :key="index"
        >{{ tab }}</v-tab
      >
    </v-tabs>
    <div class="main__inner">
      <food-table
        :table="{ data: food(day), headers: foodData.headers }"
        :loading="loading"
        @update-table="updateTableData"
      ></food-table>
      <cart
        :final-sum="finalSum"
        :cart-items="cartItems"
        @send-table="sendTable"
      ></cart>
    </div>
  </v-main>
</template>

<script>
import FoodTable from '@/components/TableFood';
import TableLoader from '@/components/TableLoader';
import { mapActions, mapGetters, mapMutations } from 'vuex';
import Cart from '@/components/Cart';

export default {
  components: {
    Cart,
    FoodTable,
    TableLoader,
  },
  data() {
    return {
      foodData: {
        headers: [
          {
            text: 'id',
            value: 'id',
            sortable: false,
          },
          {
            text: 'Название',
            value: 'title',
            sortable: false,
          },
          {
            text: 'Категория',
            value: 'category',
          },
          {
            text: 'Вес, г',
            value: 'weight',
            sortable: false,
          },
          {
            text: 'Цена',
            value: 'price',
          },
          {
            text: 'Количество',
            value: 'count',
            sortable: false,
          },
          {
            text: 'Стоимость',
            value: 'cost',
          },
          {
            text: '',
            value: 'actions',
            sortable: false,
          },
        ],
      },
      tabs: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница'],
      day: 1,
      loading: true,
      finalSum: 0,
    };
  },
  methods: {
    ...mapActions({
      loadTable: 'table/loadTable',
      sendData: 'table/postTableData',
      authorization: 'auth/authorization',
      getUser: 'user/getUserInfo',
    }),
    ...mapMutations({
      updateData: 'table/UPDATE_ROW',
      updateCart: 'cart/UPDATE_CART_ITEMS',
      updateOrderSum: 'cart/UPDATE_ORDER_SUM',
      resetCart: 'cart/RESET_CART',
    }),
    async updateTable(day) {
      this.day = day + 1;
      if (!this.food(this.day)) {
        this.loading = true;
        await this.loadTable({ day: this.day });
        this.loading = false;
      }
    },
    updateTableData(foodData, type) {
      this.updateCart({ typeAction: type, foodData, day: this.day });
      this.updateOrderSum({ foodData, type });
      this.updateData({ day: this.day, data: foodData });
    },
    async sendTable(dialog) {
      await this.sendData();
      dialog.value = false;
      this.resetCart();
    },
  },
  computed: {
    ...mapGetters({
      food: 'table/food',
      user: 'user/user',
      cartItems: 'cart/cartItems',
    }),
  },
  name: 'Home',
  async created() {
    this.loading = true;
    if (this.$route.query.code) {
      try {
        await this.authorization(this.$route.query.code);
      } catch (e) {
        await this.$router.push({ name: 'Auth' });
      }
    }
    await this.getUser();
    if (!Object.keys(this.user).length) {
      return await this.$router.push({ name: 'Auth' });
    }
    await this.loadTable({ day: 1 });
    this.loading = false;
  },
};
</script>
