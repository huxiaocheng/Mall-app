<template>
   <transition>
    <div class="notice" v-if='visible'>
        <div class="content">
          {{ content }}
        </div>
    </div>
  </transition>
</template>

<script>
  export default {
    data () {
      return {
        visible: false,
        content: '',
        duration: 1000
      }
    },
    methods: {
      setTimer() {
        setTimeout(() => {
          this.close()
        }, this.duration)
      },
      close() {
        this.visible = false
        setTimeout(() => {
          this.$destroy(true)
          this.$el.parentNode.removeChild(this.$el) 
        }, 100)
      }
    },
    mounted() {
      this.setTimer() 
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
    .content {
        position: absolute;
        top: 50%;
        left: 50%;
        padding: 5px 20px;
        line-height: 35px;
        border-radius: 20px;
        background: rgba(0,0,0,.4);
        color: #fff;
        font-size: 16px;
        transform: translate(-50%, -50%);
    }
}
</style>