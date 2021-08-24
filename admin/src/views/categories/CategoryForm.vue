<template>
	<Layout :loading="loading || saving" :pageTitle="title">
		<template #cta>
			<b-dropdown
				no-caret
				right
				class="dropdown-dots"
				v-if="action == 'update' && form"
			>
				<template v-slot:button-content
					><i class="icon icon-dot-3"></i
				></template>
				<b-dropdown-item @click="deletePrompt(form)" class="delete-item"
					><i class="icon icon-trashcan"></i>
					Eliminar</b-dropdown-item
				>
			</b-dropdown>

			<!-- <div class="d-flex align-items-center">
				<span class="d-flex mr-3">
					<i
						class="dot mt-1 mr-1"
						:class="`dot-${form.statusClass}`"
					></i>
					<span>{{ form.statusText }}</span>
				</span>
				<b-dropdown
					no-caret
					right
					class="dropdown-dots"
					v-if="action == 'update' && form"
				>
					<template v-slot:button-content
						><i class="icon icon-dot-3"></i
					></template>
					<b-dropdown-item @click="toggleStatus()">
						<span v-if="form.status == 'INACTIVE'"
							>Activar tarifa</span
						>
						<span v-else>Desactivar tarifa</span>
					</b-dropdown-item>
					<b-dropdown-item
						@click="deletePrompt(form)"
						class="delete-item"
						><i class="icon icon-trashcan"></i>
						Eliminar</b-dropdown-item
					>
				</b-dropdown>
			</div> -->
		</template>

		<FormulateForm
			v-model="form"
			name="form"
			ref="formCategory"
			style="max-width:100%"
			@submit="save"
		>
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
									:help="
										`La imagen debe ser de 591px x 422px con fondo transparente`
									"
								/>

								<!-- <FormulateInput
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
								/> -->

								<FormulateInput
									label="Nombre"
									name="name"
									validation-name="Nombre"
									validation="required"
								/>

								<FormulateInput
									label="Intro"
									name="intro"
									validation-name="Intro"
									validation="required"
									type="textarea"
								/>

								<FormulateInput
									label="Estado"
									name="status"
									type="select"
									:options="{
										ACTIVE: 'Activo',
										INACTIVE: 'Inactivo',
									}"
								/>
							</div>
						</div>
					</div>

					<div class="col-12 col-md-8">
						<div class="card ">
							<div class="card-body">
								<b-tabs content-class="mt-3">
									<b-tab title="Propiedades">
										<div class="row row-xs">
											<div class="col-12 ">
												<FormulateInput
													label="Imagen principal"
													name="imageMain"
													type="file"
													accept="images"
													listStyle="thumb"
													:displayBlock="true"
													validation-name="Imagen"
													validation="required"
													:help="
														`La imagen debe ser de 1400px x 640px`
													"
												/>
											</div>

											<div class="col-12 mt-3">
												<FormulateInput
													label="Titulo de descripción"
													name="detailTitle"
													validation-name="Título"
													validation="required"
												/>
											</div>

											<div class="col-12 mt-3">
												<FormulateInput
													type="wysiwyg"
													name="detail"
													height="200px"
													label="Descripción"
													:showMenuBar="false"
												/>
											</div>
											<div class="col-12 mt-3">
												<FormulateInput
													label="Ficha técnica"
													name="dataSheet"
													type="file"
													accept="file"
													:displayBlock="true"
													:help="`Ficha técnica PDF`"
												/>
											</div>

											<!-- <div class="col-12 col-md-6">
												<FormulateInput
													class="mb-3"
													label="Combustible"
													name="propFuel"
													:options="{
														gasoline: 'Nafta',
														gasoil: 'Gasoil',
														electric: 'Eléctrico',
													}"
													type="select"
												/>
											</div>
											<div class="col-12 col-md-6">
												<FormulateInput
													class="mb-3"
													label="Transmisión"
													name="propTransmission"
													:options="{
														manual: 'Manual',
														auto: 'Automática',
													}"
													type="select"
												/>
											</div>
											<div class="col-12 col-md-6">
												<FormulateInput
													class="mb-3"
													label="Pasajeros"
													name="propPassengers"
													:options="{
														1: '1',
														2: '2',
														3: '3',
														4: '4',
														5: '5',
														6: '6',
														7: '7',
														8: '8',
														9: '9',
														10: '10',
														11: '11',
														12: '12',
														13: '13',
														14: '14',
														15: '15',
													}"
													type="select"
												/>
											</div>
											<div class="col-12 col-md-6">
												<FormulateInput
													class="mb-3"
													label="Puertas"
													name="propDoors"
													:options="{
														1: '1',
														2: '2',
														3: '3',
														4: '4',
														5: '5',
														6: '6',
														7: '7',
														8: '8',
													}"
													type="select"
												/>
											</div>
											<div class="col-12 col-md-6">
												<FormulateInput
													class="mb-3"
													label="Valijas"
													name="propLuggages"
													:options="{
														1: '1',
														2: '2',
														3: '3',
														4: '4',
														5: '5',
														6: '6',
														7: '7',
														8: '8',
													}"
													type="select"
												/>
											</div>
											<div class="col-12 col-md-6">
												<FormulateInput
													class="mb-3"
													label="Equipaje de mano"
													name="propHandLuggages"
													:options="{
														1: '1',
														2: '2',
														3: '3',
														4: '4',
														5: '5',
														6: '6',
														7: '7',
														8: '8',
													}"
													type="select"
												/>
											</div>
											<div class="col-12 col-md-6">
												<FormulateInput
													class="mb-3 mt-4 ml-2"
													name="propAirConditioner"
													type="checkbox"
													label="Aire Acondicionado"
												/>
											</div> -->
										</div>
									</b-tab>

									<b-tab title="Oferta">
										<div class="row row-xs">
											<FormulateInput
												class="mt-3"
												name="featured"
												type="checkbox"
												label="Oportunidad?"
												help="Las categorías marcadas como oportunidad serán mostradas en el home de la web."
											/>

											<FormulateInput
												class="mr-2"
												label="Precio desde"
												type="price"
												name="price"
												validation-name="Precio"
												:validation="
													form.featured
														? 'required'
														: null
												"
											/>

											<FormulateInput
												type="wysiwyg"
												name="featuredDetail"
												height="200px"
												label="Información de oferta"
												:showMenuBar="false"
											/>
										</div>
									</b-tab>

									<b-tab title="Galería">
										<FormulateInput
											label="Imagen"
											name="gallery"
											type="file"
											accept="images"
											listStyle="thumb"
											:multiple="true"
											validation-name="Imagen"
										/>

										<!-- <CategoryImages
											:images="form.images"
											@created="imageCreated"
											@updated="imageUpdated"
											@deleted="imageDeleted"
										/> -->
									</b-tab>
								</b-tabs>

								<hr />
								<div
									class="d-flex justify-content-between mt-4"
								>
									<FormulateInput
										type="button"
										data-ghost
										@click="$router.go(-1)"
										>Cancelar</FormulateInput
									>
									<FormulateInput
										type="button"
										disabled
										v-if="saving"
										>Guardando <span class="loader"
									/></FormulateInput>
									<FormulateInput
										type="submit"
										:label="title"
										v-else
									/>
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
import CategoryImages from '@/views/categories/CategoryImages'

export default {
	name: 'CarCategoryForm',
	components: {
		CategoryImages,
	},
	mixins: [mixins, formMixins],
	data() {
		return {
			title: 'Crear categoría',
			action: 'create',
			btnAction: 'Crear categoría',
			form: {
				image: null,
				imageMain: null,
				images: [],
				dataSheet: null,
				slug: null,
				name: null,
				detailTitle: null,
				detail: null,
				featuredDetail: null,
				propAirConditioner: 1,
				propPassengers: 1,
				propDoors: 1,
				propLuggages: 1,
				propHandLuggages: 1,
				propTransmission: null,
				propFuel: null,
			},
			categoryTypes: [],
			offices: [],
			concepts: [],
			loading: true,
			saving: false,
		}
	},

	async beforeMount() {
		this.loading = true
		// await this.fetchData()
		if (this.$route.params.id) {
			this.action = 'update'
			this.title = `Editar categoría`
			this.btnAction = 'Guardar cambios'
			await this.load()
		}
		this.loading = false
	},

	methods: {
		imageCreated(data) {
			console.log('image created', data)
			this.form.images = data
		},
		imageUpdated(data) {
			console.log('image updated', data)
			// this.form.images.push(data)
		},
		imageDeleted(data) {
			console.log('image deleted', data)
			// this.form.images.push(data)
		},

		async save() {
			this.saving = true

			let dataInput = {
				image: this.form.image ? this.form.image.id : null,
				imageMain: this.form.imageMain ? this.form.imageMain.id : null,
				dataSheet: this.form.dataSheet ? this.form.dataSheet.id : null,
				name: this.form.name,
				detailTitle: this.form.detailTitle,
				intro: this.form.intro,
				detail: this.form.detail,
				price: this.form.price ? parseFloat(this.form.price) : 0,
				propFuel: this.form.propFuel,
				propTransmission: this.form.propTransmission,
				propPassengers: parseInt(this.form.propPassengers),
				propDoors: parseInt(this.form.propDoors),
				propLuggages: parseInt(this.form.propLuggages),
				propHandLuggages: parseInt(this.form.propHandLuggages),
				propAirConditioner: this.form.propAirConditioner ? true : false,
				featured: this.form.featured ? true : false,
				featuredDetail: this.form.featuredDetail,
				status: this.form.status,
				images: this.form.images
					? this.form.images.map((i) => {
							return {
								title: i.title,
								body: i.body,
								image: i.image ? i.image.id : null,
							}
					  })
					: [],
				gallery:
					this.form.gallery.length > 0
						? this.form.gallery.map((i) => (i ? i.id : null))
						: [],
			}

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
						mutation($data: CarCategoryInput!) {
							carCategoryCreate(data: $data) {
								id
							}
						}
					`,
					variables: {
						data,
					},
				})
				.then(() => {
					this.$toast.success('Categoría creada correctamente')
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
						mutation($id: ID!, $data: CarCategoryInput!) {
							carCategoryUpdate(id: $id, data: $data) {
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
					this.$toast.success('Categoría editada correctamente')
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
							carCategory(id: $id) {
								id
								name
								slug
								image {
									id
									type
									filename
									url
									urlThumb
								}
								dataSheet {
									id
									type
									filename
									url
									urlThumb
								}
								imageMain {
									id
									type
									filename
									url
									urlThumb
								}
								gallery {
									id
									type
									filename
									url
									urlThumb
								}
								images {
									id
									title
									body
									image {
										id
										type
										filename
										url
										urlThumb
									}
								}
								detailTitle
								intro
								detail
								featured
								featuredDetail
								price
								propAirConditioner
								propPassengers
								propDoors
								propLuggages
								propHandLuggages
								propTransmission
								propFuel
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
					this.form = data.carCategory
				})
				.catch(() => {
					this.$toast.success('El item que desea editar no existe')
					this.$router.go(-1)
				})
		},

		deletePrompt(item) {
			this.$dialog
				.confirm(
					{
						title: 'Eliminar categoría',
						body: `¿Está seguro que desea eliminar la categoría "<strong>${item.name}"</strong>?`,
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
			item.loading = true
			this.$apollo
				.mutate({
					mutation: gql`
						mutation($id: ID!) {
							carCategoryDelete(id: $id) {
								id
							}
						}
					`,
					variables: {
						id: item.id,
					},
				})
				.then(() => {
					this.$toast.success('Categoría eliminada correctamente')
					this.load()
				})
				.catch((error) => {
					this.errors = this.parseGQLErrors(error)
					item.loading = false
				})
		},
	},
}
</script>
