<template>
  <transi-base name='slide'>
    <div class='product-detail-wrap'>
      <div class='back-btn' @click='back' ref='back'>
        <i class='iconfont'>&#xe616;</i>
      </div>
      <transi-base>
        <div class='head-top' ref='topSwithes' v-show='isShowTop'>
          <div class='icon-back' @click='back'>
            <i class='iconfont'>&#xe616;</i>
          </div> 
          <ul class='switches'>
            <li 
              v-for='(item, index) in switches'
              class='switches-item' 
              @click='selectSwitchItem(index)' 
              :class='{active: curIndex === index}'
              :key='index'
            >
              {{item}}
            </li>
          </ul>
        </div>
      </transi-base>
      <scroll class='scroll-wrap' ref='detailWrap' :listenScroll='listenScroll' :probeType='probeType' @scroll='scroll'>
        <div>
          <slider v-if='sliderDate && sliderDate.length > 0' :sliderDate='sliderDate' :loop='loop' :autoPlay='autoPlay' :dotsNumber='dotsNumber' ref='slider'></slider>
          <div class='product-info' ref='productInfo' v-if='Object.keys(productInfo).length > 0'>
            <div class='price-wrap'>
              <div class='price'>
                <span>￥</span>
                {{productInfo.price}}
              </div>
              <div class='original'>
                ￥{{productInfo.price / 0.8}}
              </div>
              <div class='sales'>
                销量：{{Math.floor(productInfo.stock * Math.random())}}
              </div>
            </div>
            <p class='name'>
              <span class='title-tips'>{{Math.random() > 0.3 ? '今日特价' : Math.random() > 0.6 ? '8折特惠' : '买2送1'}}</span>
              {{productInfo.name}}
            </p>
            <p class='sub-title'>
              <span class='sub'>{{productInfo.subtitle}}</span>
              <span class='stock'>库存: {{productInfo.stock}}</span>
            </p>
          </div>
          <div v-else class='product-loading'>
            <loading />
          </div>
          <div ref='detail' class='product-detail'>
            <img class='img-item' v-lazy="item" alt="" v-for='item in detailList' :key='item'>
          </div> 
        </div> 
      </scroll>
      <div class='add-cart'>
        <router-link tag='div' to='/shopcart' class='cart'>
          购物车
          <i class='iconfont icon-cart'>&#xe622;</i>
          <span class='num'>{{cartProductAllNum}}</span>
        </router-link>
        <div class='add-btn' @click='addProduct'>加入购物车</div>
      </div>
      <transition name='up'>
        <div class='cart-count-wrap' v-show='showCartCount'>
          <div class='close-cart-count' @click='packUpCartCount'>
            <i class='iconfont'>&#xe628;</i>
          </div>
          <div class='add-cart-info'>
            <div class='img-box'>
              <img class='go-cart-img' v-lazy="productInfo.imageHost+productInfo.mainImage" alt="">
            </div>
            <p class='go-cart-price'>￥:{{productInfo.price}}</p>
          </div>
          <div class='input-count'>
            <span @click='handleCartCount(-1)'>-</span>
            <input v-model='cartCount' type="text">
            <span @click='handleCartCount(1)'>+</span>
          </div>
          <div class='confirm-add' @click='addToCart'>确定</div>
        </div>
      </transition>
      <confirm cancelBtn='返回' confirmBtn='查看' title='添加成功, 是否去购物车查看？' ref='toCartConfrim' @confirm='toCartLook' @cancel='backProductList'/>
    </div>
  </transi-base>
  
</template>

<script>
import Scroll from 'base/scroll/scroll';
import Slider from 'base/slider/slider';
import TransiBase from 'base/transition-base/transition-base';
import Confirm from 'base/confirm/confirm';
import Loading from 'base/loading/loading';
import { getProductDetail } from 'api/product';
import { addProductToCart, getCartNum } from 'api/cart';

const TOP_HEAD_HEIGHT = 56;

export default {
  data() {
    return {
      isShowTop: false,
      scrollY: -1,
      curIndex: 0,
      switches: ['商品', '详情'],
      productInfo: {},
      showCartCount: false,
      cartCount: 1,
      cartProductAllNum: 0
    }
  },
  created() {
    this.probeType = 3;
    this.listenScroll = true;
    this.loop = false;
    this.autoPlay = false;
    this.dotsNumber = true;
    setTimeout(() => {
      this._getProductDetail(this.$route.params.id);
      this._getCartNum();
    }, 20);
  },
  activated() {
    this._getProductDetail(this.$route.params.id);
    this._getCartNum();
  },
  computed: {
    sliderDate() {
      if(Object.keys(this.productInfo).length > 0) {
        const ret = [];
        if(typeof this.productInfo.subImages === 'string') {
          this.productInfo.subImages.split(',').forEach((v, i) => {
            ret[i] = {};
            ret[i].imgUrl = this.productInfo.imageHost + v;
            ret[i].router = '';
          })
        }
        return ret;
      }
    },
    detailList() {
      if(Object.keys(this.productInfo).length > 0) {
        const reg = /http.+?(jpg|jpeg|png)/ig;
        return this.productInfo.detail.match(reg);
      }
    }
  },
  methods: {
    backProductList() {
      this.$router.back();
    },
    toCartLook() {
      setTimeout(() => {
        this.$router.push({path: '/shopcart'});
      }, 100)
    },
    addToCart() {
      addProductToCart(this.$route.params.id, this.cartCount).then(res => {
        this.$refs.toCartConfrim.show();
      }).catch(ex => {
        this.$notice(ex.msg);
      })
    },
    handleCartCount(num) {
      if (num === -1 && this.cartCount > 1) {
        this.cartCount--;
      } else if (num === 1 && this.cartCount < this.productInfo.stock) {
        this.cartCount++;
      }
    },
    packUpCartCount() {
      this.showCartCount = false;
    },
    addProduct() {
      this.showCartCount = true;
    },
    scroll(pos) {
      this.scrollY = pos.y;
    },
    back() {
      this.$router.back();
      this.$destroy();
    },
    selectSwitchItem(index) {
      this.curIndex = index;
      if(index === 0) {
        this.$refs.detailWrap.scrollTo(0, 0, 500);
      } else if (index === 1) {
        this.$refs.detailWrap.scrollToElement(this.$refs.detail, 500);
      }
    },
    _getCartNum() {
      getCartNum().then(res => {
        this.cartProductAllNum = res.data;
      }).catch(ex => {
        this.$notice(ex.msg);
      })
    },
    _getProductDetail(id) {
      getProductDetail(id).then(res => {
        this.productInfo = res.data;
      }).catch(ex => {
        this.$notice(ex.msg);
      })
    }
  },
  watch: {
    scrollY(newY) {
      if(-newY > TOP_HEAD_HEIGHT) {
        this.isShowTop = true;
      } else if (-newY < 1){
        this.isShowTop = false;
      }
      if(-newY > (this.$refs.productInfo.clientHeight + this.$refs.slider.$el.clientHeight)) {
        this.curIndex = 1;
      } else {
        this.curIndex = 0;
      }
    }
  },
  components: {
    Scroll,
    Slider,
    TransiBase,
    Confirm,
    Loading
  }
}
</script>

<style lang="scss" scoped>
@import '~common/scss/mixins';
.product-detail-wrap {
  position: fixed;
  top: 0;
  left:0;
  right: 0;
  bottom: 0;
  z-index: 100;
}
  .head-top {
    position: fixed;
    top: 0;
    display: flex;
    height: 56px;
    width: 100%;
    align-items: center;
    color: #fff;
    background: #ef5050;
    border-bottom: 1px solid rgba(255,255,255,0.5);
    z-index: 100;
    .icon-back {
      @include extend-click();
      margin-left: 19px;
      margin-right: 50px;
    }
    .switches {
      position: relative;
      display: flex;
      .switches-item {
        color: rgba(255,255,255, .7);
        margin-right: 20px;
        &.active {
          color: #fff;
          font-weight: bold;
          &::after {
            position: absolute;
            bottom: -20px;
            content: '';
            display: block;
            width: 32px;
            height: 3px;
            background: #fff;
            box-sizing: border-box;
          }
        }
      }
    }
  }
  .scroll-wrap {
    position: fixed;
    top: 0;
    bottom: 55px;
    width: 100%;
    background: #fff;
    .product-info {
      display: flex;
      flex-direction: column;
      padding-bottom: 20px;
      border-bottom: 10px solid #eee;
      .price-wrap {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 50px;
        padding: 0 20px;
        color: #fff;
        background: #ef5050;
        .price {
          background: #fff;
          color: #ef5050;
          padding: 5px 15px;
          border-radius: 15px;
          font-size: 20px;
          > span {
            font-size: 14px;
          }
        }
        .original {
          position: relative;
          bottom: -3px;
          margin-left: 10px;
          font-size: 14px;
          text-decoration: line-through;
        }
        .sales {
          flex: 1;
          text-align: right;
        }
      }
      .name {
        padding: 10px 5px 0 5px;
        line-height: 24px;
        color: #333;
        font-weight: bold;
        .title-tips {
          display: inline-block;
          margin: 0 5px;
          color: #fff;
          font-size: 14px;
          padding: 0 10px;
          border-radius: 10px;
          background: #ef5050;
        }
      }
      .sub-title {
        display: flex;
        justify-content: space-between;
        padding: 5px 10px 0px 5px;
        font-size: 14px;
        color: #666;
        .sub {
          width: 80%;
        }
        .stock {
          flex: 1;
          text-align: right;
        }
      }
    }
    .product-loading {
      margin-top: 100px;
    }
    .product-detail {
      padding-top: 10px;
      .img-item {
        margin-top: -3px;
        width: 100%;
      }
    }
  }
  .add-cart {
    position: fixed;
    display: flex;
    bottom: 0;
    align-items: center;
    justify-content: space-around;
    height: 55px;
    line-height: 55px;
    width: 100%;
    color: #fff;
    text-align: center;
    .cart {
      box-sizing: border-box;
      height: 55px;
      border-top: 1px solid #ccc;
      flex: 1;
      color: #333;
      font-size: 14px;
      background: #fff;
      .icon-cart {
        font-size: 16px;
      }
      .num {
        position: relative;
        top: -11px;
        padding: 2px 6px;
        border-radius: 10px;
        color: #fff;
        background: #ef5050;
      }
    }
    .add-btn {
      flex: 1;
      background: #ef5050;
    }
  }
  .back-btn {
    position: fixed;
    top:13px;
    left: 13px;
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #fff;
    border-radius: 50%;
    z-index: 99;
    background: rgba(0,0,0,.3);
  }
  .up-enter-active, .up-leave-active {
    transition: .3s all ease-in;
  }
  .up-leave-to, .up-enter {
    transform: translate3d(0, 200px, 0);
  }
  .cart-count-wrap {
    position: fixed;
    height: 200px;
    left: 0;
    right: 0;
    bottom: 0;
    background: #fff;
    border-top: 1px solid #ddd;
    box-shadow: 0 -3px 10px 0 #ddd;
    z-index: 99;
    .close-cart-count {
      float: right;
      padding: 10px;
    }
    .add-cart-info {
      display: flex;
      align-items: flex-end;
      padding: 10px 20px;
      .img-box {
        position: relative;
        width: 80px;
        height: 80px;
        border: 1px solid #ddd;
        .go-cart-img {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          /* @include xy-center(); */
          display: block;
          width: auto;
          height: auto;
          max-width: 100%;
          max-height: 100%;
        }
      }
      .go-cart-price {
        font-size: 20px;
        margin-left: 10px;
        color:#ef5050;
      }
    }
    .input-count {
      display: flex;
      justify-content: center;
      margin-top: 10px;
      > span {
        padding: 5px 10px;
        color: 18px;
        font-weight: 600;
        @include extend-click();
      }
      > input {
        width: 30px;
        background: #ddd;
        text-align: center;
        outline: none;
        border-radius: 5px;
      }
    }
    .confirm-add {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 40px;
      line-height: 40px;
      text-align: center;
      color: #fff;
      background: #ef5050;
    }
  }
</style>