<template>
  <v-data-table
      :headers="table.headers"
      mobile-breakpoint="1100"
      class="table-orders"
      :items="table.data"
      :items-per-page="25"
      :footer-props="{
      'items-per-page-options': [10, 15, 20, -1]
      }"
      dense
  >
    <template #body v-if="loading">
      <table-loader></table-loader>
    </template>
  </v-data-table>
</template>

<script>
import TableLoader from '@/components/TableLoader';

export default {
  name: "TableOrders",
  props: {
    table: {
      type: Object,
      default: () => ({})
    },
    loading: {
      type: Boolean,
      default: () => true
    }
  },
  components: {
    TableLoader
  }
}
</script>

<style scoped>

</style>