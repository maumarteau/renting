<template>
  <div
    :class="`formulate-input-element formulate-input-element--${context.type}`"
    :data-type="context.type"
  >
	<div class="d-flex">
		<div class="formulate-custom-select mr-1">
			<select name="day" v-model="formatted.type" @change="changed">
				<option disabled>Tipo</option>
				<option :value="item.key" v-for="item in types" :key="item.key" >{{item.val}}</option>
			</select>
		</div>
		<div>
			<input type="text" v-model="formatted.number">
		</div>
	</div>
	<div class="formulate-input-help " v-if="helpText">{{helpText}}</div>
	
  </div>
</template>

<script>
export default {
  props: {
    context: {
      type: Object,
      required: true
    },
  },
  data () {
    return {
		helpText:'',
		types:[
			{ key: "UY",		val: "Cédula UY", instructions: "Ingrese su documento con digito identificador" },
			{ key: "AR",		val: "Cédula AR",  instructions: "Ingrese su documento con digito identificador" },
			{ key: "PASSPORT",	val: "Pasaporte", instructions: "Ingrese su número de pasaporte" },
			{ key: "RUT",		val: "RUT", instructions: "" },
			{ key: "OTHER",		val: "Otro", instructions: "" },
		]		
    }
  },
	computed: {
		formatted: {
			get: function() {
				return this.context.model || { number: null, type: 'UY' };
			},
			set: function(newValue) {
				this.context.model = newValue;
			}
		}
	},
	created() {
		this.changed()
	},
	methods:{
		changed(){
			const selected = this.types.find(item => item.key == this.formatted.type)
			this.helpText = selected.instructions
		}
	}
}
</script>

<style scoped>
    
    /* .form-control, input{
        border-radius: 0px .3em .3em 0px !important;
        text-align: right;
    } */
</style>