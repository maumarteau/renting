<template>
	<div>
		<!-- https://dribbble.com/shots/3562770-Volkswagen-Landing-page/attachments/793453 -->
		<Layout :navFixed="false">
			<div class="container">
				<div class="row">
					<div class="col">
						<HomeSlider />
					</div>
				</div>
			</div>

			<div class="container">
				<div class="row">
					<div class="col">
						<HomeSections />
					</div>
				</div>
			</div>

			<div class="container">
				<div class="row">
					<div class="col">
						<HomeBrandsAvailable />
					</div>
				</div>
			</div>

			<div class="container">
				<div class="row pb-5 pt-4">
					<div class="col">
						<HomeContact />
					</div>
				</div>
			</div>

			<div class="container">
				<div class="row pb-5 pt-4">
					<div class="col">
						<HomeOportunities />
					</div>
				</div>
			</div>

		<div class="container">
			<div class="row">
				<div class="col">
					<HomeUsedCars />
				</div>
			</div>
		</div>

		<div class="container">
			<div class="row">
				<div class="col">
					<HomeMaintenance />
				</div>
			</div>
		</div>

		<div class="container">
			<div class="row">
				<div class="col">
					<DrivingTips />
				</div>
			</div>
		</div>
		</Layout>
	</div>
</template>

<script>
import Layout from '@/components/Layout'
import HomeSlider from '@/views/home/HomeSlider'
import HomeBrandsAvailable from '@/views/home/HomeBrandsAvailable'
import HomeOportunities from '@/views/home/HomeOportunities'
import HomeMaintenance from '@/views/home/HomeMaintenance'
import HomeUsedCars from '@/views/home/HomeUsedCars'
import HomeSections from '@/views/home/HomeSections'
import DrivingTips from '@/views/home/DrivingTips'
import HomeContact from '@/views/home/HomeContact'

export default {
	name: 'Home',
	components: {
		Layout,
		HomeSlider,
		HomeBrandsAvailable,
		HomeOportunities,
		HomeMaintenance,
		HomeUsedCars,
		HomeSections,
		DrivingTips,
		HomeContact,
	},
}
</script>

<style scoped>
.block {
	display: flex;
	flex-direction: column;
	background-repeat: no-repeat;
	background-position: right;
}

.block .image {
	background-repeat: no-repeat;
	background-position: center center;
	width: auto;
	height: 80vw;
	background-image: url('../../assets/img/home.jpg');
	max-height: 780px;
	display: grid;
	align-items: flex-end;
	padding: 18px;
	flex-grow: 1;
}
.block .image .title {
	color: #fff;
	font-size: 24px;
}
.block .content {
	display: flex;
	flex-basis: 0;

	padding: 18px;
}
.block .content .content-block {
	max-width: 500px;
	height: fit-content;
}

.block.block-1 {
	background-color: #f5f5f5;
}

.block.block-2 {
	background: #f5f5f5;
}

.block.block-2 .image {
	height: 100%;
}

@media (min-width: 991px) {
	.block {
		flex-direction: row;
	}
}

.separator {
	display: flex;
	width: 100%;
	justify-content: center;
}
.separator:after {
	content: '';
	display: block;
	width: 70px;
	height: 30px;
	border-bottom: 4px solid #f3f3f3;
	border-left: 4px solid #f3f3f3;
	margin: 2px;
}
.separator:before {
	content: '';
	display: block;
	width: 70px;
	height: 30px;
	border-bottom: 4px solid #f3f3f3;
	border-right: 4px solid #f3f3f3;
	margin: 2px;
}
</style>
