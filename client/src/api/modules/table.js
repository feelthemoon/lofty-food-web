import routes from '@/api/routes';
import baseApi from '@/api/base.api';

export default {
  getTable(day, token) {
    return baseApi.execute(routes.table(day), 'get', false, {}, token);
  },
  sendTable(data, token) {
    return baseApi.execute(routes.sendTable, 'post', false, data, token);
  },
  usersTable(token, page) {
    return baseApi.execute(routes.users(page), 'get', false, {}, token);
  },
};
