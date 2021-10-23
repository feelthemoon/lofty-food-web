import routes from '@/api/routes';
import baseApi from '@/api/base.api';

export default {
  getTable(day) {
    return baseApi.execute(routes.table(day));
  },
};
