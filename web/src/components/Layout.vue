<template>
	<div>
		<Navbar
			:navFixed="navFixed"
			:transparent="transparent"
			:withImage="background ? true : false"
		></Navbar>
		<div
			class="background"
			v-if="background"
			:style="'background-image:url(' + background + ')'"
		></div>

		<Loader :show="loading"></Loader>

		<div class="" v-if="!loading" sticky-container>
			<slot></slot>
		</div>

		<Footer />
	</div>
</template>
<script>
import Navbar from '@/components/Navbar'
import Loader from '@/components/Loader'
import Footer from '@/components/Footer'

export default {
	name: 'Layout',
	props: ['loading', 'pageTitle', 'navFixed', 'background', 'transparent'],
	components: {
		Navbar,
		Loader,
		Footer,
	},
}
</script>

<style scoped>
.main-container {
	padding: 18px;
}

@media (max-width: 991px) {
	.main {
		width: 100%;
		margin-left: 0px;
	}
}

.background {
	width: 100%;
	padding-bottom: 280px;
	background-size: cover;
	background-position: center center;
	margin-bottom: -64px;
}
</style>
