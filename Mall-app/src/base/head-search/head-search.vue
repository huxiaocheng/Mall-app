<template>
  <div>
    <div class='search-wrap' :style='{"background-color": bg}'>
      <div class='search-left' v-if='configParam.isShowSearchLeft'>
        <div class='scan' v-if='configParam.isScan'>
          <i class='iconfont icon-scan'>&#xe607;</i>
          <span class='scan-text'>扫一扫</span>
        </div>
        <div class='back' v-if='!configParam.isScan'>
          <i class='iconfont'>&#xe616;</i>
        </div>
      </div>
      <div class='search-input'>
        <i class='iconfont icon-search'>&#xe62a;</i>
        <input 
          type="text" 
          class='input' 
          ref='input'
          :value='keyword'
          @focus='searchClick'
          @keyup.enter.delete='searchProduct'
          :placeholder='placeText'/>
      </div>
      <div class='cencel' v-if='configParam.cancel' @click='searchCancel'>取消</div>
    </div>
    <transi-base>
      <scroll class='search-history' ref='history' v-show='configParam.isShowHistory'>
        <div class='search-scroll' ref='searchScroll'>
          <div class='title'>
            <span>搜索历史</span>  
            <i class='iconfont delete-all' @click='deleteHistory'>&#xe7f5;</i> 
          </div>
          <ul class='history-list'>
            <li class='history-item' v-for='item in historyList' :key='item'>
              <span class='name'>{{item}}</span>  
              <i class='delete-icon'>x</i> 
            </li>
          </ul>
        </div>
      </scroll>  
    </transi-base>  
    <confirm  ref='confirm'/>
  </div>
</template>

<script>
import Scroll from 'base/scroll/scroll';
import TransiBase from 'base/transition-base/transition-base';
import Confirm from 'base/confirm/confirm';
import { mapMutations, mapGetters } from 'vuex';

export default {
  data() {
    return {
      historyList: ['手机','电脑'],
    }
  },
  props: {
    configParam: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    placeText() {
      const arr = ['手机', '键盘', '电脑', '护肤品', '冰箱', '玩具'];
      return arr[Math.floor(Math.random() * arr.length)];
    },
    bg() {
      return this.configParam.isLucency ? 'rgba(0,0,0,0)' : 'rgba(239, 80, 80,1)';
    },
    ...mapGetters([
      'keyword'
    ])
  },
  methods: {
    searchClick() {
      this.$emit('inputClick');
      this.$nextTick(() => {
        this.$refs.searchScroll.style.minHeight = this.$refs.history.$el.clientHeight + 1 + 'px';
        this.$refs.history.refresh();
        this.$refs.input.focus();
      })
    },
    searchCancel() {
      this.$emit('cancel');
    },
    deleteHistory() {
      this.$refs.confirm.show();
    },
    searchProduct() {
      this.$router.push('/product-list');
      this.setKeyword(this.$refs.input.value);
    },
    ...mapMutations({
      setKeyword: 'SET_KEYWORD'
    })
  },
  components: {
    Scroll,
    TransiBase,
    Confirm
  }
}
</script>

<style lang="scss" scoped>
@import '~common/scss/mixins';
  .search-wrap {
    display:flex;
    justify-content: space-between;
    align-items: center;
    padding: 3px 15px 3px 5px;
    height: 50px;
    .search-left {
      display: flex;
      justify-content: center;
      align-items: center;
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
    .cencel {
      margin-left: 10px;
      color: #fff;
    }
  }
  .search-history {
    position: fixed;
    top: 56px;
    bottom: 0;
    width: 100%;
    overflow: hidden;
    background: #fafafa;
    .search-scroll {
      .title {
        display: flex;
        justify-content: space-between;
        height: 40px;
        line-height: 40px;
        padding: 5px 10px;
        background: #f3f3f3;
        .delete-all {
          @include extend-click();
        }
        > span {
          color: #333;
          font-size: 16px;
          font-weight: 600;
        }
      }
      .history-list {
        .history-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 20px;
          height: 70px;
          line-height: 70px;
          border-bottom: 1px solid #eee;
          .name {
            display: inline-block;
            padding: 0 15px;
            height: 34px;
            line-height: 34px;
            border-radius: 17px;
            color: #666;
            background: #ddd;
          }
          .delete-icon {
            color: #666;
            @include extend-click();
            font-style: normal;
          }
        }
      }
    }
  }
</style>