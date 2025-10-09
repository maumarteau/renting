<template>
	<div>
		<Layout :navFixed="false" :loading="loading">
			<div class="car-head" v-if="item">
				<!-- Badge de VENDIDO -->
				<div class="badge badge-sold" v-if="item.status === 'SOLD_AND_PUBLISHED'">
					VENDIDO
				</div>

				<div 
					v-if="item.image" 
					class="image" 
					:style="'background-image:url(' + item.image.url + ')'"
				></div>
				<div v-else class="image no-image">
					<span>Sin imagen</span>
				</div>

				<div class="data">
					<h1 class="title mt-5">
						<strong>{{ item.title }}</strong>
					</h1>
					<div class="text-secondary text-xl  mt-3" v-html="item.description"></div>

					<!-- Especificaciones básicas -->
					<!-- <div class="mt-3 lead-text">
						<div class="specs-inline">
							<span v-if="item.year" class="spec-badge">{{ item.year }}</span>
							<span v-if="item.mileage" class="spec-badge">{{ item.mileage }} km</span>
							<span v-if="item.fuelText" class="spec-badge">{{ item.fuelText }}</span>
							<span v-if="item.transmissionText" class="spec-badge">{{ item.transmissionText }}</span>
						</div>
					</div> -->

					<div class="mt-3 lead-text">
						<div class="price mt-2">
							<span class="currency">U$S</span>
							<span class="amount ml-1">{{ formatPrice(item.price) }}</span>
						</div>
					</div>

					<div class="d-flex flex-wrap">
						<router-link
							v-if="item.status !== 'SOLD_AND_PUBLISHED'"
							tag="a"
							:to="`/contacto?subject=${encodeURI(item.title)}&body=${encodeURI(
								`Buenos días\nDeseo obtener más información acerca del vehículo ${item.title}\n¡Muchas gracias!`
							)}`"
							class="btn btn-block btn-primary mt-3 ml-2"
						>
							Me interesa
						</router-link>
					</div>
				</div>
			</div>

			<!-- Especificaciones detalladas -->
			<div class="container mt-5" v-if="item.brand || item.model || item.color || item.contactPhone || item.contactEmail">
				<div class="row pt-5 pb-5">
					<div class="col-12 col-md-6 m-auto pt-3 pb-3">
						<h1 class="title mt-2">
							<strong>Detalles del vehículo</strong>
						</h1>
						<div class="text-secondary lead-text mt-3 detail-text">
							<ul>
								<li v-if="item.brand"><strong>Marca:</strong> {{ item.brand }}</li>
								<li v-if="item.model"><strong>Modelo:</strong> {{ item.model }}</li>
								<li v-if="item.year"><strong>Año:</strong> {{ item.year }}</li>
								<li v-if="item.mileage"><strong>Kilometraje:</strong> {{ item.mileage }} km</li>
								<li v-if="item.fuelText"><strong>Combustible:</strong> {{ item.fuelText }}</li>
								<li v-if="item.transmissionText"><strong>Transmisión:</strong> {{ item.transmissionText }}</li>
								<li v-if="item.color"><strong>Color:</strong> {{ item.color }}</li>
								<li v-if="item.contactPhone"><strong>Teléfono:</strong> <a :href="'tel:' + item.contactPhone">{{ item.contactPhone }}</a></li>
								<li v-if="item.contactEmail"><strong>Email:</strong> <a :href="'mailto:' + item.contactEmail">{{ item.contactEmail }}</a></li>
							</ul>
						</div>
					</div>
				</div>
			</div>

			<!-- Galería de imágenes -->
			<div class="container mt-5" v-if="item.gallery && item.gallery.length > 0">
				<div class="row">
					<div class="col m-auto text-center">
						<div class="gallery">
							<div
								class="item hover-effect"
								v-for="image in item.gallery"
								:key="image.id"
								:style="'background-image:url(' + image.url + ')'"
								@click="openImage(image.url)"
							></div>
						</div>
					</div>
				</div>
			</div>

			<!-- Botón volver -->
			<div class="container mt-5 pb-5">
				<div class="row">
					<div class="col text-center">
						<router-link to="/venta-de-usados" class="btn btn-outline-primary btn-lg">
							← Ver todos los vehículos
						</router-link>
					</div>
				</div>
			</div>
		</Layout>
	</div>
</template>

<script>
import Layout from '@/components/Layout'
import gql from 'graphql-tag'

export default {
	name: 'UsedCarDetail',
	metaInfo() {
		return {
			title: this.item ? this.item.title : 'Detalle del vehículo',
		}
	},
	components: {
		Layout,
	},
	data() {
		return {
			loading: true,
			item: null,
		}
	},
	beforeMount() {
		if (this.$route.params.slug) {
			this.load()
		} else {
			this.$router.push('/venta-de-usados')
		}
	},
	methods: {
		load() {
			this.loading = true
			this.$apollo
				.query({
					query: gql`
						query($slug: String) {
							product(slug: $slug) {
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
								color
								contactPhone
								contactEmail
								status
								statusText
								image {
									id
									url
									urlThumb
								}
								gallery {
									id
									url
									urlThumb
								}
							}
						}
					`,
					variables: { slug: this.$route.params.slug },
					fetchPolicy: 'network-only',
				})
				.then(({ data }) => {
					this.item = data.product
					this.loading = false
				})
				.catch((err) => {
					console.log(err)
					this.$router.push('/venta-de-usados')
				})
		},
		formatPrice(price) {
			return new Intl.NumberFormat('es-UY').format(price)
		},
		openImage(url) {
			window.open(url, '_blank')
		},
	},
}
</script>

<style scoped>
.lead-text {
	font-size: 24px;
}
.text-xl {
	font-size: 20px;
}

.car-head {
	display: block;
	align-items: center;
	justify-content: space-between;
	position: relative;
}

.car-head .image {
	width: 100%;
	height: 50vw;
	max-height: 640px;
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center center;
	position: relative;
}

.car-head .image.no-image {
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #e9ecef;
	color: #6c757d;
	font-size: 18px;
}

.car-head .image:before {
	display: none;
	content: '';
	border-top: 0px solid transparent;
	border-right: 90px solid transparent;
	border-bottom: 640px solid white;
	position: absolute;
}

.car-head .data {
	padding: 16px;
	width: 100%;
	max-width: 450px;
}

/* Badge de VENDIDO */
.badge-sold {
	position: absolute;
	top: 20px;
	right: 20px;
	background-color: #dc3545;
	color: #fff;
	border-radius: 20px;
	font-size: 12px;
	font-weight: 700;
	padding: 8px 16px;
	z-index: 10;
	text-transform: uppercase;
	letter-spacing: 1px;
}

/* Specs inline (badges) */
.specs-inline {
	display: flex;
	flex-wrap: wrap;
	gap: 8px;
	margin-top: 8px;
}

.spec-badge {
	display: inline-block;
	background-color: #f3f3f3;
	padding: 6px 14px;
	border-radius: 4px;
	font-size: 14px;
	color: #333;
	font-weight: 500;
}

.price {
	font-size: 20px;
}

.price .currency {
	font-size: 20px;
	font-weight: 600;
}

.price .amount {
	font-size: 26px;
	font-weight: 600;
}

/* Detail text */
.detail-text /deep/ ul {
	list-style: none;
	padding-left: 0;
}

.detail-text /deep/ ul li {
	font-size: 20px;
	color: rgb(0, 0, 0);
	margin: 8px 8px 14px 8px;
}

.detail-text /deep/ ul li a {
	color: var(--primary-color, #001e50);
	text-decoration: none;
}

.detail-text /deep/ ul li a:hover {
	text-decoration: underline;
}

/* Gallery */
.gallery {
	display: grid;
	grid-gap: 20px;
	grid-template-areas:
		'one two'
		'one three'
		'four four';
	grid-template-columns: 1fr 1fr;
	grid-template-rows: 1fr 1fr;
	width: 100%;
	height: 100%;
}

.gallery .item {
	background-color: #f3f3f3;
	background-size: cover;
	background-position: center center;
	background-repeat: no-repeat;
	cursor: pointer;
	transition: all 0.3s ease-in-out;
}

.gallery .item:hover {
	transform: scale(1.02);
	box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
}

.gallery .item:first-child {
	height: 64vw;
	grid-area: one;
}

.gallery .item:nth-child(2) {
	grid-area: two;
}

.gallery .item:nth-child(3) {
	grid-area: three;
}

.gallery .item:nth-child(4) {
	height: 24vw;
	grid-area: four;
}

/* Botones */
.btn-outline-primary {
	border: 2px solid var(--primary-color, #001e50);
	color: var(--primary-color, #001e50);
	padding: 12px 30px;
	font-weight: 600;
	transition: all 0.3s ease-in-out;
}

.btn-outline-primary:hover {
	background-color: var(--primary-color, #001e50);
	color: #fff;
	transform: translateY(-2px);
	box-shadow: 0 4px 12px rgba(0, 30, 80, 0.2);
}

@media (min-width: 991px) {
	.car-head {
		display: flex;
		flex-direction: row-reverse;
	}

	.car-head .data {
		margin-left: 50px;
	}

	.car-head .image:before {
		display: block;
	}

	.detail-text /deep/ ul {
		columns: 2;
		-webkit-columns: 2;
		-moz-columns: 2;
	}
}
</style>

