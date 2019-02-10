<template>
  <div>
    <red-title @back='back' text='收货地址'/>
    <scroll class='create-address-wrap' :data='infoList.list'>
      <ul class='address-list'>
        <li class='address-item' v-for='(item, index) in infoList.list' :key='item.id'>
          <span class='icon-select' @click='selectAddress(item.id, index)' ref='addressItem' :class='{active: item.id === addressInfo.id}'>
            <i class='iconfont'>&#xe605;</i>
          </span>
          <div class='info'>
            <p class='person'>
              <span class='name'>{{item.receiverName}}</span>
              <span class='phone'>{{item.receiverMobile}}</span>
            </p>
            <p class='address'>{{item.receiverProvince}}{{item.receiverCity}}{{item.receiverAddress}}</p>
          </div>
          <div class='edit-wrap'>
            <i class='iconfont icon-edit' @click.stop='editAddress(item.id)'>&#xe604;</i>
            <i class='iconfont icon-edit delete' @click.stop='deleteAddress(item.id)'>&#xe7f5;</i>
          </div>
        </li>
      </ul>
      <div class='loading-wrap' v-if='Object.keys(infoList).length === 0'>
        <loading />
      </div>
      <div class='no-address-tips' v-if='Array.isArray(infoList.list) && !infoList.list.length'>新建条地址吧~</div>
    </scroll>
    <div class='new-create-address' @click='createAddress()'>
      <i class='iconfont icon-add'>&#xe613;</i>新建收货地址
    </div>
    <trans-base>
      <div class='new-create-mask' v-show='isShowMask'>
        <div class='new-create-content'>
          <h2 class='title'>
            <span>{{maskTitle}}</span>
            <i class='iconfont icon-close' @click='hideMask()'>&#xe628;</i>
          </h2>
          <ul class='info-list'>
            <li class='info-item'>
              <span><i class='iconfont'>&#xe65c;</i>收件人姓名:</span>
              <div class='input-content'>
                <input type="text" v-model.trim='name' placeholder="请输入收件人姓名">
              </div>
            </li>
            <li class='info-item'>
              <span><i class='iconfont'>&#xe65c;</i>所在城市:</span>
              <div class='input-content'>
                <select @change='provincesSelect(false)' v-model='province'>
                  <option :value="item" v-for='(item, index) in provincesList' :selected='index === 0' :disabled='index === 0'  :key='index'>{{item}}</option>
                </select>
                <select v-model='city'>
                  <option :value="item" v-for='(item, index) in citiesList' :selected='index === 0' :disabled='index === 0'  :key='index'>{{item}}</option>
                </select>
              </div>
            </li>
            <li class='info-item'>
              <span><i class='iconfont'>&#xe65c;</i>详细地址:</span>
              <div class='input-content'>
                <input type="text" v-model.trim='address' placeholder="请精准到门牌号">
              </div>
            </li>
            <li class='info-item'>
              <span><i class='iconfont'>&#xe65c;</i>收件人手机:</span>
              <div class='input-content'>
                <input type="text" v-model.trim.number='phone' placeholder="请输入11位手机号">
              </div>
            </li>
          </ul>
          <div class='save' @click='saveAddressInfoBtn()'>保存</div>
        </div>
      </div>
    </trans-base>
    <confirm title='设置为默认地址？' @confirm='setDefaultAddress' ref='confirm' />
  </div>
</template>

<script>
import Scroll from 'base/scroll/scroll';
import transBase from 'base/transition-base/transition-base';
import RedTitle from 'base/red-title/red-title';
import Loading from 'base/loading/loading';
import Confirm from 'base/confirm/confirm';
import { getProvinces, getCities } from 'common/js/cityinfo';
import { mapMutations, mapGetters, mapActions } from 'vuex';
import { hasClass } from 'common/js/dom';
import * as Address from 'api/address';

export default {
  data() {
    return {
      isShowMask: false,
      infoList: {},
      provincesList: ['请选择'],
      citiesList: ['请选择'],
      name: '',
      province: '请选择',
      city: '请选择',
      address: '',
      phone: '',
      addressID: '',
      isEdit: false,
      maskTitle: ''
    }
  },
  created() {
    setTimeout(() => {
      this._getAddressList();  // 获得地址列表
    }, 20);
  },
  computed: {
    ...mapGetters([
      'addressInfo'
    ])
  },
  methods: {
    selectAddress(id, index) {  // 点击设置默认按钮
      if(hasClass(this.$refs.addressItem[index], 'active')) {
        return;
      }
      this.addressID = id;
      this.$refs.confirm.show();
    },
    setDefaultAddress() {  // 设置默认确定
      Address.selectAddress(this.addressID).then(res => {
        const data = res.data;
        this.saveAddressInfo({
          name: data.receiverName,
          province: data.receiverProvince,
          city: data.receiverCity,
          address: data.receiverAddress,
          phone: data.receiverPhone,
          id: this.addressID
        });
      })
    },
    editAddress(id) {  // 编辑地址按钮
      Address.selectAddress(id).then(res => {   // 回填地址信息
        this.isEdit = true;
        const data = res.data;
        this.isShowMask = true;
        this.provincesList.push(...getProvinces());
        this.maskTitle = '编辑地址';
        this.addressID = id;
        this.name = data.receiverName;
        this.province = data.receiverProvince;
        this.city = data.receiverCity;
        this.address = data.receiverAddress;
        this.phone = data.receiverPhone;
        this.provincesSelect(true);
      })
    },
    createAddress() {  // 新建地址按钮
      this.isEdit = false;
      this.isShowMask = true;
      this.maskTitle = '新建地址';
      this.provincesList.push(...getProvinces());
    },
    saveAddressInfoBtn() {  // 保存地址按钮
      if(this.validationInfo() && !this.isEdit) { // 创建地址
        Address.addAddress({
          receiverName: this.name,
          receiverPhone: this.phone,
          receiverProvince: this.province,
          receiverCity: this.city,
          receiverAddress: this.address
        }).then(res => {
          this.$notice(res.msg);
          this._getAddressList();
          setTimeout(() => {
            this.hideMask();
          }, 1000);
        })
      } else if (this.validationInfo() && this.isEdit) {  // 更新地址
        Address.updateAddress({
          id: this.addressID,
          receiverName: this.name,
          receiverProvince: this.province,
          receiverCity: this.city,
          receiverAddress: this.address,
          receiverPhone: this.phone
        }).then(res => {
          this.$notice(res.data);
          this._getAddressList();
          setTimeout(() => {
            this.hideMask();
          }, 1000);
        })
      }
    },
    deleteAddress(id) {  // 删除某条地址
       Address.deleteAddress(id).then(res => {
        this.$notice('删除地址成功');
        this._getAddressList();
        this.removeAddress(id);
      });
    },
    validationInfo() {
      if(this.name === '') {
        this.$notice('请输入收件人姓名');
        return false;
      }
      if(this.province === '请选择') {
        this.$notice('请选择省份');
        return false;
      }
      if(this.city === '请选择') {
        this.$notice('请选择城市');
        return false;
      }
      if(this.address === '') {
        this.$notice('请填写详细地址');
        return false;
      }
      if(!/^1\d{10}$/.test(this.phone)) {
        this.$notice('请输入11位手机号');
        return false;
      }
      return true;
    },
    provincesSelect(isEdit) { // 城市选择
      this.citiesList = ['请选择'];
      this.citiesList.push(...getCities(this.province));
      if(this.city !== '请选择' && !isEdit) {
        this.city = '请选择';
      }
    },
    hideMask() {
      this.isShowMask = false;
      this.name = '';
      this.province = '请选择';
      this.city = '请选择';
      this.address = '';
      this.phone = '';
      
    },
    back() {
      this.$router.back();
    },
    _getAddressList() {  //获取地址列表
      Address.getAddressList().then(res => {
        this.infoList = res.data;
      })
    },
    ...mapMutations({
      saveAddressInfo: 'SAVE_ADDRESS_INFO',
      saveAddressId: 'SET_ADDRESS_ID'
    }),
    ...mapActions([
      'removeAddress'
    ])
  },
  components: {
    Scroll,
    transBase,
    RedTitle,
    Loading,
    Confirm
  }
}
</script>

<style lang="scss" scoped>
@import '~common/scss/mixins';

  .create-address-wrap {
    z-index: 99;
    .address-list {
      .address-item {
        position: relative;
        overflow: hidden;
        padding: 10px;
        border-bottom: 1px solid #e5e5e5;
        .icon-select {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 15px;
          height: 15px;
          padding: 2px;
          border: 3px solid #ccc;
          font-size: 12px;
          color: rgba(0,0,0,0);
          border-radius: 50%;
          background: #fff;
          &.active {
            color: #fff;
            border-color: #ef5050;
            background: #ef5050;
          }
        }
        .info {
          float: left;
          font-size: 14px;
          margin-left: 40px;
          line-height: 22px;
          margin-right: 50px;
          .person {
            font-size: 18px;
            font-weight: 1000;
            .name {
              margin-right: 10px;
            }
          }
          .address {
            color: #666;
          }
        }
        .edit-wrap {
          position: absolute;
          top: 50%;
          right: 10px;
          transform: translateY(-50%);
          display: flex;
          flex-direction: column;
          padding-left: 10px;
          border-left: 1px solid #eee;
          .icon-edit {
            padding: 5px;
          }
          .icon-edit.delete {
            position: relative;
            right: 2px;
            font-size: 20px;
          }
        }
      }
    }
    .loading-wrap {
      margin-top: 100px;
    }
    .no-address-tips {
      padding-top: 50px;
      text-align: center;
      font-size: 18px;
      color: #666;
    }
  }
  .page-title {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 56px;
    line-height: 56px;
    color: #fff;
    background: #ef5050;
  }
  .create-address-wrap {
    position: fixed;
    top: 56px;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
    z-index: 998;
  }
  .new-create-address {
    position: fixed;
    bottom: 50px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 70%;
    height: 42px;
    color: #fff;
    font-size: 14px;
    letter-spacing: 2px;
    border-radius: 21px;
    background: #ef5050;
    box-shadow: 0 3px 10px 0 #ff7070;
    z-index: 999;
    .icon-add {
      font-size: 14px;
      margin-right: 10px;
    }
  }
  .new-create-mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,.3);
    z-index: 1000;
    .new-create-content {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 10px;
      width: 80%;
      height: 80%;
      border-radius: 10px;
      box-shadow: 0 0 5px 1px #ddd;
      background: #fff;
      .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid #ddd;
        > span {
          color: #333;
          font-weight: bold;
        }
        .icon-close {
          font-size: 14px;
          padding: 0 10px;
        }
      }
      .info-list {
        .info-item {
          display: flex;
          justify-content: space-between;
          height: 50px;
          line-height: 50px;
          overflow: hidden;
          margin-bottom: 5px;
          border-bottom: 1px solid #eee;
          .input-content {
            display: flex;
            align-items: center;
            flex: 1;
            outline: none;
            box-sizing: border-box;
            margin: 0 10px;
            > input {
              font-size: 16px;
              outline: none;
              color: #666;
            }
            > select {
              appearance: none;
              border: 1px solid #ccc;
              border-radius: 5px;
              padding-right: 15px;
              padding-left: 5px;
              outline: none;
              background: #fff;
              flex: 0 0 60px;
              height: 25px;
              margin-right: 10px;
              background: url('../../common/img/down.png') no-repeat scroll right center transparent;
              background-size: 14px 14px;
              > option {
                outline: none;
              }
            }
          }
          > span {
            font-size: 14px;
            flex: 0 0 95px;
            text-align: left;
            > i {
              color:#ef5050;
            }
          }
        }
      }
      .save {
        position: absolute;
        bottom: 50px;
        left: 50%;
        transform: translateX(-50%);
        width: 70%;
        height: 36px;
        line-height: 36px;
        border-radius: 18px;
        text-align: center;
        background: #ef5050;
        box-shadow: 0 3px 10px 0 #ff7070;
        color: #fff;
      }
    }
  }
</style>