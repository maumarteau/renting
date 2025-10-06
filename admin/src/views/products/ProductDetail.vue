<template>
	<Layout :loading="loading" :pageTitle="item ? item.title : 'Detalle del vehículo'">
		<template #breadcrumb>
			<Breadcrumb />
		</template>

		<template #cta>
			<div class="d-flex align-items-center">
				<span class="d-flex mr-3">
					<i
						class="dot mt-1 mr-1"
						:class="`dot-${item.statusClass}`"
					></i>
					<span>{{ item.statusText }}</span>
				</span>
				<router-link
					:to="`/products/${item.id}/edit`"
					class="btn btn-primary mr-2"
				>
					<i class="icon icon-edit mr-1"></i>
					Editar
				</router-link>
				<b-dropdown no-caret right class="dropdown-dots">
					<template v-slot:button-content><i class="icon icon-dot-3"></i></template>
					<b-dropdown-item @click="toggleStatus()">
						<span v-if="item.status == 'INACTIVE'">Activar</span>
						<span v-else-if="item.status == 'ACTIVE'">Marcar como vendido</span>
						<span v-else>Activar</span>
					</b-dropdown-item>
					<b-dropdown-item @click="deletePrompt(item)" class="delete-item">
						<i class="icon icon-trashcan"></i> Eliminar
					</b-dropdown-item>
				</b-dropdown>
			</div>
		</template>

		<div class="main-container container-fluid" v-if="!loading && item">
			<div class="row">
				<!-- Galería de fotos -->
				<div class="col-12 col-lg-8">
					<div class="card">
						<div class="card-header">
							<h5 class="mb-0">Galería de fotos</h5>
						</div>
						<div class="card-body">
							<div class="row" v-if="item.files && item.files.length > 0">
								<div class="col-6 col-md-4 col-lg-3 mb-3" v-for="file in item.files" :key="file.id">
									<div class="photo-thumbnail">
										<img :src="file.urlThumb" :alt="item.title" class="img-fluid" />
									</div>
								</div>
							</div>
							<div v-else class="text-center text-muted py-4">
								<i class="icon icon-image" style="font-size: 48px;"></i>
								<p class="mt-2">No hay fotos disponibles</p>
							</div>
						</div>
					</div>
				</div>

				<!-- Información del vehículo -->
				<div class="col-12 col-lg-4">
					<div class="card">
						<div class="card-header">
							<h5 class="mb-0">Información del vehículo</h5>
						</div>
						<div class="card-body">
							<div class="info-item mb-3">
								<label class="text-muted small">Título</label>
								<div class="font-weight-bold">{{ item.title }}</div>
							</div>

							<div class="info-item mb-3">
								<label class="text-muted small">Slug</label>
								<div class="font-monospace small">{{ item.slug }}</div>
							</div>

							<div class="info-item mb-3">
								<label class="text-muted small">Precio</label>
								<div class="font-weight-bold text-success">
									U$S {{ item.price ? item.price.toLocaleString() : '0' }}
								</div>
							</div>

							<div class="info-item mb-3" v-if="item.brand">
								<label class="text-muted small">Marca</label>
								<div>{{ item.brand }}</div>
							</div>

							<div class="info-item mb-3" v-if="item.model">
								<label class="text-muted small">Modelo</label>
								<div>{{ item.model }}</div>
							</div>

							<div class="info-item mb-3" v-if="item.year">
								<label class="text-muted small">Año</label>
								<div>{{ item.year }}</div>
							</div>

							<div class="info-item mb-3" v-if="item.mileage">
								<label class="text-muted small">Kilometraje</label>
								<div>{{ item.mileage }}</div>
							</div>

							<div class="info-item mb-3" v-if="item.fuel">
								<label class="text-muted small">Combustible</label>
								<div>{{ getFuelLabel(item.fuel) }}</div>
							</div>

							<div class="info-item mb-3" v-if="item.transmission">
								<label class="text-muted small">Transmisión</label>
								<div>{{ getTransmissionLabel(item.transmission) }}</div>
							</div>

							<div class="info-item mb-3" v-if="item.color">
								<label class="text-muted small">Color</label>
								<div>{{ item.color }}</div>
							</div>
						</div>
					</div>

				</div>
			</div>

			<!-- Descripción -->
			<div class="row mt-4" v-if="item.description">
				<div class="col-12">
					<div class="card">
						<div class="card-header">
							<h5 class="mb-0">Descripción</h5>
						</div>
						<div class="card-body">
							<div v-html="item.description"></div>
						</div>
					</div>
				</div>
			</div>

			<!-- Información adicional -->
			<div class="row mt-4">
				<div class="col-12">
					<div class="card">
						<div class="card-header">
							<h5 class="mb-0">Información adicional</h5>
						</div>
						<div class="card-body">
							<div class="row">
								<div class="col-md-6">
									<div class="info-item mb-3">
										<label class="text-muted small">Fecha de creación</label>
										<div>{{ formatDate(item.createdAt) }}</div>
									</div>
								</div>
								<div class="col-md-6">
									<div class="info-item mb-3">
										<label class="text-muted small">Última actualización</label>
										<div>{{ formatDate(item.updatedAt) }}</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</Layout>
</template>

<script>
import gql from 'graphql-tag'
import mixins from '@/mixins/mixins'
import Breadcrumb from './Breadcrumb'

export default {
	name: 'ProductDetail',
	components: {
		Breadcrumb,
	},
	mixins: [mixins],
	data() {
		return {
			item: null,
			loading: true,
		}
	},
	beforeMount() {
		this.load()
	},
	methods: {
		load() {
			this.loading = true
			this.$apollo
				.query({
					query: gql`
						query($id: ID!) {
							product(id: $id) {
								id
								title
								slug
								description
								price
								files {
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
								createdAt
								updatedAt
							}
						}
					`,
					variables: { id: this.$route.params.id },
					fetchPolicy: 'network-only',
				})
				.then(({ data }) => {
					this.item = data.product
					this.loading = false
				})
				.catch(() => {
					this.$toast.error('El vehículo no existe')
					this.$router.push('/products')
				})
		},
		toggleStatus() {
			let newStatus = 'ACTIVE'
			if (this.item.status === 'ACTIVE') {
				newStatus = 'SOLD'
			} else if (this.item.status === 'SOLD') {
				newStatus = 'ACTIVE'
			}

			this.$apollo
				.mutate({
					mutation: gql`
						mutation($id: ID!, $status: String!) {
							productToggleStatus(id: $id, status: $status) {
								id
								status
								statusText
								statusClass
							}
						}
					`,
					variables: {
						id: this.item.id,
						status: newStatus,
					},
				})
				.then(({ data }) => {
					this.item.status = data.productToggleStatus.status
					this.item.statusText = data.productToggleStatus.statusText
					this.item.statusClass = data.productToggleStatus.statusClass
					this.$toast.success('Estado actualizado correctamente')
				})
				.catch((error) => {
					this.parseGQLErrors(error)
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
					this.$router.push('/products')
				})
				.catch((error) => {
					this.parseGQLErrors(error)
				})
		},
		getFuelLabel(fuel) {
			const labels = {
				gasoline: 'Nafta',
				diesel: 'Gasoil',
				hybrid: 'Híbrido',
				electric: 'Eléctrico',
			}
			return labels[fuel] || fuel
		},
		getTransmissionLabel(transmission) {
			const labels = {
				manual: 'Manual',
				automatic: 'Automática',
			}
			return labels[transmission] || transmission
		},
		formatDate(dateString) {
			if (!dateString) return '-'
			return new Date(dateString).toLocaleDateString('es-ES', {
				year: 'numeric',
				month: 'long',
				day: 'numeric',
				hour: '2-digit',
				minute: '2-digit',
			})
		},
	},
}
</script>

<style scoped>
.photo-thumbnail {
	border: 1px solid #dee2e6;
	border-radius: 4px;
	overflow: hidden;
	height: 150px;
}

.photo-thumbnail img {
	width: 100%;
	height: 100%;
	object-fit: cover;
}

.info-item label {
	display: block;
	margin-bottom: 4px;
}

.font-monospace {
	font-family: 'Courier New', monospace;
}
</style>
