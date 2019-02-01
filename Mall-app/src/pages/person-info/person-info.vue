<template>
  <!-- <trans-base name='slide'> -->
    <div class='person-info-wrap'>
      <red-title text='个人信息' @back='back'/>
      <ul class='person-info-list'>
        <li class='person-info-item'>
          <span class='person-text'>用户名</span>
          <input class='input first' type="text" v-model='personInfo.username' disabled/>
        </li>
        <li class='person-info-item'>
          <span class='person-text'>电话</span>
          <input class='input' ref='firstInput' type="text" v-model.trim='personInfo.phone' :disabled='isDisabled'/>
        </li>
        <li class='person-info-item'>
          <span class='person-text'>邮箱</span>
          <input class='input' type="text" v-model.trim='personInfo.email' :disabled='isDisabled'/>
        </li>
        <li class='person-info-item'>
          <span class='person-text'>问题</span>
          <input class='input' type="text" v-model.trim='personInfo.question' :disabled='isDisabled'/>
        </li>
        <li class='person-info-item'>
          <span class='person-text'>答案</span>
          <input class='input' type="text" v-model.trim='personInfo.answer' :disabled='isDisabled'/>
        </li>
      </ul>
      <div class='edit' @click='editPersonInfo' :style='isInfoFull ? "opacity: 1" : "opacity: 0.6"'>{{btnText}}</div>
    </div>
  <!-- </trans-base> -->
</template>

<script>
import TransBase from 'base/transition-base/transition-base';
import RedTitle from 'base/red-title/red-title';
import { getUserInfo, updateInfo } from 'api/user';
import { isCorrectPhone, isCorrectEmail } from 'common/js/auth';

export default {
  data() {
    return {
      personInfo: {},
      isDisabled: true,
      isEdit: false,
      btnText: '编辑'
    }
  },
  created() {
    setTimeout(() => {
      this._getUserInfo();
    }, 20);
  },
  computed: {
    isInfoFull() {
      return Object.values(this.personInfo).every(v => v !== '');
    }
  },
  methods: {
    editPersonInfo() {
      this.isDisabled = !this.isDisabled;
      this.btnText = '保存';
      if (!this.isDisabled) {
        this.isEdit = true;
      }
      setTimeout(() => {
        this.$refs.firstInput.focus();
      }, 20);
      if(this.isEdit) {
        if (isCorrectPhone(this.personInfo.phone)) {
          this.isDisabled = false;
          this.$notice('请输入11位手机号');
          return;
        }
        if (isCorrectEmail(this.personInfo.email)) {
          this.isDisabled = false;
          this.$notice('请输入正确的邮箱号');
          return;
        }
        if(this.isInfoFull && this.isDisabled) {
          updateInfo({
            email: this.personInfo.email,
            phone: this.personInfo.phone,
            question: this.personInfo.question,
            answer: this.personInfo.answer
          }).then(res => {
            this.$notice(res.msg);
            this.isDisabled = true;
            this.btnText = '编辑';
          }).catch(ex => {
            this.$notice(ex.msg);
          })
        }
      }
    },
    back() {
      this.$router.push('/mycenter');
    },
    _getUserInfo() {
      if(Object.keys(this.personInfo).length === 0) {
        getUserInfo().then(res => {
          delete res.data.password;     
          this.personInfo = res.data;
        })
      }
    }
  },
  components: {
    TransBase,
    RedTitle
  }
}
</script>

<style lang="scss" scoped>
.person-info-wrap {
  position: fixed;
  top: 0;
  width: 100%;
  bottom: 0px;
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
        flex: 0 0 60px;
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
    width: 30%;
    justify-content: center;
    border-radius: 20px;
    color: #fff;
    height: 40px;
    background: #ef5050;
  }
}
</style>