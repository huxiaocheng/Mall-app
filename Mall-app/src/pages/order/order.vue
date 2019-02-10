<template>
  <div class='order-wrap'>
    <div class='page-title'>订单管理</div>
    <ul class='switch-list'>
      <li 
        class='switch-item' 
        :class='{active: index === curIndex}' 
        v-for='(item, index) in switchList' 
        :key='index'
        @click='selectOrderType(index)'
      >
        {{item}}
      </li>
    </ul>
    <scroll class='order-list-scroll' :data='orderList' ref='scroll'>
      <div>
        <ul class='order-list' v-if='orderList.length > 0'>
          <li class='order-item' v-for='(item, index) in orderList' :key='item.createTime'>
            <p class='order-status'>{{item.statusDesc}}</p>
            <ul>
              <router-link tag='li' class='order-info' v-for='(product, index) in item.orderItemVoList' :key='index' :to='"/product-list/" + product.productId'>
                <div class='img-box'>
                  <img class='img' v-lazy="item.imageHost+product.productImage" alt="" />
                </div>
                <span class='text'>{{product.productName}}</span>
                <div class='item-info'>
                  <span class='total'>x{{product.quantity}} </span>
                  <span class='price'> {{product.currentUnitPrice}}</span>
                </div>
              </router-link>
            </ul>
            <div class='order-detail-info'>
              <div class='detail-btn' @click='lookCurOrder(index)'>
                查看详情<i class='iconfont icon-more'>&#xe62f;</i>
              </div>
              <p class='price'>共计<span> {{item.payment}} </span>元</p>
              <div class='order-pay' v-if='item.statusDesc === "未支付"' @click='toPay(item.orderNo)'>
                <p class='pay-btn'>去支付</p>
              </div>
            </div>
            <ul class='detail-list' v-show='index === orderIndex'>
              <li class='detail-item'><i class='iconfont'>&#xe67c;</i>订单编号: {{item.orderNo}}</li>
              <li class='detail-item'><i class='iconfont'>&#xe60e;</i>创建时间: {{item.createTime}}</li>
              <li class='detail-item' v-if='item.shippingVo != null'><i class='iconfont'>&#xe655;</i>收件人：{{item.shippingVo.receiverName}}</li>
              <li class='detail-item' v-if='item.shippingVo != null'><i class='iconfont'>&#xe64e;</i>收货地址：{{item.shippingVo.receiverProvince}}{{item.shippingVo.receiverCity}}{{item.shippingVo.receiverAddress}}</li> 
              <li class='detail-item' v-if='item.shippingVo'><i class='iconfont'>&#xe66b;</i>电话：{{item.shippingVo.receiverMobile}}</li>
              <li class='detail-item' v-if='item.shippingVo'><i class='iconfont'>&#xe8f9;</i>支付方式：{{item.paymentTypeDesc}}</li>
              <li class='detail-item cancel'>
                <p class='up' @click='packUpDetail'>收起<i class='iconfont icon-up'>&#xe624;</i></p>  
                <p class='order-cancel-btn' v-if='item.statusDesc === "未支付"' @click='cancelCurOrder(item.orderNo)'>取消订单</p>
              </li>
            </ul>
          </li>
        </ul>
        <div class='no-order' v-if='!orderList.length && isNoMore'>
          还没有相关订单
        </div>
      </div>
      <div class='loading-wrap' v-show='!orderList.length && !isNoMore'>
        <loading></loading>
      </div>
    </scroll>
    <confirm ref='confirm' @confirm='confrim' title='确认取消订单吗？'/>
  </div>
</template>

<script>
import Loading from 'base/loading/loading';
import Scroll from 'base/scroll/scroll';
import { getOrderList, cancelOrder } from 'api/order';
import Confirm from 'base/confirm/confirm';

export default {
  name: 'order',
  data() {
    return {
      orderList: [],
      switchList: ['全部', '待付款', '已发货', '已取消', '已支付'],
      curIndex: 0,
      orderIndex: '',
      orderDetail: {},
      isNoMore: false
    }
  },
  created() {
    setTimeout(() => {
      this._getOrderList();
    }, 20);
    this.orderNum = 0;
  },
  activated() {
    this.$refs.scroll.refresh();
  },
  methods: {
    toPay(orderNo) {
      this.$router.push({
        name: 'pay',
        params: {
          orderNo
        }
      })
    },
    packUpDetail() {
      this.orderIndex = '';
    },
    lookCurOrder(index) {
      this.orderIndex = index;
      this.$refs.scroll.refresh();
    },
    selectOrderType(index) {
      this.curIndex = index;
      this.isNoMore = false;
      this._getOrderList();
    },
    cancelCurOrder(num) {
      this.orderNum = num;
      this.$refs.confirm.show();
    },
    confrim() {
      cancelOrder(this.orderNum).then(res => {
        this.$notice('订单取消成功');
        this._getOrderList();
        this.orderNum = 0;
      }).catch(ex => {
        this.$notice(ex.msg);
      })
    },
    _orderType(list, type) {
      if(list && list.length > 0) {
        return list.filter(v => {
          return v.statusDesc === type;
        })
      }
    },
    _getOrderList() {
      getOrderList(1,100).then(res => {
        const list = res.data.list;
        if(this.curIndex === 1) {
          this.orderList = this._orderType(list, '未支付');
        } else if(this.curIndex === 2) {
          this.orderList = this._orderType(list, '已发货');
        } else if(this.curIndex === 3) {
          this.orderList = this._orderType(list, '已取消');
        } else if(this.curIndex === 4){
          this.orderList = this._orderType(list, '已支付');
        } else {
          this.orderList = res.data.list;
        }
        if(this.orderList.length === 0) {
          this.isNoMore = true;
        }
      }) 
    }
  },
  components: {
    Scroll,
    Loading,
    Confirm
  }
}
</script>

<style lang="scss" scoped>
  .order-wrap {
    background: #f8f8f8;
    .page-title {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 56px;
      line-height: 56px;
      color: #fff;
      background: #ef5050;
    }
    .switch-list {
      display: flex;
      justify-content: space-around;
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #cdcdcd;
      margin-top: 10px;;
      outline: 10px solid #f8f8f8;
      background: #fff;
      .switch-item {
        position: relative;
        bottom: -1px;
        color: #666;
        &.active {
          color: #ef5050;
          border-bottom: 2px solid #ef5050;
        }
      }
    }
    .order-list-scroll {
      position: fixed;
      top: 117px;
      bottom: 65px;
      width: 100%;
      overflow: hidden;
      background: #f8f8f8;
      .order-list {
        min-height: 101%;
        .order-item {
          margin-bottom: 10px;
          background: #fff;
          font-size: 14px;
          border-top: 1px solid #ffd5d5;
          .order-status {
            padding-right: 20px;
            height: 35px;
            line-height: 35px;
            color: #ef5050;
            text-align: right;
          }
          .order-info {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px;
            margin: 0 5px;
            background: #f8f8f8;
            border-bottom: 1px solid #eee;
            .img-box {
              position: relative;
              flex: 0 0 60px;
              width: 60px;
              height: 60px;
              margin-right: 10px;
              background: #fff;
              border: 1px solid #eee;
              .img {
                display: inline-block;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                max-width: 100%;
                max-height: 100%;
                width: auto;
                height: auto;
              }
            }
            .text {
              flex: 1;
              padding-right: 10px;
              font-size: 14px;
              line-height: 16px;
              color: #666;
            }
            .item-info {
              display: flex;
              flex-direction: column;
              font-weight: bold;
              color: #666;
              .total {
                margin-bottom: 10px;
                text-align: right;
              }
            }
          }
          .order-detail-info {
            display: flex;
            justify-content: space-between;
            padding: 10px 20px; 
            align-items: center;
            color: #666;
            border-bottom: 1px solid #f1f1f1;
            .detail-btn{
              .icon-more {
                margin-left: 5px;
                font-size: 12px;
              }
            }
            .price {
              flex: 1;
              text-align: right;
              margin-right: 15px;
              span {
                font-size: 16px;
                font-weight: 600;
                color: #ef5050;
              }
            }
            .order-pay {
              overflow: hidden;
              .pay-btn {
                display: block;
                float: right;
                padding: 8px 20px;
                border: 1px solid #ef5050;
                border-radius: 30px;
                color: #ef5050;
              }
            }
          }
          .detail-list {
            display: flex;
            flex-direction: column;
            padding: 10px 0;
            color: #666;
            .detail-item {
              padding: 10px 20px;
              border: 1px solid #fafafa;
              &.cancel {
                display: flex;
                justify-content: space-between;
                align-items: center;
              }
              .iconfont {
                  margin-right: 10px;
                }
              .up {
                .icon-up {
                  margin-left: 10px;
                  font-size: 14px;
                } 
              }
              .order-cancel-btn {
                display: block;
                float: right;
                padding: 8px 20px;
                border: 1px solid #ef5050;
                border-radius: 30px;
                color: #ef5050;
              }
            }
          }
        }
      }
      .loading-wrap {
        margin-top: 50px;
      }
      .no-order {
        margin-top: 50px;
        font-size: 14px;
        color: #666;
        text-align: center;
      }
    }
  }
</style>