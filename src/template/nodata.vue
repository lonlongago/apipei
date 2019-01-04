<template>
	<div v-if="nodatashow">
		<div class="public_nodata">
			<div class="nodata-cont">
				<img src="../assets/nonr.png">
				<p>{{title}}</p>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default{
		props:['title','nodatashow']
	}
</script>

<style type="text/css">

.public_nodata {
  position: fixed;
  top: 50%;
  left: 50%;
  width:100%;
  height: 50%;
  -webkit-transform: translateX(-50%) translateY(-50%);
}

.nodata-cont{text-align:center}
.nodata-cont img{width: 125px;}
.nodata-cont p{font-size: 15px; line-height: 20px; color: #999;}
</style>