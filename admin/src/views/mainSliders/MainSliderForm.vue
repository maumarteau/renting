<template>
	<Layout :loading="loading" :pageTitle="title">
		<template #breadcrumb>
			<Breadcrumb />
		</template>

		<template #cta> </template>

		<div class="main-container">
			<div class="card mt-2">
				<div class="card-body">
					<FormulateForm ref="form" v-model="form" @submit="save">
						<FormulateInput
							label="Imagen"
							name="image"
							type="file"
							accept="images"
							listStyle="thumb"
							:displayBlock="true"
							validation-name="Imagen"
							validation="required"
							:help="`La imagen debe ser de 664px x 900px`"
						/>

						<FormulateInput
							label="Titulo"
							name="title"
							validation-name="Título"
							validation="required"
							help="Negrita: *text* - Italica _text_"
						/>

						<FormulateInput
							label="Descripción"
							name="description"
							type="textarea"
						/>

						<FormulateInput
							label="Link"
							type="url"
							name="link"
							validation-name="Link"
							help="http://"
						/>

						<div class="d-flex justify-content-between mt-4">
							<FormulateInput
								type="button"
								data-ghost
								@click="$router.go(-1)"
								>Cancelar</FormulateInput
							>
							<FormulateInput type="button" disabled v-if="saving"
								>Guardando <span class="loader"
							/></FormulateInput>

							<FormulateInput
								type="submit"
								:label="title"
								v-else
							/>
						</div>
					</FormulateForm>
				</div>
			</div>
		</div>
	</Layout>
</template>

<script>
import gql from 'graphql-tag'

import mixins from '@/mixins/mixins'
import formMixins from '@/mixins/formMixins'
import Breadcrumb from './Breadcrumb'

export default {
	name: 'MainSliderForm',
	components: {
		Breadcrumb,
	},
	mixins: [mixins, formMixins],
	data() {
		return {
			title: 'Crear slide',
			action: 'create',
			loading: false,
			workshops: [],
			form: {
				title: null,
				link: null,
				image: null,
			},
		}
	},
	beforeMount() {
		if (this.$route.params.id) {
			this.title = `Editar slide`
			this.action = 'update'
			this.load()
		}
	},
	methods: {
		save() {
			if (!this.saving) {
				this.saving = true
				let dataInput = {
					image: this.form.image.id || null,
					title: this.form.title,
					description: this.form.description,
					link: this.form.link,
				}

				if (this.action == 'create') {
					this.create(dataInput)
				}
				if (this.action == 'update') {
					this.update(dataInput)
				}
			}
		},
		create(data) {
			this.$apollo
				.mutate({
					mutation: gql`
						mutation($data: MainSliderInput!) {
							mainSliderCreate(data: $data) {
								id
							}
						}
					`,
					variables: {
						data,
					},
				})
				.then(() => {
					this.$toast.success('Slide creado correctamente')
					this.$router.go(-1)
					this.saving = false
				})
				.catch((error) => {
					this.parseGQLErrors(error)
					this.saving = false
				})
		},
		update(dataInput) {
			this.$apollo
				.mutate({
					mutation: gql`
						mutation($id: ID!, $data: MainSliderInput!) {
							mainSliderUpdate(id: $id, data: $data) {
								id
							}
						}
					`,
					variables: {
						id: this.$route.params.id,
						data: dataInput,
					},
				})
				.then(() => {
					this.$toast.success('Slide editado correctamente')
					this.$router.go(-1)
					this.saving = false
				})
				.catch((error) => {
					this.errors = this.parseGQLErrors(error)
					this.saving = false
				})
		},
		load() {
			this.$apollo
				.query({
					query: gql`
						query($id: ID!) {
							mainSlider(id: $id) {
								id
								title
								link
								description
								image {
									id
									type
									filename
									url
									urlThumb
								}
							}
						}
					`,
					variables: { id: this.$route.params.id },
					fetchPolicy: 'network-only',
				})
				.then(({ data }) => {
					this.form = {
						...data.mainSlider,
					}
					this.loading = false
				})
				.catch((err) => {
					this.$toast.success('El item que desea editar no existe')
					this.$router.go(-1)
				})
		},
	},
}
</script>

<style></style>
