<template>
  <div id="header">
    <ul class="clearfix">
      <li class="tc pull-left header-left">
        <img :src="$store.state.baseUrl+avatar" alt="" @click="toUser" class="avatar">
      </li>
      <li class="pull-left header-center">
        <input type="text" v-model="key" class="search-input" placeholder="商品搜索" />
      </li>
      <li class="pull-left header-right">
        <span class="searct-btn tc" @click="toSearch">搜索</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {State} from 'vuex-class';

import { Component, Vue } from 'vue-property-decorator';
@Component
export default class Header extends Vue {
  private key:string = '';
  @State(state=>state.searchKeywords)
  private searchKeywords:string
  public created() {
    this.key = this.searchKeywords
  }
  // methods
  private toUser() {
    this.$router.push({ name: 'Center'});
  }
  private toSearch() {
    if (this.key.trim() === '') {
      return !1;
    }
    this.$router.push({ path: 'search', query: {keywords: this.key} });
  }
  
  // computed
  get avatar() {
    return this.$store.state.userInfo.avatar;
  }
}
</script>

<style lang="less" scoped>
#header{
  height: 42px;
  width: 100%;
  position: absolute;
  left: 0;
  z-index: 2;
  top: 0;
  background-color: #f3f3f3;
}
.header-left{
  width: 50px;
  height: 42px;
}
.header-center{
  width: calc(100% - 100px);
  height: 42px;
}
.header-right{
  width: 50px;
  height: 42px;
}
.avatar{
  width: 32px;
  height: 32px;
  margin-top: 5px;
  border-radius: 50%;
}
.search-input{
  height: 32px;
  width: 100%;
  border-radius: 16px;
  border: 0px none;
  box-shadow: none;
  margin-top: 5px;
  padding: 5px 30px 5px 20px;
  box-sizing: border-box;
  font-size: 14px;
  color: #666;
}
.searct-btn{
  color: #e0582f;
  display: block;
  height: 42px;
  line-height: 42px;
  font-size: 14px;
}
</style>
