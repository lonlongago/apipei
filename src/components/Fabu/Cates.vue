<template>
    <div class="life_fabucates">
		<div class="tips">您发布的消息将在本地强力曝光，覆盖本地同城大量老百姓，推广置顶效果更好.</div>
		<div class="title">请选择信息发布的栏目</div>
		<div class="cates">
			<ul>
				<li v-for="item in cates" @click="lifeCates(item.childrens)"><img :src="item.icon"> <p>{{item.title}}</p></li>
			</ul>
		</div>
		<!--分类弹层-->
		<v-actionsheet :catesChild="catesChild" :title="'请选择发布类型'" :sheetShow="sheetShow" @cancel="cancel" @select="gotoFabu"></v-actionsheet>
		<!-- 底部导航 -->
		<v-footer :footerIdx="1"></v-footer>
		<!--提示框-->
		<v-tips :isshow="tipshow" :tips="tips"></v-tips>
    </div>
</template>

<script type="text/javascript">
	import vFooter from "../../template/Footer/Footer"
	import vTips from "../../template/tip"
	import vActionsheet from "../../template/Actionsheet/Actionsheet"
	import api from "../../api/api"
	export default {
		data () {
			return {
				tipshow:false,
				tips:'',
				cates:[],
				catesChild:[],
				sheetShow:false
			}
		},
		components:{vFooter,vTips,vActionsheet},
		mounted(){
			var that = this;
			api.lifeCate({},function(res){
				// console.log(res);
				if(res.error == "0"){
					that.cates = res.data;
				};
			});
		},
		methods:{
			//选择发布分类
			lifeCates(e){
				this.catesChild = e;
				this.sheetShow = true;
			},
			//取消
			cancel(){
				this.sheetShow = false;
			},
			//去分类发布页
            gotoFabu(e){
            	this.sheetShow = false;
            	this.catesChild=[];
                this.$router.push({path:'/life/fabu',query:{'cate_id':e.cate_id}});
            }
		}
	}
</script>
<style type="text/css">
	.life_fabucates{min-height:100%;background: #fff;padding-bottom: 50px;}
	.life_fabucates .tips{background:#f8f8f8;padding:10px 12px;font-size: 14px;line-height: 20px;color: #999;}
	.life_fabucates .title{background: #F2F2F2;padding:12px 12px;font-size: 14px;line-height: 20px;text-align: center;color: #999;position: relative;}
	.life_fabucates .title:after,.life_fabucates .title:before{content:"";width: 40px;height: 1px;background: #ccc;top: 50%;position: absolute;}
	.life_fabucates .title:after{left:50%;margin-left: 78px;}
	.life_fabucates .title:before{right:50%;margin-right: 78px;}
	.life_fabucates .cates{padding-top:15px;}
	.life_fabucates .cates ul{display: block; overflow: hidden;}
	.life_fabucates .cates ul li{width: 25%;text-align: center;float: left;margin-bottom: 10px;}
	.life_fabucates .cates ul li img{width: 50px;height: 50px;}
	.life_fabucates .cates ul li p{font-size: 12px;line-height: 20px;color: #333;margin-top: 6px;}
</style>