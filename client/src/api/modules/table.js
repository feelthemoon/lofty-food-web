import routes from '@/api/routes';
import baseApi from '@/api/base.api';

export default {
  getTable(day) {
    return baseApi.execute(routes.table(day));
  },
  sendTable(data) {
    return baseApi.execute(routes.sendTable, 'post', data);
  },
};
