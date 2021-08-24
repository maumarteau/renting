<template>

<Layout :loading="loading" :pageTitle="title">

	<template #cta>
		<!-- <div @click="save" class="btn btn-success">Crear</div> -->
	</template>

	<div class="main-container">
		<div class="card mt-2">
			<div class="card-body">
							
				<FormulateForm
					ref="form"
					v-model="form"
					@submit="save" 
					>
					
					<FormulateInput
						label="Nombre"
						name="name"
						validation-name="Nombre"
						validation="required"
					/>
					
					<FormulateInput
						label="Apellido"
						name="lastname"
						validation-name="Apellido"
						validation="required"
					/>
					
					<FormulateInput
						label="Email"
						type="email"
						name="email"
						validation-name="Email"
						validation="required"
					/>

					<FormulateInput
						label="Teléfono"
						type="phone"
						name="phone"
						validation-name="Teléfono"
						validation="optional|^phone"
					/>

					<FormulateInput
						v-if="offices"
						label="Oficina"
						validation-name="Oficina"
						name="office"
						:options="offices"
						type="selectSearch"
						option-value="id"
						option-text="name"
						placeholder="Seleccione una oficina"
						validation="required"
					/>

					
					<div class="label">Permisos</div>
					
					<div class="w-100 border-bottom p-3" v-for="(section, sectionIndex)  in permissionsSections" :key="section.id">
						<div class="d-flex justify-content-between">
							<h5><small>{{section.name}}</small></h5>
							<div>
								<b-form-radio-group v-model="section.access" @change="permissionAccessChanged(sectionIndex)">
									<b-form-radio value="FULL">Full</b-form-radio>
									<b-form-radio value="SOME">Parcial</b-form-radio>
									<b-form-radio value="NONE">Ninguno</b-form-radio>
								</b-form-radio-group>
							</div>
						</div>
						<b-collapse  class="mt-2" :visible="section.access=='SOME'">
							<div class="list-group">
								<div class="item" v-for="permission in section.permissions" :key="permission.id" >
									<FormulateInput v-model="permission.selected" type="checkbox" class="mr-2" />
									<div class="flex-grow-1" @click="permission.selected = !permission.selected" >
										<h6>{{permission.name}}</h6>
										<p class="text-secondary" v-if="permission.description">{{permission.description}}</p>
									</div>
								</div>
							</div>
						</b-collapse>
					</div>

					
					<div class="d-flex justify-content-between mt-4">
						<FormulateInput type="button" data-ghost @click="$router.go(-1)" >Cancelar</FormulateInput>
						<FormulateInput type="button" disabled v-if="saving">Guardando <span class="loader" /></FormulateInput>
						<FormulateInput type="submit" :label="title" v-else />
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

export default {
	name: 'UserForm',
	mixins: [mixins, formMixins],
	data () {
		return {
			title: 'Crear usuario',
			action: 'create',
			loading: false,
			form:{
				name: null,
				lastname: null,
				email: null,
				phone: null,
				password: null,
				passwordConfirm: null,
			},
			offices:[],
			permissionsSections: [],
			

		}
	},
	async beforeMount(){
		this.loading = true
		this.offices = await this.fetchData()
		if(this.$route.params.id){
			this.action = 'update'
			this.title = `Editar usuario`
			await this.load()
		}
		this.loading = false
	},
	methods:{
		save(){
			if(!this.saving){
				this.saving = true
				let permissions = {}
				this.permissionsSections.forEach( g => { g.permissions.map( p => permissions[p.permission] = p.selected ) })
				let dataInput = {
					name: this.form.name,
					lastname: this.form.lastname,
					email: this.form.email,
					phone: this.form.phone,
					office: (this.form.office) ? this.form.office.id : null,
					password: this.form.password,
					permissions
				}
				
				if(this.action =='create'){
					this.create(dataInput)
				}
				if(this.action =='update'){
					this.update(dataInput)
				}
			}
		},

		create(data){
			this.$apollo.mutate({
				mutation: gql`mutation ( $data:UserInput! ){
					userCreate( data: $data) {
						id
					}
				}`,
				variables: {
					data
				}
			})
			.then(() => {
				this.$toast.success('Usuario creado correctamente')
				this.$router.go(-1)
				this.saving = false
			})
			.catch( (error) => {
				this.parseGQLErrors(error)
				this.saving = false
			})
		},

		update(dataInput){
			this.$apollo.mutate({
				mutation: gql`mutation ( $id: ID!, $data:UserInput! ){
					userUpdate( id: $id, data: $data) {
						id
					}
				}`,
				variables: {
					id: this.$route.params.id,
					data: dataInput
				}
			})
			.then(() => {
				this.$toast.success('Usuario editado correctamente')
				this.$router.go(-1)
				this.saving = false
			})
			.catch( (error) => {
				this.errors = this.parseGQLErrors(error)
				this.saving = false
			})
		},

		fetchData(){
			return this.$apollo.query({
				query: gql`query {
					offices {
						data{
							id
							name
						}
					}
				}`,
				fetchPolicy: 'network-only',
			})
			.then(({data}) => {
				return data.offices.data
			})
			.catch((err)=>{
				console.log(err)
			})

		},

		load(){
			this.loading = true
			return this.$apollo.query({
				query: gql`query ($id: ID!) {
					user(id: $id) {
						id
						name
						lastname
						email
						phone{
							countryCode
							national
							international
							type
							validated
						}
						office{ id }
						permissions
					}
					permissionSections{
						id
						name
						permissions{
							id
							name
							permission
							description
						}
					}
				}`,
				variables: { id: this.$route.params.id },
				fetchPolicy: 'network-only',
			})
			.then(({data}) => {				
				this.form = {
					...this.$omitDeep(data.user, "__typename"),
				}
				
				this.parsePermissions(data.permissionSections, data.user.permissions)
				
				this.loading = false
			})
			.catch((err)=>{
				this.$toast.success('El item que desea editar no existe')
				// this.$router.go(-1)
			})

		},

		parsePermissions(groups, userPermissions){
			groups = groups.map(group=>{
				const permissions = group.permissions.map( (p) => { 
					console.log(p.permission)
					p.selected= userPermissions[p.permission]
				})
				const selecteds = group.permissions.filter(perm => perm.selected==true )
				let access = 'NONE'
				if( permissions.length ){
					access = (selecteds.length == permissions.length ) ? 'FULL' : (selecteds.length>0) ? 'SOME' : 'NONE'
				}
				return { ...group, ...permissions, access}
			})
			this.permissionsSections = groups
		},


		permissionAccessChanged(sectionIndex){
			if(this.permissionsSections[sectionIndex].access == 'NONE'){
				this.permissionsSections[sectionIndex].permissions.map(p=> p.selected = false )
			}
			if(this.permissionsSections[sectionIndex].access == 'FULL'){
				this.permissionsSections[sectionIndex].permissions.map(p=> p.selected = true )
			}
		},

	
	}
}


</script>

<style scoped>

.list-group .item .formulate-input{
	margin: 4px 8px 4px 8px;
}

.list-group .item{
	align-items: center;
	padding: .5rem 0.5rem !important;
}
.list-group .item:last-child{
	border:none;
}
</style>
