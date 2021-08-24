<template>
<div>
    <h1>Saliendo</h1>
</div>
</template>

<script>
import { onLogout } from '../vue-apollo';
import { mapMutations } from 'vuex';

export default {
    methods:{
        ...mapMutations(['logout']),
    },
    beforeMount(){
        onLogout(this.$apollo.provider.defaultProvider);
        this.logout();
        this.$router.push('/login');
    }
}
</script>
