<template>
  <div>
    <div class='page-title'>购物车({{cartProductNum}})</div>
    <scroll class='no-product' :click='false'>
      <div class='wrap' v-if='!shopList.length'>
        <i class='iconfont cart-icon'>&#xe635;</i>
        <h2 class='tips'>购物车空空如也~</h2>
        <p class='sub-tips'>“买点什么犒赏下自己吧~”</p> 
      </div>
      <ul class='shopcart-list' v-if='shopList.length'>
        <li v-for='(item, index) in shopList.cartProductVoList' :key='item.id' class='shopcart-item'>
          <label class='label' :class='{active: index === curIndex}' :for='"item_"+item.id' @click='selectItem(index)'></label>
          <input :id='"item_"+item.id' type="checkbox" style='display: none;' v-model='item.checked'>
          <div class='item-info'>
            <div class='img'>
              <img :src="shopList.imageHost+item.productMainImage" alt="">
            </div>
            <div class='text-info'>
              <span class='name'></span>
              <div class='num'>
                <span class='price'>{{item.productName}}</span>
              </div>
            </div>
          </div>
        </li>
      </ul> 
    </scroll>
  </div>
</template>

<script>
import Scroll from 'base/scroll/scroll';

export default {
  data() {
    return {
      curIndex: '',
      shopList: {
        allChecked: true,
        cartProductVoList: [
          {
            checked: false,
            id: 72,
            productName: '双开门冰箱',
            productPrice: 5689,
            productMainImage: '5a4de435-3b80-4eb6-8a1f-1ddddb35636a.jpg'
          }
        ],
        cartTotalPrice: 16632,
        imageHost: 'http://img.happymmall.com/'
      },
      cartProductNum: 0
    }
  },
  methods: {
    selectItem(index) {
      this.curIndex = index;
    }
  },
  components: {
    Scroll
  }
}
</script>

<style lang="scss" scoped>
  .page-title {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 56px;
    line-height: 56px;
    color: #fff;
    background: #ef5050;
  }
  .no-product {
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
      padding: 0 10px;
      height: 100px;
      .label {
        display: inline-block;
        width: 10px;
        height: 10px;
        margin-right: 15px;
        border: 3px solid #999;
        border-radius: 50%;
        &.active {
          border-color: #ef5050;
        }
      }
      .item-info {
        flex: 1;
        border: 1px solid #ccc;
      }
    }
  }
</style>