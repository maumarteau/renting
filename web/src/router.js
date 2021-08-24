import Vue from 'vue'
import Router from 'vue-router'

const baseRoutes = [
	{
		path: '/',
		name: 'Home',
		component: () => import('@/views/home/Home'),
	},
	{
		path: '/servicios-adicionales',
		name: 'AditionalServices',
		component: () => import('@/views/pages/AditionalServices'),
	},
	{
		path: '/contacto',
		name: 'Contact',
		component: () => import('@/views/pages/Contact'),
	},
	{
		path: '/contacto/gracias',
		name: 'Contact',
		component: () => import('@/views/pages/Contact'),
	},
	{
		path: '/agenda-mantenimiento',
		name: 'MaintenanceSchedule',
		component: () => import('@/views/pages/MaintenanceSchedule'),
	},
	{
		path: '/agenda-mantenimiento/gracias',
		name: 'MaintenanceSchedule',
		component: () => import('@/views/pages/MaintenanceSchedule'),
	},
	{
		path: '/flota',
		name: 'Fleet',
		component: () => import('@/views/pages/Fleet'),
	},
	{
		path: '/flota/:slug',
		name: 'CarDetail',
		component: () => import('@/views/pages/CarDetail'),
	},
	{
		path: '/:slug',
		name: 'Section',
		component: () => import('@/views/pages/Section'),
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
	window.scrollTo(0, 0)
	next()
})
function loadRoutes() {
	const context = require.context('@/views/', true, /\.js$/)
	return context
		.keys()
		.map(context) // import module
		.map((m) => m.default) // get `default` export from each resolved module
}
export default router
