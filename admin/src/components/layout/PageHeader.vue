<template>
    <div class="page-header">
        <ol class="breadcrumb">
			<slot name="breadcrumb"></slot>
        </ol>
		<div class="header-content">
			<div class="title">
				<h1>{{pageTitle}}</h1>
				<p v-if="pageSubtitle">{{pageSubtitle}}</p>
			</div>
			<div class="cta">
				<slot name="cta"></slot>
			</div>
		</div>
    </div>
</template>
<script>
export default {
	props:['pageTitle','pageSubtitle']
}
</script>
<style scoped>
    .page-header{
		margin-bottom: 8px;
		margin: 0px;
		width: 100%;
		background: #fff;
    	position: relative;
    	border-bottom: 1px solid #D3D9DB;
	}
	
	.page-header .title{
		flex-grow: 1;
	}
	.page-header .title h1{
		font-size: 1.3125rem;
		font-weight: 500;
	}
	.page-header .title p{
		font-size: .9rem;
		font-weight: 400;
		margin:0px;
	}
	.page-header .header-content{
		padding: 8px 16px;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
	}

	.breadcrumb{
		flex-basis: 100%;
		flex-grow: 0;
		flex-shrink: 0;
		background-color: #fff;
		
		border-radius: 0px;
		margin: 0px;
		padding: 0px 8px;
	}
	.breadcrumb .breadcrumb-item{
		font-weight: 400;
		padding: 8px 8px 4px 8px;
		font-size: inherit;
		text-transform: inherit;
		cursor: pointer;
		color: #31537d;
		margin: 0 12px 0 0;
	}
	.breadcrumb .breadcrumb-item.active{
		color: #262c2d;
		font-weight: 500;
		border-bottom: 2px solid #006cb8;
	}
	.breadcrumb-item + .breadcrumb-item::before {
    	display: none;
	}
	
</style>