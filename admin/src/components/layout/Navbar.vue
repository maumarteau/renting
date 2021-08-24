<template>
	<div>
		<nav class="navbar">
			<div class="btn-menu-toggle">
				<div class="btn btn-menu-toggle" @click="opened = !opened">
					<div class="icon icon-menu"></div>
				</div>
				<img src="@/assets/logo.png" alt="" class="logo" />
			</div>

			<div class="d-flex w-100 align-items-end justify-content-end">
				<!-- <b-dropdown
					block
					right
					variant="text"
					class="only-desktop user-dropdown"
				>
					<template v-slot:button-content class="dropdown-user">
						<div class="btn btn-light btn-header">
							<div class="icon icon-bell-o"></div>
							<div
								class="badge badge-pill badge-danger"
								v-if="unreadCounter > 0"
							>
								{{ unreadCounter }}
							</div>
						</div>
					</template>
				</b-dropdown> -->

				<b-dropdown
					block
					right
					variant="text"
					class="only-desktop user-dropdown"
				>
					<template v-slot:button-content class="dropdown-user">
						<div
							class="avatar"
							:style="{
								backgroundImage: `url('${require('@/assets/img/no-avatar-image.gif')}')`,
							}"
						></div>
						<div class="username">
							{{ loggedUser.name }} {{ loggedUser.lastname }}
						</div>
					</template>
					<!-- <router-link tag="b-dropdown-item" to="/account"
						>Mi perfil</router-link
					>
					<router-link tag="b-dropdown-item" to="/settings"
						>Configuraciones</router-link
					> -->
					<router-link tag="b-dropdown-item" to="/logout"
						>Salir</router-link
					>
				</b-dropdown>
			</div>
		</nav>

		<div class="nav-spacer"></div>

		<div class="sidebar-wrapper" :class="{ opened: opened }">
			<div class="head">
				<img src="@/assets/logo.png" alt="" class="logo only-desktop" />

				<b-dropdown block right class="only-mobile">
					<template v-slot:button-content class="dropdown-user">
						<div
							class="avatar"
							:style="{
								backgroundImage: `url('${require('@/assets/img/no-avatar-image.gif')}')`,
							}"
						></div>
						{{ loggedUser.name }} {{ loggedUser.lastname }}
					</template>
					<b-dropdown-item href="#">An item</b-dropdown-item>
					<router-link tag="b-dropdown-item" to="/logout"
						>Salir</router-link
					>
				</b-dropdown>
			</div>

			<h3>Generales</h3>
			<div class="list-group list-group-flush mt-2 flex-grow-1">
				<router-link
					to="/"
					class="list-group-item list-group-item-action pl-4"
				>
					<span>Mensajes</span>
				</router-link>
				<!-- <router-link
					to="/"
					class="list-group-item list-group-item-action "
				>
					<i class="icon icon-gauge"></i>
					<span>Dashboard</span>
				</router-link> -->

				<router-link
					to="/mainSliders"
					class="list-group-item list-group-item-action pl-4"
				>
					<span>Slider principal</span>
				</router-link>
				<router-link
					to="/categories"
					class="list-group-item list-group-item-action pl-4"
				>
					<span>Flota</span>
				</router-link>
				<router-link
					to="/sections"
					class="list-group-item list-group-item-action pl-4"
				>
					<span>Secciones</span>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	name: 'Navbar',
	data() {
		return {
			opened: false,
			unreadCounter: 0,
			appVersion: process.env.VUE_APP_VERSION,
		}
	},
	computed: {
		...mapGetters(['loggedUser']),
	},
}
</script>
<style>
.navbar {
	padding: 0px 8px;
	width: calc(100% - 230px);
	height: 58px;
	top: 0px;
	left: 230px;
	background-color: #fff;
	border-bottom: 1px solid #d3d9db;
	z-index: 150;
	position: fixed;
}
.navbar .btn-menu-toggle {
	color: #080808;
	display: none;
}
.navbar .btn-menu-toggle .icon {
	display: flex;
	align-items: center;
	justify-content: center;
}

.only-mobile {
	display: none;
}
.only-desktop {
	display: initial;
}

@media (max-width: 991px) {
	.navbar {
		width: 100%;
		left: 0px;
	}
	.navbar .btn-menu-toggle {
		display: inline-block;
	}

	.only-mobile {
		display: initial;
	}
	.only-desktop {
		display: none;
	}
}

.nav-spacer {
	width: 100%;
	height: 58px;
}
.navbar .logo {
	max-width: 90px;
}
.navbar .nav-item .nav-link {
	min-height: 60px;
	line-height: 60px;
	padding: 0px;
	margin: 0px 14px;
	color: #333;
}
.navbar .icon {
	position: relative;
	display: inline;
	font-size: 31px;
}
.navbar .icon .number {
	position: absolute;
	top: -10px;
	background-color: #eb0000;
	color: #fff;
	border-radius: 100px;
	width: 13px;
	height: 13px;
	font-size: 11px;
	line-height: 1.2em;
	right: -6px;
	text-align: center;
}

.sidebar-wrapper {
	width: 230px;
	height: 100%;
	overflow: hidden;
	top: 0px;
	left: 0;
	z-index: 100;
	position: fixed;
	color: #ffffff;
	background-color: #143155;
	transition: all 0.3s ease-in-out;
	-webkit-box-shadow: none;
	-moz-box-shadow: none;
	box-shadow: none;

	display: flex;
	flex-direction: column;
}

@media (max-width: 991px) {
	.sidebar-wrapper {
		top: 58px;
		height: calc(100% - 58px);
		left: -240px;
		-webkit-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
		-moz-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
		box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
	}
}
.sidebar-wrapper.opened {
	left: 0px !important;
}

.sidebar-wrapper .head {
	height: 64px;
	font-size: 14px;
	font-weight: normal;
	line-height: 20px;
	display: flex;
	align-items: center;
	padding: 8px;
}

.sidebar-wrapper .head .logo {
	max-width: 126px;
	margin: 18px;
}

.sidebar-wrapper .list-group {
	width: 100%;
	overflow: auto;
	max-height: calc(100% - 112px);
	display: block;
	background-color: inherit;
}
.sidebar-wrapper .list-group .list-group-item {
	background-color: transparent;
	color: inherit;
	padding: 0px;
	height: 44px;
	border: none;
	font-weight: 500;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.sidebar-wrapper .list-group .list-group-item:hover {
	background-color: #0e2542;
}
.sidebar-wrapper .list-group .list-group-item .icon {
	width: 54px;
	display: flex;
	justify-content: center;
	align-items: center;
}
.sidebar-wrapper .list-group .list-group-item .icon i {
	color: inherit;
	font-size: 12px;
}
.sidebar-wrapper .list-group .list-group-item span {
	font-size: 13px;
	flex-grow: 1;
}
.sidebar-wrapper .list-group .list-group-item .expand {
	width: 54px;
	text-align: center;
	display: inline-block;
}
.sidebar-wrapper:hover .list-group .list-group-item span {
	opacity: 1;
}

.list-group-item.expandible:not(.collapsed) {
	background-color: #0e2542 !important;
}
.sidebar-wrapper .list-group .list-group-item-child {
	padding-left: 54px;
	height: 34px;
	line-height: 34px;
	background-color: #0e2542;
}
.sidebar-wrapper .list-group .list-group-item-child:hover {
	background-color: #0f2f56;
}
.sidebar-wrapper .list-group .list-group-item-child.selected {
	background-color: #114483;
}

.sidebar-wrapper h3 {
	font-size: 12px;
	text-transform: uppercase;
	padding: 20px 0px 0px 12px;
	margin: 0px;
	opacity: 0.5;
}

.list-group-item.collapsed .expand.when-open,
.list-group-item:not(.collapsed) .expand.when-closed {
	display: none;
}

.sidebar-wrapper .dropdown {
	width: 100%;
}
.sidebar-wrapper .btn.dropdown-toggle {
	height: 58px;
	background-color: #143155;
	color: #fff;
	display: flex;
	align-items: center;
	border: none;
	border-radius: 0px;
	font-size: 12px;
}

.sidebar-wrapper .dropdown .btn:hover {
	background-color: #133c6f;
}
.sidebar-wrapper .avatar {
	width: 32px;
	height: 32px;
	background-color: #f2f2f2;
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center center;
	border-radius: 50%;
	margin-right: 8px;
}

.navbar .user-dropdown .btn.dropdown-toggle {
	/* height:58px; */
	background-color: #fff;
	color: #000;
	display: flex;
	align-items: center;
	border: none;
	border-radius: 0px;
	font-size: 12px;
}
.navbar .user-dropdown .btn.dropdown-toggle .avatar {
	width: 32px;
	height: 32px;
	border: 1px solid #d8d8d8;
	background-color: #f2f2f2;
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center center;
	border-radius: 50%;
	margin-right: 8px;
}
.navbar .user-dropdown .btn.dropdown-toggle .username {
	line-height: 14px;
	text-align: left;
	padding-right: 4px;
}

.icons-reminders {
	padding: 0px 16px;
	display: inline-flex;
	align-items: center;
}

.btn-header {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 32px;
	height: 32px;
	text-align: center;
	color: #78858a;
	border: 1px solid #d3d9db;
	border-radius: 100%;
	position: relative;
	margin: 0px 14px 0px 8px;
}
.btn-header .icon {
	font-size: 16px;
}
.btn-header .badge {
	border: solid 2px #fff;
	position: absolute;
	top: -6px;
	right: -10px;
	width: 20px;
	height: 20px;
	display: block;
	justify-content: center;
	align-items: center;
	padding: 0px;
	font-size: 10px;
	line-height: 17px;
	font-weight: 500;
}

.env-alert {
	display: flex;
	height: 22px;
	align-items: center;
	border-radius: 15px;
	padding: 4px 12px;
}
</style>
