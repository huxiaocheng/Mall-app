<template>
  <transition :name='name'>
    <slot></slot>
  </transition>  
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: 'fade'
    }
  }
}
</script>

<style lang="scss" scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
  .slide-enter-active, .slide-leave-active {
    transition: all .3s;
  }
  .slide-enter, .slide-leave-to {
    transform: translate3d(100%, 0, 0,);
  }
</style>