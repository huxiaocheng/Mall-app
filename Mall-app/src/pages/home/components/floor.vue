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
         name: '综合销量排行',
         list: [
           {
             id: 27,
             imgUrl: require('common/img/floor/floor1-1.jpg'),
             title: 'Midea/美的 BCD-535WKZM(E)冰箱双开门无霜智能家用厨卫家电',
             subtitle: '送品牌烤箱，五一大促' 
           }, {
             id: 74,
             imgUrl: require('common/img/floor/floor1-2.jpg'),
             title: '小米（MI） Ninebot九号平衡车Plus智能代步电动体感车',
             subtitle: '一个形影不离的新伙伴'
           }, {
             id: 75,
             imgUrl: require('common/img/floor/floor1-3.jpg'),
             title: 'Apple MacBook Pro 15.4英寸笔记本电脑 深空灰色（2017Multi-Touch Bar/Core i7/16GB/512GB MPTT2CH/A）',
             subtitle: '一身才华，一触，即发'
           }, {
             id: 77,
             imgUrl: require('common/img/floor/floor1-4.jpg'),
             title: '小米（MI）电视 50英寸 4K 智能WiFi网络平板 液晶电视机(黑色)4A L50M5-AD',
             subtitle: '老人小孩都会用的人工智能语音电视'
           }
         ] 
       }, {
         name: '显示器销量排行',
         list: [
           {
             id: 107,
             imgUrl: require('common/img/floor/floor2-1.jpg'),
             title: '索尼（SONY）KD-65X8566E 65英寸4K HDR腾讯视频 安卓7.0智能液晶电视（黑色）',
             subtitle: '客厅优选，4K迅锐图像引擎PRO，HDR高动态显示，享受视觉盛宴，醇音技术，内置腾讯视频' 
           }, {
             id: 80,
             imgUrl: require('common/img/floor/floor2-2.jpg'),
             title: '联想ThinkPad X1 Carbon 2018（05CD）14英寸轻薄笔记本电脑（i7-8550U 16G 1TSSD WQHD Win10Pro）黑色',
             subtitle: '黑色智慧'
           }, {
             id: 81,
             imgUrl: require('common/img/floor/floor2-3.jpg'),
             title: '外星人（Alienware）AW3418DW 34英寸专业电竞曲面显示器 120Hz刷新率 1900R曲率',
             subtitle: '收服世界边界'
           }, {
             id: 82,
             imgUrl: require('common/img/floor/floor2-4.jpg'),
             title: '华硕（ASUS）ROGSTRIX XG32VQ 31.5英寸 1800R曲率 144HZ 2K高分 AURA-Sync 吃鸡电竞显示器（HDMI/DP接口）',
             subtitle: '疾速出击，眼界大开'
           }
         ] 
       },{
         name: '手机销量排行',
         list: [
           {
             id: 72,
             imgUrl: require('common/img/floor/floor3-1.jpg'),
             title: 'Apple iPhone X (A1865) 全面屏手机 64GB 深空灰色',
             subtitle: '全面屏，全面绽放' 
           }, {
             id: 28,
             imgUrl: require('common/img/floor/floor3-2.jpg'),
             title: '4+64G送手环/Huawei/华为 nova 手机P9/P10plus青春',
             subtitle: 'NOVA青春版1999元'
           }, {
             id: 92,
             imgUrl: require('common/img/floor/floor3-3.jpg'),
             title: '三星 Galaxy S9+（SM-G9650/DS）6GB+128GB 谜夜黑 移动联通电信4G手机 双卡双待',
             subtitle: '全视曲面屏'
           }, {
             id: 127,
             imgUrl: require('common/img/floor/floor3-4.jpg'),
             title: '华为 HUAWEI P20 AI智慧全面屏 6GB +64GB 宝石蓝 全网通版 移动联通电信4G手机 双卡双待',
             subtitle: 'AI摄影大师/DxO评分过百/一秒记忆960个定格/影棚级人像自拍'
           }
         ] 
       },{
         name: '数码销量排行',
         list: [
           {
             id: 123,
             imgUrl: require('common/img/floor/floor4-1.jpg'),
             title: '华硕（ASUS）RT-AC86U 2900M双频全千兆低辐射/智能无线游戏路由器/MU-MIMO吃鸡路由【AiMesh组网黑科技】',
             subtitle: '移动电竞,手游利器,2900M手游电竞路由爆款' 
           }, {
             id: 124,
             imgUrl: require('common/img/floor/floor4-2.jpg'),
             title: 'TP-LINK TL-WDR7300 2100M智能11AC双频无线路由器 安全稳定 光纤宽带智能家用 大户型穿墙',
             subtitle: 'TP-LINK新品上市，1200M双频，全新VxWorks操作系统，更快更可靠'
           }, {
             id: 121,
             imgUrl: require('common/img/floor/floor4-3.jpg'),
             title: '斐讯K3星空银 AC3150双核双频全千兆高端无线路由器 智慧家庭路由',
             subtitle: '匠心之作 无线速率高达3167兆 满足大户型信号全覆盖'
           }, {
             id: 98,
             imgUrl: require('common/img/floor/floor4-4.jpg'),
             title: '罗技（Logitech）MX Master 2S 无线蓝牙优联双模跨计算机控制鼠标 人体工学 快速充电 旗舰 儒雅黑',
             subtitle: '创造无尽可能'
           }
         ] 
       },{
         name: '相机销量排行',
         list: [
           {
             id: 103,
             imgUrl: require('common/img/floor/floor5-1.jpg'),
             title: 'GoPro HERO 6 Black 运动摄像机 4K60帧高清 语音控制 防抖防水',
             subtitle: '精彩时刻，即刻分享' 
           }, {
             id: 104,
             imgUrl: require('common/img/floor/floor5-2.jpg'),
             title: '佳能（Canon）EOS 80D 单反套机（EF-S 18-200mm f/3.5-5.6 IS） 2420万有效像素 45点十字对焦 WIFI/NFC',
             subtitle: '爆款！18-200更大焦段，一镜走天下！经典中端旗舰单反！全45点十字型高性能自动对焦，内置Wi-Fi和NFC'
           }, {
             id: 105,
             imgUrl: require('common/img/floor/floor5-3.jpg'),
             title: '索尼（SONY）ILCE-6000L APS-C单镜头微单相机/照相机 黑色（约2430万有效像素 16-50mm镜头 a6000/α6000）',
             subtitle: '快！胜一筹'
           }, {
             id: 106,
             imgUrl: require('common/img/floor/floor5-4.jpg'),
             title: '卡西欧（CASIO）EX-TR750 数码相机（3.5英寸大屏、双LED灯，天使之眼）美颜自拍神器 静谧黑',
             subtitle: '3.5英寸大屏、9000+微调，六大美颜功能、四种美肤模式'
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