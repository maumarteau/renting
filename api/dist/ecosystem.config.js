module.exports = {
	apps: [
		{
			name: 'api-lestido',
			script: 'index.js',
			env: {
				NODE_ENV: 'development',
				PM2_PUBLIC_KEY: '2y7ok57mzkqiznu',
				PM2_SECRET_KEY: 'gd8hdforp6koyha',
			},
		},
	],
}
