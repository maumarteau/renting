import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		authState: {
			token: localStorage.getItem('token-admin') || '',
			loggedUser: JSON.parse(localStorage.getItem('logged-admin')) || '',
			status: 'notlogged',
		},
		settings: {},
	},
	getters: {
		isAuthenticated: (state) => !!state.authState.token,
		authStatus: (state) => state.authState.status,
		loggedUser: (state) => state.authState.loggedUser,
		loggedAccount: (state) => state.authState.loggedUser.account,
		settings: (state) => state.settings,
	},
	mutations: {
		authSuccess(state, { token, loggedUser }) {
			state.authState.status = 'logged'
			state.authState.token = token
			state.authState.loggedUser = loggedUser
			localStorage.setItem('logged-admin', JSON.stringify(loggedUser))
		},
		updateLoggedUser(state, loggedUser) {
			state.authState.loggedUser = loggedUser
			localStorage.setItem('logged-admin', JSON.stringify(loggedUser))
		},
		logout(state) {
			state.authState.token = ''
			state.authState.loggedUser = {}
			state.authState.status = 'notlogged'
			localStorage.removeItem('logged-admin')
		},
		storeSettings(state, settings) {
			state.settings = settings
		},
	},
})
