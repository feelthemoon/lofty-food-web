export default {
  table(day) {
    return `api/table/${day}/`;
  },
  sendTable: 'api/postdata',
  auth: code =>
    `https://slack.com/api/openid.connect.token?client_id=${process.env.VUE_APP_CLIENT_ID}&client_secret=${process.env.VUE_APP_CLIENT_SECRET}&code=${code}`,
  userInfo: token => `api/user`,
  users: 'api/all',
};
