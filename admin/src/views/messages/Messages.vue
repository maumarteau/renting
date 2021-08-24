<template>
	<Layout :pageTitle="'Mensajes'">
		<div class="main-container container-fluid">
			<div class="message-list">
				<div class="card mt-2">
					<div
						class="message"
						v-for="(item, index) in list"
						:key="item.id"
						@click="openMessage(item, index)"
						:class="{ selected: opened && item.id == opened.id }"
					>
						<div class="d-flex justify-content-between">
							<div class="d-flex align-items-center">
								<div
									class="readed mr-2"
									:class="{ active: !item.readed }"
								></div>
								<h3>{{ item.name }}</h3>
							</div>
							<div class="date">
								{{
									item.createdAt | moment('DD-MM-YYYY HH:mm')
								}}
							</div>
						</div>
						<p>{{ item.subject }}</p>
					</div>
				</div>
				<infinite-loading @infinite="loadMore">
					<div slot="spinner">Cargando...</div>
					<div slot="no-more">No hay más mensajes</div>
					<div slot="no-results">No hay mensajes</div>
				</infinite-loading>
			</div>
			<div class="message-view">
				<Loader :show="loading" type="inline" />
				<div class="card mt-2 p-2" v-if="opened">
					<div class="card-body p-4">
						<div class="d-flex justify-content-between">
							<div>
								<h3>{{ opened.name }}</h3>
								<p class="p-0 text-secondary">
									<span v-if="opened.email"
										>Email: {{ opened.email }} <br
									/></span>
									<span v-if="opened.phone"
										>Teléfono: {{ opened.phone }} <br
									/></span>
								</p>
							</div>
							<div>
								<div class="date">
									{{ opened.createdAt | moment('DD-MM-YYYY')
									}}<br />
									{{ opened.createdAt | moment('HH:mm') }}
								</div>

								<a
									class="btn btn-link"
									:href="
										`mailto:${opened.email}?subject=RE:%20${opened.subject}&body=Estimado%20${opened.name};`
									"
								>
									<i class="icon icon-ios-undo mr-2"></i>
									Responder
								</a>
							</div>
						</div>
						<h4 class="mt-3">{{ opened.subject }}</h4>

						<div class="mt-3" v-html="opened.message"></div>
					</div>
				</div>
			</div>
		</div>
	</Layout>
</template>

<script>
import gql from 'graphql-tag'
import listMixins from '@/mixins/listMixins'
import Loader from '@/components/layout/Loader'
import InfiniteLoading from 'vue-infinite-loading'

export default {
	name: 'Messages',
	mixins: [listMixins],
	components: {
		Loader,
		InfiniteLoading,
	},
	data() {
		return {
			list: [],
			opened: null,
			loading: false,
			page: 1,
		}
	},
	beforeMount() {
		this.filters = this.getValidUrlParams()
		// this.load()
		this.pagination.length = 10
	},
	methods: {
		async loadMore($state) {
			console.log('loadMore')
			const loaded = await this.load()
			this.list.push(...loaded)
			if (loaded.length > 0) {
				this.pagination.page += 1
				this.pagination.skip =
					(this.pagination.page - 1) * this.pagination.length
				$state.loaded()
			} else {
				$state.complete()
			}
		},

		openMessage(item, index) {
			this.loading = true
			this.opened = null
			if (!item.readed) {
				this.$apollo
					.mutate({
						mutation: gql`
							mutation($id: ID!) {
								messageReaded(id: $id) {
									id
									subject
									readed
									name
									email
									phone
									message
									createdAt
								}
							}
						`,
						variables: {
							id: item.id,
						},
					})
					.then(({ data }) => {
						this.list[index] = data.messageReaded
						this.opened = item
						this.loading = false
					})
			} else {
				setTimeout(() => {
					this.opened = item
					this.loading = false
				}, 100)
			}
		},

		load() {
			return this.$apollo
				.query({
					query: gql`
						query($take: Int, $skip: Int) {
							messages(take: $take, skip: $skip) {
								data {
									id
									subject
									readed
									name
									email
									message
									createdAt
								}
								pageInfo {
									totalItems
								}
							}
						}
					`,
					variables: {
						take: this.pagination.length,
						skip: this.pagination.skip,
					},
					fetchPolicy: 'network-only',
				})
				.then(({ data }) => {
					return data.messages.data

					this.pagination.pageInfo = data.messages.pageInfo
					// this.openMessage(this.list[0], 0)
					this.loading = false
				})
		},

		deletePrompt(item) {
			this.$dialog
				.confirm(
					{
						title: 'Eliminar página',
						body: `¿Está seguro que desea eliminar la página <strong>"${item.title}"</strong>?`,
					},
					{
						okText: 'Eliminar',
						customClass: 'delete-prompt',
					}
				)
				.then(() => {
					this.delete(item)
				})
		},

		delete(item) {
			item.loading = true
			this.$apollo
				.mutate({
					mutation: gql`
						mutation($id: ID!) {
							pageDelete(id: $id) {
								id
							}
						}
					`,
					variables: {
						id: item.id,
					},
				})
				.then(() => {
					this.$toast.success('Elemento eliminado correctamente')
					this.load()
				})
				.catch((error) => {
					this.errors = this.parseGQLErrors(error)
					item.loading = false
				})
		},
	},
}
</script>

<style scoped>
.main-container {
	display: flex;
}
.main-container .message-list {
	flex-basis: 1;
	width: 300px;
	max-height: calc(100vh - 240px);
	overflow: auto;
	margin: 0px 8px;
}
.main-container .message-list .readed {
	width: 8px;
	height: 8px;
	border-radius: 50%;
	background-color: #999;
}
.main-container .message-list .readed.active {
	background-color: #45ea09;
}

.main-container .message-view {
	width: calc(100% - 250px);
}

.message {
	padding: 10px 14px;
	border-bottom: 1px solid #e7e7e7;
	cursor: pointer;
}
.message:hover {
	background-color: #ececec;
}
.message.selected {
	background-color: #143155;
	color: #fff;
}
.message h3 {
	font-size: 14px;
}
.message .date {
	font-size: 12px;
	font-weight: 500;
	opacity: 0.5;
}
.message p {
	font-size: 14px;
	margin: 0px;
}

.message-view h3 {
	font-size: 22px;
}
.message-view h4 {
	font-size: 16px;
}
.message-view .date {
	font-size: 12px;
	font-weight: 500;
	color: #949494;
	text-align: right;
}
.btn .icon {
	font-size: 17px;
	color: #3a3a3a;
}
</style>
