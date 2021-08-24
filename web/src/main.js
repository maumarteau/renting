import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { createProvider } from './vue-apollo'

Vue.config.productionTip = false

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)

import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
Vue.component('VueSlickCarousel', VueSlickCarousel)

import VueFormulate from '@braid/vue-formulate'
import { es } from '@braid/vue-formulate-i18n'
import { customRules } from './components/forms/customRules'
import Phone from './components/forms/InputPhone'
Vue.component('Phone', Phone)

Vue.use(VueFormulate, {
	plugins: [es],
	locale: 'es',
	library: {
		phone: { classification: 'phone', component: 'Phone' },
	},
	rules: {
		...customRules,
	},
})

import Parallax from 'vue-parallaxy'
Vue.component('parallax', Parallax)

import vClickOutside from 'v-click-outside'
Vue.use(vClickOutside)

import VueMeta from 'vue-meta'
Vue.use(VueMeta)

import Skeleton from 'vue-loading-skeleton'
Vue.use(Skeleton)

import '@/assets/forms.scss'
import '@/assets/style.css'

new Vue({
	router,
	apolloProvider: createProvider(),
	render: (h) => h(App),
}).$mount('#app')
