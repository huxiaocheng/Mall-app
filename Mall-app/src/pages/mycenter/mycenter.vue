<template>
  <div>
    <div @click='userLogout'>退出登录</div>
  </div>
</template>

<script>
import { logout } from 'api/user';

export default {
  created() {
    console.log(this.$router);
  },
  methods: {
    userLogout() {
      logout().then(res => {
        sessionStorage.removeItem('token');
      });
    }
  }
}
</script>

<style lang="scss" scoped>
  
</style>