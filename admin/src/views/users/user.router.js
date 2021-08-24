export default [
    
    {
		path: '/users/create',
		name: 'UserCreate',
		meta: { 
			requiresAuth: true,
			section: 'users'
		},
		component: () => import('@/views/users/UserForm'),
    },
    {
		path: '/users/:id',
		name: 'UserUpdate',
		meta: { 
			requiresAuth: true,
			section: 'users'
		},
		component: () => import('@/views/users/UserForm'),
	},
	
	
]

