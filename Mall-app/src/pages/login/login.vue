<template>
  <div class='login-wrap'>
    <span class='back' @click='back'>x</span>
    <div class='login'>
      <img src="../../common/img/load.jpg" alt="">
    </div>
    <div class='input-wrap'>
      <div class='input-item'>
        <input class='input' v-model.trim='username' type="text" placeholder="用户名">
        <span @click='hideUsername' v-show='username && username.length > 0' class='cancel-input'>x</span>
      </div>
      <div class='input-item'>
        <input class='input' v-model.trim='password' type="password" placeholder="请输入密码">
        <span @click='hidePassword' v-show='password && password.length > 0' class='cancel-input'>x</span>
      </div>
    </div>
    <transition name='fade'>
      <div class='login-btn' @click='handleUserLogin' :style='inputStatus'>登录</div>
    </transition>
    <div class='other-link'>
      <router-link tag='span' to='/find-password'>忘记密码</router-link>
      <router-link tag='span' to='/register'>免费注册</router-link>
    </div>
  </div>
</template>

<script>
import { userLogin } from 'api/user';

export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    handleUserLogin() {
      if(this.username === '' || this.password === '') {
        return;
      }
      userLogin({username: this.username,password: this.password}).then(res => {
        this.$router.back();
      }).catch(ex => {

      })
    },
    hideUsername() {
      this.username = '';
    },
    hidePassword() {
      this.password = '';
    },
    back() {
      this.$router.back();
    }
  },
  computed: {
    inputStatus() {
      if(this.username !== '' && this.password !== '') {
        return 'opacity: 1';
      } else {
        return 'opacity: 0.6';
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~common/scss/mixins';

  .login-wrap {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #fff;
    .back {
      display: inline-block;
      margin: 20px 0 30px 25px;
      font-size: 26px;
      color: #666;
    }
    .login {
      display: flex;
      justify-content: center;
      height: 80px;
      img {
        flex: 0 1 80px;
        display: block;
        height: 100%;
      }
    }
    .input-wrap {
      display: flex;
      flex-direction: column;
      padding: 0 10px;
      margin-bottom: 20px;
      .input-item {
        display: flex;
        align-items: center;
        padding: 5px 15px 5px 3px;
        margin-top: 5px;
        margin-bottom: 15px;
        border-bottom: 1px solid #ddd;
        .input {
          flex: 1;
          padding-left: 5px;
          height: 40px;
          line-height: 40px;
          outline: none;
          font-size: 16px;
          color: #333;
        }
        .cancel-input {
          color: #666;
          margin-left: 10px;
          @include extend-click();
        }
      }
    }
    .login-btn {
      margin: 0 auto 50px auto;
      width: 70%;
      height: 50px;
      line-height: 50px;
      border-radius: 25px;
      box-shadow: 0 3px 10px 0 #ef5050;
      color: #fff;
      text-align: center;
      background: #f57171;
    }
    .other-link {
      display: flex;
      justify-content: space-between;
      padding: 0 40px;
      font-size: 14px;
      color: #666;
    }
  }
</style>