import baseApi from '@/api/base.api';
import routes from '@/api/routes';

export default function(code) {
  return baseApi.execute(routes.auth(code), 'get', true);
}
