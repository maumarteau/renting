<template>
  <div
    :class="`formulate-input-element formulate-input-element--${context.type}`"
    :data-type="context.type"
  >
  
    <div class="coords-input" v-b-modal.modal-1>
		<div class="prepend"><i class="icon icon-map-pin-streamline"></i></div>        
		<input
			type="text"
			:value="`${latLng.lat}, ${latLng.lng}`"
			v-bind="context.attributes"
			autocomplete="no"
		>  
    </div>

	<b-modal id="modal-1" lazy size="sm" title="">
		
		<div class="label">Buscar dirección:</div>
		<gmap-autocomplete
			placeholder="Ingrese la dirección para buscar su ubicación"
			@place_changed="setPlace"
			class="form-control"
			>
		</gmap-autocomplete>
		
		<GmapMap
			class="mt-2"
			:center="latLng"
			:zoom="14"
			style="width: 100%; height: 380px"
			:options="{
				zoomControl: false,
				mapTypeControl: false,
				scaleControl: false,
				streetViewControl: false,
				rotateControl: false,
				fullscreenControl: false,
				disableDefaultUi: false
			}"
			>
			<GmapMarker
				@dragend="dragEnd($event.latLng)"
				:position="latLng"
				:clickable="true"
				:draggable="true"
			/>			
		</GmapMap>
	</b-modal>
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
	computed: {
		latLng: {
			get: function() {
				return this.context.model || { lat:-34.912178, lng:-56.15656 }
			},
			set: function(newValue) {
				this.context.model = newValue;
			}
		}
	},
	data () {
		return {
			value:{},
		}
	},
	methods:{
		dragEnd(event){				
			if(event){
				this.latLng = {
					lat: event.lat(),
					lng: event.lng(),
				}
			}
		},
		setPlace(place) {
			this.usePlace(place)
		},
		usePlace(place) {
			if (place) {
				this.latLng = {
					lat: place.geometry.location.lat(),
					lng: place.geometry.location.lng(),
				}
			}
		}
		
	},
	
}
</script>

<style scoped>
    
.coords-input{
        display: flex;
    }
    .coords-input .prepend{
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #f3f3f3;
        border:solid 1px  #cecece;
        border-radius: .3em 0px 0px .3em;
        padding: 0px 8px;
        border-right: 0px;
    }
    .coords-input input{
        border-radius: 0px .3em .3em 0px !important;
        
    }
	
</style>