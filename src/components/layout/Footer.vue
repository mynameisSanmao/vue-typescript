<template>
  <div id="footer">
    <ul class="flex-box tc bot">
      <li>
        <div :class="(page == 'Cart' ? 'active ' : '') + 'link'" @click="toUrl('/shoppingCart')"><span :class="(page == 'Cart' ? 'icon-gouwuche-active ' : 'icon-gouwuche')" >购物车</span></div>
      </li>
      <li class="bol">
        <div :class="(page == 'Home' ? 'active ' : '') + 'link'" @click="toUrl('/')"><span :class="(page == 'Home' ? 'icon-home-active ' : 'icon-home')">首页</span></div>
      </li>
      <li class="bol">
        <div :class="(page == 'Center' ? 'active ' : '') + 'link'" @click="toUrl('/Center')"><span :class="(page == 'Center' ? 'icon-user-active ' : 'icon-user')">个人中心</span></div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Footer extends Vue {
  // data
  private page: string = '';
  public created() {
    this.page  = this.$route.name || 'Home';
  }
  // methods
  private toUrl(path: string) {
    this.$router.push({ path });
  }
}
</script>

<style lang="less" scoped>
#footer{
    height: 42px;
    width: 100%;
    position: absolute;
    left: 0;
    z-index: 2;
    bottom: 0;
    .link{
        font-size: 12px;
        display: block;
        height: 41px;
        line-height: 41px;
        &.active{
          color: #ff5a0c;
        }
        span{
          height: 20px;
          display: inline-block;
          line-height: 22px;
          padding-left: 20px;
          background-position-x: left;
        }
    }
    .bot{
      border-top: 1px solid #f2f4f6;
    }
    .bol{
      border-left: 1px solid #f2f4f6;
    }
}
</style>
