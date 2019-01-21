<template>
  <div>
    <head-search />
    <ul class='sort-rank'>
      <li class='sort-item'>综合</li>
      <li class='sort-item'>价格升序</li>
      <li class='sort-item'>价格降序</li>
    </ul>
    <scroll class='product-wrap'>
      <ul class='product-list'>
        <li class='product-item' v-for='item in list' :key='item.id'>
          <div class='product-img-show'>
            <img class='img' :src="item.imageHost + item.mainImage" alt="">
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
      </ul>
    </scroll>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import HeadSearch from 'base/head-search/head-search';
import Scroll from 'base/scroll/scroll';
import { getProductList } from 'api/product';
import { ERR_OK } from 'api/require';

export default {
  data() {
    return {
      data: {
        keyword: '',
        orderBy: '',
        pageNum: 1,
        pageSize: 10
      },
      list: []
    }
  },
  created() {
    setTimeout(() => {
      console.log(this.keyword)
      this._getProductlist();
    }, 20)
  },
  computed: {
    ...mapGetters([
      'keyword'
    ])
  },
  methods: {
    _getProductlist() {
      getProductList(this.data).then(res => {
        if(res.status === ERR_OK) {
          this.list = this._normalizeList(res.data.list);
        }
      }).catch(ex => {
        console.log(ex);
      })
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
    }
  },
  components: {
    HeadSearch,
    Scroll
  }
}
</script>

<style lang="scss" scoped>
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
  top: 116px;
  bottom: 55px;
  width: 100%;
  overflow: hidden;
  .product-list {
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
  }
}
</style>