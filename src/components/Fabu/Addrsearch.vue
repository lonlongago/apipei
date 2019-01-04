<template>
    <div class="addrSearch" :class="{show:isAddrSearch}">
		<div class="searchBox pub_list">
			<div class="pub_list_bd">
				<div class="inpCont"><i class="ico"></i>搜索附近位置</div>
				<input type="text" name="" class="inp" ref="keyword" @input="tapKeyword" @focus="focus" @blur="blur" :style="'opacity:' + (inpfocus ? 1 : 0)">	
			</div>
			<div class="cancel" @click="cancelAddr">取消</div>
		</div>
		<div class="no" :class="{on:idx == null}" @click='back()'>
			<h3>不显示位置</h3>
		</div>
		<ul class="list_box">
			<li :class="{on:index == idx}" v-for="(item,index) in addrlist" v-if="addrlist.length > 0" @click='back(item.address,index)'>
				<h3>{{item.name}}</h3>
				<p class="black9">{{item.address}}</p>
			</li>
		</ul>
    </div>
</template>
<script type="text/javascript">
	import api from "../../api/api"
	export default {
		props: ['isAddrSearch'],
		data () {
			return {
				tipshow:false,
				tips:'',
				addrlist:[],
				keyword:'',
				inpfocus:false,
				idx:null
			}
		},
		mounted(){
		},
		methods:{
			//获取搜索关键字
			tapKeyword(e){
				this.keyword = e.target.value;
				this.getplace();
			},
			//聚焦效果
			focus(e){
				this.inpfocus = true
			},
			blur(e){
				if(this.keyword.length == 0){
					this.inpfocus = false
				}else{
					this.inpfocus = true
				}
			},
			//获取搜索结果
			getplace(){
				var that = this;
				AMap.service(["AMap.PlaceSearch"], function() {
			        var placeSearch = new AMap.PlaceSearch({
			        	pageSize: 5,
			            pageIndex: 1,
			            // city: "010", //城市
			        });
			        //关键字查询
			        var placeSearch= new AMap.PlaceSearch();
	                var keyword = that.keyword
	                // var keyword = "华润五彩国际"
	                placeSearch.search(keyword, function(status, result) {
	                	if (status === 'complete') {
					    	console.log(result.poiList.pois);
					    	that.addrlist = result.poiList.pois;
					    };
					});
			    });
            },
            back(e,index){
            	if(e){
            		this.idx = index;
            	}else{
            		this.idx = null;
            	};
            	this.$emit("getAddr",e);
            },
            cancelAddr(){
            	this.$emit("cancelAddr");
            }
		}
	}
</script>
<style type="text/css">
	.addrSearch{position: fixed; z-index: 99; right: 0; top: 0; width: 100%; height: 100%; box-sizing: border-box; overflow: auto; background: #fff; transform: translate(100%,0); transition: all 0.4s ease;}
	.addrSearch.show{transform: translate(0,0);}
	.addrSearch .searchBox{position: sticky; z-index: 10; left: 0; top:0; width: 100%; background: #f2f2f2; padding: 10px 12px; box-sizing: border-box;}
	.addrSearch .searchBox .inpCont{text-align: center; font-size: 14px; line-height: 30px; height: 30px; width: 100%; overflow: hidden; background: #fff; border-radius: 5px; color: #999;}
	.addrSearch .searchBox .inpCont .ico{display: inline-block; width: 16px; height: 16px; background: url(../../assets/btn_search_gray@3x.png) no-repeat center; background-size: contain; margin-right: 5px; vertical-align: middle;}
	.addrSearch .searchBox .pub_list_bd{position: relative;}
	.addrSearch .searchBox .inp{height: 30px; width: calc(100% - 24px); vertical-align: middle; line-height: 30px; left: 0; top: 0; position: absolute; text-align: center; font-size: 14px; line-height: 30px; border-radius: 5px; opacity: 0; background: #fff;}
	.addrSearch .searchBox .cancel{color: #666; width: 40px; text-align:center;}
	.addrSearch .list_box li{background:#fff; border-bottom: 1px solid #e6e6e6; padding: 12px 18px; line-height: 20px; position: relative;}
	.addrSearch .list_box li.on{color: #FF8959;}
	.addrSearch .list_box li.on:after{display: block; content:''; width: 15px; height: 7px; border-bottom:1px solid #FF8959;border-left:1px solid #FF8959;transform:rotate(-45deg) translate(0,-50%);-webkit-transform:rotate(-45deg) translate(0,-50%); position: absolute; right: 10px; top: 50%;}
	.addrSearch .list_box li h3{margin-bottom: 4px;}
	.addrSearch .no{background:#fff; border-bottom: 1px solid #e6e6e6; padding: 18px 18px; line-height: 20px; position: relative;}
	.addrSearch .no.on{color: #FF8959;}
	.addrSearch .no.on:after{display: block; content:''; width: 15px; height: 7px; border-bottom:1px solid #FF8959;border-left:1px solid #FF8959;transform:rotate(-45deg) translate(0,-50%);-webkit-transform:rotate(-45deg) translate(0,-50%); position: absolute; right: 10px; top: 50%;}
	.addrSearch .list_box li h3{margin-bottom: 4px;}
</style>