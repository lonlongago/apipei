<template>
    <div class="life_fabu">
		<div class="pub_list">
			<div class="bt"><span class="dot">*</span> 标题：</div>
			<div class="pub_list_bd">
				<input type="text" name="" class="inp" :value="title" @input="tapTit">
			</div>
		</div>
		<!--循环表单-开始-->
		<template v-for="item in formArr" v-if="!again">
			<template v-if="item.location == 'header'">
				<!--多选-->
				<div class="pub_list" v-if="item.type_from == 'checkbox'" @click="tapSelectMore(item)">
					<div class="bt"><span class="dot">*</span> {{item.key}}：</div>
					<div class="pub_list_bd">
						<input type="text" name="" class="inp" :value="inpCont[item.attr_id]" readonly="true">
					</div>
					<img src="../../assets/right_ico.png" class="linkico">
				</div>
				<!--单选-->
				<div class="pub_list" v-if="item.type_from == 'dropdown'" @click="tapSelectSingle(item)">
					<div class="bt"><span class="dot">*</span> {{item.key}}：</div>
					<div class="pub_list_bd">
						<input type="text" name="" class="inp" :value="inpCont[item.attr_id]" readonly="true">
					</div>
					<img src="../../assets/right_ico.png" class="linkico">
				</div>
				<!--多输入框-->
				<div class="pub_list" v-if="item.type_from == 'text'">
					<div class="bt"><span class="dot">*</span> {{item.key}}：</div>
					<div class="pub_list_bd">
						<div class="style">
							<template v-for="(inp,idx) in item.value">
								<input type="text" name="" class="inp" :value="inpCont[item.attr_id][idx]" @input="tapMoreText" :id="idx" :data-obj="JSON.stringify(item)">
								<span>{{inp}}</span>
							</template>
						</div>
					</div>
				</div>
				<!--单输入框-->
				<div class="pub_list" v-if="item.type_from == 'input'">
					<div class="bt"><span class="dot">*</span> {{item.key}}：</div>
					<div class="pub_list_bd">
						<input type="text" name="" class="inp" :value="inpCont[item.attr_id]" @input="tapSingleText" :id="item.attr_id">
					</div>
					<img src="../../assets/right_ico.png" class="linkico">
				</div>
			</template>
		</template>
		<template v-for="item in formArr" v-if="again">
			<template v-if="item.location == 'header'">
				<div class="pub_list">
					<div class="bt">{{item.k}}：</div>
					<div class="pub_list_bd">
						<input type="text" name="" class="inp" :value="item.v" readonly="true">
					</div>
				</div>
			</template>
		</template>
		<!--循环表单-结束-->
		<div class="pub_list">
			<div class="bt"><span class="dot">*</span> 联系人：</div>
			<div class="pub_list_bd">
				<input type="text" name="" class="inp" :value="contact" @input="tapContact">
			</div>
		</div>
		<div class="pub_list">
			<div class="bt"><span class="dot">*</span> 手机号：</div>
			<div class="pub_list_bd">
				<input type="text" name="" class="inp" :value="mobile" @input="tapMobile">
			</div>
		</div>
		<div class="form_txt">
			<div class="bt">具体描述</div>
			<textarea class="txtra" placeholder="请输入具体描述" :value="content" @input="tapTxt"></textarea>
			<div class="upload_cont">
		        <div class="upload_files">
		        	<div class="upload_box"><input type="file" name="" multiple="multiple" class="file_inp" @change="uploadImage"></div>
		        	<div class="upload_file" v-for="(image,key) in images" v-show="images.length > 0">
		              <div style="height:60px; width:60px;" :style="{'background':'url('+image+') no-repeat center','background-size':'cover'}"></div>
		              <span class="del" @click='delImage(key)'></span>
		            </div>
		        </div>
		        <p class="black9 num">(最多5张)</p>
		      </div>
		</div>
		<!--循环表单-开始-->
		<template v-for="item in formArr" v-if="!again">
			<template v-if="item.location == 'footer'">
				<!--多选-->
				<div class="pub_list" v-if="item.type_from == 'checkbox'" @click="tapSelectMore(item)">
					<div class="bt"><span class="dot">*</span> {{item.key}}：</div>
					<div class="pub_list_bd">
						<input type="text" name="" class="inp" :value="inpCont[item.attr_id]" readonly="true">
					</div>
					<img src="../../assets/right_ico.png" class="linkico">
				</div>
				<!--单选-->
				<div class="pub_list" v-if="item.type_from == 'dropdown'" @click="tapSelectSingle(item)">
					<div class="bt"><span class="dot">*</span> {{item.key}}：</div>
					<div class="pub_list_bd">
						<input type="text" name="" class="inp" :value="inpCont[item.attr_id]" readonly="true">
					</div>
					<img src="../../assets/right_ico.png" class="linkico">
				</div>
				<!--多输入框-->
				<div class="pub_list" v-if="item.type_from == 'text'">
					<div class="bt"><span class="dot">*</span> {{item.key}}：</div>
					<div class="pub_list_bd">
						<div class="style">
							<template v-for="(inp,idx) in item.value">
								<input type="text" name="" class="inp" :value="inpCont[item.attr_id][idx]" @input="tapMoreText" :id="idx" :data-obj="JSON.stringify(item)">
								<span>{{inp}}</span>
							</template>
						</div>
					</div>
				</div>
				<!--单输入框-->
				<div class="pub_list" v-if="item.type_from == 'input'">
					<div class="bt"><span class="dot">*</span> {{item.key}}：</div>
					<div class="pub_list_bd">
						<input type="text" name="" class="inp" :value="inpCont[item.attr_id]" @input="tapSingleText" :id="item.attr_id">
					</div>
					<img src="../../assets/right_ico.png" class="linkico">
				</div>
			</template>
		</template>
		<template v-for="item in formArr" v-if="again">
			<template v-if="item.location == 'footer'">
				<div class="pub_list">
					<div class="bt">{{item.k}}：</div>
					<div class="pub_list_bd">
						<input type="text" name="" class="inp" :value="item.v" readonly="true">
					</div>
				</div>
			</template>
		</template>
		<!--循环表单-结束-->
		<template v-if="!again">
			<div class="pub_list" @click="tapPromot(formNr.want_promot)">
				<div class="bt"><span class="dot"></span> 我要推广：</div>
				<div class="pub_list_bd">
					<input type="text" name="" class="inp" :value="promotCont" readonly="true" placeholder="选择后信息将显示推广区域">
				</div>
				<img src="../../assets/right_ico.png" class="linkico">
			</div>
			<div class="pub_list" @click="tapTop(formNr.want_top)">
				<div class="bt"><span class="dot"></span> 我要置顶：</div>
				<div class="pub_list_bd">
					<input type="text" name="" class="inp" :value="topCont" readonly="true" placeholder="选择后信息将显示置顶区域">
				</div>
				<img src="../../assets/right_ico.png" class="linkico">
			</div>	
		</template>
		<template v-if="again">
			<div class="pub_list" v-if="formNr.promot && formNr.promot.length > 0">
				<div class="bt"><span class="dot"></span> 我要推广：</div>
				<div class="pub_list_bd">
					<input type="text" name="" class="inp" :value="promotCont" readonly="true" placeholder="选择后信息将显示推广区域">
				</div>
			</div>
			<div class="pub_list" v-if="formNr.top && formNr.top.length > 0">
				<div class="bt"><span class="dot"></span> 我要置顶：</div>
				<div class="pub_list_bd">
					<input type="text" name="" class="inp" :value="topCont" readonly="true" placeholder="选择后信息将显示置顶区域">
				</div>
			</div>	
		</template>

		<div class="pub_list" @click="tapAreas(formNr.areas)">
			<div class="bt"><span class="dot">*</span> 所在区域：</div>
			<div class="pub_list_bd">
				<input type="text" name="" class="inp" :value="areasCont" readonly="true" placeholder="选择你所在区域">
			</div>
			<img src="../../assets/right_ico.png" class="linkico">
		</div>
		<div class="pub_list" @click="tapAddr">
			<div class="bt"><span class="dot"></span> 所在位置：</div>
			<div class="pub_list_bd">
				<input type="text" name="" class="inp" :value="addrCont" readonly="true">
			</div>
			<img src="../../assets/right_ico.png" class="linkico">
		</div>
		<div class="pub_list_tips">{{formNr.cfg_lable}}</div>
		<div class="long_btn" @click="formSubmit">{{formNr.need_pay_lable || '重新发布'}}</div>
		<!--单选弹层-->
		<v-actionsheet :catesChild="catesChild" :title="sheetTit" :sheetShow="sheetShow" @cancel="cancel" @select="selectSingle"></v-actionsheet>
		<!--多选弹层-->
		<v-actionselect :catesChild="catesChildMore" :title="sheetTitMore" :sheetShow="sheetShowMore" @cancel="cancel" @select="selectMore"></v-actionselect>
		<!--提示框-->
		<v-tips :isshow="tipshow" :tips="tips"></v-tips>
		<v-addrsearch :isAddrSearch="isAddrSearch" @getAddr="getAddr" @cancelAddr="cancelAddr"></v-addrsearch>
    </div>
</template>

<script type="text/javascript">
	import vTips from "../../template/tip"
	import vActionsheet from "../../template/Actionsheet/Actionsheet"
	import vActionselect from "../../template/Actionselect/Actionselect"
	import vAddrsearch from "./Addrsearch"
	import api from "../../api/api"
	export default {
		data () {
			return {
				tipshow:false,
				tips:'',
				sheetTit:'',
				catesChild:[],
				sheetShow:false,
				sheetTitMore:'',
				catesChildMore:[],
				sheetShowMore:false,
				images:[],
				areasCont:'',
				addrCont:'',
				isAddrSearch:false,
				promotCont:'', //推广string
				topCont:'', //置顶string
				inpCont:[], //循环表单内容
				formNr:{},//表单数据
				formArr:[],//循环表单数据
				//以下为创建表单请求传参字段
				area_id:'', //发布区域area_id
				promot_id:-1, //推广配置ID（不使用传 -1）
				top_id:-1, //置顶配置ID（不使用传 -1）
				title:'', //标题
				content:'', //发布描述内容
				files:[], //发布图片
				contact:'', //联系人
				mobile:'', //联系电话
				addr:'', //区域地址string
				cate_id:this.$route.query.cate_id, //当前的所属发布分类
				config:[], //发布循环表单内容arr
				//以下为修改发布信息字段
				life_id:this.$route.query.life_id,
				again:this.$route.query.again || false,
				// fabuState:{}
			}
		},
		components:{vTips,vActionsheet,vActionselect,vAddrsearch},
		mounted(){
			var that = this,cate_id = that.cate_id;
			var life_id = that.life_id;
			// console.log(that.$store.state.fabu);
			if(that.$route.query.again){
				api.lifeAgain({'life_id':life_id},function(res){
					console.log(res);
					if(res.error == '0'){
						that.formNr = res.data;
						//重发布不可更改内容
						that.formArr = res.data.attr_list;
						that.promotCont = res.data.promot;
						that.topCont = res.data.top;
						//可更改内容
						var areaArr = res.data.areas;
						for(var i=0; i < areaArr.length; i++){
							if(areaArr[i].checked == "1"){
								that.areasCont = areaArr[i].area_name;
								that.area_id = areaArr[i].area_id;
							};
						};
						that.title = res.data.title;
						that.contact = res.data.contact;
						that.content = res.data.content;
						that.mobile = res.data.mobile;
						that.addr = res.data.addr;
						that.images = res.data.photo_list;
						that.files = res.data.photo_list;
					};
				});
			}
			else{
				api.fabuForm({'cate_id':cate_id},function(res){
					if(res.error == "0"){
						that.formNr = res.data;
						that.formArr = res.data.cate.config;
						for(var i=0; i < that.formArr.length; i++){
							that.inpCont[that.formArr[i].attr_id]='';
							if(that.formArr[i].type_from == 'text'){
								that.inpCont[that.formArr[i].attr_id]=[];
								for(var j=0; j < that.formArr[i].value.length; j++){
									that.inpCont[that.formArr[i].attr_id][j] = '';
								};
							};
						};
					};
				});
			};
			
		},
		methods:{
			//发布标题
			tapTit(e){
				this.title = e.target.value
			},
			//发布联系人
			tapContact(e){
				this.contact = e.target.value
			},
			//发布联系电话
			tapMobile(e){
				this.mobile = e.target.value
			},
			//发布描述
			tapTxt(e){
				this.content = e.target.value
			},
			//发布图片
			uploadImage(e) {
		        var files = e.target.files || e.dataTransfer.files;
		        //console.log(files);
		        if (!files.length) return;
		        var that = this;

		        for (var i = 0; i < files.length; i++) {
		          console.log('执行')
		          var tag = '';
		          var rFilter = /^(image\/gif|image\/jpeg|image\/jpg|image\/png)$/i;
		          if (!rFilter.test(files[i].type)) {
		            //alert("只允许上传JPG、PNG、GIF格式图片");
		            api.tipload(that,"只允许上传JPG、PNG、GIF格式图片");
		            return false;
		          }
		          console.log(files[i])

		          if (files[i].size > 1024 * 1024) {
		            var reader = new FileReader();
		            var file = files[i]
		            reader.onload = function (e) {
		              var target = e.target.result;
		              lrz(file,{width:1000}).then(function (rst) {
		                api.upload({file: rst.base64}, function (res) {
		                  if (res.error == 0) {
		                    that.images.push(rst.base64);
		                    that.images.splice(5)
		                    that.files.push(res.data);
		                    that.files.splice(5)
		                  }
		                });
		              }).always(function() {
		                e.target.value = null;
		              });
		            }
		            reader.readAsDataURL(files[i]);
		          } else {
		            var reader = new FileReader();
		            reader.onload = function (e) {
		              // console.log(e.target.result);
		              api.upload({file: e.target.result}, function (res) {
		                console.log(res);
		                if (res.error == 0) {
		                  that.images.push(e.target.result);
		                  that.images.splice(5)
		                  that.files.push(res.data);
		                  that.files.splice(5)
		                  console.log(that.files)
		                }
		              });
		            }
		            reader.readAsDataURL(files[i]);
		          }
		        }
		    },
		    delImage(index) {
		        this.images.splice(index, 1);
		        this.files.splice(index, 1);
		    },
		    //所在区域
		    tapAreas(e){
				var catesChild = [];
				for(var i=0;i<e.length;i++){
					if(this.area_id == e[i].area_id){
						catesChild[i] = {'obj':e[i],'id':e[i].area_id,'title':e[i].area_name,'id_type':'area_id','checked':1};
					}else{
						catesChild[i] = {'obj':e[i],'id':e[i].area_id,'title':e[i].area_name,'id_type':'area_id','checked':0};
					};
				};
				this.sheetTit = "你所在区域";
				this.catesChild = catesChild;
				this.sheetShow = true;
			},
			//所在位置
			tapAddr(){
				this.isAddrSearch = true;
			},
			getAddr(e){
				this.isAddrSearch = false;
				this.addrCont = e;
			},
			cancelAddr(){
				this.isAddrSearch = false;
			},
			//推广
			tapPromot(e){
				var catesChild = [{'obj':{},'id':-1,'title':'不使用','id_type':'promot_id','checked':0}];
				for(var i=0;i<e.select.length;i++){
					if(this.promot_id == e.select[i].promot_id){
						catesChild.push({'obj':e,'id':e.select[i].promot_id,'title':e.select[i].label,'id_type':'promot_id','checked':1});
					}else{
						catesChild.push({'obj':e,'id':e.select[i].promot_id,'title':e.select[i].label,'id_type':'promot_id','checked':0});
					};
				};
				this.sheetTit = e.title;
				this.catesChild = catesChild;
				this.sheetShow = true;
			},
			//置顶
			tapTop(e){
				var catesChild = [{'obj':{},'id':-1,'title':'不使用','id_type':'top_id','checked':0}];
				for(var i=0;i<e.select.length;i++){
					if(this.top_id == e.select[i].top_id){
						catesChild.push({'obj':e,'id':e.select[i].top_id,'title':e.select[i].label,'id_type':'top_id','checked':1});
					}else{
						catesChild.push({'obj':e,'id':e.select[i].top_id,'title':e.select[i].label,'id_type':'top_id','checked':0});
					};
				};

				this.sheetTit = e.title;
				this.catesChild = catesChild;
				this.sheetShow = true;
			},
			//循环事件
			//取消
			cancel(e){
				this.sheetShow = false;
				this.sheetShowMore = false;
			},
			//单选
            selectSingle(e){
            	// console.log(e);
            	if(e.id_type.length > 0){
            		if(e.id_type == 'top_id'){
            			this.top_id=e.id;
            			this.topCont=(e.title == '不使用') ? '' : e.title;
            		};
            		if(e.id_type == 'promot_id'){
            			this.promot_id=e.id;
            			this.promotCont=(e.title == '不使用') ? '' : e.title;
            		};
            		if(e.id_type == 'area_id'){
            			this.area_id=e.id;
            			this.areasCont=e.title;
            		};
            	}else{
            		this.inpCont[e.id] = e.title;
            	};
            	this.sheetShow = false;
            },
			tapSelectSingle(e){
				var catesChild = [];
				console.log("11111",this.inpCont[e.attr_id].length);
				for(var i=0;i<e.value.length;i++){
					if(this.inpCont[e.attr_id] == e.value[i]){
						catesChild[i] = {'obj':e,'id':e.attr_id,'title':e.value[i],'id_type':'','checked':1};
					}else{
						catesChild[i] = {'obj':e,'id':e.attr_id,'title':e.value[i],'id_type':'','checked':0};
					};
				};
				// console.log(catesChild);
				this.sheetTit = e.key;
				this.catesChild = catesChild;
				this.sheetShow = true;
			},
			//多选
			selectMore(e){
				// console.log(e);
				var catesChildMore = e,cont,arr=[]; 
                for (var i = 0; i < catesChildMore.length; i++) {
                    if(catesChildMore[i].checked){
                        arr.push(catesChildMore[i].title);
                    }
                }
                cont = arr.join(",");
            	this.inpCont[catesChildMore[0].id] = cont;
            	this.sheetShowMore = false;
			},
			tapSelectMore(e){
				// console.log(e);
				var catesChildMore = [],inpContArr=[];
				// console.log(this.inpCont[e.attr_id]);
				if(this.inpCont[e.attr_id]){
					inpContArr = this.inpCont[e.attr_id].split(",");
				};
				for(var i=0;i<e.value.length;i++){
					catesChildMore[i] = {obj:e,id:e.attr_id,title:e.value[i],checked:false};
					if(inpContArr.length > 0){
						for(var h=0;h<inpContArr.length;h++){
							if(inpContArr[h] == e.value[i]){
								catesChildMore[i].checked = true;
							};
						};
					};
				};
				console.log(catesChildMore,);
				this.sheetTitMore = e.key;
				this.catesChildMore = catesChildMore;
				this.sheetShowMore = true;
			},
			//单输入框
			tapSingleText(e){
				// console.log(e.target.id,e.target.value);
				this.inpCont[e.target.id] = e.target.value;
			},
			//多输入框
			tapMoreText(e){
				var obj = JSON.parse( e.target.dataset.obj );
				var idx = e.target.id;
				this.inpCont[obj.attr_id][idx] = e.target.value;

			},
			//表单提交发布
			formSubmit(){
				var that = this;
				if(that.again){
					var params={
						area_id:that.area_id,
						title:that.title,
						content:that.content,
						files:that.files,
						contact:that.contact,
						mobile:that.mobile,
						addr:that.addr,
						life_id:that.life_id
					};
					api.lifeAgainset(params,function(res){
						// console.log(res);
						api.tipload(that,res.message);
						if(res.error == "0"){
							that.$router.push('/life/post');
						};
					});
				}else{
					var inpCont = that.inpCont;
					var formArr = that.formArr;
					var config = [];
					inpCont.forEach((item,i)=>{ //数组循环
						for(var j=0;j<formArr.length;j++){
							if(i == formArr[j].attr_id){
								if(formArr[j].type_from == 'text'){
									config.push({attr_id:i,value:item});
								}else if(formArr[j].type_from == 'checkbox'){
									config.push({attr_id:i,value:item.split(",")});
								}else{
									config.push({attr_id:i,value:[item]});
								};
							};
						};
					});
					var params={
						area_id:that.area_id,
						title:that.title,
						content:that.content,
						files:that.files,
						contact:that.contact,
						mobile:that.mobile,
						addr:that.addr,
						cate_id:that.cate_id,
						promot_id:that.promot_id,
						top_id:that.top_id,
						config:config
					};
					api.fabuSubmit(params,function(res){
						console.log(res);
						api.tipload(that,res.message);
						if(res.error == "0"){
							that.$router.push('/life/post');
						};
					});
				};
				console.log(params);
			},
		}
	}
</script>
<style type="text/css" scoped>
	.life_fabu{padding-bottom:44px;}
	.life_fabu .pub_list{line-height: 45px;border-bottom: 1px solid #e6eaed;padding: 0 12px;background: #fff;}
	.life_fabu .pub_list .bt{font-size:15px;min-width: 66px;}
	.life_fabu .pub_list .bt .dot{color:#f30;}
	.life_fabu .pub_list .pub_list_bd{width:77%;text-align: right;font-size: 15px;padding-right: 10px;}
	.life_fabu .pub_list .pub_list_bd .inp{width:100%;height: 45px;line-height: 45px;vertical-align: middle;font-size: 15px;color: #333;border: 0;background: none;}
	.life_fabu .pub_list .pub_list_bd .style{overflow:hidden;text-align: left;color: #666;}
	.life_fabu .pub_list .pub_list_bd .style .inp{width:calc(33.33% - 24px);height: 30px;line-height: 30px;border-bottom: 1px solid #eee;text-align: center;}
	.life_fabu .pub_list .linkico{width:9px;height: 15px;}
	.life_fabu .form_txt{border-bottom: 1px solid #e6eaed;padding: 10px 12px;background: #fff;}
	.life_fabu .form_txt .bt{font-size:15px;line-height: 20px;margin-bottom: 8px;}
	.life_fabu .form_txt .txtra{border:1px solid #ccc;padding:8px;background:#fff;font-size: 14px;line-height: 20px;color: #fff;box-sizing: border-box;width:100%;height: 120px; color: #333;}
	.life_fabu .pub_list_tips{padding:6px 12px;line-height: 16px;font-size: 12px;color: #999;}	
	.life_fabu .long_btn{position:fixed;left:0;bottom: 0;right: 0;background: #fc6621;height: 44px;line-height: 44px;font-size: 17px;color: #fff;text-align: center;}
	.upload_cont{padding: 15px 0px;}
	.upload_cont .upload_files{display: -webkit-box;display: -ms-flexbox;display: flex;display: -webkit-flex;-ms-flex-wrap: wrap;flex-wrap: wrap;-webkit-flex-wrap: wrap;}
	.upload_cont .upload_files .upload_box{position: relative;margin-right: 10px;width: 60px;height: 60px;background: #fff;border: 1px dashed #ccc;border-radius: 4px;margin-bottom: 10px;}
	.upload_cont .upload_files .upload_box:before,.upload_cont .upload_files .upload_box:after{position: absolute;content: "";top: 50%;left: 50%;-webkit-transform: translate(-50%,-50%);transform: translate(-50%,-50%);background-color: #ccc;}
	.upload_cont .upload_files .upload_box:before{width:30px;height:4px;}
	.upload_cont .upload_files .upload_box:after{width:4px;height:30px;}
	.upload_cont .upload_files .upload_box .file_inp{position: absolute;z-index: 1;top: 0;left: 0;width: 100%;height: 100%;opacity: 0;}
	.upload_cont .upload_files .upload_file{position: relative;margin-right: 10px;width: 60px;height: 60px;background: #fff;border: 1px solid #e6e6e6;margin-bottom: 10px;}	
	.upload_cont .upload_files .upload_file .del{position: absolute;display: block;width: 21px;height: 20px;background: url(../../assets/img_del_ico.png) no-repeat center;background-size: contain;right: -1px;top: -1px;}
</style>