<template>
	<div class="mt-4 mb-4">
		<h1 class="page-title"><small>Consejos de conducción</small></h1>

		<VueSlickCarousel
			:arrows="false"
			:dots="true"
			:slidesToScroll="1"
			:slidesToShow="4"
			:responsive="[
				{
					breakpoint: 1280,
					settings: {
						slidesToShow: 3,
					},
				},
				{
					breakpoint: 991,
					settings: {
						slidesToShow: 2,
					},
				},
				{
					breakpoint: 650,
					settings: {
						slidesToShow: 1,
					},
				},
			]"
			class="mt-3"
		>
			<div class="item">
				<img
					src="@/assets/img/tip-aquaplaning.gif"
					alt=""
					class="img-fluid"
				/>
				<h2>Reaccionar al aquaplaning</h2>
				<p>
					Se produce al atravesar un charco o balsa de agua. El
					neumático no es capaz de evacuarla, perdiendo su contacto
					con la carretera con la consecuente pérdida de control del
					conductor sobre el vehículo. Reducir la velocidad, nunca
					frenar y sujetar con firmeza el volante son las claves para
					superar el efecto aquaplaning.
				</p>
			</div>
			<div class="item">
				<img
					src="@/assets/img/tip-break.gif"
					alt=""
					class="img-fluid"
				/>
				<h2>Evitar frenar bruscamente</h2>
				<p>
					Con la lluvia, el pavimento se torna resbaladizo por lo que
					se recomienda evitar movimientos violentos y frenadas
					bruscas. Lo más seguro es reducir la velocidad de forma
					paulatina hasta que el vehículo quede parado en su
					totalidad.
				</p>
			</div>
			<div class="item">
				<img
					src="@/assets/img/tip-break.gif"
					alt=""
					class="img-fluid"
				/>
				<h2>Distancia de seguridad</h2>
				<p>
					Sobre una carretera mojada, el coche necesita más distancia
					para detenerse sin peligro. Cuando llueve, lo aconsejable,
					es doblar la distancia de seguridad.
				</p>
			</div>
			<div class="item">
				<img
					src="@/assets/img/tip-velocity.gif"
					alt=""
					class="img-fluid"
				/>
				<h2>Reducción de la velocidad</h2>
				<p>
					La lluvia empeora notablemente la visibilidad y las
					condiciones de la vía por lo que se hace imprescindible que
					el conductor disminuya su velocidad.
				</p>
			</div>
		</VueSlickCarousel>
	</div>
</template>

<style scoped>
.item {
	padding: 14px;
}
.item img {
	max-width: 110px;
}
.item h2 {
	font-size: 18px;
	text-transform: uppercase;
	font-weight: 600;
}
</style>
