<template>
	<div>
		<b-modal id="modalSignature" hide-footer hide-header no-close-on-backdrop no-close-on-esc @close="close" size="lg">
			<div class="fullscreen" v-if="show">
				<div class="head">
					<div class="container">
						<!-- <i class="icon mt-4 icon-xl invert icon-check" v-if="type=='success'"></i> -->
						<h1>Ingrese su firma</h1>
						<!-- <p>Ingrese los datos de quién entrega el vehículo</p> -->
					</div>
				</div>
				<div class="content bg-grey">
					<div class="container">
						<div class="signature">
							<VueSignaturePad
							class="signature-pad"
								saveType="image/svg+xml"
								ref="signature"
								:options="{
									backgroundColor: 'rgba(255,255,255,.5)',
								}"
							/>
						</div>
						<div class="btn btn-light pull-right" @click="clearSignature()">Borrar firma</div>
					</div>
				</div>
				<div class="footer">
					<div class="container">
						<div class="btn btn-block btn-primary" @click="save()">
							Continuar
						</div>
					</div>
				</div>

			</div>
		</b-modal>


		<div v-if="value" class="signature-thumb"  @click="open()">
			<img :src="value" class="img-fluid">
		</div>
		<div v-else class="btn btn-success pull-right" @click="open()">Firmar</div>

	</div>
</template>

<script>

export default {
	name: "SignatureInput",
	props:{
		value:{
			type: String,
			default: null
		}
	},
	data () {
		return {
			show: false,
			signatureDraw: null
		}
	},
	methods:{
		open () {
			this.show = true
			this.$bvModal.show('modalSignature')
			setTimeout( () => {
				this.$refs.signature.resizeCanvas()
			}, 550) 
		},
		close () {
			this.$bvModal.hide('modalSignature')
		},
		clearSignature(){
			this.$refs.signature.clearSignature()
		},
		save () {
			var sign = this.$refs.signature.saveSignature("image/svg+xml")
			this.$emit('input',sign.data)
			this.$bvModal.hide('modalSignature')
		},
	}

}
</script>

<style lang="scss" scoped>
.signature-thumb{
	background-color:#fff;
	width:100%;
		
}
.signature{
		width:100%;
		height:250px;
		// padding-bottom:50%;
		border: solid 1px #f3f3f3;
		background-color:#fff;
		position: relative;
	}
	.signature .signature-pad{
		z-index: 10;
		position: absolute;
	}
	.signature:after{
		content:'';
		z-index: 1;
		width: calc(100% - 60px);
		height: calc(100% - 60px);
		margin: 30px;
		position: absolute;
		top:0px;
		left:0px;
		border:solid 1px #ced4da;
	}


</style>