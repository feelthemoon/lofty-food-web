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
    <data-table
      :table="{ data: food(day), headers: foodData.headers }"
      :loading="loading"
      @update-data="updateTableData"
    ></data-table>
    <div class="main__footer">
      <span>Итоговая сумма: {{ finalSum }}</span>
      <v-dialog transition="dialog-bottom-transition" max-width="600">
        <template v-slot:activator="{ on, attrs }">
          <div class="approve">
            <v-btn
              color="deep-purple accent-2"
              class="text-center send-btn"
              v-bind="attrs"
              v-on="on"
            >
              <span>Отправить заказ</span>
              <!--            <v-icon class="send-icon" left small>fa_send</v-icon>-->
            </v-btn>
          </div>
        </template>
        <template v-slot:default="dialog">
          <v-card>
            <v-card-title class="accept-title"
              >Вы уверены, что хотите отправить заказ?</v-card-title
            >
            <v-card-actions class="justify-end accept-actions">
              <v-btn color="red accent-2" text @click="dialog.value = false"
                >Нет, подумаю ещё🤔</v-btn
              >
              <v-btn color="green lighten-2" text @click="sendTable(dialog)"
                >Да, уверен 😎
              </v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </div>
  </v-main>
</template>

<script>
import DataTable from '@/components/TableFood';
import TableLoader from '@/components/TableLoader';
import { mapActions, mapGetters, mapMutations } from 'vuex';

export default {
  components: {
    DataTable,
    TableLoader,
  },
  data() {
    return {
      foodData: {
        headers: [
          {
            text: 'id',
            value: 'id',
          },
          {
            text: 'Название',
            value: 'title',
          },
          {
            text: 'Категория',
            value: 'category',
          },
          {
            text: 'Вес, г',
            value: 'weight'
          },
          {
            text: 'Цена, Р',
            value: 'price',
          },
          {
            text: 'Количество',
            value: 'count',
          },
          {
            text: 'Стоимость, Р',
            value: 'cost',
          },
          {
            text: '',
            value: 'actions',
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
    }),
    async updateTable(day) {
      this.day = day + 1;
      if (!this.food(this.day)) {
        this.loading = true;
        await this.loadTable({ day: this.day });
        this.loading = false;
      }
    },
    updateTableData(params, type) {
      (type === 'add' && (this.finalSum += params.price)) ||
        (this.finalSum -= params.price);
      this.updateData({ day: this.day, data: params });
    },
    async sendTable(dialog) {
      await this.sendData();
      dialog.value = false;
      this.finalSum = 0;
    },
  },
  computed: {
    ...mapGetters({
      food: 'table/food',
      user: 'user/user',
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
      await this.$router.push({ name: 'Auth' });
    }
    await this.loadTable({ day: 1 });
    this.loading = false;
  },
};
</script>
