<template>
  <div class='product-rank'>
    <div class='floor' :class='"floor-" + (index + 1)' v-for='(floor,index) in productDate' :key='index'>
      <p class='name'>{{floor.name}}</p>
      <ul class='list'>
        <li class='item' v-for='item in floor.list' :key='item.id' @click='selectProduct(item.id)'>
          <div class='img-wrap'>
            <img class='img' v-lazy="item.imgUrl" alt="">
          </div>
          <h6 class='title' v-html='item.title'></h6>
          <p class='sub-title' v-html='item.subtitle'></p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
     productDate: [
       {
         name: '家用电器销量排行',
         list: [
           {
             id: 2700,
             imgUrl: require('common/img/floor/floor1-1.jpg'),
             title: 'Ronshen/容声 BCD-529WD11HP 变频风冷无霜双开对开门电冰箱家用',
             subtitle: '矢量变频 节能静音 立体保鲜 电脑温控' 
           }, {
             id: 2702,
             imgUrl: require('common/img/floor/floor1-2.jpg'),
             title: 'Skyworth/创维 65M9 65英寸4K超清智能网络WIFI平板液晶电视机 60',
             subtitle: '限时到手3639'
           }, {
             id: 2681,
             imgUrl: require('common/img/floor/floor1-3.jpg'),
             title: '西门子 WM12L2C08W',
             subtitle: '变频节能，智能洗涤，精确控制'
           }, {
             id: 2683,
             imgUrl: require('common/img/floor/floor1-4.jpg'),
             title: '美的 KFR-72LW/WYSN8A1',
             subtitle: '无感吹风，远程智控，深度自清洁'
           }
         ] 
       }, {
         name: '数码3C销量排行',
         list: [
           {
             id: 2577,
             imgUrl: require('common/img/floor/floor2-1.jpg'),
             title: '小米8 青春版',
             subtitle: '潮流镜面渐变色 / 2400万自拍旗舰 / 7.5mm超薄机身 / 6.26"小刘海全面屏 / AI裸妆美颜 / 骁龙660AIE处理器' 
           }, {
             id: 2682,
             imgUrl: require('common/img/floor/floor2-2.jpg'),
             title: '戴尔 灵越13 5000(5370) Ins13-5370-1505',
             subtitle: 'IPS屏， 背光键盘， 全金属'
           }, {
             id: 2685,
             imgUrl: require('common/img/floor/floor2-3.jpg'),
             title: '酷比魔方 KNOTE8',
             subtitle: '轻薄金属机身， 二合一平板， 加速散热'
           }, {
             id: 2686,
             imgUrl: require('common/img/floor/floor2-4.jpg'),
             title: '佳能 80D (18-135,50mm)',
             subtitle: '自动对焦， 全像素双核CMOS， 内置WiFi'
           }
         ] 
       },{
         name: '服装箱包销量排行',
         list: [
           {
             id: 2680,
             imgUrl: require('common/img/floor/floor3-1.jpg'),
             title: '2018秋装新款初秋冷系女装毛呢连衣裙早秋套装裙子秋冬时尚两件套',
             subtitle: '阿依莉旗舰店' 
           }, {
             id: 2688,
             imgUrl: require('common/img/floor/floor3-2.jpg'),
             title: '冬季男士帽子韩版潮时尚毛线帽保暖针织冬天防寒棉帽青年户外骑车',
             subtitle: '米黛洛旗舰店'
           }, {
             id: 2689,
             imgUrl: require('common/img/floor/floor3-3.jpg'),
             title: '铝框行李箱万向轮拉杆箱旅行箱女男韩版复古密码箱子24寸学生28寸',
             subtitle: '卡米梵旗舰店'
           }, {
             id: 2690,
             imgUrl: require('common/img/floor/floor3-4.jpg'),
             title: '小米世家大容量女士手提旅行包商务出差行李包穿拉杆包防水尼龙包',
             subtitle: '小米世家旗舰店'
           }
         ] 
       },{
         name: '食品生鲜销量排行',
         list: [
           {
             id: 53,
             imgUrl: require('common/img/floor/floor4-1.jpg'),
             title: '三只松鼠 开心果225g休闲零食坚果特产无漂白2件起售',
             subtitle: '开心果' 
           }, {
             id: 2691,
             imgUrl: require('common/img/floor/floor4-2.jpg'),
             title: '网易味央黑猪肉汤排骨优享款3份装1050g',
             subtitle: '冷冻土猪肉生鲜五花猪腿肉'
           }, {
             id: 2692,
             imgUrl: require('common/img/floor/floor4-3.jpg'),
             title: '崇明荷叶糯米鸡500g 方便速食点心',
             subtitle: '半成品菜加热即食熟食零食小吃'
           }, {
             id: 2694,
             imgUrl: require('common/img/floor/floor4-4.jpg'),
             title: '印尼进口食品Richeese丽芝士',
             subtitle: 'nabati奶酪味威化饼干350g罐装'
           }
         ] 
       },{
         name: '酒水饮料',
         list: [
           {
             id: 2695,
             imgUrl: require('common/img/floor/floor5-1.jpg'),
             title: '蓝色经典 梦之蓝M6 52度500ml*2瓶',
             subtitle: '洋河官方旗舰店 绵柔型白酒' 
           }, {
             id: 2696,
             imgUrl: require('common/img/floor/floor5-2.jpg'),
             title: '百特醇酿干红法国原瓶进口红酒法国葡萄酒波尔多红酒',
             subtitle: '2支装礼盒'
           }, {
             id: 2697,
             imgUrl: require('common/img/floor/floor5-3.jpg'),
             title: 'Nestle/雀巢咖啡丝滑拿铁摩卡榛果焦糖268ml*15瓶',
             subtitle: '4口味混咖啡饮料'
           }, {
             id: 2698,
             imgUrl: require('common/img/floor/floor5-4.jpg'),
             title: 'RIO/锐澳微醺预调鸡尾酒G洋酒果酒330ml*10罐',
             subtitle: '预调鸡尾酒'
           }
         ] 
       }
     ]
    }
  },
  methods: {
    selectProduct(id) {
      this.$router.push({
        path: `/home/${id}`
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~common/scss/mixins.scss';
.product-rank {
  .floor {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    padding: 0 5px 20px 5px;
    &.floor-1 {
      background: #feb258;
      .title {
        color: #d67e16;
      }
    }
    &.floor-2 {
      background: #fd624e;
      .title {
        color: #bf4131;
      }
    }
    &.floor-3 {
      background: #8a71f8;
      .title {
        color: #5031d6
      }
    }
    &.floor-4 {
      background: #f73963;
      .title {
        color: #b9135f;
      }
    }
    &.floor-5 {
      background: #49d988;
      .title {
        color: #148e49;
      }
    }
    .name {
      padding: 20px 0 15px 0;
      text-align: center;
      font-size: 18px;
      color: #fff;
    }
    .list {
      display: flex;
      flex-wrap: wrap;
      box-sizing: border-box;
      border-radius: 10px;
      overflow: hidden;
      .item {
        width: 25%;
        padding-bottom: 15px;
        border-bottom: 1px solid #ccc;
        background: #fff;
        .img-wrap {
          padding: 10px 10px 0 10px;
          .img {
            width: 100%;
          }
        }
        .title {
          margin-top: 15px;
          padding: 0 10px;
          font-size: 13px;
          margin-bottom: 5px;
          @include no-wrap();
        }
        .sub-title {
          color: #999;
          margin-top: 10px;
          font-size: 12px;
          padding: 0 12px;
          @include no-wrap();
        }
      } 
    }
  }
}
</style>