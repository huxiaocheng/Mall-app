<template>
<transi-base nama='slide'>
  <scroll class='login-wrap'>
    <div>
      <div class='title'>
        <span class='back' @click='back'>
          <i class='iconfont'>&#xe616;</i>
        </span>
        <span class='text'>注册</span>
      </div>
      <ul class='input-wrap'>
        <li class='input-item' v-for='(item, index) in registerInfo' :key='index'>
          <input v-if='index === 0' @blur='testUsername(item.name)' class='input' v-model.trim='item.name' :type="item.type" :placeholder="item.placeholder">
          <input v-else class='input' v-model.trim='item.name' :type="item.type" :placeholder="item.placeholder">
          <span @click='hideUsername(item.inputType, registerInfo)' v-show='item.name && item.name.length > 0' class='cancel-input'>x</span>
        </li>
      </ul>
      <div class='login-btn' @click='handleUserLogin' :style='inputStatus'>注册</div>
      <div class='other-link'>
        <router-link tag='span' to='/login'>已有账号，去登录</router-link>
      </div>
    </div>
  </scroll>
  </transi-base>
</template>

<script>
import Scroll from 'base/scroll/scroll';
import TransiBase from 'base/transition-base/transition-base';
import { userRegister, checkRegisterUsername } from 'api/user';

export default {
  data() {
    return {
      registerInfo: [{
        name: '',
        placeholder: '用户名',
        type: 'text',
        inputType: 'username'
      }, {
        name: '',
        placeholder: '不少于6位密码',
        type: 'password',
        inputType: 'password'
      }, {
        name: '',
        placeholder: '再次输入密码',
        type: 'password',
        inputType: 'confirmPwd'
      }, {
        name: '',
        placeholder: '11位手机号',
        type: 'text',
        inputType: 'phone'
      }, {
        name: '',
        placeholder: '邮箱',
        type: 'text',
        inputType: 'email'
      }, {
        name: '',
        placeholder: '密码提示问题',
        type: 'text',
        inputType: 'pwdProblem'
      }, {
        name: '',
        placeholder: '密码提示答案',
        type: 'text',
        inputType: 'pwdAnswer'
      }]
    }
  },
  methods: {
    handleUserLogin() {
      if (this.registerInfo.every(v => v.name !== '')) {
        const result = this.fromValidata(this.changeUserInfo);
        if (result.status) {
          userRegister(this.changeUserInfo)
          .then(res => {
            this.$destroy();
            this.$router.push('/login');
          })
          .catch(ex => {
            this.$notice(ex.msg);
          })
        } else {
          this.$notice(result.msg)
        }
      }
    },
    hideUsername(type, info) {
      info.forEach((v, i) => {
        if(v.inputType === type) {
          v.name = '';
        }
      })
    },
    testUsername(username) {
      if(username !== '') {
        checkRegisterUsername({type: 'username', str: username}).then(res => {
        }).catch(ex => {
          this.$notice(ex.msg);
        })
      }
    },
    fromValidata(info) {
      const result = {
        status: false,
        msg: ''
      }
      if(info.username.length < 3) {
        result.msg = '用户名长度不能少于3位';
        return result;
      }
      if(info.password.length < 6) {
        result.msg = '密码长度不能少于6位';
        return result;
      }
      if(info.passwordConfirm !== info.password) {
        result.msg = '两次密码不一致';
        return result;
      }
      if(!/^1\d{10}$/.test(info.phone)) {
        result.msg = '请输入十一位手机号';
        return result;
      }
      if(!/^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(info.email)) {
        result.msg = '请输入正确的邮箱号';
        return result;
      }
      result.status = true;
      return result;
    },
    back() {
      this.$destroy();
      this.$router.back();
    }
  },
  computed: {
    inputStatus() {
      if(this.registerInfo.every(v => v.name !== '')) {
        return 'opacity: 1';
      } else {
        return 'opacity: 0.6';
      }
    },
    changeUserInfo() {
      return {
        username: this.registerInfo[0].name,
        password: this.registerInfo[1].name,
        passwordConfirm: this.registerInfo[2].name,
        phone: this.registerInfo[3].name,
        email: this.registerInfo[4].name,
        question: this.registerInfo[5].name,
        answer: this.registerInfo[6].name,
      }
    }
  },
  components: {
    Scroll,
    TransiBase
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
    z-index: 999;
    background: #fff;
    .title {
      text-align: center;
      margin: 0 0 30px 0;
      padding-top: 20px;
      .back {
        position: absolute;
        left: 20px;
        top: 10px;
        display: inline-block;
        font-size: 26px;
        color: #666;
      }
      .text {
        font-weight: 600;
        color: #666;
        font-size: 16px;
      }
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
        position: relative;
        display: flex;
        align-items: center;
        padding: 5px 15px 5px 3px;
        margin-top: 5px;
        margin-bottom: 10px;
        .input {
          flex: 1;
          margin-left: 10px;
          padding-left: 10px;
          height: 40px;
          line-height: 40px;
          outline: none;
          font-size: 16px;
          color: #333;
          border-bottom: 1px solid #ddd;
        }
        .cancel-input {
          color: #666;
          margin-left: 10px;
          @include extend-click();
        }
        .icon {
          padding: 5px;
          font-size: 12px;
          border-radius: 50%;
          color: #fff;
          &.ok {
            background: #7ad07a;
          }
          &.no {
            background: #ea3f3f;
          }
        }
      }
    }
    .login-btn {
      margin: 0 auto 30px auto;
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
      justify-content: center;
      padding: 0 40px 30px 40px;
      font-size: 14px;
      color: #666;
    }
  }
</style>