<template>
  <div class='pay-info-wrap'>
    <red-title text='订单支付' @back='back'/>
    <p class='orderNo-number'>订单提交成功，请您尽快支付！<br/> 订单号：{{payInfo.orderNo}}</p>
    <p class='pay-tips'>请使用支付宝扫描如下二维码进行支付：</p>
    <div class='pay-qrcode'>
      <img :src="payInfo.qrUrl" alt="" />
    </div>
  </div>
</template>

<script>
import RedTitle from 'base/red-title/red-title';
import { getPayQRcode } from 'api/pay';

export default {
  data() {
    return {
      payInfo: {}
    }
  },
  created() {
    setTimeout(() => {
      this._getPayQRcode(this.$route.params.orderNo);
      console.log(this.$route.params);
    }, 20);
  },
  methods: {
      back() {
        this.$router.push('/order');
      },
      _getPayQRcode(id) {
        getPayQRcode(id).then(res => {
          this.payInfo = res.data;
        }).catch(ex => {
          this.$notice(ex.msg);
        })
      }
  },
  components: {
    RedTitle
  }
}
</script>

<style lang="scss" scoped>
  .pay-info-wrap {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #fff;
    z-index: 999;
    .orderNo-number {
      margin-top: 20px;
      font-size: 18px;
      color: #666;
      line-height: 40px;
      text-align: center;
    }
    .pay-tips{
      line-height: 40px;
      margin-top: 30px;
      text-align: center;
      color: #ef5050;
    }
    .pay-qrcode {
      position: relative;
      width: 70%;
      height: 0;
      padding-top: 70%;
      margin: 40px auto 20px auto;
      overflow: hidden;
      border: 1px solid #eee;
      > img {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 100%;
      }
    }
  }
</style>