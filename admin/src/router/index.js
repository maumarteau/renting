import Vue from 'vue'
import Router from 'vue-router'

const baseRoutes = [
	{
		path: '/login',
		name: 'Login',
		component: () =>
			import(/* webpackChunkName: "Dashboard" */ '@/views/Login'),
	},
	{
		path: '/logout',
		name: 'Logout',
		component: () =>
			import(/* webpackChunkName: "Dashboard" */ '@/views/Logout'),
	},
	{
		path: '/',
		name: 'Messages',
		meta: {
			requiresAuth: true,
			section: 'messages',
		},
		component: () =>
			import(
				/* webpackChunkName: "Dashboard" */ '@/views/messages/Messages'
			),
	},

	{
		path: '*',
		redirect: '/',
	},
]
const loadedRoutes = loadRoutes()
const routes = baseRoutes.concat(...loadedRoutes)

Vue.use(Router)

let router = new Router({
	mode: 'history',
	routes,
})

router.beforeEach((to, from, next) => {
	var loggedIn = localStorage.getItem('logged-admin')
	loggedIn = JSON.parse(loggedIn)
	// console.log('router.beforeEach loggedIn', loggedIn);
	if (to.matched.some((record) => record.meta.requiresAuth)) {
		if (loggedIn) {
			//console.log('router  estoy logueado')
			next()
			return
		}
		//console.log('router  go to login')
		next('/login')
		// next()
	} else {
		next()
	}
})

function loadRoutes() {
	const context = require.context('@/views/', true, /\.js$/)
	return context
		.keys()
		.map(context) // import module
		.map((m) => m.default) // get `default` export from each resolved module
}
export default router
