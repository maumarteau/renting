import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import store from './store' // your vuex store
import { createProvider } from './vue-apollo'

Vue.use(Vuex)

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)

import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad)

import omitDeep from 'omit-deep'
Vue.prototype.$omitDeep = omitDeep

import './vueformulate'

import visibility from 'vue-visibility-change'
Vue.use(visibility)

import 'vue-context/dist/css/vue-context.css'

import Fragment from 'vue-fragment'
Vue.use(Fragment.Plugin)

import VueToast from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-default.css'
Vue.use(VueToast, {
	position: 'top-right',
})

import * as VueGoogleMaps from 'gmap-vue'
Vue.use(VueGoogleMaps, {
	load: {
		key: process.env.VUE_APP_GOOGLE_API_KEY,
		libraries: 'places',
	},
})

import VuejsDialog from 'vuejs-dialog'
import 'vuejs-dialog/dist/vuejs-dialog.min.css'
Vue.use(VuejsDialog, {
	okText: 'Confirmar',
	cancelText: 'Cancelar',
	html: true,
	animation: 'fade',
})

import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

// require('@/assets/css/font-awesome.css');
require('@/assets/fontastic/styles.css')
require('@/assets/css/eva.min.css')
require('@/assets/css/animate.css')
require('@/assets/css/forms.css')
require('@/assets/css/custom.css')

let moment = require('moment-timezone')
require('moment/locale/es')
// moment.tz.setDefault('Etc/UTC')
Vue.use(require('vue-moment'), { moment })

import VueProgressBar from 'vue-progressbar'
Vue.use(VueProgressBar, {
	color: '#02bcd7',
	failedColor: 'red',
	height: '2px',
})

import VueSignaturePad from 'vue-signature-pad'
Vue.use(VueSignaturePad)

import VueQrcode from '@chenfengyuan/vue-qrcode'
Vue.component(VueQrcode.name, VueQrcode)

var VueScrollTo = require('vue-scrollto')
Vue.use(VueScrollTo)

import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'
Vue.component('multiselect', Multiselect)

import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'
Vue.component('v-select', vSelect)

import '../node_modules/vue-ads-pagination/dist/vue-ads-pagination.css'
// import VueAdsPagination from 'vue-ads-pagination';
import VueAdsPagination, { VueAdsPageButton } from 'vue-ads-pagination'
Vue.component('VueAdsPagination', VueAdsPagination)
Vue.component('VueAdsPageButton', VueAdsPageButton)

import VueTextareaAutosize from 'vue-textarea-autosize'
Vue.use(VueTextareaAutosize)

import 'vue-wysiwyg/dist/vueWysiwyg.css'
import wysiwyg from 'vue-wysiwyg'
Vue.use(wysiwyg, {
	forcePlainTextOnPaste: true,
})

import ToggleButton from 'vue-js-toggle-button'
Vue.use(ToggleButton)

import VueSimpleSuggest from 'vue-simple-suggest'
import 'vue-simple-suggest/dist/styles.css'
Vue.component('vue-simple-suggest', VueSimpleSuggest)

// import VueDraggableResizable from 'vue-draggable-resizable'
// import 'vue-draggable-resizable/dist/VueDraggableResizable.css'
// Vue.component('vue-draggable-resizable', VueDraggableResizable)

import Donut from 'vue-css-donut-chart'
import 'vue-css-donut-chart/dist/vcdonut.css'
Vue.use(Donut)

import VueApexCharts from 'vue-apexcharts'
Vue.component('apexchart', VueApexCharts)

import Pagination from '@/components/layout/Pagination'
Vue.component('Pagination', Pagination)

import Layout from '@/components/layout/Layout'
Vue.component('Layout', Layout)

import Loader from '@/components/layout/Loader'
Vue.component('Loader', Loader)

import DateRangePicker from 'vue2-daterange-picker'
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'
Vue.component('date-range-picker', DateRangePicker)

import VueNativeNotification from 'vue-native-notification'
Vue.use(VueNativeNotification, {
	requestOnNotify: true,
})

import draggable from 'vuedraggable'
Vue.component('draggable', draggable)

Vue.config.productionTip = false

new Vue({
	router,
	store,
	apolloProvider: createProvider(),
	render: (h) => h(App),
}).$mount('#app')
