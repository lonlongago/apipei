<template>
    <div class="life_list">
    	<!-- 头部搜索与定位 -->
    	<div class="topSearch pub_list">
    		<div class="input pub_list_bd">
    			<input type="text" name="" placeholder="请输入关键字" v-model="keyword" @focus="focus" @blur="blur">
    		</div>
    		<div class="btn" v-if="inpfocus" @click="search">确定</div>
    	</div>
    	<!--头部下拉-->
    	<div class="topFilter">
    		<div :class="['list',{on:topFilteridx == 0}]" @click="tapFilter(0)">{{area_name}}<i class="ico"></i></div>
    		<div :class="['list',{on:topFilteridx == 1}]" @click="tapFilter(1)">{{cate_name}}<i class="ico"></i></div>
    		<div :class="['list',{on:topFilteridx == 2}]" @click="tapFilter(2)">{{orderby_name}}<i class="ico"></i></div>
    	</div>
    	<div class="topFilter_box" :class="{show:topFilteridx!=null}">
    		<div class="change_box" v-show="topFilteridx == 0 ? true : false">
    			<ul>
    				<li :class="{on:area_id == null}" @click="select(null,'area_id')">不限</li>
    				<li v-for="item in area_list" :class="{on:area_id == item.area_id}" @click="select(item,'area_id')">{{item.area_name}}</li>
    			</ul>
    		</div>
    		<div class="change_box" v-show="topFilteridx == 1 ? true : false">
    			<ul>
    				<li :class="{on:cate_id == null}" @click="select(null,'cate_id')">不限</li>
    				<li v-for="item in cate_list" :class="{on:cate_id == item.cate_id}" @click="select(item,'cate_id')">{{item.title}}</li>
    			</ul>
    		</div>
    		<div class="change_box" v-show="topFilteridx == 2 ? true : false">
    			<ul>
    				<li :class="{on:orderby_idx == null}" @click="select(null,'orderby')">不限</li>
    				<li v-for="(item,idx) in orderbys" :class="{on:orderby_idx == idx}" @click="select(idx,'orderby')">{{item.title}}</li>
    			</ul>
    		</div>
    	</div>
    	<div class="mask_bg" style="z-index: 98" v-show="topFilteridx != null ? true : false" @click="hide"></div>
	    <!--列表-->
	    <template v-if="(infors && infors.length > 0) ? true : false">
		    <scroller :on-infinite="infinite" >
				<v-listinfor :lists="infors" class="mt10"></v-listinfor>
			</scroller>	
	    </template>
		<v-nodata :nodatashow="(infors && infors.length > 0) ? false : true" :title="'暂无数据'"></v-nodata>
    </div>
</template>

<script type="text/javascript">
	import vListinfor from "../../template/Listinfor/Listinfor"
	import api from "../../api/api"
	import vNodata from "../../template/nodata"
	export default {
		data () {
			return {
				infors:[],
				area_list:[],
				area_id:null,
				area_name:'不限',
				cate_list:[],
				cate_id:null,
				cate_name:'分类',
				orderbys:[],
				orderby_idx:null,
				orderby_name:'排序',
				topFilteridx:null,
				page:1,
				title:'',
				inpfocus:false,
				keyword:'',
				refresh:true
			}
		},
		components:{vListinfor,vNodata},
		created(){
			if(this.$route.query.cate_name){
				var cate_id = this.$route.query.cate_id,
					cate_name = this.$route.query.cate_name;
				this.cate_id = cate_id;
				this.cate_name = cate_name;
			};
			//分享
            var link = window.location.href;
            var title = document.title;
            var content = "";
            var imageurl = "";
            var hideqq = 0;
            //APP分享
            api.showshare(link, title, content, imageurl,hideqq);
			this.initData(1);
		},
		methods:{
			//数据请求
			initData(setpage){
				var that = this;
				var params = {
					'page':setpage ? setpage : that.page,
					'area_id':that.area_id,
					'cate_id':that.cate_id,
					'orderby':that.orderby_idx != null ? that.orderbys[that.orderby_idx].orderby : '',
					'title':that.title
				};
				api.lifeList(params,function(res){
					// console.log(res);
					if(res.error == "0"){
						if(setpage){
							that.page = 1;
							that.infors = res.data.items;
							that.area_list = res.data.area_list;
							that.cate_list = res.data.cate_list;
							that.orderbys = res.data.orderby;
						}else{
							if(res.data.items.length > 0){
								if(res.data.items.length < 10){
									that.refresh = false;
								};
								if(params.page > 1){
									that.infors = that.infors.concat(res.data.items);
								};
								that.page = params.page + 1;
								// console.log(that.page);
								// console.log(res.data.items);
							}else{
								that.refresh = false;
							};
						};
					};
				});
			},
			//下拉筛选
			tapFilter(e){
				var topFilteridx = this.topFilteridx;
				if(topFilteridx == e){
					this.topFilteridx = null;
				}else{
					this.topFilteridx = e;
				};
			},
			select(e,type){
				console.log(e,type);
				if(e != null){
					if(type == 'area_id'){
						this.area_name =  e.area_name;
						this.area_id = e.area_id;
					}else if(type == 'cate_id'){
						this.cate_id = e.cate_id;
						this.cate_name =  e.title;
					}else if(type == 'orderby'){
						this.orderby_idx = e;
						this.orderby_name =  this.orderbys[e].title;
					};
				}else{
					if(type == 'area_id'){
						this.area_name =  '不限';
						this.area_id = e;
					}else if(type == 'cate_id'){
						this.cate_name = '分类';
						this.cate_id =  e;
					}else if(type == 'orderby'){
						this.orderby_name = '排序';
						this.orderby_idx = e;
					};
				};
				this.topFilteridx = null;
				this.initData(1);
			},
			hide(){
				this.topFilteridx = null;
			},
			//搜索
			search(){
				this.title = this.keyword;
				// this.keyword = '';
				this.initData(1);
			},
			focus(){
				this.inpfocus = true;
			},
			blur(e){
				if(this.keyword.length == 0){
					this.inpfocus = false
				}else{
					this.inpfocus = true
				}
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
	.life_list{position: relative; height: calc(100% - 90px); top: 90px; left: 0;}
	.life_list .topSearch{background:#fff; height:46px; width:100%; border-bottom:1px solid #e6e6e6;padding:8px 10px;position:fixed;z-index:100;left:0;top:0; overflow:hidden;}
	.life_list .topSearch .input{border-radius:2px;background:#f0f0f1 url('../../assets/search_ico.png') 10px center no-repeat;background-size:13px 13px;padding-left:30px;}
	.life_list .topSearch .input input{width:100%;height:30px;background:none;border: 0;vertical-align:middle;font-size:13px;line-height:30px;}
	.life_list .topSearch .btn{width:50px;height:28px;background:#fc6723;font-size:13px;line-height:28px; color: #fff; text-align: center; border-radius: 2px; margin-left: 8px;}
	.life_list .topFilter{background:#fff;border-bottom:1px solid #e6e6e6; height:44px; width:100%; position:fixed; z-index:100; left:0; top:46px;overflow:hidden;}
	.life_list .topFilter .list{float:left; text-align:center; font-size:13px; line-height:20px; padding:10px 0; width:33.33%;}
	.life_list .topFilter .list .ico{border-left: 5px solid transparent; border-right: 5px solid transparent; border-top: 5px solid #999; margin-left: 4px; font-size: 0; line-height: 0;}
	.life_list .topFilter .list.on{color:#fc6723;}
	.life_list .topFilter .list.on .ico{border-top: 0;border-bottom: 5px solid #fc6723;vertical-align:middle;}
	.life_list .topFilter_box{position:fixed;width:100%; z-index:99; left:0; top:90px; transform: translate(0,-100%); transition:all 0.3s ease;max-height:50%; overflow-y:auto;}
	.life_list .topFilter_box.show{transform: translate(0,0%);}
	.life_list .topFilter_box ul li{background:#fff; line-height:44px; font-size:14px; text-align:center;}
	.life_list .topFilter_box ul li.on{color:#fc6723; background: #f6f6f6;}
</style>