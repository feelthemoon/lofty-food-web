<template>
  <div class="container">
    <layout-header></layout-header>
    <router-view></router-view>
  </div>
</template>
<script>
import LayoutHeader from '@/components/Header.vue';

export default {
  components: {
    LayoutHeader,
  },
};
</script>
