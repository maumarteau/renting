import Vue from 'vue'
export default Vue.mixin({
    data: function () {
        return {
            saving: false
        }
    },
    methods: {
        // convierto array al formato de select de vueformulate select
        // covertArrayToSelectableObject(items){
		// 	var results = {}
		// 	items.forEach( item =>{
		// 		results[`${item.id}`] = item.name
		// 	})
		// 	return results
        // },
        covertArrayToSelectableObject(items){
            var results = []
            for (const item of items){
                results.push({ value: item.id, label: item.name })
			}
			return results
        },
        
    }
})
