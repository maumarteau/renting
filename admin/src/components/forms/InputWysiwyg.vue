<template>
  <div
    :class="`formulate-input-element formulate-input-element--${context.type}`"
    :data-type="context.type"
  >

    <div class="" @focusin.stop v-if="loaded">
        <editor
		@focusin.stop
        v-model="formatted"
        :id="context.attributes.id"
        :key="context.attributes.id"
        api-key="inbzdh85tcoo0q3cyzlmk5qs0e9q447tc73fd4dx9haq3om7"
        :init="config"
      	/>
    </div>
  </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'

export default {
  components: {
    Editor
  },
  props: {
    context: {
      type: Object,
      required: true
    },
  },
  data () {
	return {
		loaded:false,
		config: {
			height: (this.context.attributes.height) ? this.context.attributes.height : 800,
			menubar: (this.context.attributes.showMenuBar) ? true : false,
			language: 'es',
			image_title: true,
			automatic_uploads: true,
			file_picker_types: 'image',

			force_br_newlines : true,
    		force_p_newlines : false,
			forced_root_block : '',
	
			file_picker_callback: function (cb, value, meta) {
					  
				var input = document.createElement('input');
    			input.setAttribute('type', 'file');
    			input.setAttribute('accept', 'image/*');

				input.onchange = function () {
      				var file = this.files[0];

      				var reader = new FileReader();
      				reader.onload = function () {
						var id = 'blobid' + (new Date()).getTime();
						var blobCache =  tinymce.activeEditor.editorUpload.blobCache;
						var base64 = reader.result.split(',')[1];
						var blobInfo = blobCache.create(id, file, base64);
						blobCache.add(blobInfo);
        				cb(blobInfo.blobUri(), { title: file.name });
      				};
      				reader.readAsDataURL(file);
    			};
    			input.click();
  			},
			plugins: [
				'advlist autolink lists link image charmap print preview anchor',
				'searchreplace visualblocks code fullscreen',
				'insertdatetime media table paste code help wordcount imagetools '
			],
          	toolbar:
				'undo redo | bold italic | \
				alignleft aligncenter alignright alignjustify | \
				bullist numlist outdent indent |  table link image | removeformat | help'
        	}
    	}
  	},
	computed: {
		formatted: {
			get: function() {
				return this.context.model;
			},
			set: function(newValue) {
				this.context.model = newValue;
			}
		}
	},
	mounted(){

		// document.addEventListener('focusin', function (e) {
		// 	let closest = e.target.closest(".tox-tinymce-aux, .tox-dialog, .moxman-window, .tam-assetmanager-root");
		// 	console.log(closest)
		// 	if (closest !== null && closest !== undefined) {
		// 		e.stopImmediatePropagation();
		// 	}
		// });
		this.$nextTick(() => {
			this.loaded = true
		})

	}
}
</script>

<style scoped>
  .formulate-input-element /deep/ .editr--toolbar  {
    flex-wrap: wrap;
      height: auto;
  }

  .formulate-input-element /deep/ .tox .tox-mbtn {
    color: #222f3e !important;
  }
  .formulate-input-element /deep/ .tox .tox-tbtn:hover {
    background: #dee0e2 !important;
    border: 0 !important;
    box-shadow: none !important;
    color: #222f3e !important;
  }
</style>