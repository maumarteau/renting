<template>
	<router-link tag="a" :to="`/venta-de-usados/${product.slug}`">
		<div class="used-car-item">
			<!-- Badge de VENDIDO -->
			<div class="badge badge-sold" v-if="product.status === 'SOLD_AND_PUBLISHED'">
				VENDIDO
			</div>

			<!-- Imagen principal -->
			<div 
				class="image" 
				:style="'background-image:url(' + (product.image ? product.image.url : '') + ')'"
			></div>

			<!-- Información del vehículo -->
			<div class="data">
				<div class="title">{{ product.title }}</div>
				<div class="details mb-2">
					<span v-if="product.year">{{ product.year }}</span>
					<span v-if="product.mileage"> • {{ product.mileage }} km</span>
					<span v-if="product.fuelText"> • {{ product.fuelText }}</span>
				</div>
				<div class="price mb-2">
					<span class="currency">U$S</span>
					<span class="amount">{{ formatPrice(product.price) }}</span>
				</div>
				<button class="btn btn-block btn-primary">
					Más info
				</button>
			</div>
		</div>
	</router-link>
</template>

<script>
export default {
	props: ['product'],
	methods: {
		formatPrice(price) {
			return new Intl.NumberFormat('es-UY').format(price)
		},
	},
}
</script>

<style scoped>
a {
	width: 100%;
}

.used-car-item {
	display: flex;
	flex-direction: column;
	position: relative;
	margin: 8px auto;
	padding: 0px 0px 0px 0px;
	max-width: 540px;
	color: #000;
	transition: all 0.4s ease-in-out;
	background-color: #f8f8f8;
}

.used-car-item:hover {
	background-color: #f0f0f0;
}

.badge-sold {
	position: absolute;
	top: 16px;
	right: 16px;
	background-color: #dc3545;
	color: #fff;
	border-radius: 20px;
	font-size: 10px;
	font-weight: 700;
	padding: 6px 14px;
	z-index: 10;
	text-transform: uppercase;
	letter-spacing: 0.5px;
}

.image {
	flex-shrink: 0;
	width: 100%;
	aspect-ratio: 16/7;
	margin: auto;	
	background-size: cover;
	background-position: center center;
	background-repeat: no-repeat;
	background-color: transparent;
}

.data {
	display: flex;
	flex-grow: 5;
	flex-direction: column;
	padding: 12px 16px;
}

.title {
	font-weight: 600;
	font-size: 17px;
	z-index: 10;
	margin-bottom: 4px;
}

.details {
	font-size: 14px;
	color: #666;
	line-height: 20px;
}

.price {
	font-size: 15px;
	line-height: 20px;
}

.price .currency {
	font-size: 14px;
	font-weight: 600;
}

.price .amount {
	font-size: 20px;
	font-weight: 600;
}

.btn {
	width: 120px;
	margin-top: 8px;
}

@media (min-width: 991px) {
	.used-car-item {
		padding: 0px 0px 32px 0px;
	}
	.image {
		width: 100%;
		
	}
	.btn {
		position: absolute;
		bottom: 8px;
		right: 8px;
	}
}
</style>

