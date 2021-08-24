<template>
	<div>
		<footer class="py-4 mt-4">
			<div class="container">
				<div class="row">
					<div class="col-12 col-md-8  mb-5">
						<img src="@/assets/logo.svg" alt="" class="logo" />
						<div class="row">
							<div class="col-12 col-md-4 order-md-3 order-lg-1 mb-5">
								<div class="mt-4">
									<div>2400 5101 int. 212</div>
									<div>Cerro Largo 1729, Montevideo</div>
									<div>consultas@renting.com.uy</div>
								</div>
							</div>
							<div class="col-12 col-md-4  order-md-1 order-lg-2 mb-5">
								<router-link tag="a" :to="`/`"> Inicio </router-link><br />
								<router-link tag="a" :to="`/flota`"> Flota </router-link><br />
								<router-link tag="a" :to="`/servicios-adicionales`"> Adicionales </router-link><br />
								<router-link tag="a" :to="`/agenda-mantenimiento`"> Mantenimiento </router-link><br />
								<router-link tag="a" :to="`/empresa`"> Empresa </router-link><br />
								<router-link tag="a" :to="`/contacto`">
									Contacto
								</router-link>
							</div>
							<div class="col-12 col-md-4 col-lg-4  order-md-1 order-lg-2 mb-5">
								<h4 class="footer-title">
									Venta de unidades
								</h4>
								<a href="https://audicertificados.com.uy" target="_blank">Audi Usados Certificados</a><br />
								<a href="https://www.vwseminuevos.com.uy" target="_blank">Volkswagen Semi Nuevos</a><br />
							</div>
						</div>
					</div>

					<div class="col-12 col-md-6 col-lg-4 order-md-2 order-lg-3 mb-5 mt-2 text-right">
						<img
							src="https://maps.googleapis.com/maps/api/staticmap?center=-34.8980529,-56.1827367&zoom=13&size=300x220&maptype=roadmap&markers=color:blue%7C-34.8980529,-56.1827367&key=AIzaSyCj3tM4TV-9pxXhbTpvEd0v2K1bFCZOjz0"
							alt=""
							class="img-fluid"
						/>
					</div>
				</div>
			</div>
			<div class="container-fluid credits text-center p-3">
				<small> <router-link tag="a" :to="`/politica-de-privacidad`">Política de privacidad </router-link> | </small>
				<small> Lestido Renting Copyright &copy; {{ year }} </small>
			</div>
		</footer>
	</div>
</template>

<script>
export default {
	name: 'Footer',

	data() {
		return {
			year: new Date().getFullYear(),
		}
	},
}
</script>

<style scoped>
footer {
	border-top: solid rgb(230, 230, 230) 1px;
	margin-top: 32px;
	width: 100%;
	color: rgb(8, 8, 8);
	background-color: #fff;
}
h5 {
	font-size: 15px;
}
.footer-title {
	font-size: 16px;
	font-weight: 600;
	margin-bottom: 6px;
}
a {
	color: rgb(8, 8, 8);
}
.fa {
	color: #cfcfcf;
}
.logo {
	max-width: 152px;
}
.credits {
}
@media (max-width: 768px) {
	footer {
		text-align: center;
	}
}
</style>
