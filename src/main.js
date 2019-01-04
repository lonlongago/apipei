// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import VueScroller from 'vue-scroller'
import lrz from 'lrz'
import Vuex from 'vuex'

//使用VueScroller
Vue.use(VueScroller);

//使用Vuex
Vue.use(Vuex);
const store = new Vuex.Store({
	state: {
		fabu: {
			'ppkp':11555
		}
	},
	mutations: {
		tapAddr (state) {
		  
		}
	},
	actions: {
		
	},
	getters: {}
});

// 使用fastclick
// fastclick.attach(document.body)

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store:store,
  components: { App },
  template: '<App/>'
});
