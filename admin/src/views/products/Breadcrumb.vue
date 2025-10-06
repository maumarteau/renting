<template>
	<div>
		<router-link tag="li" to="/" class="breadcrumb-item">
			<i class="icon icon-home-1"></i>
		</router-link>
		<router-link tag="li" to="/products" class="breadcrumb-item">
			Vehículos usados
		</router-link>
		<li class="breadcrumb-item active" v-if="$route.name == 'ProductCreate'">
			Crear
		</li>
		<li class="breadcrumb-item active" v-if="$route.name == 'ProductEdit'">
			Editar
		</li>
		<li class="breadcrumb-item active" v-if="$route.name == 'ProductDetail'">
			Detalle
		</li>
	</div>
</template>

<script>
export default {
	name: 'ProductBreadcrumb',
}
</script>
