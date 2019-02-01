<template>
  <!-- <trans-base name='slide'> -->
    <div class='person-info-wrap'>
      <red-title text='个人信息' @back='back'/>
      <ul class='person-info-list'>
        <li class='person-info-item'>
          <span class='person-text'>旧密码</span>
          <input class='input'  v-model='passwordInfo.oldPassword' autofocus type="password" ref='firstInput' placeholder="请输入原始旧密码"/>
        </li>
        <li class='person-info-item'>
          <span class='person-text'>新密码</span>
          <input class='input'  v-model='passwordInfo.newPassword' type="password" placeholder="不少于6位新密码"/>
        </li>
        <li class='person-info-item'>
          <span class='person-text'>确认新密码</span>
          <input class='input'  v-model='passwordInfo.confirmPassword' type="password" placeholder="确认新密码"/>
        </li>
      </ul>
      <div class='edit' @click='updatePassword' :style='isInfoFull ? "opacity: 1" : "opacity: 0.6"'>更新登录密码</div>
    </div>
  <!-- </trans-base> -->
</template>

<script>
import TransBase from 'base/transition-base/transition-base';
import RedTitle from 'base/red-title/red-title';
import { updatePwd } from 'api/user';

export default {
  data() {
    return {
      passwordInfo: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      }
    }
  },
  mounted() {
    this.$refs.firstInput.focus();
  },
  computed: {
    isInfoFull() {
      return Object.values(this.passwordInfo).every(v => v.length >= 6);
    }
  }, 
  methods: {
    updatePassword() {
      if (this.isInfoFull) {
        if (this.passwordInfo.newPassword !== this.passwordInfo.confirmPassword) {
          this.$notice('两次新密码不一致');
          return;
        }
        updatePwd({
          passwordOld: this.passwordInfo.oldPassword,
          passwordNew: this.passwordInfo.newPassword
        }).then(res => {
          this.$notice(res.msg);
          setTimeout(() => {
            this.$router.push('/mycenter');
          }, 1000)
          sessionStorage.removeItem('token');
        }).catch(ex => {
          this.$notice(ex.msg);
        })
      }
    },
    back() {
      this.$router.push('/mycenter');
    }
  },
  components: {
    RedTitle
  }
}
</script>

<style lang="scss" scoped>
.person-info-wrap {
  position: fixed;
  top: 0;
  width: 100%;
  bottom: 0;
  z-index: 99;
  background: #f8f8f8;
  .person-info-list {
    padding-top: 10px;
    border-top: 1px solid #e8e8e8;
    border-bottom: 1px solid #e8e8e8;
    .person-info-item + .person-info-item {
      border-top: 1px solid #e8e8e8;
    }
    .person-info-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 20px;
      color: #666;
      height: 40px;
      font-size: 14px;
      background: #fff;
      .person-text {
        flex: 0 0 70px;
      }
      .input {
        flex: 1;
        padding: 10px;
        color: #666;
        text-align: right;
        outline: none;
        background: #fff;
        &.first {
          font-weight: 600;
          color: #e84b4b;
        }
      }
    }
  }
  .edit {
    position: absolute;
    bottom: 100px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    padding: 0 30px;
    justify-content: center;
    border-radius: 20px;
    color: #fff;
    height: 40px;
    background: #ef5050;
  }
}
</style>