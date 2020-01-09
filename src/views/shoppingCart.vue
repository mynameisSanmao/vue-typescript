<template>
  <div class="home-page">
    <Header title="购物车" />
    <Content />
    <Footer />
  </div>
</template>

<script lang="ts">
import { Component, Mixins ,Vue} from 'vue-property-decorator';
import Header from '@/components/shoppingCart/Header.vue';
import Content from '@/components/shoppingCart/Index.vue';
import Footer from '@/components/shoppingCart/Footer.vue';
import MyMixin from '@/global/mixin';

@Component({
  components: {
    Header,
    Content,
    Footer,
  },
})
export default class shoppingCart extends Vue {
   public scrollTop:any = ''
  //在页面离开时记录滚动位置
  beforeRouteLeave (to, from, next) {
    this.scrollTop = document.querySelector('#cart-content').scrollTop
    next()
  }
  beforeRouteEnter (to, from, next) {
    next(vm => {
      document.querySelector('#cart-content').scrollTop = vm.scrollTop
    })
  }
  public created() {
    this.$store.dispatch('initCartPage');
  }

}
</script>
