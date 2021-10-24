<template>
  <header class="header">
    <div class="header__inner">
      <div class="logo">
        <img src="@/assets/static/logo.svg" alt="Lofty" />
      </div>
      <v-menu bottom offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="#fff" text small v-bind="attrs" v-on="on">
            <v-icon class="burger-icon">mdi_menu</v-icon>
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
export default {
  name: 'Header',
  data() {
    return {
      selectedLink: 0,
      links: [
        { title: 'Дашборд', src: '' },
        { title: 'Мои прошлые заказы', src: 'own' },
        { title: 'Все заказы', src: 'all' },
      ],
    };
  },
};
</script>

<style scoped></style>
