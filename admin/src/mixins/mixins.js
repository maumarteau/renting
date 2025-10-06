import Vue from 'vue'

// defino variables y funciones globales
export default Vue.mixin({
    data() {
        return{
            API_URL: process.env.VUE_APP_API_URL || 'http://localhost:3000',
        }
    },
    methods: {
        
        parseGQLErrors (error) {
            let errorMessage
            
            if(error.graphQLErrors){
                errorMessage = error.graphQLErrors[0] ? error.graphQLErrors[0].message : null
            }
            
            if(error.networkError && !errorMessage){
                errorMessage = error.networkError.result.errors[0] ? error.networkError.result.errors[0].message : null
            }

            if(error.message && !errorMessage){
                errorMessage = error.message
            }

            if(!errorMessage){
                errorMessage = 'Ha ocurrido un error'
            }
            this.$toast.error(errorMessage)
            return errorMessage
        },
    }
})
