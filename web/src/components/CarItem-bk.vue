<template>
	<router-link tag="a" :to="`/flota/${car.slug}`" class="car-item">
		<div
			class="image"
			:style="'background-image:url(' + car.image.url + ')'"
		></div>

		<div class="data">
			<div class="badge badge-primary" v-if="car.featured">
				OPORTUNIDAD
			</div>
			<div class="title">{{ car.name }}</div>
			<div class="price" v-if="car.featured">
				desde <span class="currency">U$S</span>
				<span class="amount">{{ car.price }}</span>
			</div>
			<div
				class="mb-2"
				v-if="car.featured"
				v-html="car.featuredDetail"
			></div>
		</div>

		<button class="btn btn-block btn-primary m-auto ">
			Más info
		</button>
	</router-link>
</template>
<script>
export default {
	props: ['car'],
}
</script>
<style scoped>
.car-item {
	display: block;
	position: relative;
	margin: 8px;
	padding: 14px 8px;
	text-align: center;
	color: #000;
	transition: all 0.4s ease-in-out;
}
.car-item:hover {
	background-color: #f8f8f8;
}

.car-item .title {
	font-weight: 600;
	font-size: 17px;
	/* padding: 8px 14px; */
	/* background-color: var(--primary-color); */
	/* position: absolute; */
	z-index: 10;
	text-align: center;
}
.car-item .image {
	width: 100%;
	max-width: 380px;
	padding-bottom: 60%;
	margin: auto;
	background-size: contain;
	background-position: center center;
	background-repeat: no-repeat;
}
.car-item .data {
	height: 60px;
	position: relative;
}
.car-item .price {
	font-size: 15px;
	text-align: center;
	line-height: 20px;
}
.car-item .price .currency {
	font-size: 14px;
	font-weight: 500;
}
.car-item .price .amount {
	font-size: 18px;
	font-weight: 600;
}

.badge-primary {
	width: 90px;
	background-color: var(--primary-color);
	border-radius: 20px;
	font-size: 10px;
	font-weight: 500;
	padding: 6px;
	position: absolute;
	top: -20px;
	left: calc(50% - 45px);
}
</style>
