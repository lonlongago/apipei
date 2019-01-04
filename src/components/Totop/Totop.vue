<template>
    <div class="life_totop">
		<div class="topSwitch">
			<div :class="['list',{on:switchIdx == 0}]" @click="tapSwitch(0)">推广</div>
			<div :class="['list',{on:switchIdx == 1}]" @click="tapSwitch(1)">置顶</div>
		</div>
		
		<template v-if="switchIdx == 0">
			<div class="tips mb10">
				<img src="../../assets/totop_ico1.png" class="pic">
				<div class="txt">{{detail.lable}}</div>
			</div>
			<div class="time mb10">
				<div class="tit">选择推广时间</div>
				<ul>
					<li :class="{on:index==promotIdx}" @click="tapTime(index)" v-for="(item,index) in tui">{{item.val}}</li>
				</ul>
			</div>
			<div class="intro">
				<ul>
					<li v-for="li in detail.footer"><span>{{li}}</span></li>
				</ul>
			</div>
		</template>
		<template v-if="switchIdx == 1">
			<div class="tips mb10">
				<img src="../../assets/totop_ico2.png" class="pic">
				<div class="txt">{{detail.lable}}</div>
			</div>
			<div class="time mb10">
				<div class="tit">选择置顶时间</div>
				<ul>
					<li :class="{on:index==topIdx}" @click="tapTime(index)" v-for="(item,index) in tui">{{item.val}}</li>
				</ul>
			</div>
			<div class="intro">
				<ul>
					<li v-for="li in detail.footer"><span>{{li}}</span></li>
				</ul>
			</div>
		</template>
		<div class="long_btn_box">
			<button class="long_btn" @click="submit">确认购买</button>
		</div>
		<!--提示框-->
		<v-tips :isshow="tipshow" :tips="tips"></v-tips>
    </div>
</template>

<script type="text/javascript">
	import vTips from "../../template/tip"
	import api from '../../api/api'
	export default {
		data () {
			return {
				tipshow:false,
				tips:'',
				life_id:this.$route.query.life_id, //当前路由所传life_id
				type:"promot", //当前type：promot推广 top置顶
				switchIdx:0,
				detail:{},
				tui:[],
				promotIdx:0,
				topIdx:0,
				id:''
			}
		},
		components:{vTips},
		created(){
			this.initData();
		},
		methods:{
			//请求数据
			initData(){
				var that = this,life_id = that.life_id,type = that.type;
				api.lifePromot({'life_id':life_id,'type':type},function(res){
					// console.log(res);
					if(res.error == "0"){
						that.detail = res.data;
						that.tui = res.data.cfg_list;
					};
				});
			},
			//头部切换
			tapSwitch(idx){
				this.switchIdx = idx;
				if(idx == 1){
					this.type = "top";
				}else{
					this.type = "promot";
				};
				this.initData();
			},
			//选择时间
			tapTime(idx){
				if(this.type == "top"){
					this.topIdx = idx;
				}else{
					this.promotIdx = idx;
				};
			},
			//创建支付单
			submit(){
				var that = this,url = "/life/payment";
				var params = {
					'life_id':that.life_id,
					'type':that.type,
					'id':''
				};
				if(that.type == "top"){
					params.id = that.tui[that.topIdx].id;
				}else{
					params.id = that.tui[that.promotIdx].id;
				};
				// console.log(params);
				api.lifePromotset(params,function(res){
					// console.log(res);
					api.tipload(that,res.message);
					if(res.error == "0"){
						setTimeout(function(){
							that.$router.push({path:url,query:{'order_id':res.data.order_id}});
						},1500);
					};
				});
			}
		}
	}
</script>

<style type="text/css">
	.topSwitch{position:fixed;left:0;top:0;	width:100%;background: #fff;height: 44px;box-shadow: 0 -1px 0 #e6e6e6 inset;text-align: center;display: flex;	padding:10px 0;}
	.topSwitch .list{flex:1;line-height: 24px;border-right: 1px solid #e6e6e6;font-size: 16px;position: relative;}
	.topSwitch .list:last-child{border-right:0;}
	.topSwitch .list.on{color:#f70;}
	.topSwitch .list.on:after{content:'';position: absolute;left: 50%;bottom: -9px;width:70%;margin-left: -35%;height: 2px;background: #f70;}
	.life_totop{padding-top:44px;padding-bottom: 64px;}
	.life_totop .tips{background:#fff;padding: 15px 12px;overflow:hidden;}
	.life_totop .tips .pic{width:50px;height:50px;float:left;}
	.life_totop .tips .txt{margin-left:65px;font-size:15px;line-height:20px;}
	.life_totop .time{overflow:hidden;background: #fff;padding: 12px;}
	.life_totop .time .tit{font-size:16px; line-height:20px;margin:6px 0;}
	.life_totop .time ul{overflow:hidden;margin:0 -5px;}
	.life_totop .time ul li{width:calc(33.33% - 10px);margin:5px 5px;float:left;border:1px solid #e6e6e6; font-size:13px; height:44px;line-height:44px;border-radius:4px;text-align:center;}
	.life_totop .time ul li.on{color:#fff;background:#f70;border-color:#f70;}
	.life_totop .intro{overflow:hidden; background:#fff; padding: 12px;}
	.life_totop .intro ul li{list-style: disc inside;font-size: 14px;line-height:20px;color:#999;font-size:9px;margin:4px 0;}
	.life_totop .intro ul li span{font-size:14px;}
	.life_totop .long_btn_box{position:fixed;left:0;bottom:0;right: 0;padding: 10px;background: #fff;z-index: 10;}
	.life_totop .long_btn_box .long_btn{width:100%;height: 44px;border-radius: 6px;text-align: center;color: #fff;background: #f70;font-size: 16px;line-height: 44px;border: 0;}
</style>