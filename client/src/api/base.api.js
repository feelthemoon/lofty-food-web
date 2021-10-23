import axios from 'axios';
export default {
  host: process.env.VUE_APP_API_URL,
  execute(url, method = 'get', params = {}, token = null) {
    const headers = {
      'content-type': 'application/json',
      accept: 'application/json',
      'x-requested-with': 'XMLHttpRequest',
    };

    if (token) {
      headers['authorization'] = token;
    }

    const parameters = params || {};
    const requestUrl = this.host + url;

    const request = {
      method: method,
      url: requestUrl,
      headers,
    };

    if (method === 'get') {
      request.params = parameters;
    } else {
      request.data = parameters;
    }

    return axios(request);
  },
};
