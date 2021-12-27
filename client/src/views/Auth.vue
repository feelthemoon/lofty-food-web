<template>
  <div class="auth">
    <h3>Заходи и забирай свое хрючево!😃</h3>
    <a
      href="https://slack.com/openid/connect/authorize?scope=openid%20email%20profile&amp;response_type=code&amp;redirect_uri=https%3A%2F%2Floftyfood.ru%2F&amp;client_id=14172408775.2637076670294"
      style="
        align-items: center;
        color: #fff !important;
        background-color: #5E35B1;
        border: 0;
        border-radius: 44px;
        display: inline-flex;
        font-family: Lato, sans-serif;
        font-size: 14px;
        font-weight: 600;
        height: 44px;
        justify-content: center;
        text-decoration: none;
        width: 224px;
      "
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        style="height: 16px; width: 16px; margin-right: 12px"
        viewBox="0 0 122.8 122.8"
      >
        <path
          d="M25.8 77.6c0 7.1-5.8 12.9-12.9 12.9S0 84.7 0 77.6s5.8-12.9 12.9-12.9h12.9v12.9zm6.5 0c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9v32.3c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V77.6z"
          fill="#e01e5a"
        ></path>
        <path
          d="M45.2 25.8c-7.1 0-12.9-5.8-12.9-12.9S38.1 0 45.2 0s12.9 5.8 12.9 12.9v12.9H45.2zm0 6.5c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H12.9C5.8 58.1 0 52.3 0 45.2s5.8-12.9 12.9-12.9h32.3z"
          fill="#36c5f0"
        ></path>
        <path
          d="M97 45.2c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9-5.8 12.9-12.9 12.9H97V45.2zm-6.5 0c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V12.9C64.7 5.8 70.5 0 77.6 0s12.9 5.8 12.9 12.9v32.3z"
          fill="#2eb67d"
        ></path>
        <path
          d="M77.6 97c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9-12.9-5.8-12.9-12.9V97h12.9zm0-6.5c-7.1 0-12.9-5.8-12.9-12.9s5.8-12.9 12.9-12.9h32.3c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H77.6z"
          fill="#ecb22e"
        ></path></svg
      >Sign in with Slack</a
    >
  </div>
</template>

<script>
export default {
  name: 'Auth',

  beforeRouteEnter(to, from, next) {
    if (localStorage.getItem('auth')) {
      next({ name: 'Home' });
    } else {
      next();
    }
  },
};
</script>

<style scoped></style>
