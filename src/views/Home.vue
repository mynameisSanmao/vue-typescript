<template>
  <div class="home-page">
    <Header/>
    <Content />
    <Footer />
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import {State,Mutation,namespace} from 'vuex-class';
import Header from '@/components/layout/Header.vue';
import Content from '@/components/home/Index.vue';
import Footer from '@/components/layout/Footer.vue';
import MyMixin from '@/global/mixin';
const someModule = namespace('test');
@Component({
  components:{
    Header,
    Content,
    Footer
  }
})
export default class Home extends Mixins(MyMixin) {
  //引入state.ts中的数据;   测试代码
  @State(state => state.other)
  private other1:string
  @State(state => state.tests)
  public tests:string
  @State(state => state.acts)
  public acts:string
  //引入当前需要的vuex模块（test.ts 模块）中的数据;    测试代码
  @someModule.State(state=>state.data1)
  public data1:string

  created () {
    // mutations.ts 里面的方法，改变state.ts中的数据;   测试代码
    this.$store.commit('sanmao','i am sanmao',{root:true})

    this.$store.dispatch('initHomePage',{root:true});
  }
  // methods
    //  测试代码
  setName() {
    // 在命名空间下，调用test.ts 里面的方法，改变test.ts中state的数据
    this.$store.dispatch('test/setActionsData','vuex赋值成功！')
  }
    // 测试代码
  setActions() {
    // 调用actions.ts 里面的方法，改变state.ts中的数据
    this.$store.dispatch('testAction','通过actions来改变数据！',{root:true})
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
