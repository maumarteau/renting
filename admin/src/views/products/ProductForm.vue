<template>
	<Layout :loading="loading || saving" :pageTitle="title">
		<!-- <template #breadcrumb>
			<Breadcrumb />
		</template> -->

		<template #cta>
			<b-dropdown no-caret right class="dropdown-dots" v-if="action == 'update' && form">
				<template v-slot:button-content><i class="icon icon-dot-3"></i></template>
				<b-dropdown-item @click="deletePrompt(form)" class="delete-item"
					><i class="icon icon-trashcan"></i> Eliminar</b-dropdown-item
				>
			</b-dropdown>
		</template>

		<FormulateForm v-model="form" name="form" ref="formProduct" style="max-width:100%" @submit="save">
			<div class="main-container container" v-if="!loading">
				<div class="row row-xs mt-4">
					<div class="col-12 col-md-4">
						<div class="card ">
							<div class="card-body">
								<FormulateInput
									label="Imagen Listado"
									name="image"
									type="file"
									accept="images"
									listStyle="thumb"
									:displayBlock="true"
									validation-name="Imagen"
									validation="required"
									:help="`La imagen debe ser de 591px x 422px con fondo transparente`"
								/>
								
								<FormulateInput label="Título" name="title" validation-name="Título" validation="required" />

								<FormulateInput
									label="Precio (USD)"
									type="number"
									name="price"
									validation-name="Precio"
									validation="required|min:1"
									step="0.01"
									min="0"
								/>

								<FormulateInput
									label="Estado"
									name="status"
									type="select"
									:options="{
										ACTIVE: 'Activo',
										INACTIVE: 'Inactivo',
										SOLD_AND_PUBLISHED: 'Vendido y publicado',
										SOLD: 'Vendido y oculto',
									}"
								/>

								

								<FormulateInput
									label="Marca"
									name="brand"
									placeholder="Ej: Toyota, Volkswagen, Ford..."
									validation-name="Marca"
									validation="required"
								/>

								<FormulateInput
									label="Modelo"
									name="model"
									placeholder="Ej: Corolla, Golf, Focus..."
									validation-name="Modelo"
									validation="required"
								/>

								<FormulateInput
									label="Año"
									type="number"
									name="year"
									:min="1990"
									:max="new Date().getFullYear() + 1"
									validation-name="Año"
									validation="required"
								/>

								<FormulateInput
									label="Kilometraje"
									name="mileage"
									placeholder="Ej: 50,000 km"
									validation-name="Kilometraje"
									validation="required"
								/>

								<FormulateInput
									label="Combustible"
									name="fuel"
									type="select"
									:options="{
										gasoline: 'Nafta',
										diesel: 'Gasoil',
										hybrid: 'Híbrido',
										electric: 'Eléctrico',
									}"
									validation-name="Combustible"
									validation="required"
								/>

								<FormulateInput
									label="Transmisión"
									name="transmission"
									type="select"
									:options="{
										manual: 'Manual',
										automatic: 'Automática',
									}"
									validation-name="Transmisión"
									validation="required"
								/>

								<FormulateInput
									label="Color"
									name="color"
									placeholder="Ej: Blanco, Negro, Azul..."
									validation-name="Color"
									validation="required"
								/>
							</div>
						</div>
					</div>

					<div class="col-12 col-md-8">
						<div class="card ">
							<div class="card-body">
								<b-tabs content-class="mt-3">
									<b-tab title="Información General">
										<div class="row row-xs">
											<div class="col-12">
												<FormulateInput
													type="wysiwyg"
													name="description"
													height="200px"
													label="Descripción"
													validation-name="Descripción"
													validation="required"
													:showMenuBar="false"
												/>
											</div>
										</div>
									</b-tab>

									<b-tab title="Galería">
										<FormulateInput
											label="Fotos del vehículo"
											name="gallery"
											type="file"
											accept="images"
											listStyle="thumb"
											:multiple="true"
											validation-name="Fotos"
											:help="`Sube múltiples fotos del vehículo. Se recomienda al menos 3-5 fotos. (Opcional)`"
										/>
									</b-tab>
								</b-tabs>

								<hr />
								<div class="d-flex justify-content-between mt-4">
									<FormulateInput type="button" data-ghost @click="$router.go(-1)">Cancelar</FormulateInput>
									<FormulateInput type="button" disabled v-if="saving">Guardando <span class="loader"/></FormulateInput>
									<FormulateInput type="submit" :label="title" v-else />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</FormulateForm>
	</Layout>
</template>

<script>
import gql from 'graphql-tag'
import mixins from '@/mixins/mixins'
import formMixins from '@/mixins/formMixins'
import Breadcrumb from './Breadcrumb'

export default {
	name: 'ProductForm',
	components: {
		Breadcrumb,
	},
	mixins: [mixins, formMixins],
	data() {
		return {
			title: 'Crear vehículo',
			action: 'create',
			btnAction: 'Crear vehículo',
			form: {
				title: null,
				description: null,
				price: null,
				gallery: [],
				image: null,
				brand: null,
				model: null,
				year: null,
				mileage: null,
				fuel: null,
				transmission: null,
				color: null,
				status: 'ACTIVE',
			},
			loading: true,
			saving: false,
		}
	},

	async beforeMount() {
		this.loading = true
		if (this.$route.params.id) {
			this.action = 'update'
			this.title = `Editar vehículo`
			this.btnAction = 'Guardar cambios'
			await this.load()
		}
		this.loading = false
	},

	methods: {
		async save() {
			this.saving = true

			console.log(this.form)

			let dataInput = {
				title: this.form.title,
				description: this.form.description,
				price: this.form.price ? parseFloat(this.form.price) : 0,
				gallery: this.form.gallery.length > 0 ? this.form.gallery.map((f) => (f ? f.id : null)) : [],
				image: this.form.image ? this.form.image.id : null,
				brand: this.form.brand,	
				model: this.form.model,
				year: this.form.year ? parseInt(this.form.year) : null,
				mileage: this.form.mileage,
				fuel: this.form.fuel,
				transmission: this.form.transmission,
				color: this.form.color,
				status: this.form.status,
			}
			console.log(dataInput)

			if (this.action == 'create') {
				await this.create(dataInput)
			}
			if (this.action == 'update') {
				await this.update(dataInput)
			}
			this.saving = false
		},

		create(data) {
			return this.$apollo
				.mutate({
					mutation: gql`
						mutation($data: ProductInput!) {
							productCreate(data: $data) {
								id
							}
						}
					`,
					variables: {
						data,
					},
				})
				.then(() => {
					this.$toast.success('Vehículo creado correctamente')
					this.loading = false
					this.saving = false
					this.$router.go(-1)
				})
				.catch((error) => {
					this.parseGQLErrors(error)
					this.loading = false
				})
		},

		update(data) {
			return this.$apollo
				.mutate({
					mutation: gql`
						mutation($id: ID!, $data: ProductInput!) {
							productUpdate(id: $id, data: $data) {
								id
							}
						}
					`,
					variables: {
						id: this.$route.params.id,
						data,
					},
				})
				.then(() => {
					this.$toast.success('Vehículo editado correctamente')
					this.saving = false
					this.$router.go(-1)
				})
				.catch((error) => {
					this.errors = this.parseGQLErrors(error)
				})
		},

		load() {
			return this.$apollo
				.query({
					query: gql`
						query($id: ID!) {
							product(id: $id) {
								id
								title
								slug
								description
								price
								gallery {
									id
									type
									filename
									url
									urlThumb
								}
								image {
									id
									type
									filename
									url
									urlThumb
								}
								brand
								model
								year
								mileage
								fuel
								transmission
								color
								status
								statusText
								statusClass
							}
						}
					`,
					variables: { id: this.$route.params.id },
					fetchPolicy: 'network-only',
				})
				.then(({ data }) => {
					console.log(data.product)
					this.form = data.product
					
				})
				.catch(() => {
					this.$toast.error('El vehículo que desea editar no existe')
					this.$router.go(-1)
				})
		},

		deletePrompt(item) {
			this.$dialog
				.confirm(
					{
						title: 'Eliminar vehículo',
						body: `¿Está seguro que desea eliminar el vehículo "<strong>${item.title}</strong>"?`,
					},
					{
						okText: 'Eliminar',
						customClass: 'delete-prompt',
					}
				)
				.then(() => {
					this.delete(item)
				})
		},

		delete(item) {
			this.$apollo
				.mutate({
					mutation: gql`
						mutation($id: ID!) {
							productDelete(id: $id) {
								id
							}
						}
					`,
					variables: {
						id: item.id,
					},
				})
				.then(() => {
					this.$toast.success('Vehículo eliminado correctamente')
					this.$router.go(-1)
				})
				.catch((error) => {
					this.errors = this.parseGQLErrors(error)
				})
		},
	},
}
</script>
