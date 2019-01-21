<!--><template>
  <div>
    <scroll class='assort-side'>
      <ul>
        <li>{{name}}</li>
      </ul>
    </scroll>
  </div>
</template>

<script>
import Scroll from 'base/scroll/scroll';
import axios from 'axios';
import { getProductList } from 'api/product';
import { ERR_OK } from 'api/require';

export default {
  props: {
    name: {
      type: String,
      default: '手机'
    }
  },
  created() {
    getProductList({
      pageNum: 2,
      pageSize: 10,
      orderBy: '',
      keyword: this.name
    }).then(res => {
      if(res.status === ERR_OK) {
        console.log(res.data.list);
      }
    }).catch(ex => {
      console.log(ex);
    })
  },
  components: {
    Scroll
  }
}
</script>

<style lang="scss" scoped>
  
</style>