<template>
	<div>
		<vue-ads-pagination
			:total-items="pageData.pageInfo.totalItems"
			:max-visible-pages="2"
			:items-per-page="pageData.length"
			:page="pageData.page - 1"
			@page-change="pageChange"
			disable-styling
			class="d-flex align-items-center"
		>
			<template slot-scope="props">
				<select
					class="lenght-select"
					@change="pageLength"
					v-model="length"
				>
					<option value="15">15</option>
					<option value="30">30</option>
					<option value="50">50</option>
					<option value="100">100</option>
				</select>

				Mostrando {{ props.start }} - {{ props.end }} de
				{{ props.total }} items
			</template>

			<template slot="buttons" slot-scope="props">
				<div
					class="p-2 btn btn-page"
					:class="{
						active: button.active,
						disabled: button.disabled,
					}"
					v-for="(button, key) in props.buttons"
					:key="key"
					@click="pageChange(button.page)"
				>
					<i
						class="icon icon-left-open-big"
						v-if="button.title == 'previous'"
					></i>
					<i
						class="icon icon-right-open-big"
						v-if="button.title == 'next'"
					></i>
					<span
						v-if="
							button.title != 'previous' && button.title != 'next'
						"
						>{{ button.html }}</span
					>
				</div>
			</template>
		</vue-ads-pagination>
	</div>
</template>

<script>
export default {
	name: 'Pagination',
	props: ['pageData'],
	data() {
		return {
			length: null,
		}
	},
	mounted() {
		this.length = this.pageData.length
	},
	methods: {
		pageChange(page) {
			this.$emit('pageChange', page)
		},
		pageLength() {
			this.$emit('pageLength', this.length)
		},
	},
}
</script>
<style scoped>
.lenght-select {
	height: 36px;
	border-radius: 0px;
	border: solid 1px #f3f3f3;
	font-size: 0.8rem;
	margin-right: 12px;
	padding: 0px 8px;
}
.btn-page {
	background-color: #fff;
	border: solid 1px #f3f3f3;
	width: 30px;
	height: 36px;
	border-radius: 0px;
	font-size: 0.8rem;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 2px;
}
.btn-page.active {
	background-color: #143155;
	border: solid 1px #f3f3f3;
	color: #fff;
}
.btn-page.disabled {
	background-color: #fff;
	border: solid 1px #f3f3f3;
	opacity: 0.5;
}
</style>
