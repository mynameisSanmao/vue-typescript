import Vue from "vue";
import Vuex from "vuex";
import state from './state';
import mutations from './mutations';
import actions from './actions';

const modulesFiles = require.context('./modules', true, /\.ts$/);
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
    const value = modulesFiles(modulePath)
    modules[moduleName] = value.default
    return modules
}, {})
Vue.use(Vuex);

export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules
});
