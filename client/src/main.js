import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

import '@/assets/styles/main.scss';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  el: '#app',
  render: h => h(App),
});
