<template>
	<div v-if="items.length > 0">
		<h1 class="page-title">Oportunidades</h1>

		<VueSlickCarousel
			:arrows="false"
			:dots="true"
			:slidesToScroll="1"
			:slidesToShow="3"
			:responsive="[
				{
					breakpoint: 1720,
					settings: {
						slidesToShow: 3,
					},
				},
				{
					breakpoint: 1400,
					settings: {
						slidesToShow: 2,
					},
				},
				{
					breakpoint: 991,
					settings: {
						slidesToShow: 1,
					},
				},
				{
					breakpoint: 480,
					settings: {
						slidesToShow: 1,
					},
				},
			]"
			class="mt-3"
		>
			<template v-for="item in items">
				<CarItem :car="item" :key="item.id" />
			</template>
		</VueSlickCarousel>
	</div>
</template>

<script>
import gql from 'graphql-tag'
import CarItem from '@/components/CarItem'

export default {
	components: {
		CarItem,
	},
	data() {
		return {
			items: [],
		}
	},
	beforeMount() {
		this.load()
	},
	methods: {
		load() {
			return this.$apollo
				.query({
					query: gql`
						query($featured: Boolean, $status: String) {
							carCategories(
								featured: $featured
								status: $status
							) {
								data {
									id
									name
									slug
									image {
										id
										type
										filename
										url
										urlThumb
									}
									price
									featured
									featuredDetail
								}
							}
						}
					`,
					variables: { featured: true, status: 'ACTIVE' },
					fetchPolicy: 'network-only',
				})
				.then(({ data }) => {
					this.items = data.carCategories.data
				})
				.catch(() => {})
		},
	},
}
</script>

<style scoped>
div /deep/ .car-item {
	margin: 8px;
}
</style>
