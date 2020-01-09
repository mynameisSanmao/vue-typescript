
import { Commit } from 'vuex';
const state:any = {
  data1:'我是命名空间的vuex 模块!!!'
}
const mutations:any = {
  getVuexData(state:any,name:any) {
    console.log(state,'ss',name)
    state.data1 = name
  }
}
const actions :any = {
  setActionsData(context,data) {
    context.commit('getVuexData',data)
    context.dispatch('setDispatch')
    console.log(context,'p')
  },
  setDispatch() {
    console.log("dispatch调用")
  }
}
export default {
  namespaced:true,
  state,
  mutations,
  actions
}
