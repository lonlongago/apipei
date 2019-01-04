<template>
    <div class="life_post">
		<div class="topSwitch">
			<div :class="['list',{on:switchIdx == 0}]" @click="tapSwitch(0)">我的帖子</div>
			<div :class="['list',{on:switchIdx == 1}]" @click="tapSwitch(1)">我的收藏</div>
		</div>
		<!--列表-->
		<template v-if="(posts && posts.length > 0)">
			<scroller :on-infinite="infinite" >
				<v-listpost :lists="posts" :tab='switchIdx' @up="up" @refresh="refrs" @drop="drop" @del="del" @liftPay="liftPay" @again="again" class="mt10"></v-listpost>
			</scroller>	
		</template>
		<v-nodata :nodatashow="(posts && !(posts.length > 0))" :title="'暂无数据'"></v-nodata>
		<!-- 底部导航 -->
		<v-footer :footerIdx="2"></v-footer>
		<!--提示框-->
		<v-tips :isshow="tipshow" :tips="tips"></v-tips>
		<v-askpopup :askpopup="askpopup" @cancel="akspopupCancel" @confirm="akspopupConfirm"></v-askpopup>
    </div>
</template>

<script type="text/javascript">
	import vTips from "../../template/tip"
	import vAskpopup from "../../template/askpopup"
	import api from "../../api/api"
	import vFooter from "../../template/Footer/Footer"
	import vListpost from "../../template/Listpost/Listpost"
	import vNodata from "../../template/nodata"
	export default {
		data () {
			return {
				tipshow:false,
				tips:'',
				askpopup:{
					title:'提示',
					tips:'',
					show:false
				},
				posts:[],
				switchIdx:0,
				page:1,
				optLifeId:'',
				optObj:'',
				order_id:'',
				refresh:true
			}
		},
		components:{vTips,vAskpopup,vFooter,vListpost,vNodata},
		created(){
			//初始化渲染数据
			this.initData(1);
			// this.initDataTwo(1);
		},
		methods:{
			//头部切换
			tapSwitch(idx){
				this.switchIdx = idx;
				this.page = 1;
				this.refresh = true;
				this.initData(1);
			},
			//请求数据
			initData(setpage){
				var that = this;
				var page = setpage ? setpage : that.page;
				if(that.switchIdx == '0'){
					api.lifeMineList({"page":page},function(res){						
						if(res.error == "0"){
							if(setpage){
								that.posts = res.data.items;
							}else{
								if(res.data.items.length > 0){
									if(res.data.items.length < 10){
										that.refresh = false;
									};
									if(page > 1){
										that.posts = that.posts.concat(res.data.items);
									};
									that.page = page + 1;
								}else{
									that.refresh = false;
								};
							};
						};
					});
				}else if(that.switchIdx == '1'){
					api.lifeCollectList({"page":page},function(res){
						if(res.error == "0"){
							if(setpage){
								that.posts = res.data.items;
							}else{
								if(res.data.items.length > 0){
									if(res.data.items.length < 10){
										that.refresh = false;
									};
									if(page > 1){
										that.posts = that.posts.concat(res.data.items);
									};
									that.page = page + 1;
								}else{
									that.refresh = false;
								};
							};
						};
					});
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
			},
			//去支付
			liftPay(e){
				this.$router.push({path:'/life/payment',query:{order_id:e}});
			},
			//重发布
			again(e){
				this.$router.push({path:'/life/fabu',query:{life_id:e,'again':true}});
			},
			//上架
            up(e){
            	var that = this;
                api.lifeUp({life_id:e},function(res){
            		if(res.error == "0"){
            			api.tipload(that,"上架成功~");
            			that.page = 1;
            			that.initData(1);
            		};
            	});
            },
            //下架
            drop(e){
            	var that = this;
            	api.lifeDrop({life_id:e},function(res){
            		if(res.error == "0"){
            			if(res.data){
            				that.optLifeId = e;
			                that.optObj = "drop";
			                that.askpopup.show = true;
			                that.askpopup.tips = res.data.warning;
            			}else{
            				api.tipload(that,"下架成功~");
	            			that.page = 1;
	            			that.initData(1);
            			};
            		};
            	});
            },
            //删除
            del(e){
                this.optLifeId = e;
                this.optObj = "del";
                this.askpopup.show = true;
                this.askpopup.tips = "选择删除，信息将被删除，是否确认？"
            },
            //刷新
            refrs(e){
                var that = this;
                api.lifeRefresh({life_id:e.life_id},function(res){
                	if(res.error == "0"){
                		if(res.data.needpay == 0){
                			api.tipload(that,"刷新成功~");
                		}else{
                			that.optLifeId = e.life_id;
                			that.order_id = res.data.order_id;
                			that.optObj = "refrs";
                			that.askpopup.show = true;
                			that.askpopup.tips = "刷新需支付￥" + res.data.needpay + "，确定支付？"
                		};
                	};
                });
            },
            akspopupCancel(){
            	this.askpopup.show = false;
            },
            akspopupConfirm(){
            	this.askpopup.show = false;
            	var that = this,optObj = that.optObj;
            	if(optObj == "del"){
            		api.lifeDelete({life_id:that.optLifeId},function(res){
	            		if(res.error == "0"){
	            			api.tipload(that,"删除成功~");
	            			that.page = 1;
	            			that.initData(1);
	            		};
	            	});
            	}else if(optObj == "refrs"){
            		// console.log("that.order_id",that.order_id);
            		that.$router.push({path:'/life/payment',query:{order_id:that.order_id}});
            	}else if(optObj == "drop"){
            		api.lifeDrop({life_id:that.optLifeId,sure:1},function(res){
	            		if(res.error == "0"){
	            			api.tipload(that,"下架成功~");
	            			that.page = 1;
	            			that.initData(1);
	            		};
	            	});
            	};
            }
		}
	}
</script>

<style type="text/css">
.life_post{height: calc(100% - 94px); position: relative; top:44px; left: 0; width: 100%; box-sizing:border-box;}
.topSwitch{ position: fixed; left: 0; top: 0; width: 100%; background: #fff; height: 44px; -webkit-box-shadow: 0 -1px 0 #e6e6e6 inset; box-shadow: 0 -1px 0 #e6e6e6 inset; text-align: center; display: -webkit-box; display: -ms-flexbox; display: flex; padding: 10px 0; z-index: 10; }
.topSwitch .list{ -webkit-box-flex: 1; -ms-flex: 1; flex: 1; line-height: 24px; border-right: 1px solid #e6e6e6; font-size: 16px; position: relative; }
.topSwitch .list:last-child{ border-right: 0; }
.topSwitch .list.on{ color: #f70; }
.topSwitch .list.on:after{ content: ''; position: absolute; left: 50%; bottom: -9px; width: 70%; margin-left: -35%; height: 2px; background: #f70; }
</style>