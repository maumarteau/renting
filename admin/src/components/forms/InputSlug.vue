<template>
  <div
    :class="`formulate-input-element formulate-input-element--${context.type}`"
    :data-type="context.type"
  >
    
  <input
      type="text"
      v-model="formatted"
      v-bind="context.attributes"
      autocomplete="no"
      @blur="context.blurHandler"
  >     
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
    }
  },
  computed: {
    formatted: {
      get: function() {
        return this.context.model
      },
      set: function(newValue) {
        this.context.model = this.sanitizeTitle(newValue)
      }
    }

  },
  methods:{
    sanitizeTitle: function(str) {
      str = str.replace(/^\s+|\s+$/g, ""); // trim
      str = str.toLowerCase();

      // remove accents, swap ñ for n, etc
      var from = "åàáãäâèéëêìíïîòóöôùúüûñç·/_,:;";
      var to = "aaaaaaeeeeiiiioooouuuunc------";

      for (var i = 0, l = from.length; i < l; i++) {
        str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
      }

      str = str
        .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
        .replace(/\s+/g, "-") // collapse whitespace and replace by -
        // .replace(/-+/g, "-"); // collapse dashes

      return str;
    }
  }
}
</script>

<style scoped>
    
</style>