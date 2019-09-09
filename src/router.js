import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import axios from 'axios';
import BootstrapVue from 'bootstrap-vue';
import ElementsUI from 'element-ui';
import { Loading } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueDataTables from 'vue-data-tables';

Vue.use(BootstrapVue);
Vue.use(ElementsUI, Loading);
Vue.use(VueDataTables);

axios.defaults.baseURL = 'http://www.json-generator.com/api/json/get/cqTLgTOwde?indent=2';
Vue.prototype.$http = axios;

// set language to EN
import lang from 'element-ui/lib/locale/lang/en';
import locale from 'element-ui/lib/locale';

locale.use(lang);
Vue.config.productionTip = false;

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: function () { 
        return import(/* webpackChunkName: "about" */ './views/About.vue')
      }
    }
  ]
})
