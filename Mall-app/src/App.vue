<template>
  <div id="app">
    <keep-alive exclude="product-list,settlement,shopcart,order">
      <router-view></router-view>
    </keep-alive>
    <tab-bar />
  </div>
</template>

<script>
import Home from 'pages/home/home';
import MyCenter from 'pages/mycenter/mycenter';
import Assort from 'pages/assort/assort';
import ShopCart from 'pages/shopcart/shopcart';
import TabBar from 'base/tabbar/tabbar';
export default {
  components: {
    Home,
    MyCenter,
    Assort,
    ShopCart,
    TabBar
  }
}
</script>

<style>
</style>
