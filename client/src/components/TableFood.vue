<template>
  <v-data-table
    :headers="table.headers"
    mobile-breakpoint="1100"
    class="table-food"
    :items="table.data"
    :items-per-page="25"
    :footer-props="{
      'items-per-page-options': [10, 15, 20, -1],
    }"
  >
    <template #body v-if="loading">
      <table-loader></table-loader>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <div class="actions">
        <v-btn
          fab
          dark
          class="mr-3 mb-1 mt-1 table-actions"
          small
          color="deep-purple darken-1"
          @click="updateData('remove', item)"
        >
          -
        </v-btn>
        <v-btn
          fab
          dark
          small
          class="mb-1 mt-1 table-actions"
          color="deep-purple darken-1"
          @click="updateData('add', item)"
        >
          +
        </v-btn>
      </div>
    </template>
  </v-data-table>
</template>

<script>
import TableLoader from '@/components/TableLoader';
export default {
  components: { TableLoader },
  props: {
    table: {
      type: Object,
      default: () => ({}),
    },
    loading: {
      type: Boolean,
    },
  },
  methods: {
    updateData(type, data) {
      if (type === 'remove' && data.count > 0) {
        this.$emit(
          'update-table',
          {
            ...data,
            count: data.count - 1,
            cost: (data.count - 1) * data.price,
          },
          type,
        );
      } else if (type === 'add') {
        this.$emit(
          'update-table',
          {
            ...data,
            count: data.count + 1,
            cost: (data.count + 1) * data.price,
          },
          type,
        );
      }
    },
  },
  name: 'Table',
};
</script>
