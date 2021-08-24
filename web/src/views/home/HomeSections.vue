<template>
	<div>
		<div class="container">
			<div class="row" v-for="(item, index) in items" :key="item.id">
				<div class="d-flex mt-5 mb-3">
					<div class="block block-1 bg-white flex-grow-4 mr-3">
						<div class="content flex-grow-4 mt-4 ml-4">
							<div class="content-block">
								<h1 class="title">
									<strong>{{ item.title }}</strong>
								</h1>
								<div v-html="item.intro" class="mt-3"></div>

								<router-link v-if="item.hasBody && !item.link" tag="a" :to="`/${item.slug}`" class="btn btn-primary mt-3">
									Ver adicionales
								</router-link>

								<router-link v-if="item.link" tag="a" :to="`${item.link}`" class="btn btn-primary mt-3">
									Ver adicionales
								</router-link>
							</div>
						</div>
						<div
							class="flex-grow-5 only-desktop align-items-center justify-content-between"
							:class="index % 2 == 0 ? 'order-last' : 'order-first'"
							v-if="item.image"
						>
							<img :src="item.image.url" class="img-fluid hover-effect" />
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import gql from 'graphql-tag'

export default {
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
						query($featured: Boolean) {
							pages(featured: $featured) {
								data {
									id
									title
									intro
									hasBody
									slug
									link
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
					variables: { featured: true },
					fetchPolicy: 'network-only',
				})
				.then(({ data }) => {
					this.items = data.pages.data
				})
				.catch(() => {})
		},
	},
}
</script>

<style scoped>
.block {
	display: flex;
	flex-direction: column;
	background-repeat: no-repeat;
	background-position: right;
}

.block .image {
	background-repeat: no-repeat;
	background-position: center center;
	width: auto;
	height: 80vw;
	background-image: url('../../assets/img/home.jpg');
	max-height: 780px;
	display: grid;
	align-items: flex-end;
	padding: 18px;
	flex-grow: 1;
}
.block .image .title {
	color: #fff;
	font-size: 24px;
}
.block .content {
	display: flex;
	flex-basis: 0;

	padding: 18px;
}
.block .content .content-block {
	max-width: 500px;
	height: fit-content;
}

.block.block-1 {
	background-color: #f5f5f5;
}

.block.block-2 {
	background: #f5f5f5;
}

.block.block-2 .image {
	height: 100%;
}

@media (min-width: 991px) {
	.block {
		flex-direction: row;
	}

	.block-1 {
	}
}

.only-desktop {
	display: flex !important;
}
</style>
