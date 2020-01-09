import {ActionTree} from 'vuex'
import { API } from '@/global/api';
import axios from '@/global/axios';

const actions:ActionTree<any,any> = {
    // 测试代码
   'testAction'({commit},data:any){
    commit('testActions',data)
  },
  initUserInfo(context) {
    if (context.state.userInfo.id !== 0) {
      return !1;
    }
    axios.get(API.user, {}).then((response: any) => {
      context.commit('setUser', response.data);
    });
  },
  initHomePage(context) {
    if (context.state.homeList.length === 0) {
      axios.get(API.goodsList, {}).then((response: any) => {
        context.commit('setHomeList', response.data);
      });
    }
    if (context.state.homeCate.length === 0) {
      axios.get(API.cate, {}).then((response: any) => {
        context.commit('setHomeCate', response.data);
      });
    }
    if (context.state.homeBanner.length === 0) {
      axios.get(API.banner, {}).then((response: any) => {
        context.commit('setHomeBanner', response.data);
      });
    }
    context.commit('setPageLoad', !1);
  },
  initCenterPage(context) {
    axios.get(API.centerOrder, {}).then((response: any) => {
      context.commit('setCenterOrder', response.data);
    });
    context.commit('setPageLoad', !1);
  },
  updateUserAvatar(context, upload) {
    const data = new FormData();
    const config = {
      headers: {
         'content-type': 'application/x-www-form-urlencoded',
      },
    };
    data.append('file', upload.file);
    const newAxios = axios.create();
    console.log(data,'data')
    newAxios.post(API.userAvatar, data, config).then((response: any) => {
      console.log('success');
      const info = context.state.userInfo;
      info.avatar = upload.url;
      context.commit('setUser', info);
    }).catch(() => {
      console.log('error');
      const info = context.state.userInfo;
      info.avatar = upload.url;
      console.log(info,'errinfo')
      context.commit('setUser', info);
    });
  },
  initCartPage(context, reset) {
    if (context.state.cart.list.length === 0 || reset) {
      axios.get(API.cart, {}).then((response: any) => {
        const data = response.data;
        for (const item of data) {
          item.add = !1;
        }
        context.commit('setCartList', data);
      });
    }
    context.commit('setPageLoad', !1);
  },
  updateCartPage(context, updata) {
    const update = updata.update;
    const list = updata.list;
    axios.get(API.updateCart, { params: update }).then((response: any) => {
      console.log('success');
      const data = response.data;
      if (data.status && list) {
        context.commit('setCartList', list);
      } else if (!data.status) {
        context.dispatch('initCartPage', true);
      }
    }).catch(() => {
      console.log('error');
      context.commit('setCartList', list);
    });
  },
  initGoodsDetail(context, gid) {
    axios.get(API.goodsDetail, { params: { gid } }).then((response: any) => {
      context.commit('setGoodsDetail', response.data);
    });
    context.commit('setPageLoad', !1);
  },
}
export default actions;
