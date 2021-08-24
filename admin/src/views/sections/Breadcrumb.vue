<template>
	<fragment>
		<router-link tag="li" to="/" class="breadcrumb-item"
			><i class="icon icon-home-1"></i
		></router-link>
		<!-- <router-link
			tag="li"
			to="/clients"
			class="breadcrumb-item"
			:class="{ active: $route.meta.section == 'client' }"
		>
			Clientes
		</router-link>
		<router-link
			tag="li"
			to="/surveys"
			class="breadcrumb-item"
			:class="{ active: $route.meta.section == 'survey' }"
		>
			Encuestas
		</router-link> -->
	</fragment>
</template>

<script>
import { Fragment } from 'vue-fragment'
export default {}
</script>

<style scoped>
.breadcrumb .breadcrumb-item {
	font-weight: 400;
	padding: 8px 8px 4px 8px;
	font-size: inherit;
	text-transform: inherit;
	cursor: pointer;
	color: #31537d;
	margin: 0 12px 0 0;
}
.breadcrumb .breadcrumb-item.active {
	color: #262c2d;
	font-weight: 500;
	border-bottom: 2px solid #006cb8;
}
.breadcrumb-item + .breadcrumb-item::before {
	display: none;
}
</style>
