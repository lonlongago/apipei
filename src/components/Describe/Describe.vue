<template>
    <div class="describe">
		<div class="tit">
			<template v-if="istype == 'comment'">评论内容</template>
			<template v-if="istype == 'jubao'">投诉描述</template>
			<template v-if="istype == 'reply'">回复内容</template>
		</div>
		<textarea class="txt" placeholder="请输入内容" v-model="content"></textarea>
		<button type="submit" class="long_btn" @click="submit">提 交</button>
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
				life_id:this.$route.query.life_id,
				comment_id:this.$route.query.comment_id,
				istype:this.$route.query.istype,
				content:'',
			}
		},
		components:{vTips},
		methods:{

			submit(){
				var that=this,istype=that.istype,life_id=that.life_id,content=that.content;
				// console.log(life_id,content);
				if(istype == "comment"){
					api.lifeComment({"life_id":life_id,"content":content},function(res){
						// console.log(res);
						api.tipload(that,res.message);
						setTimeout(function(){
							that.$router.go(-1);
						},1500);
					});
				}else if(istype == "jubao"){
					api.lifeComplaint({"life_id":life_id,"content":content},function(res){
						// console.log(res);
						api.tipload(that,res.message);
						setTimeout(function(){
							that.$router.go(-1);
						},1500);
					});
				}else if(istype == "reply"){
					api.lifeReply({"comment_id":that.comment_id,"content":content},function(res){
						// console.log(res);
						api.tipload(that,res.message);
						setTimeout(function(){
							that.$router.go(-1);
						},1500);
					});
				};
			}
		}
	}
</script>

<style type="text/css">
	.describe{padding:12px;}
	.describe .tit{font-size:16px;line-height: 20px;margin: 6px 0 10px;color: #666;}
	.describe .txt{background:#fff;padding:10px;font-size: 14px;line-height: 20px;width: 100%;height: 280px;box-sizing: border-box;border:0;box-shadow: 0 0 7px #ddd;border-radius: 6px;}
	.describe .long_btn{width:100%;height: 44px;border-radius: 6px;background: #f70;color: #fff;font-size: 16px;line-height: 44px;border:0;margin: 20px 0;}
</style>
