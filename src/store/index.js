import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

var state={
}
export default new Vuex.Store({
	state,
	mutations,
	actions,
	getters
})