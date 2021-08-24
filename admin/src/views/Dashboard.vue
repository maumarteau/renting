<template>
	<Layout :loading="loading" :pageTitle="'Dashboard'">
		<template #breadcrumb>
			<router-link tag="li" to="/" class="breadcrumb-item active"
				><i class="icon icon-home-1"></i
			></router-link>
		</template>

		<!-- <template #cta>
		<router-link tag="a" :to="`${$route.path}/create`" class="btn btn-success">Crear categoría</router-link>
	</template> -->

		<div class="main-container container-fluid">
			<div class="card mt-2">
				<div class="card-body">
					<div class="alert alert-danger">PENDIENTE</div>
					Numeros de Servicios vencidos y por hacer <br />

					Mostrar autos con servicios en curso<br />
					Mostrar autos con traslados en curso<br />
					grafica barras - Costo de combustible por día<br />
					grafica barras - Costo de servicios por día<br />
					Numeros - Repuestos con bajo stock<br />
					<br />
					Autos proximos a entregar<br />
					Reservas recien cofirmadas <br />
					Mensajes de contacto desde al web<br />
				</div>
			</div>
		</div>
	</Layout>
</template>

<script>
export default {
	name: 'dashboard',
	components: {},
	data() {
		return {
			data: null,
			loading: false,
		}
	},
}
</script>

<style scoped lang="scss">
.chart-box {
	margin: 2px;
	padding: 16px 8px;

	background-color: #fff;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	flex-grow: 1;
	cursor: pointer;
	transition: all 0.3s;
}
.chart-box h4 {
	font-size: 1.2rem;
}
</style>
