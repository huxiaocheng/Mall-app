<template>
  <div class='page-title'>
    <i class='iconfont icon-back' @click='back'>&#xe616;</i>
    {{text}}
  </div>
</template>

<script>

export default {
  props: {
    text: {
      type: String,
      default: '确认订单'
    }
  },
  methods: {
    back() {
      this.$emit('back');
    }
  },
}
</script>

<style lang="scss" scoped>
  @import '~common/scss/mixins';

  .page-title {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 56px;
    line-height: 56px;
    color: #fff;
    background: #ef5050;
    .icon-back {
      @include y-center;
      left: 5px;
      padding: 0 10px;
    }
  }
</style>