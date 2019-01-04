<template>
    <div class="life_detail">
    	<div class="infor mb10">
    		<h2>{{detail.title}}</h2>
    		<div class="time">{{detail.dateline}}</div>
    		<div class="duty">
    			<span v-if="detail.cate_lable_detail && detail.cate_lable_detail.length > 0">{{detail.cate_lable_detail}}</span>
    			{{detail.contact}}
    		</div>
    		<div class="tag" v-if="detail.lable && detail.lable.length > 0">
    			<span v-for="li in detail.lable">{{li}}</span>
    		</div>
    	</div>
    	<div class="form mb10" v-if="detail.attr_list && detail.attr_list.length > 0">
    		<ul>
				<li v-for="(lis,key) in Math.ceil(detail.attr_list.length/2)">
					<template v-for="(li,idx) in detail.attr_list" v-if="idx < (key+1)*2 && idx >= key*2">
						<div class="bt">{{li.k}}:</div> 
						<div class="txt">{{li.v}}</div>
					</template>
				</li>
    		</ul>
    		<!-- <table>
    			<tbody>
    				<tr v-for="(lis,key) in Math.ceil(detail.attr_list.length/2)">
    					<template v-for="(li,idx) in detail.attr_list" v-if="idx < (key+1)*2 && idx >= key*2">
    						<td class="bt">{{li.k}}: </td>
    						<td class="txt"><p>{{li.v}}</p></td>
    					</template>
    				</tr>
    			</tbody>
    		</table> -->
    	</div>
    	<div class="intro mb10">
    		<div class="tit">具体描述</div>
    		<div class="nr" :class="{overflow:!nrOpen}" v-html="detail.content"></div>
			<div class="fold" @click="openNr"><span v-if="!nrOpen">展开</span><span v-else>收起</span></div>
			<div class="pics">
				<ul>
					<li v-for="(li,index) in detail.photo_list" :style="'background-image:url(' + li.photo + ');'" @click="bigImg(index)"></li>
				</ul>
			</div>
    	</div>
    	<!--图片放大-开始-->
        <div class="imgMask" v-if="showBigImg" @click.stop="showBigImg=!showBigImg">
            <img class="prev"  @click.stop="prev" src="../../assets/ban-prev.png">
            <div class="showImg"  :style="{'background-image':'url('+detail.photo_list[num].photo+')'}">
                <!-- <img class="bigImg" :src="IMG_URL+banner[num].photo"> -->
            </div>
            <img class="next"  @click.stop="next" src="../../assets/ban-next.png">
        </div>
        <!--图片放大-结束-->
    	<div class="comment mb10" v-if="detail.comments > 0">
    		<div class="tit">评论（{{detail.comments}}）</div>
    		<div class="cont_box">
    			<!-- <div>暂无数据~</div> -->
				<v-comment :lists="comments" @reply="reply"></v-comment>
    		</div>
    		<div class="open" v-if="detail.comments >10" @click="commentsMore">展开更多<i class="ico"></i></div>
    	</div>
    	<div class="jhIntro">
    		<div class="tit">联系时请说明在<span>{{site_title}}</span>看到的</div>
    		<p>1.交易时请警惕网络诈骗、欺诈交易。</p>
    		<p>2.若遇上疑似或确定为欺诈交易，网络诈骗等信息，请向本网或公安部门举报。</p>
    		<p>3.本平台会对信息做人工审核，但精确率不能 确保100%,请自行甄别。</p>
    	</div>
    	<!--底部-->
    	<div class="lifeDtail_footer">
    		<div class="collect" :class="{on:iscollect == 1}" @click="collect">
    			<i class="ico_collect"></i>
    			<p>收藏</p>
    		</div>
    		<div class="message" @click="fabuComment">
    			<i class="ico_message"></i>
    			<p>留言</p>
    		</div>
    		<div class="inform" @click="jubao">
    			<i class="ico_inform"></i>
    			<p>举报</p>
    		</div>
    		<a :href="'tel:' + detail.mobile" class="tel"><i class="ico"></i>拨打电话</a>
    	</div>
    	<!--提示框-->
		<v-tips :isshow="tipshow" :tips="tips"></v-tips>
    </div>
</template>

<script type="text/javascript">
	import vComment from '../../template/Listcomment/Listcomment'
	import vTips from "../../template/tip"
	import api from '../../api/api'
	export default {
		data () {
			return {
				tipshow:false,
				tips:'',
				life_id:this.$route.query.life_id, //当前路由所传life_id
				detail:{},
				comments:[],
				iscollect:0,
				nrOpen:false,
				page:1,
				showBigImg:false,
                num:0,
                site_title:window.__CFG.SITE_TITLE || '本地网站'
			}
		},
		components:{vComment,vTips},
		created(){
			var that=this,life_id = that.life_id
			api.lifeDetail({page:1,life_id:life_id},function(res){
				console.log(res);
				if(res.error == "0"){
					that.detail = res.data.detail;
					that.comments = res.data.comment_list;
					that.iscollect = res.data.detail.collect;

	                //分享
	                var link = window.location.href;
	                var title = res.data.detail.title;
	                var content = res.data.detail.content;
	                var imageurl = res.data.detail.thumb;
	                var hideqq = 0;
	                //APP分享
	                api.showshare(link, title, content, imageurl,hideqq);
	                //网页版分享
					api.webshare(title,content,link,imageurl);
				};
			});
		},
		methods:{
			//判断是否微信
	        checkIsWeixin(){
	            if(/(micromessenger)/.test(navigator.userAgent.toLowerCase())){
	                return true;
	            }else{
	                return false;
	            }
	        },
			//请求评论数据
			initData(setpage){
				var that = this,life_id = that.life_id;
				var page = setpage ? setpage : that.page;
				api.lifeDetail({"page":page,life_id:life_id},function(res){						
					if(res.error == "0"){
						if(setpage){
							that.comments = res.data.comment_list;
						}else{
							if(res.data.items.length > 0){
								if(page > 1){
									that.comments = that.comments.concat(res.data.comment_list);
								};
								that.page = page + 1;
							};
						};
					};
				});
			},
			//折叠具体说明
			openNr(){
				if(this.nrOpen == true){
					this.nrOpen = false;
				}else{this.nrOpen = true;};
			},
			//是否收藏帖子0取消收藏，1收藏
			collect(){
				var that = this;
				if(that.iscollect == 1){
					api.lifeCancel({life_id:that.life_id},function(res){
						api.tipload(that,res.message);
						if(res.error == "0"){
							that.iscollect = 0;
						};
					});
				}else{
					api.lifeCollect({life_id:that.life_id},function(res){
						api.tipload(that,res.message);
						if(res.error == "0"){
							that.iscollect = 1;
						};
					});
				};
			},
			//请求更多评论
			commentsMore(){
				this.initData();
			},
			//发布评论
			fabuComment(){
				this.$router.push({path:'/life/describe',query:{life_id:this.life_id,istype:"comment"}});
			},
			//回复评论
			reply(e){
				this.$router.push({path:'/life/describe',query:{comment_id:e,istype:"reply"}});
			},
			//举报
			jubao(){
				this.$router.push({path:'/life/describe',query:{life_id:this.life_id,istype:"jubao"}});
			},
			//图片放大查看
            bigImg(index){
                this.showBigImg = true;
                this.num = index;
                // console.log(this.showBigImg,this.num);
            },
            prev(){
                if(this.num==0){
                    this.num =(this.detail.photo_list.length);
                }
                this.num--;
                // console.log(this.num)
            },
            next(){
                if(this.num== (this.detail.photo_list.length - 1)){
                    this.num=-1;
                }
                this.num++;
            },
		}
	}
</script>

<style type="text/css">
	.life_detail{padding-bottom:50px;}
	.life_detail .infor{background:#fff; padding:10px;}
	.life_detail .infor h2{font-size: 16px;line-height: 20px;margin-bottom: 8px;}
	.life_detail .infor .time{line-height:20px;color: #999;}
	.life_detail .infor .duty{font-size:13px;line-height: 18px;margin:6px 0;}
	.life_detail .infor .duty span{display: inline-block;padding: 0 4px;background: #f70;color: #fff;margin-right: 4px;}
	.life_detail .infor .tag{overflow:hidden;margin-top: 10px;border-top:1px solid #eee;padding-top: 10px;}
	.life_detail .infor .tag span{display: inline-block;padding: 0 4px;margin-right: 8px;font-size:12px;line-height: 18px;background: #e6e6e6;color:#999;}
	.life_detail .form{background:#fff;padding:0 3px;}
	/*.life_detail .form table{width:100%;}
	.life_detail .form table tr td{text-align: left;font-size: 13px;line-height: 20px;padding: 10px 0;border-bottom: 1px solid #eee;}
	.life_detail .form table tr td.bt{width:60px;font-size: 12px;color: #666;}
	.life_detail .form table tr td.txt{padding: 0 15px 0 0; width: calc(50% - 65px); box-sizing: border-box;}
	.life_detail .form table tr td:last-child.txt{padding-right: 0;}
	.life_detail .form table tr:last-child td{border-bottom:0;}*/
	.life_detail .form ul li{font-size: 13px;line-height: 20px;padding: 10px 0;border-bottom: 1px solid #eee; overflow: hidden;}
	.life_detail .form ul li div{float: left; box-sizing: border-box; padding:0 7px;}
	.life_detail .form ul li .bt{width:75px;font-size: 12px;color: #666; overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
	.life_detail .form ul li .txt{width: calc(50% - 80px);}
	.life_detail .form ul li:last-child{border-bottom:0;}

	.life_detail .intro{background:#fff;padding:10px;}
	.life_detail .intro .tit{font-size:13px;line-height: 20px;margin: 4px 0;}
	.life_detail .intro .nr{font-size:14px;line-height: 20px;}
	.life_detail .intro .nr.overflow{max-height:40px;overflow: hidden;text-overflow: ellipsis;text-overflow: -o-ellipsis-lastline;display: -webkit-box; -webkit-line-clamp: 2;-webkit-box-orient: vertical;}
	.life_detail .intro .fold{color: #FF7700; line-height: 20px; font-size: 14px;}
	.life_detail .intro .pics{overflow: hidden;}
	.life_detail .intro .pics ul{margin: 0 -5px;}
	.life_detail .intro .pics ul li{float: left;; width: calc(33.33% - 10px); margin: 5px 5px; padding: 15.3% 0; height: 0; position: relative; background-color: #eee; background-position: center; background-size:cover; background-repeat: no-repeat;}
	.life_detail .comment{background:#fff;}
	.life_detail .comment .tit{background:#fff;padding:10px;font-size: 14px;line-height: 20px;color: #666;border-bottom: 1px solid #e6e6e6;}
	.life_detail .comment .open{background:#fff;padding:10px;font-size: 15px;line-height: 20px;color: #f70;border-top: 1px solid #e6e6e6;text-align: center;}
	.life_detail .comment .open .ico{display:inline-block;width:13px;height:9px;background: url(../../assets/dwon_ico.png) no-repeat center;background-size: contain;margin-left: 4px;vertical-align: middle;}
	.life_detail .jhIntro{background:#fff;padding:10px 12px 15px;}
	.life_detail .jhIntro .tit{text-align:center;font-size: 15px;line-height: 20px;margin: 10px 0;}
	.life_detail .jhIntro .tit span{color: #f70;}
	.life_detail .jhIntro p{font-size: 13px;line-height: 20px;color: #999;}
	.life_detail .lifeDtail_footer{position:fixed;left:0;bottom: 0;width:100%;background:#fff;height:50px;border-top:1px solid #e6e6e6;display:flex;}
	.life_detail .lifeDtail_footer div{flex:1;}
	.life_detail .lifeDtail_footer .tel{width:150px;height:49px;background:#f70;color: #fff;font-size: 17px;line-height: 49px;text-align: center;display: block;}
	.life_detail .lifeDtail_footer .tel .ico{display:inline-block;width:22px;height:22px;background: url(../../assets/tel_ico_white.png) no-repeat center;background-size: contain;margin-right: 4px;vertical-align: middle;}
	.life_detail .lifeDtail_footer .collect,.life_detail .lifeDtail_footer .message,.life_detail .lifeDtail_footer .inform{text-align: center;padding-top:6px;color:#999;}
	.life_detail .lifeDtail_footer i,.life_detail .lifeDtail_footer i,.life_detail .lifeDtail_footer i{display:inline-block;width:20px;height:20px;background: url(../../assets/detail_ico1.png) no-repeat center;background-size: contain;}
	.life_detail .lifeDtail_footer .collect.on{color: #FF7700;}
	.life_detail .lifeDtail_footer .collect.on .ico_collect{background-image:url(../../assets/detail_ico1_pre.png);}
	.life_detail .lifeDtail_footer .ico_collect{background-image:url(../../assets/detail_ico1.png);}
	.life_detail .lifeDtail_footer .ico_message{background-image:url(../../assets/detail_ico2.png);}
	.life_detail .lifeDtail_footer .ico_inform{background-image:url(../../assets/detail_ico3.png);}

	.imgMask{position: fixed;height: 100%;width:100%;top:0;left:0;z-index: 100;background:rgba(0,0,0,.6);}
	.imgMask .showImg{height:80%;width:100%;position: absolute;left:50%;top:50%;transform:translate(-50%,-50%); background-position: center; background-repeat: no-repeat; background-size: contain;}
	.imgMask .bigImg{width:100%;height:100%;}
	.imgMask .prev{position: absolute;z-index: 1; top:50%;left:0px;width:40px;transform:translate(0,-50%);}
	.imgMask .next{width:40px;transform:translate(0,-50%);position: absolute; z-index: 1; top:50%;right:0px;}
</style>