import Vue from 'vue'
import VueFormulate from '@braid/vue-formulate'
import { es } from '@braid/vue-formulate-i18n'


//registro nuevos inputs
import InputPrice from './components/forms/InputPrice'
Vue.component('InputPrice', InputPrice)
import InputAutocomplete from './components/forms/InputAutocomplete'
Vue.component('InputAutocomplete', InputAutocomplete)


import InputFile from './components/forms/InputFile'
Vue.component('InputFile', InputFile)


import InputTags from './components/forms/InputTags'
Vue.component('InputTags', InputTags)
import InputDate from './components/forms/InputDate'
Vue.component('InputDate', InputDate)
import InputWysiwyg from './components/forms/InputWysiwyg'
Vue.component('InputWysiwyg', InputWysiwyg)
import Phone from './components/forms/InputPhone'
Vue.component('Phone', Phone)
import InputIdentification from './components/forms/InputIdentification'
Vue.component('InputIdentification', InputIdentification)
import InputLatLng from './components/forms/InputLatLng'
Vue.component('InputLatLng', InputLatLng)
import InputSlug from './components/forms/InputSlug'
Vue.component('InputSlug', InputSlug)
import InputSelect from './components/forms/InputSelect'
Vue.component('InputSelect', InputSelect)

import {customRules, customMessages } from './components/forms/customRules'

Vue.use(VueFormulate, {
	plugins: [ es ], 
	locale: 'es',
	library: {
		autocomplete: { classification: 'text', component: 'InputAutocomplete' },
		price: { classification: 'text',  component: 'InputPrice' },
		
		// uploadImage: { classification: 'text',  component: 'UploadImage' },
		// attachedFiles: { classification: 'text',  component: 'AttachedFiles' },
		file: { classification: 'text',  component: 'InputFile' },
		
		tags: { classification: 'text',  component: 'InputTags' },
		date: { classification: 'date',  component: 'InputDate' },
		wysiwyg: { classification: 'wysiwyg',  component: 'InputWysiwyg' },
		phone: { classification: 'phone',  component: 'Phone' },
		identification: { classification: 'text',  component: 'InputIdentification' },
		latlng: { classification: 'text',  component: 'InputLatLng' },
		slug: { classification: 'text',  component: 'InputSlug' },
		selectSearch: { classification: 'text',  component: 'InputSelect' },
	},
	rules:{
		...customRules
	},
	locales:{ ...customMessages }
})
import '@braid/vue-formulate/themes/snow/snow.scss'