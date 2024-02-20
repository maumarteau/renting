<template>
	<div ref="nav">
		<div
			class="nav"
			:class="{
				withImage: withImage,
				transparent: transparent,
				scrolled: scrolled,
			}"
		>
			<nav class="navbar">
				<div class="container">
					<div class="row">
						<div class="col-12 header">
							<div class="">
								<div class="">
									<div class="d-flex align-items-center justify-content-between">
										<router-link tag="a" :to="`/`">
											<img src="@/assets/logo.svg" alt="" class="logo" />
										</router-link>

										<div class="only-desktop">
											<b-nav>
												<b-nav-item :to="`/`" active>Inicio </b-nav-item>
												<b-nav-item :to="`/flota`">Flota</b-nav-item>
												<b-nav-item :to="`/servicios-adicionales`">Adicionales</b-nav-item>
												<b-nav-item :to="`/agenda-mantenimiento`">Mantenimiento</b-nav-item>
												<b-nav-item :to="`/empresa`">Empresa</b-nav-item>
												<b-nav-item :to="`/contacto`">Contacto </b-nav-item>
											</b-nav>
										</div>

										<b-button v-b-toggle.menu-sidebar class="btn btn-menu only-mobile">
											<div class="icon-menu"></div>
										</b-button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</nav>

			<div class="nav-spacer" ref="spacer" v-if="!navFixed"></div>

			<b-sidebar id="menu-sidebar" right shadow sidebar-class="sidebar-menu" no-header>
				<div class="d-flex justify-content-end">
					<div class="btn btn-close" v-b-toggle.menu-sidebar></div>
				</div>

				<b-nav vertical class="mt-3">
					<b-nav-item to="/" class="btn-primary" active>Inicio </b-nav-item>
					<b-nav-item to="/flota" class="btn-primary">Flota</b-nav-item>
					<b-nav-item to="/servicios-adicionales" class="btn-primary">Adicionales</b-nav-item>
					<b-nav-item to="/empresa" class="btn-primary">Empresa</b-nav-item>

					<b-nav-item to="/agenda-mantenimiento" class="btn-primary">Mantenimiento </b-nav-item>
					<b-nav-item to="/contacto" class="btn-primary">Contacto </b-nav-item>
				</b-nav>
			</b-sidebar>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Navbar',
	props: {
		navFixed: {
			default: true,
		},
		withImage: {
			default: false,
		},
		transparent: {
			default: false,
		},
	},
	data() {
		return {
			opened: false,
			scrolled: false,
			currentRoute: null,
		}
	},
	mounted() {
		window.addEventListener('scroll', this.onScroll)
	},
	beforeDestroy() {
		window.removeEventListener('scroll', this.onScroll)
	},
	methods: {
		onScroll(e) {
			window.top.scrollY > 10 ? (this.scrolled = true) : (this.scrolled = false)
		},
	},
	beforeMount() {
		this.currentRoute = this.$route.fullPath.replace('/' + this.$route.params.lang, '')
	},
}
</script>
<style scoped>
.nav {
}
.navbar {
	position: fixed;
	top: 0px;
	z-index: 1000;
	width: 100%;
	display: block;
	background: #fff;
	padding: 0px 18px;

	transition: all 0.2s ease-in-out;
}

.navbar .container {
	display: block;
}
.navbar .btn {
	height: 44px;
}

.nav:not(.withImage) .nav-spacer {
	width: 100%;
	height: 94px;
}
.navbar .logo {
	max-width: 112px;
	width: 100%;
	margin: 6px 6px;
}

.nav-link {
	color: #000;
	font-weight: 600;
	font-size: 16px;
	transition: all 0.2s ease-in-out;
}

.nav /deep/ .sidebar-menu {
	background-color: #003061 !important;
	color: #fff !important;
	max-width: 640px;
	width: 80vw;
}

.nav /deep/ .sidebar-menu .nav-item:hover {
	background: none !important;
}
.nav /deep/ .sidebar-menu .nav-link {
	padding: 0.5rem 0.75rem;
	font-weight: 500;
	color: #fff;
	font-size: 28px;
	margin-left: 20%;
}
.nav /deep/ .sidebar-menu .nav-link:hover {
	color: var(--accent-color);
}

.btn-close {
	filter: invert(1);
	width: 48px;
	height: 48px;
}

.btn-menu {
	background: none;
	border: none;
}

.icon-menu {
	width: 32px;
	height: 32px;
	background-position: center center;
	background-repeat: no-repeat;
	background-image: url('../assets/img/icon-menu.png');
}

@media (max-width: 991px) {
	.navbar .logo {
		max-width: 76px;
	}

	.nav /deep/ .sidebar-menu .nav-link {
		font-size: 18px;
	}

	.nav-spacer {
		height: 72px;
	}
}

.nav.withImage:not(.scrolled) .navbar,
.nav.transparent:not(.scrolled) .navbar {
	background-color: transparent !important;
	/* background: rgb(255, 255, 255);
	background: linear-gradient(
		180deg,
		rgba(255, 255, 255, 1) 0%,
		rgba(255, 255, 255, 1) 0%,
		rgba(255, 255, 255, 0) 86%,
		rgba(255, 255, 255, 0) 100%
	); */
}

.nav.withImage:not(.scrolled) /deep/ .nav-link,
.nav.transparent:not(.scrolled) .navbar /deep/ .nav-link {
	color: #fff !important;
	text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.68);
}
.nav.transparent:not(.scrolled) .navbar .icon-menu {
	filter: brightness(0) invert(1);
}
</style>
