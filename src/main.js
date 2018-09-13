// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import lang from 'element-ui/lib/locale/lang/en';
import locale from 'element-ui/lib/locale';
import axios from 'axios';
import VueAxios from 'vue-axios';
import App from './App';
import routes from './router';
import './assets/scss/main.scss';

locale.use(lang);
Vue.config.productionTip = false;

Vue.router = new VueRouter({
  routes,
});

Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.use(VueAxios, axios);

App.router = Vue.router;
new Vue(App).$mount('#app');
