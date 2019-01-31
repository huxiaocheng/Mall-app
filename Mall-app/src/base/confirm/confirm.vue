<template>
  <div>
    <transition name='confirm-fade'>
      <div class='confirm' v-show='isShow'>
        <div class='confirm-wrap'>
          <div class='confirm-content'>
            <p class='text'>{{title}}</p>
            <div class='operate'>
              <div class='operate-btn' @click='hide'>{{cancelBtn}}</div> 
              <div class='operate-btn left' @click='confirm'>{{confirmBtn}}</div> 
            </div>  
          </div>   
        </div> 
      </div> 
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    cancelBtn: {
      type: String,
      default: '取消'
    },
    confirmBtn: {
      type: String,
      default: '确认'
    },
    title: {
      type: String,
      default: '确认删除全部历史记录?'
    }
  },
  data() {
    return {
      isShow: false
    }
  },
  methods: {
    show() {
      this.isShow = true;
    },
    hide() {
      this.$emit('cancel');
      this.isShow = false;
    },
    confirm() {
      this.$emit('confirm');
      this.hide();
    }
  }
}
</script>

<style scoped lang='scss'>
.confirm {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99999;
  background: rgba(0, 0, 0, 0.3);
  &.confirm-fade-enter-active {
    animation: confirmFadein 0.3s;
    .confirm-content {
      animation: confirmZoom 0.3s;
    }
  }
  .confirm-wrap {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 100;
    transform: translate(-50%, -50%);
    .confirm-content {
      width: 270px;
      border-radius: 13px;
      overflow: hidden;
      background: #fff;
      .text {
        padding: 19px 15px;
        line-height: 22px;
        text-align: 18px;
        color: #333;
      }
      .operate {
        display: flex;
        align-items: center;
        text-align: center;
        font-size: 18px;
        .operate-btn {
          flex: 1;
          line-height: 22px;
          padding: 10px 0;
          border-top: 1px solid rgba(0, 0, 0, 0.2);
          color: #666;
          &.left {
            color: #fff;
            background: #ef5050;
          } 
        }
      }
    }
  }
}
  @keyframes confirmFadein {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1; 
    }
  }
  @keyframes confirmZoom {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }
</style> 