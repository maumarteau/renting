<template>
<div>
    <div v-if="!context.attributes.splitted"
      :class="`formulate-input-element formulate-input-element--${context.type}`"
      :data-type="context.type" >
    	<div >
			
			<date-picker 
				v-model="formatted" 
				:type="datepickerType" 
				@change="context.blurHandler"
				:placeholder="context.placeholder"
				:value-type="(context.attributes.valueFormat) ? context.attributes.valueFormat : 'YYYY-MM-DD'" 
				:format="(context.attributes.displayFormat) ? context.attributes.displayFormat : 'DD-MM-YYYY'" 
				:disabled-date="disabledDate"
				:disabled-time="disabledTime"
				:minute-step="10"
			></date-picker>

    	</div>
    </div>

    <div v-if="context.attributes.splitted" class="">
		
		<div class="d-flex">
			<div class="formulate-custom-select mr-1" v-if="showDay">
				<select name="day" v-model="formatted.day" @change="changed">
					<option disabled>Día</option>
					<option :value="key" v-for="(item, key) in days" :key="key">{{item}}</option>
				</select>
			</div>
			<div class="formulate-custom-select mr-1" v-if="showMonth">
				<select name="month" v-model="formatted.month" @change="changed">
					<option disabled>Mes</option>
					<option :value="key" v-for="(item, key) in months" :key="key">{{item}}</option>
				</select>
			</div>
			<div class="formulate-custom-select" v-if="showYear">
				<select name="year" v-model="formatted.year" @change="changed">
					<option disabled>Año</option>
					<option :value="key" v-for="(item, key) in years" :key="key">{{item}}</option>
				</select>
			</div>

		</div>
    </div>
</div>
</template>

<script>
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'

export default {
	props: {
		context: {
			type: Object,
			required: true
		},
	},
	components: { DatePicker },
	data () {
		return {
			hasError:false,
			years: {},
			months: {},
			days: {},
			today: { year: this.$moment().year(), month: this.$moment().month()+1, day: this.$moment().date()},
			displayFormat: (this.context.attributes.displayFormat) ? this.context.attributes.displayFormat : 'DD-MM-YYYY',
			valueFormat: (this.context.attributes.valueFormat) ? this.context.attributes.valueFormat : 'YYYY-MM-DD',
			datepickerType: 'date',
			showDay:true, 
			showMonth:true, 
			showYear:true, 
    	}
	},
	created(){	
		if( this.context.attributes.splitted ){
			this.getYears();
			this.getMonths();
			this.getDays();  
		}
		
		if( this.displayFormat.search('DD')<0 ) this.showDay = false 
		if( this.displayFormat.search('MM')<0 ) this.showMonth = false 
		if( this.displayFormat.search('YY')<0 ) this.showYear = false 
		
		if( this.displayFormat.search('HH:mm')>=0 ) this.datepickerType = 'datetime' 


	},
	computed: {
		formatted: {
			get() {
				if(this.context.attributes.splitted){
					if(this.context.model){
						var date = this.$moment(this.context.model, this.valueFormat)
						var returnedDate = {
							day: this.$moment(date).date(),
							month: this.$moment(date).month()+1,
							year: this.$moment(date).year()
						}
					}else{
						var returnedDate = {
							day: '',
							month: '',
							year: ''
						}
					}
					return returnedDate
				}else if(this.context.model){
					var date = this.$moment(this.context.model, this.valueFormat).format(this.valueFormat)
					return date
				}

			},
			set(newValue){
				if( !this.context.attributes.splitted ){
					this.context.model = newValue
				}
			}
		}
	},
	methods:{
		changed(){
			let dateToReturn = this.$moment()
			if( this.showDay && this.formatted.day ) dateToReturn.day(this.formatted.day)
			if( this.showMonth && this.formatted.month ) dateToReturn.month(this.formatted.month-1)
			if( this.showYear && this.formatted.year ) dateToReturn.year(this.formatted.year)
			this.context.model = dateToReturn.format(this.valueFormat)
			
		},
		disabledDate(date) {
			if(this.context.attributes.max){
				const max = new Date(Date.parse(this.context.attributes.max))
				max.setHours(12, 0, 0, 0)
				return date > max
			}
			if(this.context.attributes.min){
				const min = new Date(Date.parse(this.context.attributes.min))
				min.setHours( 12,0,0,0)
				date.setHours( 12,0,0,0)
				return date < min
			}
		},
		
		disabledTime(date) {
			
			// if(this.context.attributes.max){
			// 	const max = new Date(Date.parse(this.context.attributes.max))
			// 	max.setHours(12, 0, 0, 0)
			// 	return date > max
			// }
			if(this.context.attributes.min){
				const min = new Date(Date.parse(this.context.attributes.min))
				min.setHours( min.getHours(), min.getMinutes(), 0, 0)
				return date < min
			}
		},
  
		getYears: function() {
			var _from = 1930
			var _to = this.today.year
			if(this.context.attributes.min) _from =  this.$moment(this.context.attributes.min).format('YYYY')
			if(this.context.attributes.max) _to = this.$moment(this.context.attributes.max).format('YYYY')
			this.years = {}
			for (var _y = _from; _y <= _to; _y++) {
				this.years[`${_y}`] = _y
			}
		},
		getMonths: function() {
			this.months = {};
			for (var _m = 1; _m <= 12; _m++) {
				this.months[`${_m}`] = this.$moment(_m, 'MM').format('MMMM');
			}
		},
		getDays: function() {
			this.days = {}
			for (var _d = 1; _d <= 31; _d++) {
				this.days[`${_d}`] = this.pad(_d,2)
			}
		},
		
		pad(num, places) {
			var zero = places - num.toString().length + 1;
			return Array(+(zero > 0 && zero)).join("0") + num;
		}
    
  }


}
</script>

<style scoped>

</style>