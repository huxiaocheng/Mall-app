<template>
   <transition>
    <div class="notice" v-if='visible'>
      <div class="content">
        <i class='iconfont icon-ok'>&#xe60f;</i>
        <span class='text'>{{ content }}</span>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    data () {
      return {
        visible: false,
        content: ''
      }
    },
    methods: {
      setTimer() {
        setTimeout(() => {
          this.close();
        }, 1200);
      },
      close() {
        this.visible = false
        setTimeout(() => {
          this.$destroy(true);
          this.$el.parentNode.removeChild(this.$el);
        }, 100);
      }
    },
    mounted() {
      this.setTimer();
    }
  }
</script>

<style lang='scss' scoped>
.v-enter{
  transform: scale(0);
}
.v-leave-to {
  transform: scale(1);
}
.v-enter-active,
.v-leave-active {
  transition: .3s all;
}
.notice {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99999;
  .content {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    top: 50%;
    left: 50%;
    box-sizing: border-box;
    padding: 25px 10px; 
    min-width: 120px;
    height: 120px;
    border-radius: 20px;
    background: rgba(0,0,0,.5);
    color: #fff;
    font-size: 16px;
    transform: translate(-50%, -50%);
    .icon-ok {
      font-size: 40px;
    }
    .text {
      font-size: 16px;
    }
  }
}
</style>