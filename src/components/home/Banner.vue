<template>
  <div class="banner">
    <div class="wrap-swiper">
      <swiper v-if="banner.length > 0" :options="swiperOption" ref="mySwiper">
        <swiper-slide v-for="(item, index) in banner" :key="index">
          <img :src="$store.state.baseUrl+item.img" :alt="item.url" />
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component,Vue} from 'vue-property-decorator';
  import 'swiper/dist/css/swiper.css';
  import { swiper, swiperSlide } from 'vue-awesome-swiper';

  @Component({
    components:{
      swiper,
      swiperSlide
    }
  })
  export default class HomeBanner extends Vue {
    // data
    private swiperOption: any = {
      loop: true,
      autoplay: true,
      pagination: {
          el: '.swiper-pagination',
      },
      on: {
        tap() {
          const index = this.realIndex;
          this.$router.push(that.banner[index].url);
        },
      },
    };
    // computed
    get banner() {
      return this.$store.state.homeBanner
    }
  }
</script>

<style lang="less" scoped>
.wrap-swiper{
  img{
    width: 100%;
    display: block;
    height: 218px;
  }
}
</style>
