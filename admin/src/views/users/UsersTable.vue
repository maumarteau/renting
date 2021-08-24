<template>

	<div>

		<div class="filters-box justify-content-between">
			<div class="filter" v-if="showSearch">
				<label>BUSCAR</label>
				<div class="filter-input">
					<i class="icon icon-search"></i>
					<input 
						type="text" 
						class="form-control" 
						placeholder="Buscar" 
						v-model="filters.search" 
						@keyup.enter="updateFilters($event)">
					<div class="btn btn-light btn-clear-filter" v-if="filters.search" @click="filters.search=null; updateFilters()"><i class="icon icon-close"></i></div>
				</div>
			</div>
			<div class="align-self-end">
				<router-link tag="a" :to="`/settings/users/create`" class="btn btn-success " v-if="canCreate" >Crear usuario</router-link>
			</div>
		</div>

		<table class="table table-clickeable">
			<tr class="table-head">
				<td>Nombre</td>
				<td>Contacto</td>
				<td>Última actividad</td>
				<td></td>
			</tr>
			
			<tr v-for="item of list" :key="item.id" >
				<td>
					<div class="tc">
						<span >{{item.name}} {{item.lastname}}</span>
					</div>
				</td>
				<td>
					<div class="tc">
						<span >{{item.email}}</span>
						<span class="text-primary" v-if="item.phone && item.phone.validated">{{item.phone.international}}</span>
					</div>
				</td>
				<td>
					<div class="tc">
						<span v-if="item.lastActivity">{{item.lastActivity.createdAt | moment('from' )}}</span>
					</div>
				</td>
				<td class="text-right">
					<div class="badge badge-success mr-2" v-if="item.synched" v-b-tooltip.hover :title="`Sincronizado`"><i class="icon icon-arrows-ccw"></i></div>
					
					<b-dropdown no-caret right v-b-tooltip.hover title="Mas acciones" v-b-tooltip.left>
						<template v-slot:button-content v-if="item.loading"><i class="icon icon-load-c spin"></i></template>
						<template v-slot:button-content v-else><i class="icon icon-dot-3"></i></template>
						<router-link tag="b-dropdown-item" :to="`/users/${item.id}`" >Editar</router-link>
						<router-link tag="b-dropdown-item" :to="`/users/${item.id}`" >Ver actividad</router-link>
						<b-dropdown-divider></b-dropdown-divider>
						<b-dropdown-item @click="deletePrompt(item)">Eliminar</b-dropdown-item>
					</b-dropdown>
				</td>
			</tr>
			
		</table>


		<div class="alert alert-info text-center" v-if="list.length==0" >No se han encontrado usuarios</div>
		
		<Pagination :pageData="pagination" @pageChange="pageChange" />

	</div>

</template>

<script>
import gql from 'graphql-tag'
import mixins from '@/mixins/mixins'
import listMixins from '@/mixins/listMixins'

export default {
	name: 'UsersTable',
	mixins:[mixins, listMixins],
	
	props:{
		showSearch:{
			type: Boolean,
			default: true
		},
		canCreate:{
			type: Boolean,
			default: false
		},
	},


	data () {
		return {
			list: [],
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
				query: gql`query ($take: Int, $skip: Int, $search: String) {
					users(take: $take, skip: $skip, search: $search) {
						data{
							id
							name
							lastname
							email
							phone{
								international
								validated
							}
							lastActivity{
								title
								action
								createdAt
							}
						}
						pageInfo{
							totalItems
						}
					}
				}`,
				variables: {
					take: this.pagination.length,
					skip: this.pagination.skip,
					search: this.filters.search,
				},
				fetchPolicy: 'no-cache',
			})
			.then((data) => {
				this.list = data.data.users.data.map((item)=>{
					return { ...item, loading:false}
				})
				this.pagination.pageInfo = data.data.users.pageInfo
				this.loading = false
			})
		},


		deletePrompt(item) {
			this.$dialog
			.confirm('¿Está seguro que desea eliminar este usuario?')
			.then(() => {
				this.delete(item)
			})
		},
		
		
		delete(item) {
			item.loading = true
			this.$apollo.mutate({
				mutation: gql`mutation ( $id: ID! ){
					userDelete( id: $id) {
						id
					}
				}`,
				variables: {
					id: item.id,
				}
			})
			.then(() => {
				this.$toast.success('Usuario eliminado correctamente')
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
