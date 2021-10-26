import axios from 'axios';
export default {
  host: process.env.VUE_APP_API_URL,
  execute(url, method = 'get', isAuth=false, params = {}, token = null) {
    const headers = {
      'content-type': 'application/json',
      accept: 'application/json',
    };

    if (token) {
      headers['authorization'] = token;
    }
    console.log(process.env.VUE_APP_API_URL);
    const parameters = params || {};
    const requestUrl = isAuth ? url : this.host + url;

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
