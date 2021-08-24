<template>
	<div>
		<Layout :navFixed="false" :loading="loading">
			<div class="container p-0">
				<div class="row">
					<div class="col d-md-flex  ">
						<div class="only-desktop">
							<img src="@/assets/img/maintenance.jpg" alt="" class="hover-effect img-fluid" />
						</div>

						<div class="p-5" style="max-width:500px" v-if="!sended">
							<h1 class="title  mb-3">Coordiná tu <strong>mantenimiento</strong></h1>
							<p class="lead-text ">
								<!-- Queremos que disfrutes del mejor servicio, estés en el taller, en el trabajo o a kilómetros de casa. Por
								eso, contactanos siempre que lo necesites: te esperamos al otro lado del teléfono para responder a tus
								preguntas. -->
								Luego de que completes y envíes este formulario te llamaremos para acordar día y hora del servicio.
							</p>

							<div class="p-4">
								<FormulateForm ref="form" v-model="form" @submit="save">
									<FormulateInput
										label="Matrícula"
										name="mat"
										ref="first"
										validation-name="Matrícula"
										validation="required"
									/>
									<FormulateInput
										label="Kilometraje"
										name="km"
										type="number"
										validation-name="Kilometraje"
										validation="required"
									/>

									<FormulateInput
										label="Nombre y apellido"
										name="name"
										validation-name="Nombre y apellido"
										validation="required"
									/>
									<FormulateInput
										label="Correo electrónico"
										name="email"
										type="email"
										validation-name="Email"
										validation="required"
									/>

									<FormulateInput
										label="Teléfono"
										name="phone"
										type="phone"
										validation-name="Teléfono"
										validation="required|^phone"
									/>

									<FormulateInput label="Comentarios adicionales" name="message" type="textarea" />

									<FormulateInput type="submit" name="Enviar formulario" />
								</FormulateForm>
							</div>
						</div>
						<div class="p-5" style="max-width:500px" v-if="sended">
							<h1 class="title  mb-3">Solicitud <strong>enviada!</strong></h1>
							<p class="lead-text ">
								Tu solicitud fué realizada con éxito.<br />
								Un representante de Lestido Renting te contactará en menos de 24 horas hábiles.
								<br />
								<br />
								<strong>
									Una vez acordada la fecha y hora del servicio, te agradecemos respetar el horario de ingreso para evitar
									demoras.
								</strong>
							</p>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	</div>
</template>

<script>
import gql from 'graphql-tag'
import Layout from '@/components/Layout'

export default {
	name: 'Maintenance',
	metaInfo: {
		title: 'Agendá tu mantenimiento',
	},
	components: {
		Layout,
	},
	beforeMount() {
		if (this.$route.path == '/agenda-mantenimiento/gracias') {
			this.sended = true
		}
	},
	mounted() {
		this.$nextTick(() => {
			if (this.$refs.first) {
				this.$refs.first.$el.querySelector('.formulate-input-element input').focus()
			}
		})
	},
	data() {
		return {
			loading: false,
			sended: false,
			form: {
				car: '',
				mat: '',
				department: '',
				name: '',
				email: '',
				phone: {
					countryCode: 'UY',
				},
				message: '',
			},
			departments: {
				Montevideo: 'Montevideo',
				Artigas: 'Artigas',
				Canelones: 'Canelones',
				CerroLargo: 'Cerro Largo',
				Colonia: 'Colonia',
				Durazno: 'Durazno',
				Flores: 'Flores',
				Florida: 'Florida',
				Lavalleja: 'Lavalleja',
				Maldonado: 'Maldonado',
				Paysandú: 'Paysandú',
				RioNegro: 'Río Negro',
				Rivera: 'Rivera',
				Rocha: 'Rocha',
				Salto: 'Salto',
				SanJose: 'San José',
				Soriano: 'Soriano',
				Tacuarembo: 'Tacuarembó',
				TreintayTres: 'Treinta y Tres',
			},
		}
	},
	methods: {
		save() {
			if (!this.loading) {
				this.loading = true
				const data = {
					name: this.form.name,
					phone: this.form.phone.countryCode + ' ' + this.form.phone.international,
					email: this.form.email,
					subject: 'Agenda mantenimiento',
					message: `Matricula: ${this.form.mat}<br>Kilometraje: ${this.form.km}<br>Comentarios: ${this.form.message}`,
				}

				this.$apollo
					.mutate({
						mutation: gql`
							mutation($data: MessageInput!) {
								messageCreate(data: $data) {
									id
								}
							}
						`,
						variables: {
							data,
						},
					})
					.then(() => {
						this.loading = false
						this.$router.push(`/agenda-mantenimiento/gracias`)
					})
					.catch((error) => {
						this.parseGQLErrors(error)
						this.loading = false
					})
			}
		},
	},
}
</script>

<style scoped>
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
</style>
