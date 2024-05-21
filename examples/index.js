import 'babel-polyfill';
import Vue from 'vue';
import App from './App.vue';
import Antd from 'venus-design-ui';
import 'venus-design-ui/style.js';

Vue.use(Antd);

new Vue({
  el: '#app',
  render: h => h(App),
});
