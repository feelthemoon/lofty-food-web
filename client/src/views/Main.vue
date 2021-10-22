<template>
  <div class="main">
    <div class="main__tabs">
      <ui-tab-bar v-model="active" align="center">
        <ui-tab v-for="(tab, index) in tabs" :key="index" min-width>
          {{ tab.text }}
        </ui-tab>
      </ui-tab-bar>
    </div>
    <div class="main__order">
      <data-table
        :data="data"
        :thead="thead"
        :tbody="tbody"
        :total="total"
        :page="page"
        table-class="food-table"
      ></data-table>
    </div>
    <div class="main__users">
      <data-table
        :data="data"
        :thead="thead"
        :tbody="tbody"
        :total="total"
        :page="page"
        type="users"
        table-class="users-table"
      ></data-table>
    </div>
  </div>
</template>

<script>
import DataTable from '@/components/Table';
export default {
  components: {
    DataTable,
  },
  data() {
    //api
    return {
      data: [
        {
          id: 1,
          title: 'Frozen yogurt',
          price: 159,
          count: 6,
          cost: 24,
        },
        {
          id: 2,
          title: 'Ice cream sandwich',
          price: 237,
          count: 9,
          cost: 37,
        },
        {
          id: 3,
          title: 'Eclair',
          price: 262,
          count: 16,
          cost: 24,
        },
      ],
      thead: ['ID', 'Название', 'Цена', 'Количество', 'Стоимость', ''],
      tbody: [
        'id',
        'title',
        'price',
        'count',
        'cost',
        {
          slot: 'actions',
        },
      ],
      page: 1,
      total: 80,
      active: 0,
      tabs: [
        {
          text: 'Понедельник',
        },
        {
          text: 'Вторник',
        },
        {
          text: 'Среда',
        },
        {
          text: 'Четверг',
        },
        {
          text: 'Пятница',
        },
      ],
    };
  },
};
</script>
