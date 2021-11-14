export default {
  table(day) {
    return `table/${day}/`;
  },
  sendTable: 'postdata',
  auth: code =>
    `https://slack.com/api/openid.connect.token?client_id=${process.env.VUE_APP_CLIENT_ID}&client_secret=${process.env.VUE_APP_CLIENT_SECRET}&code=${code}`,
  userInfo: token => `user`,
  users: 'all',
};
