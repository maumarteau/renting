<template>
	<Layout :loading="loading" :pageTitle="'Vehículos Usados'">
		<!-- <template #breadcrumb>
			<Breadcrumb />
		</template> -->

		<template #cta>
			<router-link tag="a" to="/products/create" class="btn btn-success"
				>Crear vehículo</router-link
			>
		</template>

		<div class="main-container container-fluid">
			<div class="card mt-2">
				<div class="card-body">
					<!-- Filtros -->
					<div class="row mb-3">
						<div class="col-md-3">
							<input
								type="text"
								class="form-control"
								placeholder="Buscar por título, marca, modelo..."
								v-model="filters.search"
								@input="debounceSearch"
							/>
						</div>
						<div class="col-md-2">
							<select class="form-control" v-model="filters.status" @change="load">
								<option value="">Todos los estados</option>
								<option value="ACTIVE">Activo</option>
								<option value="INACTIVE">Inactivo</option>
								<option value="SOLD">Vendido</option>
							</select>
						</div>
						<div class="col-md-2">
							<input
								type="text"
								class="form-control"
								placeholder="Marca"
								v-model="filters.brand"
								@input="debounceSearch"
							/>
						</div>
						<div class="col-md-2">
							<input
								type="number"
								class="form-control"
								placeholder="Precio min"
								v-model="filters.minPrice"
								@input="debounceSearch"
							/>
						</div>
						<div class="col-md-2">
							<input
								type="number"
								class="form-control"
								placeholder="Precio max"
								v-model="filters.maxPrice"
								@input="debounceSearch"
							/>
						</div>
						<div class="col-md-1">
							<button class="btn btn-secondary" @click="clearFilters">Limpiar</button>
						</div>
					</div>

					<draggable
						tag="table"
						class="table table-clickeable"
						v-model="list"
						handle=".handle"
						ghost-class="ghost"
						@change="sorted"
					>
						<tr class="table-head" slot="header">
							<td width="36"></td>
							<td>Vehículo</td>
							<td>Marca/Modelo</td>
							<td>Precio</td>
							<td>Año</td>
							<td>Estado</td>
							<td>Acciones</td>
						</tr>

						<router-link
							tag="tr"
							:to="`${$route.path}/${item.id}`"
							v-for="(item, index) of list"
							:key="index"
						>
							<td>
								<div class="handle">
									<i
										class="icon icon-arrow-combo text-secondary"
									></i>
								</div>
							</td>
							<td>
								<div class="d-flex align-items-center">
									<img
										v-if="item.files && item.files.length > 0"
										:src="item.files[0].urlThumb"
										:alt="item.title"
										class="product-thumb mr-3"
									/>
									<div>
										<strong>{{ item.title }}</strong>
										<div class="text-muted small">{{ item.slug }}</div>
									</div>
								</div>
							</td>
							<td>
								<div v-if="item.brand || item.model">
									<strong>{{ item.brand }}</strong>
									<div class="text-muted small">{{ item.model }}</div>
								</div>
								<span v-else class="text-muted">-</span>
							</td>
							<td class="text-right">
								<div v-if="item.price > 0">
									<strong>U$S {{ item.price.toLocaleString() }}</strong>
								</div>
								<span v-else class="text-muted">-</span>
							</td>
							<td>
								<span v-if="item.year">{{ item.year }}</span>
								<span v-else class="text-muted">-</span>
							</td>
							<td>
								<span class="d-flex">
									<i
										class="dot mt-1 mr-1"
										:class="`dot-${item.statusClass}`"
									></i>
									<span>{{ item.statusText }}</span>
								</span>
							</td>
							<td>
								<div class="btn-group" role="group">
									<router-link
										:to="`/products/${item.id}/edit`"
										class="btn btn-sm btn-outline-primary"
										@click.stop
									>
										<i class="icon icon-edit"></i>
									</router-link>
									<button
										class="btn btn-sm btn-outline-danger"
										@click.stop="deletePrompt(item)"
									>
										<i class="icon icon-trashcan"></i>
									</button>
								</div>
							</td>
						</router-link>
					</draggable>

					<div
						class="alert alert-info text-center"
						v-if="list.length == 0 && !loading"
					>
						No se han encontrado vehículos
					</div>

					<Pagination
						:pageData="pagination"
						@pageChange="pageChange"
						@pageLength="pageLength"
					/>
				</div>
			</div>
		</div>
	</Layout>
</template>

<script>
import gql from 'graphql-tag'
import listMixins from '@/mixins/listMixins'
import Breadcrumb from './Breadcrumb'

export default {
	name: 'Products',
	components: {
		Breadcrumb,
	},
	mixins: [listMixins],
	data() {
		return {
			list: [],
			loading: false,
			filters: {
				search: '',
				status: '',
				brand: '',
				minPrice: '',
				maxPrice: '',
			},
			searchTimeout: null,
		}
	},
	beforeMount() {
		this.filters = this.getValidUrlParams()
		this.load()
	},
	methods: {
		load() {
			this.loading = true
			this.$apollo
				.query({
					query: gql`
						query($take: Int, $skip: Int, $search: String, $status: String, $brand: String, $minPrice: Float, $maxPrice: Float) {
							products(take: $take, skip: $skip, search: $search, status: $status, brand: $brand, minPrice: $minPrice, maxPrice: $maxPrice) {
								data {
									id
									title
									slug
									price
									brand
									model
									year
									status
									statusText
									statusClass
									files {
										id
										url
										urlThumb
									}
								}
								pageInfo {
									totalItems
								}
							}
						}
					`,
					variables: {
						take: this.pagination.length,
						skip: this.pagination.skip,
						search: this.filters.search || null,
						status: this.filters.status || null,
						brand: this.filters.brand || null,
						minPrice: this.filters.minPrice ? parseFloat(this.filters.minPrice) : null,
						maxPrice: this.filters.maxPrice ? parseFloat(this.filters.maxPrice) : null,
					},
					fetchPolicy: 'network-only',
				})
				.then((data) => {
					this.list = data.data.products.data
					this.pagination.pageInfo = data.data.products.pageInfo
					this.loading = false
				})
		},
		debounceSearch() {
			clearTimeout(this.searchTimeout)
			this.searchTimeout = setTimeout(() => {
				this.load()
			}, 500)
		},
		clearFilters() {
			this.filters = {
				search: '',
				status: '',
				brand: '',
				minPrice: '',
				maxPrice: '',
			}
			this.load()
		},
		sorted(data) {
			if (data.moved) {
				var order = Math.max.apply(
					Math,
					this.list.map(function(o) {
						return o.order
					})
				)
				this.list.map((i) => {
					i.order = order
					order = order - 1
				})

				var list = this.list.map((i) => {
					return { id: i.id, order: i.order }
				})

				return this.$apollo
					.mutate({
						mutation: gql`
							mutation($list: [OrderList]!) {
								productSort(list: $list)
							}
						`,
						variables: {
							list,
						},
					})
					.then(() => {
						this.$toast.success('Listado actualizado')
					})
					.catch((error) => {
						this.parseGQLErrors(error)
					})
			}
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
					this.load()
				})
				.catch((error) => {
					this.parseGQLErrors(error)
				})
		},
	},
}
</script>

<style scoped>
.ghost {
	background-color: #f3f3f3 !important;
}

.product-thumb {
	width: 50px;
	height: 50px;
	object-fit: cover;
	border-radius: 4px;
}

.table-clickeable tr {
	cursor: pointer;
}

.table-clickeable tr:hover {
	background-color: #f8f9fa;
}
</style>
