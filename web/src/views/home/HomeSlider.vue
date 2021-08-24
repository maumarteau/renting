<template>
	<div class="container-fluid p-0">
		<div class="loader-skeleton" v-if="loading">
			<div class="d-flex">
				<div class=" flex-grow-1">
					<PuSkeleton width="40vw" height="50vw" />
				</div>
				<div class="d-flex flex-grow-3 p-3 align-items-center">
					<div class=" flex-grow-1">
						<PuSkeleton height="40px" width="80%" />
						<div class="mt-2">
							<PuSkeleton :count="3" width="70%" />
						</div>
						<div>
							<PuSkeleton :count="2" width="54%" />
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- <div class="row">

			<div class="col"> -->
		<VueSlickCarousel :arrows="false" :dots="false" :slidesToShow="1" :slidesToScroll="1" :autoplay="false" v-if="!loading">
			<div v-for="item in items" :key="item.id">
				<div class="block">
					<div class="slide">
						<img :src="item.image.url" alt="" class="hover-effect img-fluid" />
						<div class="data only-mobile">
							<h1 class="title " v-html="item.formattedTitle"></h1>
							<p class="lead-text mt-2">
								{{ item.description }}
							</p>
						</div>
					</div>

					<div class="content flex-center ">
						<div class="content-block">
							<h1 class="title  mb-5" v-html="item.formattedTitle"></h1>
							<p class="lead-text mt-2">
								{{ item.description }}
							</p>

							<div class="separator mt-3"></div>
						</div>
					</div>
				</div>
			</div>
		</VueSlickCarousel>
	</div>

	<!-- </div>
	</div> -->
</template>

<script>
import gql from 'graphql-tag'

export default {
	data() {
		return {
			items: [],
			loading: true,
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
						query {
							mainSliders {
								data {
									id
									formattedTitle
									description
									image {
										id
										type
										filename
										url
										urlThumb
									}
								}
							}
						}
					`,
					fetchPolicy: 'network-only',
				})
				.then(({ data }) => {
					this.items = data.mainSliders.data
					this.loading = false
				})
				.catch(() => {})
		},
	},
}
</script>

<style scoped>
.block {
	display: flex;
	position: relative;
	overflow: hidden;
}

.block .content {
	display: none;
	width: 100%;
	flex-basis: 0;
	padding: 18px;
}
.block .content .content-block {
	max-width: 500px;
	height: fit-content;
}

.slide {
	width: 100vw;
	position: relative;
	max-height: 730px;
}
.slide img {
	/* max-width: 550px; */
}
.slide .data {
	position: absolute;
	bottom: 26px;
	padding: 18px;
	color: #fff;
}
.slide .title {
	font-size: 24px;
}

@media (min-width: 728px) {
	.block .content {
		display: flex;
	}
	.slide {
		width: 40vw;
		float: left;
		max-height: 780px;
	}
	.block .content {
		flex-grow: 1;
	}
}
</style>
