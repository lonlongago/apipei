<template>
    <div class="life_pay">
		<div class="infor">
			<!-- <div class="pub_list">
				<div class="bt">订单总价</div>
				<div class="pub_list_bd black9">￥3</div>
			</div> -->
			<div class="pub_list">
				<div class="bt">实际支付</div>
				<div class="pub_list_bd fontcl1">￥{{total_price}}</div>
			</div>
		</div>
		<div class="way">
			<div class="pub_list">
				<img src="../../assets/payWay03@3x.png">
				<div class="pub_list_bd">
					<h3>余额支付</h3>
					<div class="txt black9">余额：￥{{member_money}}
                        <span v-if="use_money == 1" class="ml10">还需支付：¥{{need_pay}}</span>
                    </div>
				</div>
				<input type="checkbox" name="" class="switch_tab" @click="onClickTab">
			</div>
			<label class="pub_list">
				<img src="../../assets/20180508_8226BC29046BA91428FA337FB8B08F72.png">
				<div class="pub_list_bd">
					<h3>支付宝支付</h3>
				</div>
				<input type="radio" name="pay" class="radio" :class="{disab:(need_pay == 0 && use_money == 1)}" @click="onClickWay" id="alipay">
			</label>
			<label class="pub_list">
				<img src="../../assets/20180508_367F8E22C445D6EE98C533C685628B0C.png">
				<div class="pub_list_bd">
					<h3>微信支付</h3>
				</div>
				<input type="radio" name="pay" class="radio" :class="{disab:(need_pay == 0 && use_money == 1)}" @click="onClickWay" id="wxpay">
			</label>
		</div>
		<div class="btn_box">
			<input type="submit" name="" class="long_btn" value="确认支付" @click="submit">
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
				total_price:0,
				member_money:0,
				need_pay:0,
				order_id:this.$route.query.order_id, //当前路由所传order_id
				code:"", //支付方式：money:余额支付，wxpay：微信支付，alipay：支付宝支付
				use_money:0, //是否使用余额，0：不使用，1：使用
			}
		},
		components:{vTips},
		created(){
			var that = this,
				order_id = that.order_id;
				// order_id = 27;
			api.lifePayInfo({'order_id':order_id},function(res){
				// console.log(res);
				if(res.error == "0"){
					that.total_price = parseFloat(res.data.total_price);
					that.member_money = parseFloat(res.data.member_money);
					if(that.total_price > that.member_money){
						that.need_pay = parseFloat(that.total_price - that.member_money);
					}else{
						that.need_pay = 0;
					};
				};
			});
		},
		methods:{
			//是否选择余额
			onClickTab (e) {
	        	if(e.target.checked == true){
	        		this.use_money = 1;
	        	}else{this.use_money = 0;};
	        },
	        //选择支付方式
	        onClickWay(e){
	        	if(e.target.checked == true){
	        		this.code = e.target.id;
	        	};
	        },
			//确认支付
			submit(){
				var that = this;
				if(that.use_money == 1 && that.need_pay == 0){
					that.code = "money"
				};
				var params = {
					'order_id':that.order_id,
					'code':that.code,
					'use_money':that.use_money
				};
				// console.log(params);
				api.lifePay(params,function(res){
					// console.log(res);
					api.tipload(that,res.message);
					if(res.error == "0"){
						setTimeout(function(){
							that.$router.push({path:'/life/post'});
						},1500);
					};
				});
			}
		}
	}
</script>

<style type="text/css">
	.life_pay .infor .pub_list{background: #fff; border-bottom: 1px solid #e6e6e6; padding: 10px 12px; line-height: 20px; font-size: 14px;}
	.life_pay .infor .pub_list_bd{text-align: right;}
	.life_pay .way{background: #fff; padding: 0 12px;}
	.life_pay .way .pub_list{border-bottom: 1px solid #e6e6e6; padding: 15px 0px;}
	.life_pay .way img{width: 30px; height: 30px;}
	.life_pay .way .pub_list_bd{padding-left: 10px;}
	.life_pay .way h3{font-size: 14px; line-height: 20px;}
	.life_pay .way .txt{font-size: 12px;}
	.life_pay .way .radio{width: 20px; height: 20px; border-radius: 100%; border: 1px solid #ccc; overflow: hidden;}
	.life_pay .way .radio:checked{background: #fc6621; border-color: #fc6621; position: relative;}
	.life_pay .way .radio:checked:after{content: ''; width: 5px; height: 9px; border-bottom: 1px solid #fff; border-right: 1px solid #fff; transform:rotate(45deg); position: absolute; left: 50%; top: 50%; margin: -6px 0 0 -3px;}
	.life_pay .way .radio.disab:checked{background: none; border-color: #ccc;}
	.life_pay .way .radio.disab:checked:after{display: none;}
	.life_pay .btn_box{position: fixed; left: 0; bottom: 0; background: #fff; right: 0; padding:8px 12px;}
	.life_pay .btn_box .long_btn{width: 100%; height: 44px; background: #fc6621; border-radius: 4px; text-align:center; line-height: 44px; font-size: 16px; color: #fff; border: 0;}
	.switch_tab{
        position: relative;
        width: 45px;
        height: 26px;
        border: 1px solid #dfdfdf;
        outline: 0;
        border-radius: 16px;
        box-sizing: border-box;
        background-color: #dfdfdf;
        -webkit-transition: background-color .1s,border .1s;
        transition: background-color .1s,border .1s;
        outline: none;
        appearance: none;
        -webkit-appearance: none;
    }
    .switch_tab:checked{
        border-color: #fc6621;
        background-color: #fc6621;
    }
    .switch_tab:before{
        content: " ";
        position: absolute;
        top: 0;
        left: 0;
        width: 43px;
        height: 24px;
        border-radius: 15px;
        background-color: #fdfdfd;
        -webkit-transition: -webkit-transform .35s cubic-bezier(.45,1,.4,1);
        transition: -webkit-transform .35s cubic-bezier(.45,1,.4,1);
        transition: transform .35s cubic-bezier(.45,1,.4,1);
        transition: transform .35s cubic-bezier(.45,1,.4,1),-webkit-transform .35s cubic-bezier(.45,1,.4,1);
    }
    .switch_tab:checked:before {
        -webkit-transform: scale(0);
        transform: scale(0);
    }
    .switch_tab:after{
        content: " ";
        position: absolute;
        top: 0;
        left: 0;
        width: 23px;
        height: 23px;
        border-radius: 15px;
        background-color: #fff;
        box-shadow: 0 1px 3px rgba(0,0,0,.4);
        -webkit-transition: -webkit-transform .35s cubic-bezier(.4,.4,.25,1.35);
        transition: -webkit-transform .35s cubic-bezier(.4,.4,.25,1.35);
        transition: transform .35s cubic-bezier(.4,.4,.25,1.35);
        transition: transform .35s cubic-bezier(.4,.4,.25,1.35),-webkit-transform .35s cubic-bezier(.4,.4,.25,1.35);
    }
    .switch_tab:checked:after {
        -webkit-transform: translateX(20px);
        transform: translateX(20px);
    }
</style>