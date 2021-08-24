<template>
	<div>
		<Layout :transparent="true" :loading="loading">
			<div class="car-head" v-if="item">
				<div v-if="item.imageMain" class="image" :style="'background-image:url(' + item.imageMain.url + ')'"></div>
				<div class="data">
					<h1 class="title mt-5 ">
						<strong>{{ item.name }}</strong>
					</h1>
					<div class="mt-3 lead-text">
						<small>
							{{ item.intro }}
						</small>
					</div>

					<div class="mt-3 lead-text" v-if="item.price > 0">
						<div class="badge badge-primary" v-if="item.featured">
							OPORTUNIDAD
						</div>
						<div class="price mt-2">
							desde <span class="currency">U$S</span>
							<span class="amount ml-1">{{ item.price }}</span>
							<small class="ml-1">+ IVA</small>
						</div>
					</div>
					<div class="mt-3">
						<div class="mb-2" v-if="item.featured" v-html="item.featuredDetail"></div>
					</div>

					<div class="d-flex flex-wrap">
						<!-- <div
							class="btn btn-block btn-primary mt-3 btn-call"
							@click="callMePlease()"
							:class="{ callme: callme }"
							v-click-outside="callMePleaseClose"
						>
							<template v-if="!callme && !sended && !sending"
								>Te llamamos</template
							>
							<template v-if="callme && !sended && !sending">
								<i class="icon icon-phone invert"></i>
								<form @submit="send()">
									<input
										type="text"
										v-model="phone"
										ref="phoneInput"
									/>
								</form>
								<div class="btn btn-primary" @click="send()">
									Llamame
								</div>
							</template>
							<template v-if="sending">
								<span class="text-white px-2"
									>Enviando solcitud</span
								>
							</template>
							<template v-if="!sending && sended">
								<span class="text-white px-2"
									>En breve te llamaremos!</span
								>
							</template>
						</div> -->
						<router-link
							tag="a"
							:to="
								`/contacto?subject=${encodeURI(this.item.name)}&body=${encodeURI(
									`Buenos días/nDeseo obtener más información acerca del vehículo ${this.item.name}/n¡Muchas gracias!`
								)}`
							"
							class="btn btn-block btn-primary mt-3 ml-2"
							v-if="!callme"
						>
							Me interesa
						</router-link>
					</div>
				</div>
			</div>

			<div class="container mt-5" v-if="item.detailTitle && item.detail">
				<div class="row pt-5 pb-5">
					<div class="col-12 col-md-6 m-auto pt-3 pb-3">
						<h1 class="title mt-2" v-if="item.detailTitle">
							<!-- <strong>Equipamiento</strong> -->
							<strong>{{ item.detailTitle }}</strong>
						</h1>
						<div class="text-secondary lead-text mt-3 detail-text" v-html="item.detail"></div>
					</div>
				</div>
			</div>

			<div class="container mt-5">
				<div class="row">
					<div class="col-12 ">
						<div class="data-sheet mt-5" v-if="item.dataSheet">
							<div class="content">
								<h4>Ficha técnica</h4>
							</div>
							<a :href="item.dataSheet.url" target="_blank" class="btn btn-primary">
								Descargar
							</a>
						</div>
					</div>
				</div>
			</div>

			<div class="container mt-5">
				<div class="row">
					<div class="col m-auto text-center">
						<div class="gallery">
							<div
								class="item  hover-effect"
								v-for="image in item.gallery"
								:key="image.id"
								:style="'background-image:url(' + image.url + ')'"
							></div>
						</div>
					</div>
				</div>
			</div>

			<div class="container mt-5 pb-5" v-if="item">
				<div class="row mt-5">
					<div class="col">
						<HomeOportunities />
					</div>
				</div>
			</div>
		</Layout>
	</div>
</template>

<script>
import Layout from '@/components/Layout'
import gql from 'graphql-tag'
import HomeOportunities from '@/views/home/HomeOportunities.vue'

export default {
	name: 'CarDetail',
	metaInfo() {
		return {
			title: this.item ? this.item.name : '',
		}
	},
	components: {
		Layout,
		HomeOportunities,
	},
	data() {
		return {
			loading: true,
			item: {},
			callme: false,
			phone: null,
			sending: false,
			sended: false,
		}
	},
	beforeMount() {
		if (this.$route.params.slug) {
			this.load()
		} else {
			this.$router.push('/')
		}
	},
	methods: {
		callMePlease() {
			this.callme = true
			this.$nextTick(() => {
				console.log(this.$refs.phoneInput)
				this.$refs.phoneInput.focus()
			})
		},
		callMePleaseClose() {
			this.callme = false
		},
		load() {
			return this.$apollo
				.query({
					query: gql`
						query($slug: String) {
							carCategory(slug: $slug) {
								id
								name
								featured
								featuredDetail
								imageMain {
									id
									type
									filename
									url
									urlThumb
								}
								images {
									title
									body
									image {
										id
										type
										filename
										url
										urlThumb
									}
								}
								gallery {
									id
									type
									filename
									url
									urlThumb
								}
								dataSheet {
									id
									type
									filename
									url
									urlThumb
								}
								intro
								detailTitle
								detail
								price
								# propAirConditioner
								# propPassengers
								# propDoors
								# propLuggages
								# propHandLuggages
								# propTransmission
								# propFuel
							}
						}
					`,
					variables: { slug: this.$route.params.slug },
					fetchPolicy: 'network-only',
				})
				.then(({ data }) => {
					this.item = data.carCategory
					this.loading = false
				})
				.catch((err) => {
					console.log(err)
					this.$router.push('/')
				})
		},
		send() {
			if (!this.sending && this.phone) {
				this.sending = true
				const data = {
					subject: 'Solcitud de llamada',
					name: 'No definido',
					phone: this.phone,
					email: 'No definido',
					message: `Interesado en vehículo ${this.item.name} solciita ser llamado al teléfono ${this.phone}`,
				}

				this.$apollo
					.mutate({
						mutation: gql`
							mutation($data: MessageInput!) {
								messageCreate(data: $data) {
									id
								}
							}
						`,
						variables: {
							data,
						},
					})
					.then(() => {
						this.sending = false
						this.sended = true
					})
					.catch((error) => {
						this.parseGQLErrors(error)
						this.sending = false
					})
			}
		},
	},
}
</script>

<style scoped>
.lead-text {
	font-size: 24px;
}
.car-head {
	display: block;
	align-items: center;
	justify-content: space-between;
}
.car-head .image {
	width: 100%;
	height: 50vw;
	max-height: 640px;
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center center;
	position: relative;
}
.car-head .image:before {
	display: none;
	content: '';
	border-top: 0px solid transparent;
	border-right: 90px solid transparent;
	border-bottom: 640px solid white;
	position: absolute;
}
.car-head .data {
	padding: 16px;
	width: 100%;
	max-width: 450px;
}
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

@media (min-width: 991px) {
	.car-head {
		display: flex;
		flex-direction: row-reverse;
	}
	.car-head .data {
		margin-left: 50px;
	}
	.car-head .image:before {
		display: block;
	}

	.block {
		flex-direction: row;
	}
}

.badge-primary {
	background-color: #ec9721;
	border-radius: 20px;
	font-size: 14px;
	font-weight: 500;
}

.price {
	font-size: 20px;
}
.price .currency {
	font-size: 20px;
	font-weight: 600;
}
.price .amount {
	font-size: 26px;
	font-weight: 600;
}

.btn.btn-call {
	height: 44px;
	transition: all 0.3s ease-in-out;
}
.btn.callme {
	display: flex;
	padding: 4px;
	align-items: center;
	background-color: var(--primary-color);
}
.btn.callme input {
	border-radius: 20px;
	border: none;
	height: 34px;
	padding-left: 12px;
	width: 120px;
	font-size: 18px;
	margin: 0px 6px;
	outline: none;
}
.btn.callme .icon {
	margin-left: 8px;
	width: 20px;
	height: 20px;
	margin-right: 6px;
}
.btn.callme .btn-primary {
	background-color: rgb(0, 30, 80);
	color: #fff;
	height: 34px;
	align-items: center;
	padding: 0px 12px;
}

.gallery {
	display: grid;
	grid-gap: 20px;
	grid-template-areas:
		'one two'
		'one three'
		'four four';
	grid-template-columns: 1fr 1fr;
	grid-template-rows: 1fr 1fr;
	width: 100%;
	height: 100%;
}
.gallery .item {
	background-color: #f3f3f3;
	background-size: cover;
	background-position: center center;
	background-repeat: no-repeat;
}
.gallery .item:first-child {
	height: 64vw;
	grid-area: one;
}
.gallery .item:nth-child(2) {
	grid-area: two;
}
.gallery .item:nth-child(3) {
	grid-area: three;
}
.gallery .item:nth-child(4) {
	height: 24vw;
	grid-area: four;
}

.detail-text /deep/ ul li {
	font-size: 20px;
	color: rgb(0, 0, 0);
	margin: 8px 8px 14px 8px;
}

@media (min-width: 991px) {
	.detail-text /deep/ ul {
		columns: 2;
		-webkit-columns: 2;
		-moz-columns: 2;
		/* padding: 0px; */
	}
}

.data-sheet {
	display: flex;
	align-items: center;
}
.data-sheet .content {
	padding: 22px 15px;
	position: relative;
	background-color: #f3f3f3;
	flex-grow: 1;
}
.data-sheet .content:before {
	content: '';
	border-top: 0px solid transparent;
	border-left: 26px solid transparent;
	border-bottom: 120px solid white;
	position: absolute;
	top: 0px;
	right: 0px;
}
.data-sheet h4 {
	font-weight: bold;
}
.data-sheet .btn {
	margin-left: 30px;
}
</style>
