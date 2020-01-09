<!--
  * @deDescription 产品详情页面
-->
<template>
  <div class="home-page">
    <Content/>
    <Footer/>
  </div>
</template>

<script lang="ts">
import {Component,Vue} from 'vue-property-decorator';
import Content from '@/components/goods/Index.vue';
import Footer from '@/components/goods/Footer.vue';
@Component({
  components:{
    Content,
    Footer
  }
})
export default class GoodsPage extends Vue {
  public created() {
    const gid = this.$route.params.id;
    this.$store.dispatch('initGoodsDetail',gid,{root:true})
  }
  // computed
  get goodsDetail() {
    return this.$store.state.goodsDetail;
  }
}
</script>
