<template>
  <div>
    <div class='refresh' ref='refresh'>
      <img src="../../common/img/refresh.gif" width='100' alt="">
      <div class='tips'>
        {{tipsText}}
      </div>
    </div>
    <div class='head-search' ref='search'>
      <transition name='fade'>
        <head-search
          ref='input'
          :configParam='configParam'
          @inputClick='inputClick'
          @cancel='searchCancel'
          @inputEnter='inputEnter'
        />
      </transition>
    </div>
    <scroll class='scroll-wrap' 
      :listenScroll='listenScroll' 
      :probeType='probeType'
      :pullup='pullup'
      @scroll='scroll'
      @scrollEnd='scrollEnd'
      ref='scroll'
    >
      <div>
        <slider :sliderDate='sliderDate'/>
        <floor />
      </div>
    </scroll>
    <div class='no-more-tips' ref='noMore'>
      没有更多了...
    </div>
    <router-view/>
  </div>
</template>

<script>
import HeadSearch from 'base/head-search/head-search';
import Slider from 'base/slider/slider';
import Floor from './components/floor';
import Scroll from 'base/scroll/scroll'; 
import TransiBase from 'base/transition-base/transition-base';

const REFRESH_SCROLL_HEIGHT = 76;

export default {
  data() {
    return {
      sliderDate: [
        {
          router: '/detail',
          imgUrl: require('common/img/banner-1.jpg')
        },{
          router: '/detail',
          imgUrl: require('common/img/banner-2.jpg')
        },{
          router: '/detail',
          imgUrl: require('common/img/banner-3.jpg')
        }
      ],
      scrollY: -1,
      tipsText: '下拉刷新',
      maxY: -1,
      configParam: {
        isShowHistory: false,
        isLucency: true,
        cancel: false,
        isShowSearchLeft: true,
        isScan: true
      },
    }
  },
  created() {
    this.listenScroll = true;
    this.probeType = 3;
    this.pullup = true;
  },
  activated() {
    this.$refs.scroll.refresh();
  },
  methods: {
    inputEnter() {
      this.$router.push({
        path: '/product-list'
      })
    },
    inputClick() {
      this.configParam = {
        isShowHistory: true,
        isLucency: false,
        cancel: true,
        isShowSearchLeft: false,
        isScan: false
      }
    },
    searchCancel() {
      this.configParam = {
        isShowHistory: !true,
        isLucency: !false,
        cancel: !true,
        isShowSearchLeft: !false,
        isScan: !false
      };
    },
    scroll(pos) {
      this.scrollY = pos.y;
    },
    scrollEnd(maxY) {
      this.maxY = maxY;
    }
  },
  watch: {
    scrollY(newY) {
      if(-newY > -this.maxY) {
        this.$refs.noMore.style.bottom = `${-newY - -this.maxY + 20}px`;
      }
      if(newY < REFRESH_SCROLL_HEIGHT * 2 && newY > 0) {
        this.$refs.refresh.style.top = newY - REFRESH_SCROLL_HEIGHT + 'px';
      }
      if(newY > REFRESH_SCROLL_HEIGHT) {
        this.tipsText = '松开刷新';
      } else {
        this.tipsText = '下拉刷新';
      }
      if(newY > 0) {
        this.$refs.search.style.opacity = 1 / newY;
      } else {
        this.$refs.search.style.opacity = 1;
        this.$refs.search.style.backgroundColor = `rgba(239, 80, 80, ${-newY / REFRESH_SCROLL_HEIGHT})`;
      }
    }
  },
  components: {
    HeadSearch,
    Slider,
    Floor,
    Scroll,
    TransiBase
  }
}
</script>

<style lang="scss" scoped>
  @import '~common/scss/mixins.scss';

  .refresh {
    position: fixed;
    top: -56px;
    @include x-center();
    display: flex;
    justify-content: center;
    align-items: center;
    .tips {
      position: relative;
      top: 10px;
      left: -20px;
      font-size: 14px;
      color: #888;
    }
  }
  .scroll-wrap {
    position: fixed;
    top: 0;
    width: 100%;
    bottom: 55px;
  }
  .head-search {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9;
  }
  .no-more-tips {
    position: fixed;
    bottom: 40px;
    width: 100%;
    text-align: center;
    font-size: 14px;
    color: #aaa;
    z-index: -2;
  }
</style>