<!--
  * 父子组件通信
-->
<template>
  <div class="child-page">
    <header>
      我是子组件的头部 --- {{m?'来着父组件的值->'+m:m}}
    </header>
    <div class="btn">
      <el-button @click.native="childClickone">childClickOne</el-button>
    </div>
    <div class="btn">
      <el-button @click.native="childClicktwo">childClickTwo</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import {Component,Vue,Emit,Prop} from 'vue-property-decorator'
@Component
export default class UserCenterChildMags extends Vue {
  @Prop() public m!: string;
  // data
  private msg:string = this.m || 'hello';

  // emit 第一种方式
  @Emit('bindSendOne') childClickone(){
    return 'msgOne';
  }

  // emit 第二种方式
  @Emit() private bindSendTwo() {
      return 'this.msg';
  }
  private childClicktwo() {
      // if(true) {
      //   return false
      // }
      this.bindSendTwo();
  }


}
</script>

<style lang="less" scoped>
.child-page{
  height: 100px;
  border: 1px solid blue;
  .btn{
    margin-top: 10px;
  }
}
</style>
