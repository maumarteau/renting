<template>
	<div>
		<div>
			<div
				class="row item"
				v-for="(image, index) in images"
				:key="index"
				@click="open(index)"
			>
				<div class="col-3">
					<img
						v-if="image.image"
						:src="image.image.url"
						class="img-fluid"
					/>
				</div>
				<div class="col-9">
					<h5>{{ image.title }}</h5>
					<div v-html="image.body"></div>
				</div>
			</div>
		</div>

		<div>
			<div class="btn btn-primary" @click="open">Agregar imagen</div>
		</div>

		<b-modal
			id="imageForm"
			title="Cargar imagen"
			no-close-on-backdrop
			hide-footer
		>
			<FormulateForm v-model="form" ref="form" class="" @submit="save">
				<FormulateInput
					label="Imagen"
					name="image"
					type="file"
					accept="images"
					listStyle="thumb"
					:displayBlock="true"
					validation-name="Imagen"
				/>
				<!-- validation="required" -->

				<FormulateInput
					label="Título"
					name="title"
					type="text"
					validation-name="Título"
					validation="required"
				/>

				<FormulateInput
					type="wysiwyg"
					name="body"
					height="200px"
					label="Texto"
					:showMenuBar="false"
				/>

				<hr />
				<div class="d-flex justify-content-between mt-4">
					<FormulateInput type="button" data-ghost @click="close()"
						>Cancelar</FormulateInput
					>
					<FormulateInput type="submit" label="Guardar" />
				</div>
			</FormulateForm>
		</b-modal>
	</div>
</template>

<script>
import gql from 'graphql-tag'
import formMixins from '@/mixins/formMixins'

export default {
	name: 'CategoryImages',
	mixins: [formMixins],
	props: {
		images: {
			type: Array,
			default: [],
		},
	},
	data() {
		return {
			form: {
				index: null,
				title: null,
				body: null,
				image: null,
			},
			action: 'create',
			loading: false,
		}
	},

	async beforeMount() {
		this.loading = true
		this.loading = false
	},

	methods: {
		open(index) {
			if (index >= 0) {
				this.form = { index, ...this.images[index] }
			}
			this.$bvModal.show('imageForm')
		},

		close() {
			this.$bvModal.hide('imageForm')
		},

		async save() {
			this.loading = true
			console.log(this.form)

			let dataInput = {
				image: this.form.image ? this.form.image.id : null,
				title: this.form.title,
				body: this.form.body,
			}

			if (this.action == 'create') {
				this.create(dataInput)
			}
			if (this.action == 'update') {
				this.update(dataInput)
			}
			this.loading = false
			this.close()
		},

		create(data) {
			console.log(typeof this.images)
			this.images = []
			if (typeof this.images != 'object') {
			}
			this.images.push(data)
			this.$emit('created', this.images)
		},

		update(data) {
			this.$emit('updated', this.images)
		},

		deletePrompt(data) {
			this.$dialog
				.confirm(
					{
						title: 'Eliminar imagen',
						body: `¿Está seguro que desea eliminar la imagen "<strong>${form.title}"</strong>?`,
					},
					{
						okText: 'Eliminar',
						customClass: 'delete-prompt',
					}
				)
				.then(() => {
					this.$emit('deleted', this.images)
				})
		},
	},
}
</script>

<style scoped>
.item {
	border-bottom: 1px solid #f3f3f3;
	padding: 14px;
}
</style>
