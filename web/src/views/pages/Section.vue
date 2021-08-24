<template>
	<div v-if="item">
		<Layout :navFixed="false" :loading="loading">
			<div class="container mt-5" v-if="!loading">
				<div class="row">
					<div class="col">
						<h1 class="title text-center mb-2">
							<strong>
								{{ item.title }}
							</strong>
						</h1>
					</div>
				</div>

				<div class="row mt-4" v-if="item.image">
					<div class="col-12 col-lg-5">
						<div class="p-4 mt-4 " style="max-width:640px">
							<div v-html="item.intro"></div>
							<div v-html="item.body"></div>
						</div>
					</div>

					<div class="col-12 col-lg-7 d-none d-md-block">
						<div class="p-4">
							<img :src="item.image.url" class="img-fluid hover-effect" />
						</div>
					</div>
				</div>

				<div class="row mt-4" v-if="!item.image">
					<div class="col-12 ">
						<div class="p-4 mt-4 mx-auto" style="max-width:890px">
							<div v-html="item.intro"></div>

							<div v-html="item.body"></div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	</div>
</template>

<script>
import Layout from '@/components/Layout'
import gql from 'graphql-tag'

export default {
	name: 'Section',
	metaInfo() {
		return {
			title: this.item ? this.item.title : '',
		}
	},
	components: {
		Layout,
	},
	data() {
		return {
			item: {},
			loading: true,
		}
	},
	beforeMount() {
		if (this.$route.params.slug) {
			this.load()
		}
	},
	methods: {
		load() {
			return this.$apollo
				.query({
					query: gql`
						query($slug: String) {
							page(slug: $slug) {
								id
								title
								intro
								body
								image {
									id
									type
									filename
									url
									urlThumb
								}
							}
						}
					`,
					variables: { slug: this.$route.params.slug },
					fetchPolicy: 'network-only',
				})
				.then(({ data }) => {
					this.item = data.page
					this.loading = false
				})
				.catch((err) => {
					console.log(err)
					this.$router.push('/')
				})
		},
	},
}
</script>

<style scoped></style>
