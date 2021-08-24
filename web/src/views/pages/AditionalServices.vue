<template>
	<div>
		<Layout :navFixed="false">
			<div class="container mt-5">
				<div class="row">
					<div class="col">
						<h1 class="title text-center mb-2">Servicios <strong>adicionales</strong></h1>

						<p class="lead-text p-4 mt-4 text-center m-auto" style="max-width:640px">
							Nuestros servicios adicionales te brindan toda la tranquilidad necesaria; no solo cuidamos tu flota, también a
							ti y a tus colaboradores.
							<br />
							<!-- <br />
							No solo pensamos en tu flota; también nos interesa
							cuidarte a ti y a tus colaboradores cuidar de ti y
							de tus colaboradores -->
						</p>
					</div>
				</div>
			</div>

			<div class="container-fluid">
				<div class="container">
					<div class="row">
						<div class="col-12 col-lg-5">
							<div class="p-0 p-md-5">
								<b-list-group class="group bg-transparent border-none">
									<b-list-group-item class="bg-transparent " v-for="(item, i) in items" :key="i">
										<div class="group-item-head" v-b-toggle="`collapse-${i}`">
											<div>{{ item.title }}</div>

											<div class="chevron chevron-bottom"></div>
										</div>
										<b-collapse :id="`collapse-${i}`" class="mt-2">
											<div v-html="item.text" class="p-2"></div>
										</b-collapse>
									</b-list-group-item>
								</b-list-group>
							</div>
						</div>

						<div class="col-12 col-lg-7 d-none d-md-block">
							<div class="p-4">
								<img src="@/assets/img/aditional-services.jpg" class="img-fluid hover-effect" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	</div>
</template>

<script>
import Layout from '@/components/Layout'

export default {
	name: 'AditionalServices',
	metaInfo: {
		title: 'Servicios adicionales',
	},
	components: {
		Layout,
	},
	data() {
		return {
			items: [
				{
					title: 'Seguimiento satelital',
					text:
						'Ubicación geográfica, velocidad, orientación y dirección en tiempo real. <br /> Viñetas de históricos (rutas, alarmas, visitas a puntos de interés, cumplimiento de rutas, velocidades alcanzadas, alarmas disparadas, etc.)<br /> Detección de apagado, encendido y movimiento del vehículo.<br />',
				},
				{
					title: 'Administración de conductores',
					text:
						'Relación de conductores con rutas, velocidades, alarmas.<br>Estadísticas de uso, excesos de velocidades, clientes visitados, detenciones cerca de su domicilio o puntos definidos.<br>Aplicación de escritorio que facilita a los encargados de la flota realizar las asignaciones sin tener que acceder a la web.',
				},
				{
					title: 'Administración de servicios',
					text: 'Cambios de aceite, alineaciones, balanceo, etc.<br>Notificaciones por kilometraje o intervalo de tiempo.',
				},
				{
					title: 'Traslado a taller',
					text: 'Servicio de recogida y devolución del vehículo de su casa al taller.',
				},
				{
					title: 'Traslado a aeropuertos',
					text: 'Servicio de chofer entre cualquier aeropuerto uruguayo y su domicilio.',
				},
				{
					title: 'Lavado',
					text: 'Servicio de lavado del vehículo incluyendo su recogida y entrega.',
				},
				{
					title: 'Chofer de urgencia',
					text: 'Ante indisposición del conductor relacionada con su salud (lesiones, mareos, jaquecas, vértigos, etc.).',
				},
			],
		}
	},
}
</script>

<style scoped>
.group {
}
.group /deep/ .list-group-item {
	border: none;
	border-bottom: 1px solid rgba(0, 0, 0, 0.125);
}

.group-item-head {
	font-size: 22px;
	padding: 3px;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.group-item-head .chevron {
	font-size: 16px;
}
</style>
