<template>
	<Layout :loading="loading" :pageTitle="'Slides'">
		<template #breadcrumb>
			<Breadcrumb />
		</template>

		<template #cta>
			<router-link
				tag="a"
				:to="`${$route.path}/create`"
				class="btn btn-success"
				>Crear slide</router-link
			>
		</template>

		<div class="container-fluid">
			<div class="card mt-2">
				<div class="card-body">
					<div class="filters-box justify-content-between">
						<div class="filter">
							<label>BUSCAR</label>
							<div class="filter-input">
								<i class="icon icon-search"></i>
								<input
									type="text"
									class="form-control"
									placeholder="Buscar"
									v-model="filters.search"
									@keyup.enter="updateFilters($event)"
								/>
								<div
									class="btn btn-light btn-clear-filter"
									v-if="filters.search"
									@click="
										filters.search = null
										updateFilters()
									"
								>
									<i class="icon icon-close"></i>
								</div>
							</div>
						</div>
					</div>

					<table class="table table-clickeable">
						<tr class="table-head">
							<td>Slide</td>
							<td></td>
						</tr>

						<tr v-for="item of list" :key="item.id">
							<td>
								<div class="d-flex align-items-center">
									<span
										class="thumb thumb-xl"
										v-if="item.image"
										:style="
											`background-image:url(${item.image.urlThumb})`
										"
									></span>
									<div class="tc">
										<span
											v-html="item.formattedTitle"
										></span>
										<span class="text-secondary">{{
											item.link
										}}</span>
									</div>
								</div>
							</td>
							<td class="text-right">
								<b-dropdown
									no-caret
									right
									v-b-tooltip.hover
									title="Mas acciones"
									v-b-tooltip.left
								>
									<template
										v-slot:button-content
										v-if="item.loading"
										><i class="icon icon-load-c spin"></i
									></template>
									<template v-slot:button-content v-else
										><i class="icon icon-dot-3"></i
									></template>
									<router-link
										tag="b-dropdown-item"
										:to="`${$route.path}/${item.id}`"
										>Editar</router-link
									>
									<b-dropdown-divider></b-dropdown-divider>
									<b-dropdown-item
										@click="deletePrompt(item)"
										class="delete-item"
										><i class="icon icon-trashcan"></i>
										Eliminar</b-dropdown-item
									>
								</b-dropdown>
							</td>
						</tr>
					</table>

					<div
						class="alert alert-info text-center"
						v-if="list.length == 0"
					>
						No se han encontrado slides
					</div>

					<Pagination
						:pageData="pagination"
						@pageChange="pageChange"
					/>
				</div>
			</div>
		</div>
	</Layout>
</template>

<script>
import gql from 'graphql-tag'
import mixins from '@/mixins/mixins'
import listMixins from '@/mixins/listMixins'

import Breadcrumb from './Breadcrumb'

export default {
	name: 'MainSliders',
	components: {
		Breadcrumb,
	},
	mixins: [mixins, listMixins],
	data() {
		return {
			list: [],
			loading: false,
		}
	},
	beforeMount() {
		this.filters = this.getValidUrlParams()
		this.load()
	},
	methods: {
		load() {
			this.$apollo
				.query({
					query: gql`
						query($take: Int, $skip: Int, $search: String) {
							mainSliders(
								take: $take
								skip: $skip
								search: $search
							) {
								data {
									id
									formattedTitle
									link
									image {
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
						search: this.filters.search,
					},
					fetchPolicy: 'no-cache',
				})
				.then((data) => {
					this.list = data.data.mainSliders.data.map((item) => {
						return { ...item, loading: false }
					})
					this.pagination.pageInfo = data.data.mainSliders.pageInfo
					this.loading = false
				})
		},

		deletePrompt(item) {
			this.$dialog
				.confirm(
					{
						title: 'Eliminar slides',
						body: `¿Está seguro que desea eliminar el slide <strong>"${item.title}"</strong>?`,
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
							mainSliderDelete(id: $id) {
								id
							}
						}
					`,
					variables: {
						id: item.id,
					},
				})
				.then(() => {
					this.$toast.success('Elemento eliminado correctamente')
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

<style></style>
