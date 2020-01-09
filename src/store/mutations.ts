import {MutationTree} from 'vuex'
const mutations:MutationTree<any> = {
    // 测试代码
  'sanmao'(state:any,data:any):void{
    state.tests = data;
  },
    // 测试代码
  'testActions'(state:any,data:any):void {
    state.acts = data;
  },


  setUser(state, info) {
    state.userInfo = info;
  },
  setHomeList(state, list) {
    state.homeList = list;
  },
  setHomeBanner(state, list) {
    state.homeBanner = list;
  },
  setHomeCate(state, list) {
    state.homeCate = list;
  },
  setPageLoad(state, load) {
    setTimeout(() => {
      state.pageLoad = load;
    }, 1e3);
  },
  setCenterOrder(state, order) {
    state.center.order = order;
  },
  setCartList(state, list) {
    state.cart.list = list;
  },
  setCartManageState(state, manageState) {
    state.cart.manageState = manageState;
  },
  setCartAmount(state, amount) {
    state.cart.amount = amount;
  },
  setGoodsDetail(state, detail) {
    state.goodsDetail = detail;
  },
}
export default mutations;
