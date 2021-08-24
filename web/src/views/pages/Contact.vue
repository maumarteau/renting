<template>
	<div>
		<Layout :navFixed="false" :loading="loading">
			<div class="container p-0">
				<div class="row">
					<div class="col d-md-flex  ">
						<div class="only-desktop">
							<img src="@/assets/img/contact.jpg" alt="" class="hover-effect img-fluid" />
						</div>

						<div class="p-5" style="max-width:500px" v-if="!sended">
							<h1 class="title  mb-3">Contá con <strong>nosotros</strong></h1>

							<p class="lead-text ">
								Queremos que disfrutes de todas las ventajas que te ofrece nuestro servicio.<br />
								<br />
								¿Aún tenés dudas? Contactanos y te asesoramos para que tomes la mejor decisión para tu negocio.
							</p>

							<div class="p-4">
								<FormulateForm ref="form" v-model="form" @submit="save">
									<FormulateInput
										label="Nombre y apellido"
										name="name"
										ref="first"
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
									<FormulateInput
										label="Mensaje"
										name="message"
										type="textarea"
										validation-name="Mensaje"
										validation="required|max:200,length"
									/>

									<FormulateInput type="submit" name="Enviar mensaje" />
								</FormulateForm>
							</div>
						</div>
						<div class="p-5" style="max-width:500px" v-if="sended">
							<h1 class="title  mb-3">Mensaje <strong>enviado!</strong></h1>
							<p class="lead-text ">
								Gracias por ponerte en contacto con nosotros!<br />
								En breve atenderemos tu mensaje y nos pondremos en contacto con usted.
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
	name: 'Home',
	metaInfo: {
		title: 'Contactanos',
	},
	components: {
		Layout,
	},
	beforeMount() {
		if (this.$route.path == '/contacto/gracias') {
			this.sended = true
		}
		this.$route.query.subject ? (this.subject = this.$route.query.subject) : (this.subject = 'Mensaje de contacto web')
	},
	data() {
		return {
			loading: false,
			sended: false,
			subject: '',
			form: {
				name: '',
				email: '',
				phone: {
					countryCode: 'UY',
				},
				message: this.$route.query.body
					? this.$route.query.body.replace(
							/\/n/g,
							`
`
					  )
					: '',
			},
		}
	},
	mounted() {
		this.$nextTick(() => {
			if (this.$refs.first) {
				this.$refs.first.$el.querySelector('.formulate-input-element input').focus()
			}
		})
	},
	methods: {
		save() {
			if (!this.loading) {
				this.loading = true
				const data = {
					subject: this.subject,
					name: this.form.name,
					phone: this.form.phone.countryCode + ' ' + this.form.phone.international,
					email: this.form.email,
					message: this.form.message,
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
						this.$router.push(`/contacto/gracias?subject=${this.subject}`)
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

.row /deep/ textarea {
	height: 100px;
}

.formulate-form /deep/ .formulate-input-label:after {
	content: ' *';
	font-size: 11px;
	color: rgb(173, 10, 10);
}
</style>
