<template>
	<router-link tag="a" :to="`/flota/${car.slug}`">
		<div class="car-item">
			<div class="badge badge-primary" v-if="car.featured">
				OPORTUNIDAD
			</div>
			<div class="image" :style="'background-image:url(' + car.image.url + ')'"></div>

			<div class="data">
				<div class="title">{{ car.name }}</div>
				<div class="price" v-if="car.featured">
					desde <span class="currency">U$S</span>
					<span class="amount">{{ car.price }}</span>
					<small class="ml-1">+ IVA</small>
				</div>
				<div class="mb-1 mt-2" v-if="car.featuredDetail" v-html="car.featuredDetail"></div>
				<button class="btn btn-block btn-primary">
					Más info
				</button>
			</div>
		</div>
	</router-link>
</template>
<script>
export default {
	props: ['car'],
}
</script>
<style scoped>
a {
	width: 100%;
}
.car-item {
	display: flex;
	flex-direction: column;
	position: relative;
	margin: 8px auto;
	padding: 14px 8px 50px 8px;
	max-width: 540px;
	color: #000;
	transition: all 0.4s ease-in-out;
	background-color: #f8f8f8;
}
.car-item:hover {
	background-color: #f0f0f0;
}

.car-item .title {
	font-weight: 600;
	font-size: 17px;
	z-index: 10;
}
.car-item .image {
	flex-shrink: 0;
	width: 260px;
	padding-bottom: 44%;
	margin: auto;
	background-size: contain;
	background-position: center center;
	background-repeat: no-repeat;
}
.car-item .data {
	display: flex;
	flex-grow: 5;
	flex-direction: column;
	padding: 0px 12px;
}
.car-item .price {
	font-size: 15px;
	line-height: 20px;
}
.car-item .price .currency {
	font-size: 14px;
	font-weight: 600;
}
.car-item .price .amount {
	font-size: 20px;
	font-weight: 600;
}

.badge-primary {
	width: 90px;
	background-color: #ec9721;
	border-radius: 20px;
	font-size: 10px;
	font-weight: 500;
	padding: 6px;
	top: 16px;
	position: absolute;
}

.btn {
	/* position: absolute;
	bottom: 8px;
	right: 8px; */
	width: 120px;
}

@media (min-width: 991px) {
	.car-item {
		flex-direction: row;
	}
	.car-item .image {
		width: 220px;
		padding-bottom: 30%;
	}
}
</style>
