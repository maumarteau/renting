import Vue from 'vue'

// defino variables y funciones globales
export default Vue.mixin({
	data: function() {
		return {
			pagination: {
				page: 1,
				length: 15,
				pageInfo: {
					totalItems: 0,
				},
			},
		}
	},
	methods: {
		getValidUrlParams() {
			// parseo las variables de url y devuelvo un objecto con los valres validos
			var items = this.$route.query
			// si tiene paginacion se la pongo en
			if (items.page) {
				this.pagination.page = items.page
				this.pagination.skip = (items.page - 1) * this.pagination.length
				delete items.page
			}
			if (items.length) {
				this.pagination.length = parseInt(items.length)
			}

			if (items.startDate)
				items.startDate = this.$moment(items.startDate).format(
					'YYYY-MM-DD 00:00:00'
				)

			if (items.endDate)
				items.endDate = this.$moment(items.endDate).format(
					'YYYY-MM-DD 23:59:59'
				)

			var result = {}
			Object.keys(items).forEach((key) => {
				var item = items[key]
				if (Array.isArray(item)) {
					// si es un array como pro ejemplo period period, limpio los valores vacioss
					item = item.filter(Boolean)
				}
				if (item != '' && item != null && item.length > 0) {
					result[key] = item
				}
			})
			return result
		},

		cleanFilters() {
			var items = this.filters
			var result = {}
			Object.keys(items).forEach((key) => {
				const item = items[key]
				if (item != '') {
					result[key] = item
				}
			})
			return result
		},

		pageChange(page) {
			console.log(page)
			let params = this.getValidUrlParams()
			params.page = page + 1
			this.$router.replace({ query: params })
		},
		pageLength(length) {
			let params = this.getValidUrlParams()
			params.page = 1
			params.length = length
			this.$router.replace({ query: params })
		},

		selectedDateRangeFilter(dates) {
			if (dates.startDate) {
				this.filters.startDate = this.$moment(dates.startDate).format(
					'YYYY-MM-DD'
				)
			} else {
				this.filters.startDate = null
			}
			if (dates.endDate) {
				this.filters.endDate = this.$moment(dates.endDate).format(
					'YYYY-MM-DD'
				)
			} else {
				this.filters.endDate = null
			}
			this.updateFilters()
		},

		updateFilters() {
			let params = this.cleanFilters()

			if (params.startDate)
				params.startDate = this.$moment(params.startDate).format(
					'YYYY-MM-DD'
				)
			if (params.endDate)
				params.endDate = this.$moment(params.endDate).format(
					'YYYY-MM-DD'
				)
			// elimino elmentos del objeto que esten vacios
			params = Object.fromEntries(
				Object.entries(params).filter(([_, v]) => v != null)
			)
			delete this.filters.page
			this.$router.replace({ query: params })
		},
	},
})
