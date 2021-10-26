<template>
  <header class="header">
    <div class="header__inner">
      <div class="logo">
        <img src="@/assets/static/logo.svg" alt="Lofty" />
      </div>
      <v-menu v-if="isUser" bottom offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="profile-btn" small v-bind="attrs" v-on="on">
            <v-img :src="user.pic" :alt="user.username" class="avatar"></v-img>
          </v-btn>
        </template>

        <v-list>
          <v-list-item-group
            v-model="selectedLink"
            color="deep-purple darken-3"
          >
            <v-list-item
              exact-active-class="link-active"
              v-for="(link, index) in links"
              :key="index"
            >
              <router-link :to="`/${link.src}`">{{ link.title }}</router-link>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Header',
  data() {
    return {
      selectedLink: 0,
      links: [
        { title: 'Дашборд', src: '' },
        { title: 'Мои прошлые заказы', src: 'own' },
        { title: 'Все заказы', src: 'all' }
      ]
    };
  },
  computed: {
    ...mapGetters({
      user: 'user/user'
    }),
    isUser() {
      return Object.keys(this.user).length > 0;
    }
  }
};
</script>

<style scoped></style>
