<template>
  <tbody class="desktop">
    <tr v-for="row in 10" :key="row">
      <td v-for="cell in 9" :key="cell">
        <v-skeleton-loader indeterminate type="table-cell"></v-skeleton-loader>
      </td>
    </tr>
  </tbody>
</template>
<style lang="scss">
.desktop {
  width: 100%;
  @media (max-width: 768px) {
    display: none;
  }
}
td {
  div {
    width: 100% !important;
  }
}
</style>
