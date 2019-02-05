<template>
  <div>
    <div>
      <red-title @back='back'/>
      <scroll class='confirm-order-info'>
        <div class='order-wrap'>
          <router-link tag='div' to='/add-address'>
            <div class='address-wrap' v-if='hasAddressInfo'>
                <i class='iconfont icon-address'>&#xe64e;</i>
              <div class='info'>
                <div class='name'>
                  <span class='person'>收件人: {{addressInfo.name}}</span>
                  <span class='phone'>{{addressInfo.phone}}</span>
                </div>
                <div class='detail-address'>
                  <p class='address-text'>{{addressInfo.province}}{{addressInfo.city}}{{addressInfo.address}}</p>
                  <i class='iconfont'>&#xe630;</i>
                </div>
              </div>
            </div>
            <div class='no-address' v-else>
              还没有选择默认地址，去选择<i class='iconfont'>&#xe630;&#xe630;</i>
            </div>
          </router-link>
          <ul class='product-info-wrap'>
            <router-link tag='li' class='product-info-item' v-for='item in submitOrderList.orderItemVoList' :key='item.productId' :to='"/product-list/"+item.productId'>
              <div class='img'>
                <img v-lazy="submitOrderList.imageHost+item.productImage" alt="">
              </div>
              <div class='product-info'>
                <p class='title'>{{item.productName}}</p>
                <p class='price-info'>
                  <span class='price'>￥{{item.totalPrice}}</span>
                  <span class='total'>x{{item.quantity}}</span>
                </p>
              </div>
            </router-link>
          </ul>
        </div>
        <div class='loading-wrap' v-if='Object.keys(submitOrderList).length === 0'>
          <loading/>
        </div>
      </scroll>
      <div class='submit-wrap'>
        <div class='submit-btn' @click='handleCreateOrder'>提交订单</div>
        <p class='total-all'>合计金额: <span>￥{{submitOrderList.productTotalPrice}}</span></p>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Scroll from 'base/scroll/scroll';
import RedTitle from 'base/red-title/red-title';
import Loading from 'base/loading/loading';
import { getOrderCartList, createOrder } from 'api/order';
import { mapGetters } from 'vuex';

export default {
  name: 'settlement',
  data() {
    return {
      submitOrderList: {}
    }
  },
  created() {
    setTimeout(() => {
      this._getOrderCartList();
    }, 20)
  },
  computed: {
    hasAddressInfo() {
      return Object.keys(this.addressInfo).length > 0;
    },
    ...mapGetters([
      'addressInfo'
    ])
  },
  methods: {
    handleCreateOrder() {
      if(!this.addressInfo.id) {
        this.$notice('请选择收货地址');
        return;
      }
      createOrder(this.addressInfo.id).then(res => {
        this.$router.push({
          name: 'pay',
          params: {
            orderNo: res.data.orderNo
          }
        })
      })
    },
    back() {
      this.$router.push('/shopcart');
    },
    _getOrderCartList() {
      getOrderCartList().then(res => {
        this.submitOrderList = res.data;
      }).catch(ex => {
        this.$notice(ex.msg);
        setTimeout(() => {
          this.$router.push('/shopcart');
        }, 1000);
      })
    }
  },
  components: {
    Scroll,
    RedTitle,
    Loading
  }
}
</script>

<style lang="scss" scoped>

  .confirm-order-info {
    position: relative;
    position: fixed;
    top: 56px;
    width: 100%;
    bottom: 50px;
    background: #f8f8f8;
    overflow: hidden;
    padding-top: 10px;
    z-index: 999;
    .order-wrap {
      min-height: 101%;
      .address-wrap {
        display: flex;
        align-items: center;
        padding: 15px 5px;
        margin: 5px 5px 15px 5px;
        border-radius: 5px;
        box-shadow: 0 3px 5px 0 #eee;
        background: #fff;
        .icon-address {
          flex: 0 0 30px;
          width: 30px;
          text-align: center;
        }
        .info {
          margin: 10px 0 10px 10px;
          flex: 1;
          color: #555;
          .name {
            display: flex;
            justify-content: space-between;
            padding-right: 10px;
            line-height: 22px;
          }
          .detail-address {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 10px;
            line-height: 22px;
            > i {
              margin-right: 10px;
              margin-left: 10px;
            }
          }
        }
      }
      .no-address {
        color: #666;
        text-align: center;
        margin: 5px 5px 15px 5px;
        box-shadow: 0 3px 5px 0 #eee;
        padding: 20px 10px;
        background: #fff;
      }
      .product-info-wrap {
        .product-info-item {
          display: flex;
          align-items: center;
          padding: 10px;
          margin: 0 10px;
          border-radius: 5px;
          background: #fff;
          .img {
            position: relative;
            height: 60px;
            width: 60px;
            flex: 0 0 60px;
            > img {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              width: auto;
              height: auto;
              max-width: 100%;
              max-height: 100%;
            }
          }
          .product-info {
            display: flex;
            flex: 1;
            flex-direction: column;
            padding: 0 10px;
            .title {
              line-height: 22px;
              font-size: 15px;
              color: #666;
            }
            .price-info {
              display: flex;
              justify-content: space-between;
              margin-top: 10px;
              .price {
                color: #ef5050;
              }
              .total {
                color: #666;
                font-size: 15px;
              }
            }
          }
        }
      }
    }
    .loading-wrap{
      position: absolute;
      top: 35%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .submit-wrap {
    position: fixed;
    bottom: 0;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    width: 100%;
    height: 50px;
    background: #fff;
    z-index: 999;
    .total-all {
      margin-right: 20px;
      color: #666;
      font-size: 18px;
      > span {
        font-size: 16px;
        color: #ef5050;
      }
    }
    .submit-btn {
      height: 50px;
      line-height: 50px;
      padding: 0 20px;
      color: #fff;
      background: #ef5050;
    }
  }
</style>