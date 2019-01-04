<template>
	<div class="askpopup" v-if="askpopup.show">
		<div class="mask_bg" @click="hide"></div>
		<div class="popup">
			<h2>{{askpopup.title}}</h2>
			<div class="cont">
				<p class="tips">{{askpopup.tips}}</p>
			</div>
			<div class="btns">
				<div class="cancel" @click="hide">否</div>
				<div class="confirm" @click="confirm">是</div>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default{
		props:['askpopup'],
		methods:{
			hide(){
				this.$emit('cancel')
			},
			confirm(){
				this.$emit('confirm')
			}

		}
	}
</script>