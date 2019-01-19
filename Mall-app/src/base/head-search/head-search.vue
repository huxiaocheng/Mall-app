<template>
  <div class='search-wrap'>
    <div class='search-left'>
      <div class='scan' v-if='isScan'>
        <i class='iconfont icon-scan'>&#xe607;</i>
        <span class='scan-text'>扫一扫</span>
      </div>
      <div class='back' v-if='!isScan'>
        <i class='iconfont'>&#xe616;</i>
      </div>
    </div>
    <div class='search-input'>
      <i class='iconfont icon-search'>&#xe62a;</i>
      <input type="text" class='input' placeholder='搜索商品...'/>
    </div>
    <div class='cencel' v-if='cancel'>取消</div>
  </div>
</template>

<script>
export default {
  props: {
    isScan: {
      type: Boolean,
      default: true
    },
    cancel: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
@import '~common/scss/mixins';
  .search-wrap {
    display:flex;
    justify-content: space-between;
    align-items: center;
    background: rgba(0,0,0,0);
    padding: 3px 15px 3px 5px;
    .search-left {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 50px;
      .scan {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 50px;
        width: 50px;
        color: #fff;
        border-radius: 50%;
        background: rgba(0,0,0, .3);
        .icon-scan {
          text-align: center;
          font-size: 18px;
          margin-bottom: 2px;
        }
        .scan-text {
          text-align: center;
          font-size: 12px;
        }
      }
      .back {
        padding-left: 10px;
        font-size: 22px;
        color: #fff;
      }
    }
    .search-input {
      position: relative;
      display: flex;
      flex: 1;
      height: 30px;
      padding-left: 35px;
      border-radius: 15px;
      margin-left: 10px;
      overflow: hidden;
      background: #fff;
      .icon-search {
        @include y-center;
        left: 10px;
      }
      .input {
        width: 100%;
        border: none;
        outline: none;
        background: #fff;
      }
    }
  }
</style>