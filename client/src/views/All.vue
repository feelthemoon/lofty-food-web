<template>
  <v-main class="main mb-8">
   <orders-table :table="{headers: ordersData.headers, data: users}" :loading="loading"></orders-table>
  </v-main>
</template>

<script>
import OrdersTable from "@/components/TableOrders";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "All",
  components: {
    OrdersTable,
  },
  data() {
    return {
      ordersData: {
        headers: [
          {
            text: 'slack_id',
            value: 'id'
          },
          {
            text: 'Имя',
            value: 'name',
            align: 'center'
          },
          {
            text: 'Email',
            value: 'email',
            align: 'center'
          },
          {
            text: 'Заказ(пн, вт, ср, чт, пт)',
            value: 'days_sum'
          },
          {
            text: 'Финальная стоимость',
            value: 'final_sum'
          },
          {
            text: 'Дата заказа',
            value: 'createdAt'
          },
        ]
      },
      loading: true,
    }
  },
  computed: {
    ...mapGetters({
      users: 'table/users',
      user: 'user/user'
    })
  },
  methods: {
    ...mapActions({
      loadUsers: "table/loadUsersTable",
      loadUser: 'user/getUserInfo',
    })
  },
  async created(){
    if (!Object.keys(this.user).length){
      await this.loadUser();
    }
    await this.loadUsers();
    this.loading = false;
  }
}
</script>

<style scoped>

</style>