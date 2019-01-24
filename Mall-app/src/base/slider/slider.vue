<template>
  <div class='slider' ref='slider'>
    <ul class='slider-group' ref='sliderGroup'>
      <router-link class='slider-item' tag='li' v-for='(item, index) in sliderDate' :key='index' :to='item.router'>
        <img :src="item.imgUrl" alt="">
      </router-link>
    </ul>
    <div class='dots' v-if='!dotsNumber'>
      <span class='dot' :class='{active: index === currentPageIndex}' v-for='(item, index) in dots' :key='index'></span>
    </div>
    <div class='dotsNumber' v-if='dotsNumber'>
      <span>{{currentPageIndex + 1}} / {{dots.length}}</span>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll';

export default {
  props: {
    sliderDate: {
      type: Array,
      default() {
        return []
      }
    },
    dotsNumber: {
      type: Boolean,
      default: false
    },
    loop: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 3000
    }
  },
  data() {
    return {
      dots: [],
      currentPageIndex: 0
    }
  },
  mounted() {
    setTimeout(() => {
      this.initSliderWidth();
      this.initDots();
      this.initSlider();
      if(this.autoPlay) {
        this.play();
      }
    }, 20);

    window.addEventListener('resize', () => {
      if(!this.slider) {
        return;
      }
      this.initSliderWidth(true);
      this.slider.refresh();
    })
  },
  methods: {
    initSliderWidth(isResize) {
      this.children = this.$refs.sliderGroup.children;
      let width = 0;
      let sliderWidth = this.$refs.slider.clientWidth;
      for(let i = 0; i < this.children.length; i++) {
        let child = this.children[i];
        child.style.width = sliderWidth + 'px';
        width += sliderWidth;
      }
      if(this.loop && !isResize) {
        width += sliderWidth * 2;
      }
      this.$refs.sliderGroup.style.width = width + 'px';
    },
    initDots() {
      this.dots = new Array(this.children.length);
    },
    initSlider() {
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: {
          loop: this.loop,
          threshold: .3,
          speed: 400
        },
        click: true
      });

      this.slider.on('scrollEnd', () => {
        let pageIndex = this.slider.getCurrentPage().pageX;
        this.currentPageIndex = pageIndex;
        clearTimeout(this.timer);
        if(this.autoPlay) {
          this.play();
        }
      })

    },
    play() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.slider.next();
      }, this.interval);
    }
  },
  destroyed() {
    clearTimeout(this.timer);
  }
}
</script>

<style lang="scss" scoped>
.slider {
  position: relative;
  min-height: 1px;
  overflow: hidden;
  .slider-group {
    position: relative;
    overflow: hidden;
    white-space: nowrap;
    .slider-item {
      float: left;
      box-sizing: border-box;
      overflow: hidden;
      text-align: center;
      img {
        display: block;
        width: 100%;
      }
    }
  }
  .dots {
    position: absolute;
    right: 0;
    left: 0;
    bottom: 12px;
    transform: translateZ(1px);
    text-align: center;
    font-size: 0;
    .dot {
      display: inline-block;
      margin: 0 4px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #fff;
      transition: .3s all;
      &.active {
        width: 20px;
        border-radius: 5px;
        background: #fff;
      }
    }
  }
  .dotsNumber {
    position: absolute;
    right: 20px;
    bottom: 10px;
    color: #fff;
    padding: 5px 15px;
    border-radius: 20px;
    background: rgba(0,0,0,.3);
  }
}
</style>