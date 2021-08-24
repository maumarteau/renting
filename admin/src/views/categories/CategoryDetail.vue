<template>
	<div>
		<div class="car-detail" v-if="item">
			<div class="title">
				<div class="d-flex align-items-center">
					<h4>{{ item.name }}</h4>
					<div
						class="alert alert-info rounded-pill px-2 py-1 ml-3 font-weight-400 text-2 mb-0"
					>
						{{ item.code }}
					</div>
				</div>
				<h6>{{ item.similary }}</h6>
			</div>

			<div class="d-flex">
				<div class="image">
					<img
						v-if="item.image"
						:src="item.image.url"
						class="img-fluid"
					/>
				</div>

				<div class="car-data">
					<ul class="list-unstyled icons car-props-list mt-2">
						<li
							v-if="item.propAirConditioner"
							v-b-tooltip.hover
							title="Aire acondicionado"
						>
							<i class="eva-3-icon-air-conditioner"></i> A/C
						</li>
						<li
							v-if="item.propPassengers"
							v-b-tooltip.hover
							:title="`${item.propPassengers} pasajeros adultos`"
						>
							<i class="eva-3-icon-user"></i>
							{{ item.propPassengers }}
						</li>
						<li
							v-if="item.propDoors"
							v-b-tooltip.hover
							:title="`${item.propDoors} puertas`"
						>
							<i class="eva-3-icon-door"></i> {{ item.propDoors }}
						</li>
						<li
							v-if="item.propLuggages"
							v-b-tooltip.hover
							:title="`${item.propLuggages} valijas`"
						>
							<i class="eva-3-icon-single"></i>
							{{ item.propLuggages }}
						</li>
						<li
							v-if="item.propHandLuggages"
							v-b-tooltip.hover
							:title="`${item.propHandLuggages} equipaje de mano`"
						>
							<i class="eva-3-icon-handbag "></i>
							{{ item.propHandLuggages }}
						</li>
						<li
							v-if="item.propTransmission == 'manual'"
							v-b-tooltip.hover
							:title="`Transmisión manual`"
						>
							<i class="eva-3-icon-manual-transmision"></i> Manual
						</li>
						<li
							v-if="item.propTransmission == 'auto'"
							v-b-tooltip.hover
							:title="`Transmisión automática`"
						>
							<i class="eva-3-icon-atm-transmision"></i>
							Automática
						</li>
						<!-- <i class="eva-3-icon-kms-unlimited"></i> Kilometraje ilimitado  -->
					</ul>

					<p class="m-0">
						<i class="eva-3-icon-kms-unlimited text-success"></i>
						Kilometraje ilimitado.
						<br />
						<i class="fa fa-check-o text-success"></i> Cancelación
						gratuita
						<i
							class="icon-ios-help-outline"
							v-b-tooltip.hover
							:title="`Hasta 24 horas antes del retiro`"
						></i>
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import gql from 'graphql-tag'

export default {
	name: 'CategoryDetail',
	props: {
		categoryId: {
			required: true,
		},
	},
	data() {
		return {
			item: null,
			loading: false,
		}
	},
	beforeMount() {
		this.load()
	},
	methods: {
		load() {
			this.$apollo
				.query({
					query: gql`
						query($id: ID!) {
							carCategory(id: $id) {
								id
								code
								externalCode
								externalName
								name
								similary
								type {
									id
									name
								}
								image {
									id
									filename
									url
									urlThumb
								}
								conditions {
									key
									value
								}
								offices {
									id
								}
								propAirConditioner
								propPassengers
								propDoors
								propLuggages
								propHandLuggages
								propTransmission
								propFuel
								propFreeMileage
								propFreeCancelation
							}
						}
					`,
					variables: { id: this.categoryId },
					fetchPolicy: 'network-only',
				})
				.then(({ data }) => {
					this.item = data.carCategory
					this.loading = false
				})
				.catch(() => {})
		},
	},
}
</script>

<style scoped>
.car-detail .image {
	width: 280px;
	display: flex;
	justify-content: center;
	align-items: center;
}
.car-detail .image img {
	max-width: 220px;
}

.car-detail .title h4 {
	color: #343a40 !important;
	font-size: 1.3125rem !important;
	font-weight: 500;
}

.car-props-list li {
	width: auto !important;
	margin-right: 0.7rem;
}

.icons i {
	color: #888;
}

.list-unstyled li {
	display: inline-flex;
	align-items: baseline;
}
.list-unstyled li i {
	margin-right: 4px;
	font-size: 18px;
}
.list-unstyled li p {
	line-height: 1.2;
	margin-bottom: 4px;
}

.subtitle {
	font-size: 1.125rem !important;
	color: #0c2f54;
	font-weight: 500;
}
</style>
