<template>
  <div>
    <div class='page-title'>购物车({{cartProductNum}})</div>
    <scroll class='no-product'>
      <div class='wrap'>
        <i class='iconfont cart-icon'>&#xe635;</i>
        <h2 class='tips'>购物车空空如也~</h2>
        <p class='sub-tips'>“买点什么犒赏下自己吧~”</p> 
      </div> 
    </scroll>
    <scroll class='shopcart-list'>
      <ul>
        <li></li>
      </ul>  
    </scroll>
  </div>
</template>

<script>
import Scroll from 'base/scroll/scroll';

export default {
  data() {
    return {
      cartProductNum: 0
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
</style>