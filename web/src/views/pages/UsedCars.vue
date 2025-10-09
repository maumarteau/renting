<template>
	<div>
		<Layout :navFixed="false" :loading="loading">
			<div class="container mt-5">
				<div class="row">
					<div class="col">
						<h1 class="title text-center mb-2">
							Vehículos <strong>en venta</strong>
						</h1>
						<p class="lead text-center mt-3 mb-4">
							Descubre nuestra selección de vehículos de calidad
						</p>

						<div class="p-4 mt-5">
							<div class="row" v-if="!loading && items.length === 0">
								<div class="col-12 text-center">
									<p class="text-muted">No hay vehículos disponibles en este momento.</p>
								</div>
							</div>

							<div class="row">
								<div
									class="col-product"
									v-for="product in items"
									:key="product.id"
								>
									<UsedCarItem :product="product" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	</div>
</template>

<script>
import Layout from '@/components/Layout'
import UsedCarItem from '@/components/UsedCarItem'
import gql from 'graphql-tag'

export default {
	name: 'UsedCars',
	metaInfo: {
		title: 'Autos Usados',
	},
	components: {
		Layout,
		UsedCarItem,
	},
	data() {
		return {
			loading: true,
			items: [],
		}
	},
	beforeMount() {
		this.load()
	},
	methods: {
		load() {
			this.loading = true
			this.$apollo
				.query({
					query: gql`
						query {
							products {
								data {
									id
									title
									slug
									description
									price
									brand
									model
									year
									mileage
									fuel
									transmission
									fuelText
									transmissionText
									status
									statusText
									image {
										id
										url
										urlThumb
									}
								}
							}
						}
					`,
					fetchPolicy: 'network-only',
				})
				.then(({ data }) => {
					// Filtrar solo los productos ACTIVE y SOLD_AND_PUBLISHED
					this.items = data.products.data.filter(
						(product) => product.status === 'ACTIVE' || product.status === 'SOLD_AND_PUBLISHED'
					)
					this.loading = false
				})
				.catch((err) => {
					console.log(err)
					this.loading = false
				})
		},
	},
}
</script>

<style scoped>
.row .col-product {
	width: 100%;
	display: inline-flex;
}
.row .col-product /deep/ .used-car-item {
	width: 100%;
	margin: 8px auto;
}

@media (min-width: 768px) {
	.row .col-product {
		width: 50%;
		display: inline-flex;
	}
	.row .col-product /deep/ .used-car-item {
		width: 100%;
		margin: 8px;
	}
	.row .col-product:nth-child(odd) /deep/ .used-car-item {
		float: right;
	}
	.row .col-product:nth-child(even) /deep/ .used-car-item {
		float: left;
	}
}

@media (min-width: 1200px) {
	.row .col-product {
		width: 33.333%;
	}
}
</style>

