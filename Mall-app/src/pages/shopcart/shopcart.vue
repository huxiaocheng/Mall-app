<template>
  <div>
    <div class='page-title'>购物车(0)</div>
    <scroll class='cart-wrap' :click='true'>
      <div class='wrap' v-if='shopList.length'>
        <i class='iconfont cart-icon'>&#xe635;</i>
        <h2 class='tips'>购物车空空如也~</h2>
        <p class='sub-tips'>“买点什么犒赏下自己吧~”</p> 
      </div>
      <ul class='shopcart-list needsclick' v-if='!shopList.length'>
        <li v-for='(item, index) in shopList.cartProductVoList' :key='item.id' class='shopcart-item'>
          <label class='label' ref='label' :class='{active: index === curIndex}' :for='"item_"+item.id' @click='selectItem(index)'></label>
          <input :id='"item_"+item.id' type="checkbox" style='display: block;' v-model='item.checked'>
          <div class='item-info'>
            <div class='img'>
              <img :src="shopList.imageHost+item.productMainImage" alt="">
            </div>
            <div class='text-info'>
              <span class='name'>{{item.productName}}</span>
              <div class='price-box'>
                <div class='price'>￥{{item.productTotalPrice}}</div>
                <div class='cart-num'>
                  <span class='count-btn'>-</span>
                  <input type="text">
                  <span class='count-btn'>+</span>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul> 
    </scroll>
    <div class='cart-bottom-bar'>
      <div class='select-all-btn'>
        <label for="cart-select-all" class='cart-select-all'></label>
        <span>全选</span>
        <input id='cart-select-all' type="checkbox" style='display: none;'>
      </div>
      <div class='total-price'>合计 :<b>￥0.00</b></div>
      <div class='go-settle'>去结算</div>
    </div>
  </div>
</template>

<script>
import Scroll from 'base/scroll/scroll';
import { getCartList } from 'api/cart';
import { addClass, removeClass, hasClass } from 'common/js/dom';

export default {
  data() {
    return {
      curIndex: '',
      shopList: {
        allChecked: false,
        cartProductVoList: [{
          id: 21845,
          limitQuantity: "LIMIT_NUM_SUCCESS",
          productChecked: 0,
          productId: 27,
          productMainImage: "ac3e571d-13ce-4fad-89e8-c92c2eccf536.jpeg",
          productName: "Midea/美的 BCD-535WKZM(E)冰箱双开门无霜智能家用厨卫家电",
          productPrice: 3299,
          productStatus: 1,
          productStock: 104637,
          productSubtitle: "送品牌烤箱，五一大促",
          productTotalPrice: 3299,
          quantity: 1,
          userId: 9240
        }],
        cartTotalPrice: 0,
        imageHost: "http://img.happymmall.com/"
      }
    }
  },
  created() {
    setTimeout(() => {
      this._getCartList();
    }, 20)
  },
  methods: {
    _getCartList() {
      getCartList().then(res => {
        if(res === 'not-login') {
          this.$router.push('/login');
        }
        this.shopList = res.data;
        console.log(res);
      }).catch(ex => {
        this.$notice(ex);
      })
    },
    selectItem(index) {
      if (hasClass(this.$refs.label[index], 'active')) {
        removeClass(this.$refs.label[index], 'active');
      } else {
        addClass(this.$refs.label[index],'active')
      }
    }
  },
  components: {
    Scroll
  }
}
</script>

<style lang="scss" scoped>
@import '~common/scss/mixins';

  .page-title {
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
    bottom: 55px;
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
    .shopcart-item {
      display: flex;
      align-items: center;
      margin-top: 20px;
      padding: 0 10px;
      min-height: 100px;
      .label {
        display: inline-block;
        width: 15px;
        height: 15px;
        margin-right: 15px;
        border: 2px solid #999;
        border-radius: 50%;
        &.active {
          border-color: #ef5050;
        }
      }
      .item-info {
        display: flex;
        align-items: center;
        flex: 1;
        padding: 10px;
        border-radius: 10px;
        border: 1px solid #ddd;
        .img {
          width: 80px;
          height: 80px;
          flex: 0 0 80px;
          margin-right: 10px;
          > img {
            display: block;
            width: 100%;
            height: 100%;
          }
        }
        .text-info {
          flex: 1;
          font-size: 15px;
          line-height: 18px;
        }
        .price-box {
          display: flex;
          justify-content: space-between;
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
              margin: 0 5px;
              padding: 0 5px;
              width: 40px;
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
  }
  .cart-bottom-bar {
    position: fixed;
    bottom: 55px;
    left: 0;
    right: 0;
    /* display: flex;
    justify-content: space-between;
    align-items: center; */
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
          border-color: #ef5050;
        }
      }
    }
    .total-price {
      float: left;
      margin-left: 20px;
      line-height: 50px;
    }
    .go-settle {
      float: right;
      padding: 0 20px;
      color: #fff;
      background: #ef5050;
    }
  }
</style>