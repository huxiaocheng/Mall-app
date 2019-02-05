<template>
<transition name='fade'>
  <div class='login-wrap'>
    <div class='title'>
      <span class='back' @click='back'>
        <i class='iconfont'>&#xe616;</i>
      </span>
      <span class='text'>找回密码</span>
    </div>
    <div class='logo'>
      <img src="../../common/img/load.jpg" alt="">
    </div>
    <transition-group name='fade'>
      <div class='input-wrap' v-show='showFirstStep' key='username'> <!-- 第一步 -->
        <div class='input-item'>
          <input class='input' v-model.trim='username' type="text" ref='firstInput' placeholder="用户名">
          <span class='cancel-input' @click='removeInputInfo("username")' v-show='username && username.length > 0'>x</span>
        </div>
        <div class='login-btn' @click='goSecondStep' :style='inputStatus'>下一步</div>
      </div>
      <div class='input-wrap' v-show='showSecondStep' key='answer'> <!-- 第二步 -->
        <p class='tips-text'>提示问题是：<span>{{question}}</span></p>
        <div class='input-item'>
          <input class='input' v-model.trim='answer' type="text" ref='secondInput' placeholder="请输入密码提示答案">
          <span class='cancel-input' @click='removeInputInfo("answer")' v-show='answer && answer.length > 0'>x</span>
        </div>
        <div class='login-btn' @click='goThirdStep' :style='inputStatus'>下一步</div>
      </div>
      <div class='input-wrap' v-show='showThirdStep' key='newPassword'> <!-- 第三步 -->
        <div class='input-item'>
          <input class='input' v-model.trim='newPassword' type="password" ref='thirdInput' placeholder="请输入不少于6位的新密码">
          <span class='cancel-input' @click='removeInputInfo("newPwd")' v-show='newPassword && newPassword.length > 0'>x</span>
        </div>
        <div class='login-btn' @click='modifySuccess' :style='inputStatus'>完成</div>
      </div>
    </transition-group>
  </div>
</transition>
</template>

<script>
import { getQuestion, checkAnswer, setNewPwd } from 'api/user';

export default {
  data() {
    return {
      username: '',
      question: '',
      answer: '',
      newPassword: '',
      token: '',
      showFirstStep: true,
      showSecondStep: false,
      showThirdStep: false
    }
  },
  mounted() {
    setTimeout(() => {
      this.$refs.firstInput.focus(); //输入框聚焦
    }, 20);
  },
  methods: {
    handleUserLogin() {
      if(this.username === '' || this.password === '') {
        return;
      }
      userLogin({username: this.username,password: this.password}).then(res => {
        this.$router.back();
      }).catch(ex => {
        this.$notice(ex.msg);
      })
    },
    goSecondStep() {  // 第一步
      if(this.username !== '') {
        getQuestion({username: this.username}).then(res => {  
          this.question = res.data;
          this.showFirstStep = false;
          this.showSecondStep = true;
          setTimeout(() => {
            this.$refs.secondInput.focus();
          }, 20)
        }).catch(ex => {
          this.$notice(ex.msg);
        })
      }
    },
    goThirdStep() {  // 第二步
      if(this.answer !== '') {
        checkAnswer({
          username: this.username,
          question: this.question,
          answer: this.answer
        }).then(res => {
          this.token = res.data;
          this.showThirdStep = true;
          this.showSecondStep = false;
          setTimeout(() => {
            this.$refs.thirdInput.focus();
          }, 20);
        }).catch(ex => {
          this.$notice(ex.msg);
        })
      }
    },
    modifySuccess() {  // 第三步
      if (this.newPassword !== '' && this.newPassword.length >= 6) {
        setNewPwd({
          username: this.username,
          passwordNew: this.newPassword,
          forgetToken: this.token
        }).then(res => {
          this.$notice(res.msg);
          setTimeout(() => {
            this.$destroy();
            this.$router.go(-1);
          }, 800)
        }).catch(ex => {
          this.$notice(ex.msg);
        })
      }
    },
    removeInputInfo(type) {
      if(type === 'username') {
        this.username = '';
      } else if(type === 'answer') {
        this.answer = '';
      } else if(type === 'newPwd') {
        this.newPassword = '';
      }
    },
    back() {
      if(this.showFirstStep) {
        this.$router.back();
      } else if(this.showSecondStep) {
        this.showSecondStep = false;
        this.showFirstStep = true;
      } else if(this.showThirdStep) {
        this.showThirdStep = false;
        this.showSecondStep = true;
      }
    }
  },
  computed: {
    inputStatus() {
      if((this.showFirstStep && this.username !== '') || 
        (this.showSecondStep && this.answer !== '') || 
        (this.showThirdStep && this.newPassword && this.newPassword.length >= 6)) {
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
    z-index: 999;
    background: #fff;
    .title {
      text-align: center;
      margin: 20px 0 30px 0;
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
    .logo {
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
      position: absolute;
      left: 0;
      right: 0;
      display: flex;
      flex-direction: column;
      padding: 0 10px;
      padding-bottom: 50px;
      margin-bottom: 20px;
      margin-top: 20px;
      background: #fff;
      .tips-text {
        margin-top: 20px;
        margin-bottom: 10px;
        padding: 10px;
        font-weight: 600;
        color: #666;
        span {
          color: #ef5050;
        }
      }
      .input-item {
        display: flex;
        align-items: center;
        padding: 5px 15px 5px 3px;
        margin-bottom: 30px;
        border-bottom: 1px solid #ddd;
        .tips-text {
          font-size: 14px;
          margin-bottom: 15px;
          color: #333;
        }
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
  }
  .fade-enter-active, .fade-leave-active {
    transition: all .4s ease-in;
  }
  .fade-enter, .fade-leave-to {
    transform: translate3d(100%, 0, 0,);
  }
</style>