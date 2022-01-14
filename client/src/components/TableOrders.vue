<template>
  <v-data-table
    :headers="table.headers"
    mobile-breakpoint="1100"
    class="table-orders"
    :items="table.data"
    :items-per-page="25"
    :footer-props="{
      'items-per-page-options': [10, 15, 20, -1],
    }"
    dense
  >
    <template #body v-if="loading">
      <table-loader></table-loader>
    </template>

    <template v-slot:[`item.actions`]="{ item }">
      <v-dialog
        content-class="order-dialog"
        transition="dialog-bottom-transition"
        max-width="600"
      >
        <template v-slot:activator="{ on: onDialog, attrs: attrsDialog }">
          <v-tooltip top>
            <template v-slot:activator="{ on: onTooltip, attrs: attrsTooltip }">
              <v-btn
                dark
                class="mr-3 mb-1 mt-1 table-actions show-detail"
                small
                color="deep-purple darken-1"
                v-bind="{ ...attrsDialog, ...attrsTooltip }"
                v-on="{ ...onDialog, ...onTooltip }"
                @click="openDialog(item)"
              >
                <v-icon>list_alt</v-icon>
              </v-btn>
            </template>
            <span>Детали заказа</span>
          </v-tooltip>
        </template>
        <template v-slot:default="dialog">
          <v-tabs
            :value="currentDay"
            class="mt-5 mb-5"
            color="deep-purple accent-4"
            centered
          >
            <v-tab
              @click="getDayOrder(index)"
              v-for="(tab, index) in tabs"
              :key="index"
              >{{ tab }}</v-tab
            >
          </v-tabs>
          <v-card>
            <v-card-title>Заказ на {{ titleDialog }}</v-card-title>
            <v-card-text v-for="(title, index) in foodOrder" :key="index">{{
              title
            }}</v-card-text>
          </v-card>
        </template>
      </v-dialog>
    </template>
  </v-data-table>
</template>

<script>
import TableLoader from '@/components/TableLoader';
import { mapGetters } from 'vuex';

export default {
  name: 'TableOrders',
  props: {
    table: {
      type: Object,
      default: () => ({}),
    },
    loading: {
      type: Boolean,
      default: () => true,
    },
  },
  components: {
    TableLoader,
  },
  data() {
    return {
      tabs: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница'],
      currentUser: null,
      foodOrder: [],
      currentDay: new Date().getDay() - 1,
      currentCreatedAt: '',
    };
  },
  computed: {
    ...mapGetters({ food: 'table/orderFood' }),
    titleDialog() {
      if (this.currentDay === 2 || this.currentDay === 4) {
        return (
          this.tabs[this.currentDay].slice(
            0,
            this.tabs[this.currentDay].length - 1,
          ) + 'у'
        );
      }
      return this.tabs[this.currentDay];
    },
  },
  methods: {
    getDayOrder(day) {
      this.currentDay = day;
      this.foodOrder = this.food(this.currentUser, day, this.currentCreatedAt).filter(item => item)[0];
      if (!this.foodOrder.length)
        this.foodOrder.push('На этот день нет заказов');
    },
    openDialog(item) {
      this.currentUser = item.email;
      this.currentCreatedAt = this.currentCreatedAt.split('.').reverse().join('-');
      this.getDayOrder(this.currentDay);
    },
  },
};
</script>

