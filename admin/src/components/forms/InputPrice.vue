<template>
	<div :class="`formulate-input-element formulate-input-element--${context.type}`" :data-type="context.type">
		<div class="number-input">
			<div class="prepend">{{ context.attributes.currency || "$" }}</div>
			<input type="NUMBER" pattern="^\d*(\.\d{0,2})?$" step="0.01" v-model="formatted" v-bind="context.attributes" autocomplete="no" @blur="$emit('blur')" />
		</div>
	</div>
</template>

<script>
export default {
	props: {
		context: {
			type: Object,
			required: true
		}
	},
	data() {
		return {}
	},
	mounted() {
		// console.log(this.context)
	},
	computed: {
		formatted: {
			get: function() {
				return this.context.model
			},
			set: function(newValue) {
				// if (newValue.length > 2) {
				//   newValue = newValue.replace(".", "");
				//   this.context.model =
				//     newValue.substr(0, newValue.length - 2) +
				//     "." +
				//     newValue.substr(newValue.length - 2);
				// } else {
				// }
				this.context.model = newValue
			}
		}
	}
}
</script>

<style scoped>
.number-input {
	display: flex;
}
.number-input .prepend {
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #f3f3f3;
	border: solid 1px #cecece;
	border-radius: 0.3em 0px 0px 0.3em;
	padding: 0px 8px;
	border-right: 0px;
}
.number-input input {
	border-radius: 0px 0.3em 0.3em 0px !important;
	text-align: right;
	padding: 0.75em 0.25em;
}
</style>
