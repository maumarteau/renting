<template>
    <div>
        <Navbar></Navbar>
	    <div class="main">
            <PageHeader :pageTitle="pageTitle" :pageSubtitle="pageSubtitle">
                <template #breadcrumb ><slot name="breadcrumb"></slot></template>
                <template #cta ><slot name="cta"></slot></template>
            </PageHeader>

            <div class="">
                <slot></slot>
            </div>

	    </div>
    </div>
</template>
<script>
import Navbar from '@/components/layout/Navbar'
import PageHeader from '@/components/layout/PageHeader'

export default {
    name:"Layout",
    props:{
        pageTitle: { default: ''},
        pageSubtitle: { default: ''},
    },
    components:{
		Navbar,
		PageHeader,	
	},
}
</script>

<style scoped>
.main{
    width: calc(100% - 230px);
    margin-left: 230px;
}
.main-container{
    padding: 18px;
}

@media (max-width: 991px) {
    .main{
        width: 100%;
        margin-left: 0px;
    }
}
</style>