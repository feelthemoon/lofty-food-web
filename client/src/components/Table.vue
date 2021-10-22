<template>
  <ui-table :class="tableClass" :data="data" :thead="thead" :tbody="tbody">
    <template v-if="type !== 'users'" #actions="{ data }">
      <ui-button @click="changeData(data, 'reduce')"
        ><ui-icon>remove</ui-icon></ui-button
      >
      <ui-button @click="changeData(data, 'add')"
        ><ui-icon>add</ui-icon></ui-button
      >
    </template>

    <ui-pagination
      v-if="total > 20"
      v-model="page"
      :total="total"
      show-total
    ></ui-pagination>
  </ui-table>
</template>

<script>
export default {
  props: {
    data: Array,
    thead: Array,
    tbody: Array,
    tfoot: {
      type: Array,
      default: [],
    },
    page: Number,
    total: Number,
    tableClass: String,
    type: String,
  },
  methods: {
    changeData(data, type) {
      if (type === 'reduce' && data.count <= 0) return;

      const tableItemIndex = this.data.findIndex((item) => item.id === data.id);

      this.data[tableItemIndex].count =
        type === 'add' ? ++data.count : --data.count;
    },
  },
  name: 'Table.vue',
};
</script>

<style scoped></style>
