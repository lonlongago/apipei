<template>
	<div class="tipsMask" v-if="isshow">
		{{tips}}
	</div>
</template>

<script type="text/javascript">
	export default{
		props:['tips','isshow'],
		methods:{
		}
	}
</script>