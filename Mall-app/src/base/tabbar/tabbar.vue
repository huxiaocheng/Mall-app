<template>
  <ul v-if='isShowBar' class='bar-list'>
    <router-link class='bar-item' v-for='item in bars' tag='li' :key='item.icon' :to='item.router'>
      <i class='iconfont icon' v-html='item.icon'></i>
      <span class='text'>{{item.name}}</span>
    </router-link>
  </ul>
</template>

<script>
export default {
  props: {
    isShowBar: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      bars: [
        {
          name: '首页',
          router: '/home',
          icon: '&#xe751;'
        },
        {
          name: '订单',
          router: '/order',
          icon: '&#xe76a;'
        },
        {
          name: '购物车',
          router: '/shopcart',
          icon: '&#xe622;'
        },{
          name: '我的',
          router: '/mycenter',
          icon: '&#xe658;'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
  .bar-list {
    position: fixed;
    bottom: 0px;
    padding-bottom: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    width: 100%;
    box-shadow: 0 -3px 10px 0 rgba(0,0,0,.1);
    background: #fff;
    z-index: 1;
    .bar-item {
      display: flex;
      flex-direction: column;
      flex: 1;
      color: #666;
      text-align: center;
      &.router-link-exact-active {
        color: #d03825;
      }
      .icon {
        font-size: 24px;
        margin-bottom: 3px;
      }
      .text {
        font-size: 12px;
      }
    } 
  }
</style>