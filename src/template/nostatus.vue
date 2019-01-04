<template>
	<div class="no_status">
		<img src="../assets/image/location_no@3x.png">
		<p>{{statusTip}}</p>
	</div>
</template>

<script type="text/javascript">
	export default{
		props:['statusTip']
	}
</script>