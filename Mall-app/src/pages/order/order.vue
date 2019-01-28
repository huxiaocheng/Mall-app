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
    <ul class='order-list'>
      <li class='order-item'>

      </li>  
    </ul>
  </div>
</template>

<script>
import Scroll from 'base/scroll/scroll';
import { getOrderList } from 'api/order';

export default {
  name: 'order',
  data() {
    return {
      switchList: ['全部','待付款','已发货','已取消','已支付'],
      curIndex: 0
    }
  },
  created() {
    this._getOrderList();
  },
  methods: {
    selectOrderType(index) {
      this.curIndex = index;
    },
    _getOrderList() {
      getOrderList(
        1,
        10
      ).then(res => {
        if(res === 'not-login') {
          this.$router.push('/login');
        }
        console.log(res);
      }).catch(ex => {
        this.$notice(ex);
      });
    }
  },
  components: {
    Scroll
  }
}
</script>

<style lang="scss" scoped>
  .order-wrap {
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
      .switch-item {
        &.active {
          color: #ef5050;
          border-bottom: 2px solid #ef5050;
        }
      }
    }
  }
</style>