<template>

<Layout :loading="loading" :pageTitle="'Secciones'">
	
	<template #breadcrumb>
		<Breadcrumb/>
	</template>

	<template #cta>
		<router-link tag="a" to="/sections/create" class="btn btn-success">Crear sección</router-link>
	</template>

	<div class="main-container container-fluid">
		<div class="card mt-2">
			<div class="card-body">

				<table class="table table-clickeable">
					<tr class="table-head">
						<td></td>
						<td>Titulo</td>
						<td>Url</td>
						<td></td>
					</tr>
					
					<tr v-for="item of list" :key="item.id" >
						<td>
							<i v-if="item.featured" class="icon icon-star"></i>
							<i v-else class="icon icon-star-o"></i>
						</td>
						<td>
							<div class="d-flex align-items-center">
								{{item.title}}
							</div>
						</td>
						<td>
							<div class="d-flex align-items-center">
								{{item.slug}}
							</div>
						</td>
						<td class="text-right">
							<b-dropdown no-caret right v-b-tooltip.hover title="Mas acciones" v-b-tooltip.left>
								<template v-slot:button-content v-if="item.loading"><i class="icon icon-load-c spin"></i></template>
								<template v-slot:button-content v-else><i class="icon icon-dot-3"></i></template>
								<router-link tag="b-dropdown-item" :to="`${$route.path}/${item.id}`" >Editar</router-link>
								<b-dropdown-divider></b-dropdown-divider>
								<b-dropdown-item @click="deletePrompt(item)">Eliminar</b-dropdown-item>
							</b-dropdown>
						</td>
					</tr>
					
				</table>


				<div class="alert alert-info text-center" v-if="list.length==0" >No se han encontrado páginas</div>
				
				<Pagination :pageData="pagination" @pageChange="pageChange" />

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
	name: 'Pages',
	components:{
		Breadcrumb
	},
	mixins:[listMixins],
	data () {
		return {
			list:[],
			loading: false,
		}
	},
	beforeMount(){
		this.filters = this.getValidUrlParams();
		this.load();
	},
	methods:{
		load(){
			this.$apollo.query({
				query: gql`query ($take: Int, $skip: Int) {
					pages(take: $take, skip: $skip) {
						data{
							id
							title
							slug
							featured
						}
						pageInfo{
							totalItems
						}
					}
				}`,
				variables: {
					take: this.pagination.length,
					skip: this.pagination.skip,
				},
				fetchPolicy: 'network-only',
			})
			.then((data) => {
				this.list = data.data.pages.data;
				this.pagination.pageInfo = data.data.pages.pageInfo;
				this.loading = false
			})
		},
		
		
		deletePrompt(item) {
			this.$dialog
			.confirm({
					title: 'Eliminar página',
					body: `¿Está seguro que desea eliminar la página <strong>"${item.title}"</strong>?`
				},
				{
				okText: 'Eliminar',
				customClass: 'delete-prompt'
			})
			.then(() => {
				this.delete(item)
			})
		},


		delete(item) {
			item.loading = true
			this.$apollo.mutate({
				mutation: gql`mutation ( $id: ID! ){
					pageDelete( id: $id) {
						id
					}
				}`,
				variables: {
					id: item.id,
				}
			})
			.then(() => {
				this.$toast.success('Elemento eliminado correctamente')
				this.load()
			})
			.catch( (error) => {
				this.errors = this.parseGQLErrors(error)
				item.loading = false
			})
		}
	}
}


</script>

<style>


</style>
