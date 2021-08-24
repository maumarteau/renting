<template>
	<div class="login-page bg-degree">
		<div class="login">
			<div class="text-center">
				<h3>Ingreso administrador</h3>
				<p>Ingresá a tu cuenta con tu email y contraseña</p>
				<form @submit.prevent="login" class="mt-4">
					<div class="row">
						<div class="col-12">
							<FormulateForm v-model="form" @submit="login()">
								<FormulateInput
									class="mt-3"
									name="email"
									type="email"
									label="Email"
									placeholder="Ingrese su email"
									validation="required|email"
									:wrapper-class="['login-input']"
								/>

								<FormulateInput
									class="mt-3"
									label="Contraseña"
									name="password"
									type="password"
									placeholder="Ingrese su contraseña"
									validation="required"
								/>

								<div
									class="alert alert-danger text-white mt-4"
									v-if="loginError"
								>
									{{ errorMessage }}
								</div>

								<button
									class="btn btn-success btn-block btn-lg mt-4"
									type="submit"
								>
									<span v-if="loading">Ingresando...</span>
									<span v-if="!loading">Ingresar</span>
								</button>
							</FormulateForm>

							<p class="text-center p-4">
								<small
									>Si tienes problemas para ingresar a tu
									cuenta, ponete en contacto con
									nosotros.</small
								>
							</p>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
import gql from 'graphql-tag'
import { onLogin } from '../vue-apollo'
import { mapMutations } from 'vuex'
import mixins from '@/mixins/mixins'

export default {
	name: 'Login',
	data() {
		return {
			form: {},
			loginError: false,
			loading: false,
			errorMessage: '',
		}
	},

	mixins: [mixins],
	methods: {
		...mapMutations(['authSuccess', 'logout']),
		login() {
			this.loginError = false
			this.errorMessage = ''
			if (!this.loading && this.email != '' && this.password != '') {
				this.loading = true

				return this.$apollo
					.mutate({
						mutation: gql`
							mutation userLogin(
								$email: String!
								$password: String!
								$accessTo: String!
							) {
								userLogin(
									email: $email
									password: $password
									accessTo: $accessTo
								) {
									token
									user {
										id
										name
										lastname
										email
										avatar {
											urlThumb
										}
										# permissions
									}
								}
							}
						`,
						variables: {
							email: this.form.email,
							password: this.form.password,
							accessTo: 'admin',
						},
					})
					.then((data) => {
						console.log('login', data)
						let access_token = data.data.userLogin.token
						let logged_user = data.data.userLogin.user
						onLogin(
							this.$apollo.provider.defaultClient,
							access_token,
							logged_user
						).then(() => {
							console.log('asds')
							this.authSuccess({
								token: access_token,
								loggedUser: logged_user,
							})
							this.loading = false
							this.$emit('loadMe')
							this.$router.push('/')
						})
						this.loading = false
					})
					.catch((errors) => {
						// this.parseGQLErrors(errors)
						this.loading = false
						console.log(errors.graphQLErrors[0].message)
						this.loginError = true
						this.errorMessage = errors.graphQLErrors[0]
							? errors.graphQLErrors[0].message
							: 'Error al iniciar sesion'
						this.loading = false
					})
			}
		},
	},
}
</script>

<style scoped>
.login-page {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100vh;
}
.login .logo {
	margin: 0px auto;
	display: block;
}
.login h3 {
	font-size: 14px;
	font-weight: 600;
	text-transform: uppercase;
}
.login {
	text-align: left;
	max-width: 400px;
	padding: 16px;
	background-color: #fff;
}
.login .formulate-input {
	margin-bottom: 8px !important;
}
.login .formulate-input-label {
	/* color:#fff !important; */
}
.login input {
	/* background-color: #ffffff15 !important;
    color: #fff; */
	/* border: none !important; */
	/* font-size: 14px !important; */
	/* padding: .85rem !important; */
}
.login .btn {
	font-size: 16px;
	font-weight: 500;
	text-transform: uppercase;
}
</style>
