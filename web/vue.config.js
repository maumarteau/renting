module.exports = {
	publicPath: process.env.NODE_ENV === 'production' ? '/web/' : '/',

	// pwa: {
	// 	name: 'Doctor Consultas',
	// 	themeColor: '#12bcec',
	// 	appleMobileWebAppCapable: 'yes',
	// 	workboxOptions: {
	// 		exclude: [/\.map$/, /\.htaccess$/, /manifest\.json$/],
	// 	},
	// },
	// chainWebpack: (config) => {
	// 	config.resolve.symlinks(false)
	// },
}
