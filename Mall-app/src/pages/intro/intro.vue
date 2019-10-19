<template>
  <div class='intro-wrap'>
    <red-title text='关于MMall' @back='back'/>
    <p>真实接口，根据慕课网已有PC电商项目接口而写</p>
    <p>使用vue全家桶，没有使用UI框架，所有样式和功能全部为手写</p>
    <p>PC端网址: <a target="_blank" href='http://happymmall.com/index.html'>Happy-Mmall</a></p>
  </div>
</template>

<script>
import RedTitle from 'base/red-title/red-title';

export default {
  methods: {
    back() {
      this.$router.push('/mycenter');
    }
  },
  components: {
    RedTitle
  }
}
</script>

<style lang="scss" scoped>
.intro-wrap {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  background: #fff;
  > p {
    margin: 10px 0;
    padding: 5px 20px;
    line-height: 26px;
    color: #666;
    > a {
      color: blue;
    }
  }
}
  
</style>