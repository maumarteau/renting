<template>
	<Layout :loading="loading" :pageTitle="'Flota'">
		<template #breadcrumb>
			<Breadcrumb />
		</template>

		<template #cta>
			<router-link tag="a" to="/categories/create" class="btn btn-success"
				>Crear vehículo</router-link
			>
		</template>

		<div class="main-container container-fluid">
			<div class="card mt-2">
				<div class="card-body">
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
							<td>Precio</td>
							<td></td>
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
								<div class="d-flex">
									<i
										class="icon icon-star mr-2"
										v-if="item.featured"
									></i>
									<i
										class="icon icon-star text-secondary mr-2"
										v-else
									></i>
									{{ item.name }}
								</div>
							</td>
							<td class="text-right">
								<div v-if="item.price > 0">
									Desde U$S {{ item.price }}
								</div>
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
						</router-link>
					</draggable>

					<div
						class="alert alert-info text-center"
						v-if="list.length == 0"
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
	name: 'CarCategories',
	components: {
		Breadcrumb,
	},
	mixins: [listMixins],
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
			this.loading = true
			this.$apollo
				.query({
					query: gql`
						query($take: Int, $skip: Int) {
							carCategories(take: $take, skip: $skip) {
								data {
									id
									featured
									price
									name
									order
									status
									statusText
									statusClass
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
					},
					fetchPolicy: 'network-only',
				})
				.then((data) => {
					this.list = data.data.carCategories.data
					this.pagination.pageInfo = data.data.carCategories.pageInfo
					this.loading = false
				})
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
				console.log(list)

				return this.$apollo
					.mutate({
						mutation: gql`
							mutation($list: [OrderList]!) {
								carCategorySort(list: $list)
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
	},
}
</script>

<style>
.ghost {
	background-color: #f3f3f3 !important;
}
</style>
