import Vue from 'vue';
import App from './App';
import uView from 'uview-ui';
import * as filters from './filters/index'; // 过滤器

Vue.config.productionTip = false;
Vue.use(uView);
// 过滤器
Object.keys(filters).forEach(e => {
	Vue.filter(e, filters[e]);
});
App.mpType = 'app';

const app = new Vue({
	...App
});
app.$mount();
