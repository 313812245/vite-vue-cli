import Vue from 'vue';
import App from '@/App.vue';
import router from './router';
import '@/plugins/element.js';
import SvgIcon from '@/components/SvgIcon/index.vue';

Vue.component('SvgIcon', SvgIcon);
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  router,
  beforeCreate() {
    Vue.prototype.bus = this;
  },
}).$mount('#app');
