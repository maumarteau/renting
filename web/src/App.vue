<template>
	<div id="app">
		<router-view :key="$route.fullPath"></router-view>
	</div>
</template>

<script>
export default {
	name: 'App',
	metaInfo: {
		title: 'Soluciones de movilidad para empresas',
		titleTemplate: '%s | Lestido Renting',
	},
	beforeMount() {
		// let isLocalhost = false
		// let redir = false
		// const url = 'https://www.renting.com.uy' + window.location.pathname
		// if (window.location.origin.indexOf('localhost') >= 0) {
		// 	isLocalhost = true
		// }
		// if (window.location.origin.indexOf('www') == -1) {
		// 	redir = true
		// }
		// if (window.location.origin.indexOf('http:') == 0) {
		// 	redir = true
		// }
		// if (!isLocalhost && redir) window.location = url
	},
}
</script>
