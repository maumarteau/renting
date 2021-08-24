export default [
	{
		path: '/categories',
		name: 'categories',
		meta: {
			requiresAuth: true,
			section: 'categories',
		},
		component: () => import('@/views/categories/Categories'),
	},
	{
		path: '/categories/create',
		name: 'CategoryCreate',
		meta: {
			requiresAuth: true,
			section: 'categories',
		},
		component: () => import('@/views/categories/CategoryForm'),
	},
	{
		path: '/categories/:id',
		name: 'CategoryUpdate',
		meta: {
			requiresAuth: true,
			section: 'categories',
		},
		component: () => import('@/views/categories/CategoryForm'),
	},
]
