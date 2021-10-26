import baseApi from '@/api/base.api';
import routes from '@/api/routes';

export default function (token) {
    return baseApi.execute(routes.userInfo(token), 'get', false, {}, token);
}