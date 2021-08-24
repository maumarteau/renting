<template>
  <div
    :class="`formulate-input-element formulate-input-element--${context.type}`"
    :data-type="context.type"
  >
    <div class="tel-input">   
        <vue-tel-input 
			wrapperClasses="input"
			:valid-characters-only="true"
			:preferred-countries="['UY', 'AR', 'BR']"
			v-model="formatted"
			:placeholder="context.label"
			@validate="phoneValidated"
        ></vue-tel-input>
			<!-- v-model="context.model.national" -->
			<!-- @input="changed" -->
			<!-- @input="context.blurHandler" -->
    </div>
  </div>
</template>

<script>
import { VueTelInput } from 'vue-tel-input'
export default {
	components:{
		VueTelInput,
	},
	props: {
		context: {
			type: Object,
			required: true
		},
	},
	computed: {
		formatted: {
			get: function() {
				// console.log('this.context.model phone', this.context.model)
				return this.context.model.national || '';
			},
			set: function(newValue) {
				// this.context.model = newValue;
			}
		}
	},
	data () {
		return {
			value:{}
		}
	},
	methods:{
		phoneValidated(data) {
			this.value.national 		= data.number.input;
			this.value.international 	= data.number.international;
			this.value.countryCode 	    = data.country.iso2;
			this.value.validated 		= data.isValid;
			this.value.type 			= data.type;
			this.$nextTick(() => {
				this.context.model = this.value
			})
		},
	},
	
}
</script>

<style scoped>
    .tel-input{
        display: flex;
    }
	.tel-input /deep/ .vue-tel-input:focus{
		
		/* font-size: .9em;
		padding: .75em; */
		border-color: #333 !important;
		outline:0;
	}
	.tel-input /deep/ .vti__input:focus {
		border: none;
		border-radius: 0 2px 2px 0;
		width: 100%;
		outline: 0;
		padding-left: 7px;
	}
</style>