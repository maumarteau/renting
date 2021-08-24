export default [
	{
		path: '/sections',
		name: 'sections',
		meta: {
			requiresAuth: true,
			section: 'sections',
		},
		component: () => import('@/views/sections/Sections'),
	},
	{
		path: '/sections/create',
		name: 'SectionCreate',
		meta: {
			requiresAuth: true,
			section: 'sections',
		},
		component: () => import('@/views/sections/SectionForm'),
	},
	{
		path: '/sections/:id',
		name: 'SectionUpdate',
		meta: {
			requiresAuth: true,
			section: 'sections',
		},
		component: () => import('@/views/sections/SectionForm'),
	},
]
