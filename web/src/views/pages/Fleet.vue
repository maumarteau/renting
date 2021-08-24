<template>
	<div>
		<Layout :navFixed="false" :loading="loading">
			<!-- :background="require('@/assets/img/fleet-head.jpg')" -->
			<div class="container mt-5">
				<div class="row">
					<div class="col">
						<h1 class="title text-center mb-2">
							Nuestra <strong>flota</strong>
						</h1>

						<div class="p-4 mt-5">
							<div class="row">
								<div
									class="col-car"
									v-for="item in items"
									:key="item.id"
								>
									<CarItem :car="item" />
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
import gql from 'graphql-tag'
import Layout from '@/components/Layout'
import CarItem from '@/components/CarItem'

export default {
	name: 'Fleet',
	metaInfo: {
		title: 'Flota',
	},
	components: {
		Layout,
		CarItem,
	},
	data() {
		return {
			items: [],
			loading: true,
		}
	},
	beforeMount() {
		this.load()
	},
	methods: {
		load() {
			return this.$apollo
				.query({
					query: gql`
						query($status: String) {
							carCategories(status: $status) {
								data {
									id
									name
									slug
									featured
									featuredDetail
									image {
										id
										type
										filename
										url
										urlThumb
									}
									price
									status
								}
							}
						}
					`,
					variables: { status: 'ACTIVE' },
					fetchPolicy: 'network-only',
				})
				.then(({ data }) => {
					this.items = data.carCategories.data
					this.loading = false
				})
				.catch(() => {})
		},
	},
}
</script>

<style scoped>
.row .col-car {
	width: 100%;
	display: inline-flex;
}
.row .col-car /deep/ .car-item {
	width: 100%;
	margin: 8px auto;
}

@media (min-width: 991px) {
	.row .col-car {
		width: 50%;
		display: inline-flex;
	}
	.row .col-car /deep/ .car-item {
		width: 100%;
		margin: 8px;
	}
	.row .col-car:nth-child(odd) /deep/ .car-item {
		float: right;
	}
	.row .col-car:nth-child(even) /deep/ .car-item {
		float: left;
	}
}
</style>
