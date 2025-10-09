export default [
	{
		path: '/products',
		name: 'Products',
		meta: {
			requiresAuth: true,
			section: 'products',
		},
		component: () =>
			import(/* webpackChunkName: "Products" */ './Products'),
	},
	{
		path: '/products/create',
		name: 'ProductCreate',
		meta: {
			requiresAuth: true,
			section: 'products',
		},
		component: () =>
			import(/* webpackChunkName: "ProductForm" */ './ProductForm'),
	},
	{
		path: '/products/:id',
		name: 'ProductEdit',
		meta: {
			requiresAuth: true,
			section: 'products',
		},
		component: () =>
			import(/* webpackChunkName: "ProductForm" */ './ProductForm'),
	},
]
