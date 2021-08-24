<template>
	<div id="app">
		<router-view :key="$route.fullPath" @loadMe="loadMe"></router-view>
		<vue-progress-bar></vue-progress-bar>
		<Footer></Footer>
	</div>
</template>

<script>
import gql from 'graphql-tag'
import { mapMutations, mapGetters } from 'vuex'
import Footer from '@/components/layout/Footer'

export default {
	name: 'App',
	components: {
		Footer,
	},
	beforeMount() {
		this.loadMe()
	},
	computed: {
		...mapGetters(['isAuthenticated', 'loggedUser']),
	},

	methods: {
		...mapMutations(['logout', 'updateLoggedUser']),
		loadMe() {
			console.log('loadMe', this.isAuthenticated)
			if (this.isAuthenticated) {
				this.$apollo
					.query({
						query: gql`
							query {
								userLogged {
									id
									name
									lastname
									email
								}
							}
						`,
						fetchPolicy: 'no-cache',
					})
					.then(({ data }) => {
						this.updateLoggedUser(data.userLogged)
					})
					.catch(() => {
						this.$router.push('/logout')
					})
			} else {
				this.$router.push('/logout')
			}
		},
	},
}
</script>
