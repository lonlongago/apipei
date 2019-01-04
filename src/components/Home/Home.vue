<template>
    <div class="life_home">
    	<scroller :on-infinite="infinite">
	    	<!-- 轮播图 -->
	    	<div class="idxBanner">
				<div class="swiper-container" ref="idxBanner">
			        <div class="swiper-wrapper">
			            <div class="swiper-slide" v-for="item in advs"><a :href="item.link" :style="'background-image: url('+ item.thumb +');'" alt="123"></a></div>
			        </div>
			        <div class="swiper-pagination"></div>
			    </div>
				<!-- 头部搜索与定位 -->
		    	<div class="topSearch" ref="topSearch">
		    		<!-- <div class="city" @click="gocity">{{city}}<i class="ico"></i></div> -->
		    		<div class="input" @click="gotoList" style="margin-left: 15px;"><input type="text" name="" placeholder="请输入关键字" disabled="disabled"></div>
		    	</div>
		    </div>
		    <!--分类菜单-->
		    <div class="cateNav">
		    	<div class="swiper-container" ref="cateNav">
			        <div class="swiper-wrapper">
			            <div class="swiper-slide" v-for="(li,key) in catearr">
			                <ul>
			                    <li v-for="(item,index) in cates" v-if="index < (key+1)*8 && index >= key*8" @click="gotoList(item)">
		                            <img :src="item.icon">
		                            <p>{{item.title}}</p>
			                    </li>
			                </ul>
			            </div>
			        </div>
			        <!-- 如果需要分页器 -->
			        <div class="swiper-pagination" v-if="catearr.length > 1"></div>
			    </div>
		    </div>
		    <!--广告位-->
		    <div class="advLong" @click="tagAdvlong(advLong.link)"><img :src="advLong.thumb"></div>
		    <!--列表-->
		    <v-listinfor :lists="infors" class="mt10"></v-listinfor>
	    </scroller>	
    	<!-- 底部导航 -->
		<v-footer :footerIdx="0"></v-footer>
		<!--提示框-->
		<v-tips :isshow="tipshow" :tips="tips"></v-tips>
    </div>
</template>

<script type="text/javascript">
	import vFooter from "../../template/Footer/Footer"
	import vListinfor from "../../template/Listinfor/Listinfor"
	import vTips from "../../template/tip"
	import api from "../../api/api"
	export default {
		data () {
			return {
				tipshow:false,
				tips:'',
				city:'',
				advs:[],
				cates:[],
				advLong:{},
				infors:[],
				page:1,
				refresh:true,
				mySwiper1:{},
				mySwiper2:{},
			}
		},
		components:{vFooter,vListinfor,vTips},
		created(){
			//初始化渲染数据
			this.initData(1);
		},
		mounted(){
			//分享
            var link = window.location.href;
            var title = document.title;
            var content = "";
            var imageurl = "";
            var hideqq = 0;
            //APP分享
            api.showshare(link, title, content, imageurl,hideqq);
		},
		computed:{
			// 计算分类菜单页数
			catearr(){
				var arr = [],len = this.cates.length;
		        for(var i=0;i<(len/8);i++){
		            arr.push(i);
		        };
		        // console.log("arr",arr);
		        return arr;
			}
		},
		methods:{
			//初始化Swiper
			swiperInit(){
				// 轮播图
				this.mySwiper1 = new Swiper ('.idxBanner .swiper-container', {
			        autoplay: true,//可选选项，自动滑动
			        loop : true,
			        pagination: {
					    el: '.idxBanner .swiper-pagination',
					}
			    });
			    // 分类菜单
				this.mySwiper2 = new Swiper ('.idxBanner .swiper-container', {
			        autoplay: false,//可选选项，自动滑动
			        pagination: {
					    el: '.cateNav .swiper-pagination',
					}
			    });	
			},
			//请求数据
			initData(setpage){
				var that = this;
				var page = setpage ? setpage : that.page;
				api.index({"page":page},function(res){
					// console.log(res.data.life_items);
					if(res.error == "0"){
						if(setpage){
							that.city = res.data.city.city_name;
							that.cates = res.data.cate_items;
							that.advs = res.data.slide_items;
							that.advLong = res.data.adv;
							that.infors = res.data.life_items;
							that.$nextTick(function () {
					            that.swiperInit()
					        });				  
						}else{
							if(res.data.life_items.length > 0){
								if(res.data.life_items.length < 10){
										that.refresh = false;
									};
								if(page > 1){
									that.infors = that.infors.concat(res.data.life_items);
								};
								that.page = page + 1;
							}else{
								that.refresh = false;
							};
						};
					};
				});
			},
			//分类导航去列表页
			gotoList(e){
				var url='/life/inforlist'
				this.$router.push({path:url,query:{"cate_id":e.cate_id,"cate_name":e.title}});
			},
			//去城市切换页面
			gocity(){
            	api.rebackUrl('/city');
            },
            //轮播图连接
            
            //广告位连接
            tagAdvlong(e){
            	window.location.href = e;
            },
			//上拉加载
			infinite(done){
				var that = this;	
				that.initData();
				if(that.refresh){
					setTimeout(() => {
			          	done();
			        }, 1500);	
				}else{
					setTimeout(() => {
			          	done(true);
			        }, 1500);
				};	
			}
		}
	}
</script>
<style type="text/css">
	.life_home{padding-bottom:50px; position: relative; height: calc(100% - 50px);}
	.life_home .topSearch{background:#fff; height:40px; width:90%; position:absolute; z-index: 999; left:5%; top:6px; border-radius:2px; box-shadow:0 1px 3px #ccc; overflow:hidden; -webkit-transform: translate3d(0,0,0);transform: translate3d(0,0,0);}
	.life_home .topSearch .city{font-size:13px;line-height:40px; width:70px;position:relative;padding-left:10px;float:left;}
	.life_home .topSearch .city .ico{border-left: 4px solid transparent; border-right: 4px solid transparent; border-top: 5px solid #848484;vertical-align:middle; line-height:0; font-size:0;margin-left:4px;}
	.life_home .topSearch .city:after{content:''; height:20px; width:1px; background:#eee;position:absolute;right:0px;top:10px;}
	.life_home .topSearch .input{margin-left:80px;background:url('../../assets/search_ico.png') 0px center no-repeat;background-size:13px 13px;padding-left:20px; height: 40px;}
	.life_home .topSearch .input input{width:100%;height:40px;background:none;border:0;vertical-align:middle;font-size:13px;line-height:40px;}
	.life_home .idxBanner{width: 100%; background:#fff; position: relative; z-index: 0;}
	.life_home .idxBanner .swiper-wrapper{-webkit-align-items: center;align-items: center;}
	.life_home .idxBanner .swiper-wrapper .swiper-slide{width: 100%;}
	.life_home .idxBanner .swiper-wrapper .swiper-slide a{display: block;width: 100%; padding: 28% 0; height: 0; background-position: center; background-repeat: no-repeat; background-size: cover; background-color: #f7f7f7;}
	.life_home .idxBanner .swiper-pagination{bottom: 4px}
	.life_home .idxBanner .swiper-pagination .swiper-pagination-bullet{background:#fff;width:8px;height:8px;border-radius:100%;opacity:0.8;}
	.life_home .idxBanner .swiper-pagination .swiper-pagination-bullet-active{opacity:1;}
	.life_home .cateNav .swiper-container{background: #fff;padding: 10px 0;}
	.life_home .cateNav .swiper-container .swiper-pagination{bottom: 4px}
	.life_home .cateNav .swiper-container .swiper-pagination .swiper-pagination-bullet{background: #637284;width: 6px;height: 6px;border-radius: 6px;}
	.life_home .cateNav .swiper-container .swiper-pagination .swiper-pagination-bullet-active{background-image: linear-gradient(-90deg, #73E966 0%, #1CD9AA 100%);width: 12px;}
	.life_home .cateNav ul{display: block;overflow: hidden;}
	.life_home .cateNav ul li{width: 25%;text-align: center;float: left;margin-bottom: 10px;}
	.life_home .cateNav ul li img{width: 50px;height: 50px;}
	.life_home .cateNav ul li p{font-size: 12px;line-height: 20px;color: #333;margin-top: 6px;}
	.life_home .advLong{background:#ffffff;padding:10px;}
	.life_home .advLong img{width:100%;}
	.scrollerBox{position: relative;}
</style>