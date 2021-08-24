export default [
	{
		path: '/mainSliders',
		name: 'mainSliders',
		meta: {
			requiresAuth: true,
			section: 'users',
		},
		component: () => import('@/views/mainSliders/MainSliders'),
	},
	{
		path: '/mainSliders/create',
		name: 'mainSliderCreate',
		meta: {
			requiresAuth: true,
			section: 'users',
		},
		component: () => import('@/views/mainSliders/MainSliderForm'),
	},
	{
		path: '/mainSliders/:id',
		name: 'mainSliderUpdate',
		meta: {
			requiresAuth: true,
			section: 'mainSliders',
		},
		component: () => import('@/views/mainSliders/MainSliderForm'),
	},
]
