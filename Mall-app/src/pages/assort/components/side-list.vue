<!--><template>
    <scroll class='assort-side'>
      <ul class='side-list'>
        <li 
          class='side-item' 
          @click='handleClickSideItem(index, item)'
          :class='{active: index === curIndex}' 
          v-for='(item, index) in sideList'
        >
          {{item}}
        </li>
      </ul>
    </scroll>
  </div>
</template>

<script>
import Scroll from 'base/scroll/scroll';

export default {
  data() {
    return {
      curIndex: 0,
      sideList: ['手机', '数码', '电脑', '办公配件', '电视', '冰箱', '洗衣机', '厨卫家电', '小家电', '家居', '家具', '家装', '个护化妆', '清洁', '纸品', '母婴',    '玩具',  '童装童鞋', '鞋靴',  '箱包',  '钟表', '珠宝', '运动户外', '足球', '汽车生活', '图书', '音像', '电子书']
    }
  },
  methods: {
    handleClickSideItem(index,name) {
      this.curIndex = index;
      this.$emit('selectSideItem', name);
    }
  },
  components: {
    Scroll
  }
}
</script>

<style lang="scss" scoped>
@import '~common/scss/mixins.scss';
.assort-side {
  position: fixed;
  top: 56px;
  left: 0;
  bottom: 55px;
  width: 90px;
  overflow: hidden;
  background: #f3f3f3;
  .side-list {
    .side-item {
      position: relative;
      width: 100%;
      height: 50px;
      line-height: 50px;
      text-align: center;
      font-size: 14px;
      color: #333;
      &.active {
        font-size: 15px;
        font-weight: bold;
        color: #000;
        background: #fff;
      }
      &.active::before {
        position: absolute;
        @include y-center();
        content: ' ';
        display: block;
        width: 5px;
        height: 20px;
        background: #c60023;
      }
    }
  }
}
</style>