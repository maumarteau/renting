<template>
  <div
    :class="`formulate-input-element formulate-input-element--${context.type}`"
    :data-type="context.type"
  >
    <vue-tags-input
      v-model="tag"
      :tags="formatedTags"
      :autocomplete-items="filteredItems"
	  @tags-changed="tagsChanged"
	  @before-adding-tag="checkIfTagExists"	 
	  :placeholder="context.attributes.placeholder || 'Agregar tag'" 
    />
    <div class="create-tag-prompt" v-if="promptCreateTag">
		<div>¿Este item no exite, desea crearlo ?</div>
		<button @click="cancel" class="btn btn-xs btn-light mr-2">Cancelar</button>
		<button @click="createNewTag" class="btn btn-xs btn-success">Crear</button>
	</div>
  </div>
</template>

<script>
import VueTagsInput from '@johmun/vue-tags-input';
export default {
	components: {
		VueTagsInput,
	},
	props: {
		context: {
			type: Object,
			required: true
		}
	},
	computed: {
		filteredItems() {
			return this.formatedItems.filter(i => {
				return i.text.toLowerCase().indexOf(this.tag.toLowerCase()) !== -1;
			});
		},
		formatedItems: function (){
			if(this.context.attributes.autocompleteItems){
				return this.context.attributes.autocompleteItems.map(val=>{
					return {id: val.id, text:val.name}
				})
			}else{
				return []
			}
		},
		formatedTags: {
			get: function() {
				this.tags = this.formatTags(this.context.model)
				return this.tags
			},
			set: function(newValue) {
				this.context.model = newValue
			}
		}
	},
	data () {
		return {
			tag: '',
			tags: [],
			handlers: [],
			promptCreateTag: false
		}
	},
	methods: {
		cancel() {
			// console.log('cancel');
			this.$nextTick(() => this.handlers = []);
			this.tag = '';
			this.promptCreateTag= false
		},
		checkIfTagExists(data){
			// console.log('checkIfTagExists');
			if(this.context.attributes.offline){
				this.addTag({text:data.tag.text})
			}else{
				if(!data.tag.id){
					this.promptCreateTag= true
				}else{
					this.addTag(data.tag)
				}		
			}
		},
		async createNewTag() {
			// console.log('createNewTag');		
			this.promptCreateTag= false
			let created = await this.context.attributes.createNew(this.tag)
			this.addTag({id:created.id, text:created.name})
		},
		addTag(tag){
			// console.log('addTag', tag);
			if( !Array.isArray(this.context.model)) this.context.model = []
			this.context.model.push(tag)
			this.handlers.forEach(h =>h());
			this.$nextTick(() => {
				this.handlers = []
				this.tag = '';
				this.promptCreateTag= false
			});
		},
		tagsChanged(data){
			// console.log('tagsChanged');
			this.$nextTick(() => {
				this.tags = data
				this.context.model = this.tags
			})
		},
		formatTags(tags){
			// console.log('formatTags');
			if(tags.length>0){
				return tags.map(val=>{
					return {
						id: val.id,
						text: val.name ? val.name : val.text
					}
				})
			}
		}
	},
}
</script>

<style>

.create-tag-prompt{
	display: flex;
	align-items: center;
	background-color: #f3dbdb;
    padding: 8px;
}
.create-tag-prompt div:first-child{
	flex-grow: 1;
}
.create-tag-prompt .btn{
	align-self: flex-end;
}

.vue-tags-input{
	max-width: 100% !important;
	border-radius: .3em !important;
	border: 1px solid #cecece !important;
	padding: 2px !important;
}
.vue-tags-input .ti-tag{
	height: 28px !important;
}
.vue-tags-input .ti-input{
	padding: 0px !important;
	border: none !important;
	
}
.ti-new-tag-input-wrapper {
    padding: 0px !important;
	margin: 0px !important;
	font-size: inherit !important;
}
.ti-new-tag-input-wrapper input{
	border: none !important;
	padding: .75em;
	height: 28px !important;
}
</style>