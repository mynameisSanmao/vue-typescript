<!--
  * 父子组件通信
-->
<template>
  <div class="home-page">
    <header>
      这是父组件的头部 --- {{msg?'来着父组件的值->'+msg:msg}}
      <br />
      {{title?'来着父组件的值->'+title:title}}
    </header>
    <!-- emit: 这里把驼峰转横线 -->
    <child-mags m="父组件dezhi" @bindSendOne="childrenSend" @bind-send-two="childrenSendtWO"></child-mags>
  </div>
</template>

<script lang="ts">
import {Component,Vue} from 'vue-property-decorator'
import childMags from './Mags-child.vue'
@Component({
  components:{
    childMags
  }
})
export default class UserCenterMags extends Vue {
  msg:string= '';
  title:string= '';
  public childrenSend(msg:string) {
    console.log(msg,'父组件')
    this.msg = msg;
  }
  public childrenSendtWO(msg:string) {
    console.log(msg,'第二个父组件通信')
    this.title = msg;
  }
}
</script>

<style lang="less" scoped>
.home-page{
  header{
    height: 40px;
    margin-bottom: 10px;
    border: 1px solid red;
  }
}
</style>
