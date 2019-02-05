<template>
  <div>
    <div class='page-title'>购物车({{shopCartCount}})</div>
    <scroll class='cart-wrap' :data='list'>
      <div class='wrap' v-if='Array.isArray(shopList.cartProductVoList) && !shopList.cartProductVoList.length'>
        <i class='iconfont cart-icon'>&#xe635;</i>
        <h2 class='tips'>购物车空空如也~</h2>
        <p class='sub-tips'>“买点什么犒赏下自己吧~”</p> 
      </div>
      <ul class='shopcart-list' v-else>
        <li v-for='(item, index) in shopList.cartProductVoList' :key='item.id' class='shopcart-item'>
          <label class='label' ref='label' :class='{active: item.productChecked}' :for='"item_"+item.id' @click='toggleCartProduct(item.productId, index)'>
            <i class='iconfont icon-select'>&#xe605;</i>
          </label>
          <input :id='"item_"+item.id' type="checkbox" style='display: none;' v-model='item.productChecked'>
          <div class='item-info'>
            <div class='img'>
              <img v-lazy="shopList.imageHost+item.productMainImage" alt="">
            </div>
            <div class='text-info'>
              <span class='name'>{{item.productName}}</span>
              <div class='price-box'>
                <div class='price'>￥{{item.productTotalPrice}}</div>
                <div class='cart-num'>
                  <span class='count-btn' @click='cartProductCount(-1, index, item.productId)'>-</span>
                  <input type="text" v-model='item.quantity' disabled>
                  <span class='count-btn' @click='cartProductCount(1, index, item.productId)'>+</span>
                </div>
              </div>
            </div>
          </div>
          <div class='remove-product' @click='removeCartProduct(item.productId)'>
            <i class='iconfont'>&#xe7f5;</i>
          </div>
        </li>
      </ul>
      <div class='loading-wrap' v-if='Object.keys(shopList).length === 0'>
        <loading />
      </div> 
    </scroll>
    <div class='cart-bottom-bar' v-if='Array.isArray(shopList.cartProductVoList) && shopList.cartProductVoList.length > 0'>
      <div class='select-all-btn' @click='toggleSelectCartAll'>
        <label for="cart-select-all" class='cart-select-all' :class='{active: shopList.allChecked}'>
          <i class='iconfont icon-select-all'>&#xe605;</i>
        </label>
        <span>全选</span>
        <input id='cart-select-all' type="checkbox" style='display: none;'>
      </div>
      <div class='total-price'>合计 :<b>￥{{shopList.cartTotalPrice}}</b></div>
      <div class='go-settle' @click='toSettlement'>去结算</div>
    </div>
  </div>
</template>

<script>
import Scroll from 'base/scroll/scroll';
import Loading from 'base/loading/loading';
import { getCartList, updateProductCount, removeProduct, selectProduct, unSelectProduct, selectAll, unSelectAll, getCartNum } from 'api/cart';
import { addClass, removeClass, hasClass } from 'common/js/dom';

export default {
  name: 'shopcart',
  data() {
    return {
      curIndex: '',
      shopList: {},
      shopCartCount: 0
    }
  },
  created() {
    setTimeout(() => {
      this._getCartList();
      this._getCartNum();
    }, 20)
  },
  computed: {
    list() {
      return this.shopList.cartProductVoList;
    }
  },
  methods: {
    toSettlement() {
      if (this.shopList.cartProductVoList.some(v => v.productChecked === 1)) {
        this.$router.push('/settlement')
      } else {
        this.$notice('还没有勾选商品~');
      }
    },
    toggleSelectCartAll() {  // 购物车全选
      if (!this.shopList.allChecked) {
        selectAll().then(res => {
          this.shopList = res.data;
        }).catch(ex => { 
          this.$notice(ex.msg);
        })
      } else {
        unSelectAll().then(res => {  // 购物全反选
          this.shopList = res.data;
        }).catch(ex => { 
          this.$notice(ex.msg);
        })
      }
    },
    toggleCartProduct(productId, index) {
      if (this.shopList.cartProductVoList[index].productChecked) {
        unSelectProduct(productId).then(res => {  // 取消选中某件商品
          this.shopList = res.data;
        }).catch(ex => {
          this.$notice(ex.msg);
        })
      } else {
        selectProduct(productId).then(res => {  // 选中某个商品
          this.shopList = res.data;
        }).catch(ex => { 
          this.$notice(ex.msg);
        })
      }
    },
    removeCartProduct (productId) {
      removeProduct(productId).then(res => {  // 移除某件商品
        this.shopList = res.data;
        this.$notice('移除商品成功');
        this._getCartNum();
      }).catch(ex => {
        this.$notice(ex.msg);
      })
    },
    cartProductCount(btn, index, productId) {
      const maxCount = this.shopList.cartProductVoList[index].productStock;
      let curCount = this.shopList.cartProductVoList[index].quantity;
      if(btn === 1 && curCount < maxCount) {
        curCount++;
      } else if (btn === -1 && curCount > 1) {
        curCount--;
      } else {
        return;
      }
      updateProductCount(productId, curCount).then(res => {  // 更新某件商品数量
        this.shopList = res.data;
        this.shopList.cartProductVoList[index].quantity = curCount;
        this._getCartNum();
      }).catch(ex => {
        this.$notice(ex.msg);
      })
    },
    back() {
      this.$router.back();
    },
    _getCartNum() {
      getCartNum().then(res => {
        this.shopCartCount = res.data;
      }).catch(ex => {
        this.$notice(ex.msg);
      })
    },
    _getCartList() {  // 获取购物车列表
      getCartList().then(res => {
        this.shopList = res.data;
      }).catch(ex => {
        this.$notice(ex.msg);
      })
    }
  },
  components: {
    Scroll,
    Loading
  }
}
</script>

<style lang="scss" scoped>
@import '~common/scss/mixins';

  .page-title {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 56px;
    line-height: 56px;
    color: #fff;
    background: #ef5050;
  }
  .cart-wrap {
    position: fixed;
    top: 56px;
    bottom: 106px;
    width: 100%;
    overflow: hidden;
    .wrap {
      min-height: 101%;
      display: flex;
      flex-direction: column;
      align-items: center;
      .cart-icon {
        display: inline-block;
        margin-top: 50px;
        height: 66px;
        line-height: 66px;
        width: 66px;
        text-align: center;
        background: #ef5050;
        color: #fff;
        border-radius: 50%;
        font-size: 50px;
      }
      .tips {
        margin-top: 30px;
        font-size: 18px;
        font-weight: bold;
        color: #666;
      }
      .sub-tips {
        margin-top: 15px;
        font-size: 14px;
        color: #888;
      }
    }
  }
  .shopcart-list {
    display: flex;
    flex-direction: column;
    padding-bottom: 10px;
    .shopcart-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 20px;
      padding: 0 10px;
      min-height: 100px;
      .label {
        display: inline-block;
        width: 15px;
        height: 15px;
        line-height: 15px;
        flex: 0 0 15px;
        text-align: center;
        margin-right: 15px;
        border: 2px solid #999;
        border-radius: 50%;
        transition: .3s all;
        &.active {
          border-color: #ef5050;
          background: #ef5050;
        }
        .icon-select {
          font-size: 12px;
          color: #fff;
        }
      }
      .item-info {
        position: absolute;
        left: 39px;
        right: 49px;
        display: flex;
        align-items: center;
        flex: 1;
        padding: 10px;
        border-radius: 10px;
        border: 1px solid #ddd;
        .img {
          position: relative;
          width: 80px;
          height: 80px;
          flex: 0 0 80px;
          margin-right: 10px;
          > img {
            position: absolute;
            top: 50%;
            left: 50%;
            width: auto;
            height: auto;
            display: block;
            transform: translate(-50%, -50%);
            max-width: 100%;
            max-height: 100%;
          }
        }
        .text-info {
          font-size: 15px;
          line-height: 18px;
          overflow: hidden;
          width: 100%;
          .name {
            display: inline-block;
            width: 90%;
            overflow: hidden;
          }
          .price-box {
            display: flex;
            justify-content: space-between;
            margin-top: 10px;
            .price {
              color:#ef5050;
            }
            .cart-num {
              display: flex;
              .count-btn {
                @include extend-click();
              }
              > input {
                font-weight: 600;
                margin: 0 10px;
                padding: 0 5px;
                width: 40px;
                border-radius: 3px;
                outline: none;
                text-align: center;
                color: #666;
                box-sizing: border-box;
                background: #eee;
              }
            }
          }
        }
      }
      .remove-product {
        margin-left: 10px;
        width: 30px;
        height: 30px;
        flex: 0 0 30px;
        line-height: 30px;
        text-align: center;
        color: #fff;
        border-radius: 50%;
        background: #bbb;
      }
    }
  }
  .loading-wrap {
    margin-top: 100px;
  }
  .cart-bottom-bar {
    position: fixed;
    bottom: 55px;
    left: 0;
    right: 0;
    padding-left: 15px;
    height: 50px;
    line-height: 50px;
    overflow: hidden;
    border-top: 1px solid #ddd;
    background: #fff;
    .select-all-btn {
      position: relative;
      float: left;
      line-height: 50px;
      > span {
        margin-left: 25px;
        font-size: 14px;
      }
      .cart-select-all {
        @include y-center();
        display: inline-block;
        width: 15px;
        height: 15px;
        margin-right: 5px;
        border: 2px solid #999;
        border-radius: 50%;
        &.active {
          background: #ef5050;
          border-color: #ef5050;
        }
        .icon-select-all {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 12px;
          color: #fff;
        }
      }
    }
    .total-price {
      float: left;
      margin-left: 20px;
      line-height: 50px;
      font-size: 14px;
      > b {
        font-size: 16px;
        font-weight: 600;
        color:#ef5050;
      }
    }
    .go-settle {
      float: right;
      padding: 0 20px;
      color: #fff;
      background: #ef5050;
    }
  }
</style>