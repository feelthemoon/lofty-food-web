<template>
  <v-main class="main mb-8">
    <layout-header></layout-header>
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
    ></data-table>
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
            <v-icon class="send-icon" left small>fa_send</v-icon>
          </v-btn>
        </div>
      </template>
      <template v-slot:default="dialog">
        <v-card>
          <v-card-title class="accept-title"
            >Вы уверены, что хотите отправить заказ?</v-card-title
          >
          <v-card-text class="accept-text">
            <div>
              В данной версии редактировать заказы после отправки нельзя
            </div>
          </v-card-text>
          <v-card-actions class="justify-end accept-actions">
            <v-btn color="red accent-2" text @click="dialog.value = false"
              >Нет, подумаю ещё🤔</v-btn
            >
            <v-btn color="green lighten-2" text>Да, уверен 😎 </v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </v-main>
</template>

<script>
import LayoutHeader from '@/components/Header';
import DataTable from '@/components/Table';
import TableLoader from '@/components/TableLoader';
import { mapActions, mapGetters } from 'vuex';

export default {
  components: {
    LayoutHeader,
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
            align: 'center',
          },
          {
            text: 'Категория',
            value: 'category',
            align: 'center',
          },
          {
            text: 'Цена',
            value: 'price',
          },
          {
            text: 'Количество',
            value: 'count',
          },
          {
            text: 'Стоимость',
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
    };
  },
  methods: {
    ...mapActions({
      loadTable: 'table/loadTable',
    }),
    async updateTable(day) {
      this.day = day + 1;
      if (!this.food(this.day)) {
        this.loading = true;
        await this.loadTable({ day: this.day });
        this.loading = false;
      }
    },
  },
  computed: {
    ...mapGetters({
      food: 'table/food',
    }),
  },
  name: 'Home',
  async created() {
    this.loading = true;
    await this.loadTable({ day: 1 });
    this.loading = false;
  },
};
</script>
