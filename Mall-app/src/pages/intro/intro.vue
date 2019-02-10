<template>
  <div class='intro-wrap'>
    <red-title text='关于MMall' @back='back'/>
    <p>这是使用的Rosen老师PC端电商教程接口改写的wep App</p>
    <p>源码分享给大家，互相交流。</p>
    <p>如果对你有什么帮助，还望给个小星星~</p>
    <p>PC端网址: <a href='http://happymmall.com/index.html'>Happy-Mmall</a></p>
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