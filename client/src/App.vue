<template>
  <v-app>
    <layout-header></layout-header>
    <router-view></router-view>
  </v-app>
</template>

<script>
import LayoutHeader from '@/components/Header';

export default {
  name: 'App',
  components: {
    LayoutHeader
  }
};
</script>
