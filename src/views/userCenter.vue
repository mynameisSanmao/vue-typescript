<template>
  <div class="home-page">
    <UserCenterIndex/>
    <Footer/>
  </div>
</template>

<script lang="ts">
import {Component,Vue} from 'vue-property-decorator';
import UserCenterIndex from '@/components/userCenter/Index.vue'
import Footer from '@/components/layout/Footer.vue';

@Component({
  components:{
    UserCenterIndex,
    Footer
  }
})
export default class UserCenter extends Vue {
  public created() {
    this.$store.dispatch('initCenterPage');
  }
}
</script>

<style lang="css" scoped>
</style>
