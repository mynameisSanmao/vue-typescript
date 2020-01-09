<template>
  <div id="content">
    <div class="clearfix head">
      <div class="pull-left user-info-left">
        <label for="upload" class="avatar">
          <img :src="$store.state.baseUrl+userInfo.avatar" alt="">
          <!-- <input ref="upload" type="file" id="upload" class="hide" accept="image/*" @change="editAvatar" > -->
        </label>
      </div>
      <div class="pull-right user-info-right">
        <p class="name">{{ userInfo.name }}</p>
        <p class="integral">会员积分: {{ userInfo.integral }}</p>
        <p class="level">会员等级: {{ userInfo.level }}</p>
        <span class="news icon-news" @click="showNews"></span>
        <span class="setting icon-setting" @click="showSetting"></span>
      </div>
    </div>
    <UserCenterCards />
    <!-- <router-view ></router-view> -->
  </div>
</template>

<script lang="ts">
import UserCenterCards from '@/components/userCenter/Cards.vue'

import { Component, Vue } from 'vue-property-decorator';
@Component({
  components:{
    UserCenterCards
  }
})  // 不加这个，this获取不到
export default class UserCenterIndex extends Vue {
  // data
  private uploadimg: string = '';
  // methods
  private showNews() {
    console.log('news');
  }
  private showSetting() {
    console.log('setting');
    this.$router.push('/center/setting');
  }
  public editAvatar() {

    const file = this.$refs.upload.files[0];
    console.log(file,'this.$refs.upload')
    if (file) {
      const URL = window.URL || window.webkitURL;
      const imageURL = URL.createObjectURL(file);
      const upload = {
        file,
        url: imageURL,
      };
      console.log(upload,'upload')
      this.$store.dispatch('updateUserAvatar', upload);
    }
  }
  get userInfo() {
    return this.$store.state.userInfo;
  }
}
</script>

<style lang="less" scoped>
#content{
  top: 0;
  bottom: 42px;
  position: absolute;
  left: 0;
  width: 100%;
  z-index: 1;
  overflow: auto;
  .head{
    padding: 4% 15px 18%;
    background: #ff5a0c;
    margin-bottom: -15%;
    color: #fff;
    .user-info-left{
      width: 60px;
      height: 60px;
      .avatar,.avatar img{
        border-radius: 50%;
        overflow: hidden;
        width: 60px;
        height: 60px;
      }
    }
    .user-info-right{
      position: relative;
      width: calc(100% - 70px);
      height: 60px;
      .name{
        font-size: 18px;
        line-height: 28px;
      }
      .level,
      .integral{
        font-size: 12px;
        line-height: 16px;
      }
      .setting{
        position: absolute;
        right: 0;
        top: 0;
        width: 20px;
        height: 20px;
      }
      .news{
        position: absolute;
        right: 30px;
        top: 0;
        width: 20px;
        height: 20px;
      }
    }
  }
}
</style>
