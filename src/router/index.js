import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home/Home'
import Fabu from '../components/Fabu/Fabu'
import Fabucates from '../components/Fabu/Cates'
import Addrsearch from '../components/Fabu/Addrsearch'
import Post from '../components/Post/Post'
import Totop from '../components/Totop/Totop'
import Inforlist from '../components/Infor/Inforlist'
import Infordetail from '../components/Infor/Infordetail'
import Describe from '../components/Describe/Describe'
import Payment from '../components/Payment/Payment'

Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [
	    {
	      path:'*',
	      redirect:'/life/home'
	    },
	    {
	      path: '/life/home',
	      component: Home
	    },
	    {
	      path: '/life/inforlist',
	      component: Inforlist
	    },
	    {
	      path: '/life/infordetail',
	      component: Infordetail
	    },
	    {
	      path: '/life/describe',
	      component: Describe
	    },
	    {
	    	path: '/life/fabucates',
	    	component:Fabucates
	    },
	    {
	    	path: '/life/fabu',
	    	component:Fabu
	    },
	    {
	    	path: '/life/addrsearch',
	    	component:Addrsearch
	    },
	    {
	    	path: '/life/post',
	    	component:Post
	    },
	    {
	    	path: '/life/totop',
	    	component:Totop
	    },
	    {
	    	path: '/life/payment',
	    	component:Payment
	    }
	]
})
