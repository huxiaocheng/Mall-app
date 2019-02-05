<template>
  <div class='product-list-wrap'>
    <div class='search-wrap'>
      <div class='back' @click='back'>
        <i class='iconfont'>&#xe616;</i>
      </div>
      <div class='search-input'>
        <i class='iconfont icon-search'>&#xe62a;</i>
        <input 
          type="text" 
          class='input' 
          ref='input'
          :value='keyword || placeText'
          @keyup.enter='handleKeyupEnter'
          placeholder='请输入商品名字'/>
      </div>
    </div>
    <ul class='sort-rank'>
      <li 
        class='sort-item' 
        :class='{active: index === sortIndex}'
        v-for='(item, index) in sortBtns' 
        :key='item' 
        @click='productSort(index)'
      >
        {{item}}
      </li>
    </ul>
    <scroll class='product-wrap' :pullup='pullup' @scrollEnd='scrollEnd' ref='scroll'>
      <ul class='product-list' v-show='list.length > 0'>
        <li @click='selectItem(item.id)' class='product-item' v-for='(item,index) in list' :key='index'>
          <div class='product-img-show'>
            <img class='img' v-lazy="item.imageHost + item.mainImage" alt="">
          </div>
          <div class='product-desc'>
            <span class='name'>
              <span class='tips'>{{Math.random() > 0.6 ? '海外' : Math.random() > 0.8 ? '代购' : '自营' }}</span>
              {{item.name.length > 22 ? item.name.slice(0,22) + '...' : item.name}}
            </span>
            <span class='subname'>{{item.subtitle.length > 30 ? item.subtitle.slice(0, 30) + '...' : item.subtitle}}</span>
            <span class='price'>
              <span class='money'>￥:</span>
              {{item.price}}
            </span>
          </div>
        </li>
        <li class='product-last-tips'>{{upScrollTips}}</li>  
      </ul>
      <div class='no-goods' v-show='!list.length && !hasMore'>
        抱歉没有找到您需要的商品。
      </div>
      <div class='loading-wrap'>
        <loading v-show='!list.length && hasMore'/>
      </div> 
    </scroll>
    <router-view/>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import Scroll from 'base/scroll/scroll';
import Loading from 'base/loading/loading';
import { getProductList } from 'api/product';

export default {
  name: 'product-list',
  data() {
    return {
      sortBtns: ['综合','价格升序','价格降序'],
      sortIndex: 0,
      list: [],
      hasMore: true,
      getParams: {
        keyword: '',
        orderBy: 'default',
        pageNum: 1,
        pageSize: 10
      }
    }
  },
  created() {
    this.pullup = true;
    setTimeout(() => {
      this.getParams.keyword = this.keyword;
      this._getProductlist(this.getParams);
    }, 20)
  },
  computed: {
    upScrollTips() {
      return this.hasMore ? '正在加载...' : '没有更多了' 
    },
    placeText() {
      const arr = ['手机', '键盘', '电脑', '护肤品', '冰箱', '玩具'];
      return arr[Math.floor(Math.random() * arr.length)];
    },
    ...mapGetters([
      'keyword'
    ])
  },
  methods: {
    selectItem(id) {
      this.$router.push({
        path: `/product-list/${id}`
      })
    },
    productSort(index) {
      this.sortIndex = index;
      if(index === 0) {
        if (this.getParams.orderBy === 'default') {
          return;
        }
        this.getParams.orderBy = '';
      } else if (index === 1) {
        this.getParams.orderBy = 'price_asc';
      } else if (index === 2) {
        this.getParams.orderBy = 'price_desc';
      }
      this.handleKeyupEnter();
    },
    scrollEnd() {
      setTimeout(() => {
        this._getProductlist();
      }, 20);
    },
    handleKeyupEnter() {
      this.hasMore = true;
      this.getParams.keyword = this.$refs.input.value;
      this.getParams.pageNum = 1;
      this.list = [];
      this.setKeyword(this.$refs.input.value);
      this.addHistory(this.$refs.input.value);
      this._getProductlist(this.getParams);
    },
    back() {
      this.$router.back();
      this.$destroy();
    },
    _getProductlist() {
      if(this.hasMore && this.getParams.keyword) {
        getProductList(this.getParams).then(res => {
          this.getParams.pageNum++;
          this.list = this.list.concat(this._normalizeList(res.data.list));
          setTimeout(() => {
            this.$refs.scroll.refresh();
          }, 20);
          this.hasMore = res.data.hasNextPage;
        }).catch(ex => {
          this.$notice(ex.msg);
        })
      }
    },
    _normalizeList(list) {
      const ret = [];
      list.forEach(v => {
        if (v.mainImage === null) {
          v.mainImage = '3bc21ebe-445b-455b-a868-d8d480bea37a.jpg';
        }
        ret.push(v);
      });
      return ret;
    },
    ...mapMutations({
      setKeyword: 'SET_KEYWORD'
    }),
    ...mapActions([
      'addHistory'
    ])
  },
  components: {
    Scroll,
    Loading
  }
}
</script>

<style lang="scss" scoped>
@import '~common/scss/mixins.scss';

.search-wrap {
    display:flex;
    justify-content: space-between;
    align-items: center;
    padding: 3px 15px 3px 5px;
    height: 50px;
    background: rgba(239, 80, 80,1);
    .back {
      padding-left: 10px;
      font-size: 22px;
      color: #fff;
      @include extend-click();
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
        @include y-center();
        left: 10px;
      }
      .input {
        font-size: 14px;
        color: #555;
        width: 100%;
        border: none;
        outline: none;
        background: #fff;
      }
    }
  }
.product-list-wrap {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  z-index: 999;
  background: #fff;
}
.sort-rank {
  display: flex;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #dedede;
  background: #f6f6f6;
  .sort-item {
    margin-left: 20px;
    font-size: 15px;
    color: #333;
    font-weight: bold;
    &.active {
      color: #ef5050;
    }
  }
}
.product-wrap {
  position: fixed;
  top: 97px;
  bottom: 0px;
  width: 100%;
  overflow: hidden;
  .product-list {
    box-sizing: border-box;
    padding-top: 10px;
    padding-bottom: 10px;
    min-height: 101%;
    .product-item {
      display: flex;
      padding: 0 10px 20px 10px;
      box-sizing: border-box;
      .product-img-show {
        position: relative;
        flex: 0 0 120px;
        width: 120px;
        height: 120px;
        margin-right: 20px;
        box-sizing: border-box;
        border-radius: 5px;
        border: 1px solid #ccc;
        .img {
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
      .product-desc {
        display: flex;
        justify-content: space-around;
        flex-direction: column;
        flex: 1;
        &::after {
          content: ' ';
          position: relative;
          top: 11px;;
          width: 100%;
          height: 1px;
          box-sizing: border-box;
          background: #f1f1f1;
          display: block;
        }
        .name {
          font-size: 17px;
          .tips {
            position: relative;
            top: -3px;
            display: inline-block;
            padding: 1px 3px;
            color: #fff;
            height: 17px;
            line-height: 17px;
            font-size: 12px;
            background: #ef5050;
          }
        }
        .subname {
          font-size: 14px;
          color: #666;
        }
        .price {
          font-weight: 600;
          color: #ef5050;
          .money {
            font-size: 14px;
          }
        }
      }
    }
    .product-last-tips {
      height: 30px;
      line-height: 30px;
      color: #666;
      font-size: 14px;
      text-align: center;
    }
  }
  .no-goods {
    color: #666;
    font-size: 14px;
    height: 101%;
    text-align: center;
    margin-top: 50px;
  }
  .loading-wrap {
    margin-top: 50px;
  }
}
</style>