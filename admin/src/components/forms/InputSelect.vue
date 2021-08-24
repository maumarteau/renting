<template>
<div
	:class="`formulate-input-element formulate-input-element--${context.type}`"
	:data-type="context.type"
	autocomplete="off"
	>
    
    <div class="input-select">
		<model-list-select
			autocomplete="off"
			:list="context.options"
			v-model="formatted"
			v-bind="context.attributes"
		/>
	</div>
    
</div>
</template>

<script>
import { ModelListSelect  } from "vue-search-select";
import "vue-search-select/dist/VueSearchSelect.css";

export default {
  props: {
    context: {
      type: Object,
      required: true,
    },
  },
  components: {
    ModelListSelect,
  },
  data() {
    return {};
  },
  computed: {
    formatted: {
      get: function() {
        return this.context.model;
      },
      set: function(newValue) {
        this.context.model = newValue;
      },
    },
  },
};
</script>

<style scoped>
.input-select /deep/ .ui.selection.dropdown{
    border-radius: .3em;
	padding: .75em;
	color: #000;
	border: 1px solid #cecece;
}

.input-select /deep/ .ui.selection.dropdown .menu{
	border: 1px solid #cecece;
}

.input-select /deep/ .ui.selection.active.dropdown:hover,
.input-select /deep/ .ui.selection.active.dropdown:hover .menu{
	    border: 1px solid #000;
}

.input-select /deep/ .ui.selection.dropdown>.delete.icon, 
.input-select /deep/ .ui.selection.dropdown>.dropdown.icon, 
.input-select /deep/ .ui.selection.dropdown>.search.icon{
	padding: .8em;
}
.input-select /deep/ .ui.search.dropdown>input.search{
padding: .75em;
}
</style>
