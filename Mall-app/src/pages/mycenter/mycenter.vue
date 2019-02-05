<template>
<div>
  <div class='my-center'>
    <div class='avatar-wrap' ref='avatarWrap' :style='username !== "" ? "background: #ef5050" : "background: #eee"'>
      <router-link v-if='username === ""' tag='div' to='/login?redirect=%2Fmycenter%2F' class='not-login'>
        登录 / 注册<i class='iconfont icon-login'>&#xe630;</i>
      </router-link>
      <div v-else class='after-login'>
        欢迎你 {{username}}
      </div>
    </div>
    <ul class='info-list'>
      <router-link class='info-item' tag='li' to='/add-address'>
        地址管理
        <i class='iconfont'>&#xe630;</i>
      </router-link>
      <router-link class='info-item' tag='li' to='/mycenter/person-info'>
        个人信息
        <i class='iconfont'>&#xe630;</i>
      </router-link>
      <router-link class='info-item' tag='li' to='/mycenter/update-pwd'>
        修改密码
        <i class='iconfont'>&#xe630;</i>
      </router-link>
      <router-link class='info-item' tag='li' to='/mycenter/intro'>
        关于MMall
        <i class='iconfont'>&#xe630;</i>
      </router-link>
    </ul>
    <trans-base>
      <div class='logout' v-if='username !== ""' @click='userLogout'>退出登录</div>
    </trans-base>
  </div>
  <confirm @confirm='confirm' ref='confirm' title='确定退出登录？'/>
  <router-view/>
</div>
</template>

<script>
import { logout, getUserInfo } from 'api/user';
import Confirm from 'base/confirm/confirm';
import TransBase from 'base/transition-base/transition-base';

export default {
  data() {
    return {
      username: ''
    }
  },
  activated() {
    this._getUserInfo()
  },
  methods: {
    _getUserInfo() {
      if(sessionStorage.getItem('token') && this.username === '') {
        getUserInfo().then(res => {
          this.username = res.data.username;
      }).catch(ex => {
        this.$notice(ex.msg);
      })
      }
    },
    userLogout() {
      this.$refs.confirm.show();
    },
    confirm() {
      logout().then(res => {
        this.username = '';
        sessionStorage.removeItem('token');
      });
    }
  },
  components: {
    TransBase,
    Confirm
  }
}
</script>

<style lang="scss" scoped>
  .my-center {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 55px;
    background: #f8f8f8;
    .avatar-wrap {
      height: 56px;
      display: flex;
      align-items: center;
      padding: 0 20px;
      border-radius: 0 0 5% 5%;
      background: #eee;
      .avatar {
        position: relative;
        width: 60px;
        height: 60px;
        margin-right: 20px;
        > img {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: block;
          max-width: 100%;
          max-height: 100%;
          width: auto;
          height: auto;
        }
      }
      .not-login {
        color: #666;
        font-size: 14px;
        .icon-login {
          font-size: 14px;
        }
      }
      .after-login {
        font-size: 14px;
        color: #fff;
      }
    }
    .info-list {
      display: flex;
      flex-direction: column;
      margin-top: 10px;
      border-top: 1px solid #e8e8e8;
      border-bottom: 1px solid #e8e8e8;
      .info-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
        color: #666;
        height: 40px;
        font-size: 14px;
        background: #fff;
      }
      .info-item + .info-item {
        border-top: 1px solid #e8e8e8;
      }
    }
    .logout {
      position: fixed;
      bottom: 100px;
      width: 70%;
      height: 40px;
      line-height: 40px;
      border-radius: 20px;
      left: 50%;
      color: #888;
      border: 1px solid #ddd;
      text-align: center;
      transform: translateX(-50%);
      background:#fff; 
    }
  }
</style>