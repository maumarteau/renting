<template>
	<div class=" mt-5 mb-3">
		<div class="content-block">
			<h1 class="title mt-3">
				<strong>Consúltanos por modelos disponibles</strong>
			</h1>
			<h1 class="title  mt-2">
				<small>
					Tenemos un vehículo ideal para tu empresa
				</small>
			</h1>
		</div>


		
		<div class="row row-xs mt-4">
			<div class="col-12 col-md-6 mb-2">
				<div class="brand-block hover-effect">
					<div class="logo hover-effect">
						<img src="@/assets/img/audi-logo.png" alt="" class="img-fluid mr-5" />
					</div>
					<img src="@/assets/img/brands-models-1.jpg" alt="" class="img-fluid" />
				</div>
			</div>
			<div class="col-12 col-md-6 mb-2">
				<div class="brand-block hover-effect">
					<div class="logo hover-effect">
						<img src="@/assets/img/volkswagen-logo.png" alt="" class="img-fluid mr-4" />
					</div>
					<img src="@/assets/img/brands-models-2.jpg" alt="" class="img-fluid" />
				</div>
			</div>
		</div>
	</div>
</template>
<style scoped>
.brand-block {
	position: relative;
	display: block;
	text-align: center;
}
.brand-block .logo {
	width: 100%;
	color: #000;
	position: absolute;
	top: 12px;
	left: 12px;
	background-size: cover;
	align-items: center;
	display: flex;
}
.brand-block .logo img {
	filter: brightness(0) invert(0);
	width: 90px;
}
@media (min-width: 991px) {
	.brand-block .logo {
		width: 300px;
		top: 12px;
		left: 12px;
	}
	.brand-block .logo img {
		width: 130px;
	}
}
</style>
