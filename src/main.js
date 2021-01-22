import Vue from 'vue'
import App from './App.vue'
import IsMobile from './isMobile'
import helpers from "./helpers"
import eventClass from "./eventClass"
import VueCompositionAPI from '@vue/composition-api'
import axios from 'axios'
import VueAxios from 'vue-axios'
import "./assets/less/imports.less";



Vue.use(VueAxios, axios)
Vue.use(IsMobile)
Vue.use(VueCompositionAPI)
Vue.config.productionTip = false
Vue.mixin(helpers)
Vue.prototype.$Event = new eventClass(Vue);

new Vue({
  render: h => h(App),
}).$mount('#app')
