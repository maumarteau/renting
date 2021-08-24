<template>
	<div class="container-fluid p-0">
		<!-- <div class="row">
			<div class="col"> -->
		<div class="block">
			<div class="slide" v-if="items.length > 0">
				<VueSlickCarousel
					:arrows="false"
					:dots="false"
					:slidesToShow="1"
					:slidesToScroll="1"
					:autoplay="true"
				>
					<div v-for="item in items" :key="item.id">
						<img
							:src="item.image.url"
							alt=""
							class="hover-effect img-fluid"
						/>
					</div>
				</VueSlickCarousel>

				<div
					class="data only-mobile"
					v-for="item in items"
					:key="item.id"
				>
					<h1 class="title " v-html="item.formattedTitle"></h1>
					<p class="lead-text mt-2">
						{{ item.description }}
					</p>
				</div>
			</div>

			<div class=" content flex-center ">
				<div class="   only-desktop">
					<div
						class="content-block"
						v-for="item in items"
						:key="item.id"
					>
						<h1
							class="title  mb-5"
							v-html="item.formattedTitle"
						></h1>
						<p class="lead-text mt-2">
							{{ item.description }}
						</p>

						<div class="separator mt-3"></div>
					</div>
				</div>
			</div>
		</div>
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
	width: 100%;
	display: flex;
	flex-basis: 0;
	padding: 18px;
}
.block .content .content-block {
	max-width: 500px;
	height: fit-content;
}

.slide {
	width: 100vw;
	float: left;
	position: relative;
	max-height: 780px;
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
	.slide {
		width: 40vw;
	}
	.block .content {
		/* width: calc(100% - 40vw) !important; */
		/* margin-left: 40vw; */
		/* height: 100%; */
		flex-grow: 1;
	}
}
</style>
