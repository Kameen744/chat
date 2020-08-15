import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

import Vue from "vue";
import App from "./App.vue";
import ToolBar from './components/layouts/Toolbar.vue';
import router from "./router";
import store from "./store";
import "./registerServiceWorker";

import VueOnsen from 'vue-onsenui';
import moment from 'moment';

import VueSocketIOExt from 'vue-socket.io-extended';
import io from 'socket.io-client';

Vue.use(VueOnsen);

// const socket = io('http://localhost:8081');
const socket = io('ws://chat.vms.ng');

Vue.use(VueSocketIOExt, socket);

Vue.filter('mDate', (date) => {
  let since = moment(date);
  let now = moment();
  return since.from(now);
});
Vue.filter('mTime', (date) => {
  return moment(date).format('LT');
});

Vue.config.productionTip = false;

Vue.component('tool-bar', ToolBar);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");