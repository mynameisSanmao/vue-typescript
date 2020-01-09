<template>
  <div class="goods-detail">
    <div id="header" :style="opacity">
      <ul class="flex-box align-top">
        <li class="tl">
          <span class="icon-back" @click="back"></span>
        </li>
        <li class="flex-item-6">
          <!-- 标签 -->
          <ul class="flex-box align-top tab-head tc" :style="opacityMenu">
            <li>
              <span :class="{ active: tabIndex === 0 }" @click="tabChecked(0)">宝贝</span>
            </li>
            <li>
              <span :class="{ active: tabIndex === 1 }" @click="tabChecked(1)">评论</span>
            </li>
            <li>
              <span :class="{ active: tabIndex === 2 }" @click="tabChecked(2)">详情</span>
            </li>
          </ul>
        </li>
        <li class="tr">
          <span class="icon-share" @click="share"></span>
        </li>
      </ul>
    </div>
    <div class="tab">
      <div class="tab-cont">
        <Params />
        <Comments ref="comments" />
        <Detail ref="detail" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component,Vue,Prop, Watch} from 'vue-property-decorator'
import Params from './Params.vue';
import Comments from './Comments.vue';
import Detail from './Detail.vue';

@Component({
  components:{
    Params,
    Comments,
    Detail
  }
})
export default class GoodsContent extends Vue{
  @Prop() public scrollTop!: number;
  // data
  private tabIndex:number = 0; // ['宝贝','评论','详情']标签 切换
  private offset: number[] = []; // [] 存放宝贝、评论、详情标签的offsetTop
  private opacity:string ='' ; //  title 显示隐藏动画；控制title的背景色
  private opacityMenu:string = 'opacity: 0;display:none;'; //  标签动画 ，先隐藏标签
  private timer:any = null; // 延时器

  // 清除延时器
  private destroyed() {
    if(this.timer) {
      clearTimeout(this.timer);
    }
  }
  // watch
  @Watch('scrollTop')
  public changeScroll() {
    const top = this.scrollTop > 250 ? 250 : this.scrollTop;
    let opacity = (top / 250).toFixed(2);
    let bx = 'box-shadow: 0 0 8px 0 rgba(0,0,0,.2);'
    const parentHeight = 42; // class 'goods-detail' 的高度；
    if(this.load && this.offset.length === 0) {
      this.offset.push(0);
      this.timer = setTimeout(() => {
        this.offset.push(this.$refs.comments.$el.offsetTop - parentHeight);
        this.offset.push(this.$refs.detail.$el.offsetTop - parentHeight);
      }, 1e2);
    }
    if (this.offset.length) {
      if (this.scrollTop > this.offset[2]) {
        this.tabIndex = 2;
      } else if (this.scrollTop > this.offset[1]) {
        this.tabIndex = 1;
      } else {
        this.tabIndex = 0;
      }
    }
    if (top === 0) {
      opacity = '0; display: none';
      bx = 'box-shadow: none';
    }
    const bg = 'rgba(255, 255, 255, ' + opacity.split(';')[0] + ')';
    this.opacity = 'background-color: ' + bg +';' + bx;
    this.opacityMenu = 'opacity: ' + opacity;
  }

  // computed
  get load() {
    return this.$store.state.goodsDetail.comments.length > 0;
  }

  // methods
    // 返回上一个页面
  private back () {
    this.$router.back()
  }
    // 分享事件
  private share () {

  }
    // 切换标签
  private tabChecked(tab:number) {
    if (this.offset.length > 0) {
      let top = this.offset[tab];
      if (top !== 0) {
        top ++;
      }
      this.$parent.$el.scrollTop = top;
    }
    this.tabIndex = tab;
  }

}
</script>

<style lang="less" scoped>
#header{
  height: 42px;
  width: 100%;
  position: fixed;
  left: 0;
  z-index: 2;
  top: 0;
  overflow: hidden;
  li{
    height: 42px;
  }
  span{
    display: inline-block;
    width: 42px;
    height: 22px;
    line-height: 22px;
    padding: 10px 0;
    cursor: pointer;
  }
  .tab-head{
    height: 42px;
    line-height: 42px;
    font-size: 14px;
    color: #666;
    span{
      width: 100%;
      &.active{
        color: rgb(233, 127, 127);
      }
    }
  }
}
</style>
