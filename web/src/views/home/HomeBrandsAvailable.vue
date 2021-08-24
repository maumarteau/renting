<template>
	<div class=" mt-5 mb-3">
		<div class="content-block">
			<h1 class="title mt-3">
				<strong>
					Marcas y modelos disponibles
				</strong>
			</h1>
			<h1 class="title  mt-2">
				<small>
					Tenemos un vehículo ideal para tu empresa
				</small>
			</h1>
		</div>

		<div class="row row-xs mt-4">
			<div class="col-6">
				<a href="http://www.audi.com.uy?ref=lestido-renting" target="_blank" class="brand-block hover-effect">
					<div class="logo hover-effect">
						<img src="@/assets/img/audi-logo.png" alt="" class="img-fluid" />
						Ir a Audi en Uruguay
					</div>
					<img src="@/assets/img/brands-models-1.jpg" alt="" class="img-fluid" />
				</a>
			</div>
			<div class="col-6">
				<a href="http://www.volkswagen.com.uy?ref=lestido-renting" target="_blank" class="brand-block hover-effect">
					<div class="logo hover-effect">
						<img src="@/assets/img/volkswagen-logo.png" alt="" class="img-fluid" />
						Ir a Volkswagen en Uruguay
					</div>
					<img src="@/assets/img/brands-models-2.jpg" alt="" class="img-fluid" />
				</a>
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
	width: 130px;
	height: 130px;
	position: absolute;
	top: 12px;
	left: 12px;
	background-size: cover;
	filter: brightness(0) invert(1);
}
@media (min-width: 991px) {
}
</style>
