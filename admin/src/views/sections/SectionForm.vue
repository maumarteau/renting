<template>
	<Layout :loading="loading" :pageTitle="title">
		<template #cta>
			<!-- <div @click="save" class="btn btn-success">Crear</div> -->
		</template>
		<div class="main-container container">
			<div class="card mt-2">
				<div class="card-body">
					<FormulateForm v-model="form" ref="form" @submit="save">
						<div class="row">
							<div class="col-12 col-md-3 ">
								<FormulateInput
									label="Imagen"
									name="image"
									type="file"
									listStyle="thumb"
									accept="images"
									validation-name="Imagen de portada"
									:help="
										`La imagen debe ser de 752px x 348px`
									"
								/>
							</div>
							<div class="col-12 col-md-9 ">
								<FormulateInput
									label="Titulo del artículo"
									name="title"
									validation-name="Título"
									validation="required"
								/>

								<FormulateInput
									type="slug"
									name="slug"
									label="Slug"
									placeholder="Slug"
									help="Url a la página"
									validation="required|checkSlug"
									:validation-rules="{
										checkSlug,
									}"
									:validation-messages="{
										checkSlug:
											'Ya existe el slug ingresado',
									}"
								/>

								<FormulateInput
									name="featured"
									type="checkbox"
									label="Página destacada"
									help="Las páginas destacadas serán mostradas en el home de la web"
								/>
							</div>
						</div>

						<div class="mt-3">
							<FormulateInput
								type="wysiwyg"
								name="intro"
								height="200px"
								label="Introducción"
								:showMenuBar="false"
							/>
						</div>

						<div class="mt-3">
							<FormulateInput
								v-model="fullSection"
								type="checkbox"
								label="Redireccionar a otra sección?"
								help="Si redirecciona a otra sección debe ingresar el link, de lo contrario, ingrese el contenido a mostrar"
							/>
						</div>

						<div class="mt-3" v-show="fullSection">
							<FormulateInput v-model="form.link" label="Link" />
						</div>

						<div class="mt-3" v-show="!fullSection">
							<FormulateInput
								type="wysiwyg"
								name="body"
								label="Contenido"
								:showMenuBar="true"
							/>
						</div>

						<div class="d-flex justify-content-between mt-3">
							<div
								class="btn btn-outline-secondary"
								@click="$router.go(-1)"
							>
								Cancelar
							</div>
							<FormulateInput type="submit" :label="title" />
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

export default {
	name: 'PageForm',
	mixins: [mixins],
	data() {
		return {
			title: 'Crear sección',
			action: 'create',
			fullSection: false,
			form: {
				image: null,
				slug: '',
				title: '',
				featured: false,
				body: '',
			},
			loading: false,
		}
	},
	beforeMount() {
		if (this.$route.params.id) {
			this.action = 'update'
			this.load()
		}
	},
	methods: {
		save() {
			this.loading = true
			let dataInput = {
				image: this.form.image ? this.form.image.id : null,
				slug: this.form.slug,
				title: this.form.title,
				body: !this.fullSection ? this.form.body : '',
				intro: this.form.intro,
				featured: this.form.featured,
				link: this.fullSection ? this.form.link : null,
			}
			if (this.action == 'create') {
				this.create(dataInput)
			}
			if (this.action == 'update') {
				this.update(dataInput)
			}
		},
		create(data) {
			this.$apollo
				.mutate({
					mutation: gql`
						mutation($data: PageInput!) {
							pageCreate(data: $data) {
								id
							}
						}
					`,
					variables: {
						data,
					},
				})
				.then(() => {
					this.$toast.success('Sección creada correctamente')
					this.loading = false
					this.$router.go(-1)
				})
				.catch((error) => {
					this.parseGQLErrors(error)
					this.loading = false
				})
		},
		update(dataInput) {
			this.$apollo
				.mutate({
					mutation: gql`
						mutation($id: ID!, $data: PageInput!) {
							pageUpdate(id: $id, data: $data) {
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
					this.$toast.success('Sección editada correctamente')
					this.loading = false
					this.$router.go(-1)
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
							page(id: $id) {
								id
								slug
								title
								intro
								body
								link
								featured
								image {
									id
									filename
									type
									url
									urlThumb
								}
							}
						}
					`,
					variables: { id: this.$route.params.id },
					fetchPolicy: 'network-only',
				})
				.then((data) => {
					this.form = data.data.page
					this.title = `Editar sección`
					this.loading = false
				})
				.catch(() => {
					this.$toast.success('El item que desea editar no existe')
					this.$router.go(-1)
				})
		},

		async checkSlug({ value }) {
			if (value) {
				const existentSlug = await this.$apollo.query({
					query: gql`
						query($slug: String!) {
							pageCheckSlug(slug: $slug) {
								id
							}
						}
					`,
					variables: { slug: value },
					fetchPolicy: 'network-only',
				})
				if (
					existentSlug.data.pageCheckSlug != null &&
					existentSlug.data.pageCheckSlug.id != this.$route.params.id
				) {
					return false
				}
				return true
			}
			return true
		},
	},
}
</script>

<style scoped>
.card-body /deep/ .formulate-form {
	max-width: 100%;
}
</style>
